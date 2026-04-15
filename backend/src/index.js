import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { pool, initializeDatabase } from "./db.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET || "change-this-secret";

app.use(cors());
app.use(express.json());

const generateToken = (user) => {
  return jwt.sign(
    { userId: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
};

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Missing authorization token." });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Invalid or expired token." });
    }
    req.user = decoded;
    next();
  });
};

app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "chapchap-backend" });
});

app.post("/auth/signup", async (req, res) => {
  const { fullName, email, password } = req.body;
  if (!fullName || !email || !password) {
    return res.status(400).json({ error: "Name, email, and password are required." });
  }

  try {
    const passwordHash = await bcrypt.hash(password, 10);
    const result = await pool.query(
      "INSERT INTO users (full_name, email, password_hash) VALUES ($1, $2, $3) RETURNING id, full_name, email, created_at",
      [fullName, email.toLowerCase(), passwordHash]
    );

    const user = result.rows[0];
    const token = generateToken(user);
    res.status(201).json({ user, token });
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({ error: "Email already exists." });
    }
    console.error(error);
    res.status(500).json({ error: "Unable to create account." });
  }
});

app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email.toLowerCase()]);
    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({ error: "Invalid login credentials." });
    }

    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) {
      return res.status(401).json({ error: "Invalid login credentials." });
    }

    const token = generateToken(user);
    res.json({
      user: { id: user.id, fullName: user.full_name, email: user.email },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to login." });
  }
});

app.get("/users", authenticateToken, async (req, res) => {
  try {
    const result = await pool.query("SELECT id, full_name, email, created_at FROM users ORDER BY created_at DESC");
    res.json({ users: result.rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to load users." });
  }
});

app.get("/auth/me", authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, full_name, email, created_at FROM users WHERE id = $1",
      [req.user.userId]
    );

    if (!result.rows[0]) {
      return res.status(404).json({ error: "User not found." });
    }

    res.json({ user: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to load user." });
  }
});

const start = async () => {
  try {
    await initializeDatabase();
    app.listen(port, () => {
      console.log(`Backend running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Failed to start backend:", error);
    process.exit(1);
  }
};

start();

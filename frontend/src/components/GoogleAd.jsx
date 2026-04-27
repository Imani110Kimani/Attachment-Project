import { useEffect } from "react";

const GoogleAd = ({ client, slot, format = "auto", responsive = true }) => {
  useEffect(() => {
    if (window && window.adsbygoogle) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        // ignore if adsense script is not loaded or ad already initialized
      }
    }
  }, []);

  return (
    <div className="adsense-wrapper">
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? "true" : "false"}
      />
    </div>
  );
};

export default GoogleAd;

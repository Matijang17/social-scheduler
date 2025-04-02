"use client";

import { useEffect } from "react";

export default function Home() {
  const handleFacebookLogin = () => {
    FB.login(function(response) {
      if (response.authResponse) {
        console.log("Logged in:", response.authResponse);
        // Redirect or update state after successful login
      } else {
        console.log("User cancelled login or did not fully authorize.");
      }
    }, {scope: 'public_profile,email'});
  };

  useEffect(() => {
    if (typeof FB !== "undefined") {
      FB.XFBML.parse();
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.fbAsyncInit = function () {
        FB.init({
          appId: process.env.NEXT_PUBLIC_FB_APP_ID,
          cookie: true,
          xfbml: true,
          version: "v19.0",
        });
        FB.AppEvents.logPageView();
        FB.XFBML.parse();
      };

      (function (d, s, id) {
        let js,
          fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s);
        js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      })(document, "script", "facebook-jssdk");
    }
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>🚀 Welcome to Social Scheduler</h1>
      <p>Schedule posts for Twitter, LinkedIn, Facebook, and Instagram.</p>
      <button
        onClick={handleFacebookLogin}
        style={{
          padding: "10px 20px",
          background: "#1877f2",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "16px",
          margin: "20px 0"
        }}
      >
        Login with Facebook
      </button>
    </div>
  );
}
  
  
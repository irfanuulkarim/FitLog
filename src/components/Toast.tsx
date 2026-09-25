"use client";

import { useEffect, useState } from "react";

export default function Toast() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    function handleToast(event: Event) {
      const customEvent = event as CustomEvent<string>;

      setMessage(customEvent.detail);

      window.setTimeout(() => {
        setMessage("");
      }, 4000);
    }

    window.addEventListener("fitlog-toast", handleToast);

    return () => {
      window.removeEventListener("fitlog-toast", handleToast);
    };
  }, []);

  if (!message) {
    return null;
  }

  return (
    <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-[5px] border border-[#34382c] bg-[#171a15] px-4 py-3 text-[10px] font-semibold text-white shadow-xl">
      <span className="mr-2 text-[#baff00]">✓</span>
      {message}
    </div>
  );
}
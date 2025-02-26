"use client";

import { Toaster } from "react-hot-toast";

export function ToasterProvider() {
  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      gutter={8}
      containerClassName=""
      containerStyle={{}}
      toastOptions={{
        duration: 5000,
        style: {
          background: "var(--background)",
          color: "var(--foreground)",
        },
      }}
    />
  );
}

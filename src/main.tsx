import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AntdConfigProvider } from "./providers/AntdConfigProvider.tsx";
import { ClerkProvider } from "@clerk/react";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key: Please set VITE_CLERK_PUBLISHABLE_KEY in .env");
}

createRoot(document.getElementById("root")!).render(
  <AntdConfigProvider>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <App />
    </ClerkProvider>
  </AntdConfigProvider>
);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import SleepHouse from "./grape-clinic";
import "./globals.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SleepHouse />
  </StrictMode>,
);

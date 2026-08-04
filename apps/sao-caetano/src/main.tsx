import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import SleepHouse from "@sleep-house/landing-page";
import "@sleep-house/landing-page/styles.css";
import { cityConfig } from "./city.config";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SleepHouse region={cityConfig} />
  </StrictMode>,
);

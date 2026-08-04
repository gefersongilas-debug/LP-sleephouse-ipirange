import type { SleepHouseRegion } from "@sleep-house/landing-page";

export const cityConfig: SleepHouseRegion = {
  key: "sao-caetano",
  label: "São Caetano",
  location: "São Caetano do Sul, SP",
  domain: import.meta.env.VITE_SITE_URL || "https://www.sleephousesaocaetano.com.br",
  whatsapp: "5511997488296",
  stores: [
    {
      name: "Sleep House São Caetano",
      address: "Av. Goiás, 436 — Santo Antônio, São Caetano do Sul — SP",
      mapQuery: "Avenida Goiás 436 Santo Antônio São Caetano do Sul",
    },
    {
      name: "Sleep House Outlet São Caetano",
      address: "Av. Goiás, 750 — Santo Antônio, São Caetano do Sul — SP",
      mapQuery: "Avenida Goiás 750 Santo Antônio São Caetano do Sul",
    },
  ],
};

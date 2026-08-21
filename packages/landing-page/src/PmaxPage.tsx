import TempurPage from "./TempurPage";
import type { SleepHouseRegion } from "./SleepHouse";

export default function PmaxPage({ region }: { region: SleepHouseRegion }) {
  return <TempurPage pmax region={region} />;
}

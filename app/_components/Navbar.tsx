import { DatePicker } from "./DatePicker";
import { LocationButton } from "./LocationButton";

export default function Navbar({
  setDefaultCity,
}: {
  setDefaultCity: CallableFunction;
}) {
  return (
    <nav className="grid grid-cols-12 p-5 gap-x-5">
      <LocationButton setDefaultCity={setDefaultCity} />
      <DatePicker />
    </nav>
  );
}

import { Attribute } from "./components/Attribute";
import { Banner } from "./components/Banner";
import { Companies } from "./components/Companies";
import { Defination } from "./components/Defination";

export function Home() {
  return (
    <div className="container mx-auto">
      <Banner />
      <Attribute />
      <Defination />
      <Companies />
    </div>
  );
}

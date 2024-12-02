// import SectionHero from "../components/SectionHero";
import SectionSliderCategories from "../components/SectionSliderCategories";
import SectionSliderProductCard from "../components/SectionSliderProductCard";

export default function PageHome() {
  return (
    <div className="nc-PageHome relative overflow-hidden">
      {/* <SectionHero /> */}

      <div className="container relative space-y-24 my-24 lg:space-y-32 lg:my-32">
        <SectionSliderCategories />
        <SectionSliderProductCard />
      </div>
    </div>
  );
}

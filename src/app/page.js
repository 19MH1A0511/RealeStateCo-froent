import HomePageSection from "@/component/common/HomePageSection";
import PropertyCard from "@/component/common/propertycard";
import WhySellCards from "@/component/common/whysellcards";

export default function Home() {
  return (
    <div>
      <div><HomePageSection /></div>
      <div><PropertyCard /></div>
      <div><WhySellCards /></div>
    </div>
  );
};

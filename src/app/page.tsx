import axios from "axios";
import { BASE_URL } from "./utils/constants";
import { ApiDataAttributes } from "./utils/types";
import { Quantum } from "./components/Quantum/Quantum";
import { Future } from "./components/Future/Future";
import { Galactic } from "./components/Galactic/Galactic";
import { FeaturedProduct } from "./components/FeaturedProduct/FeaturedProduct";
import { Highlights } from "./components/Highlights/HIghlights";
import { Banner } from "./components/Banner/Banner";

export default async function Home() {
  const res = await axios.get(`${BASE_URL}/api/getAllProducts`);
  const data: ApiDataAttributes = res.data;
  const products = data.products!;

  const quantumCollection = products.filter(
    (item) => item.theme == "Quantum_Realm"
  );

  const futureCollection = products.filter(
    (item) => item.theme == "Human_Future"
  );

  const galacticCollection = products.filter(
    (item) => item.theme == "Galactic_Urbanite"
  );

  const highlightsCollection = products.filter(
    (item) => item.theme == "Highlights"
  );

  const martianKeyboard = products.find((item) => item.id == 1130);

  if (products.length === 0) {
    return <h1>No products here.</h1>;
  }

  return (
    <div className={`w-full flex flex-col gap-[80px]`}>
      <Banner/>
      <Quantum items={quantumCollection} />
      <Future items={futureCollection} />
      <Galactic items={galacticCollection} />
      <FeaturedProduct item={martianKeyboard!} />
      <Highlights items={highlightsCollection} />
    </div>
  );
}

import axios from "axios";
import { BASE_URL } from "./utils/constants";
import { ApiDataAttributes, PrismaProductOutput } from "./utils/types";

export default async function Home() {
  const res = await axios.get(`${BASE_URL}/api/getAllProducts`);
  const data: ApiDataAttributes = res.data;
  const products = data.products!;

  if (products.length === 0) {
    return <h1>No products here.</h1>;
  }

  return (
    <ul>
      {products.map((item, index) => {
        return <h1 key={index}>{item.name}</h1>;
      })}
    </ul>
  );
}

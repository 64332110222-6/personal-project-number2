import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

export default function UserHome() {
  const [products, setProducts] = useState([]);
  const [trigger, setTrigger] = useState(false)

  useEffect(() => {
    const run = async () => {
      let token = localStorage.getItem("token");
      const rs = await axios.get("http://localhost:8000/product/landing", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(rs.data.products);
    };
    run();
  }, [trigger]);

  return (
    <div className="grid place-items-center gap-4 mt-6">
      <img src="\src\assets\braner.jpg" alt="Banner" className="w-full h-auto" style={{ width: '1300px', height: '300px', maxWidth: '100%' }} />
      <div className="container mx-auto bg-gray-100 rounded-lg p-4">
        <div className="text-start text-2xl pl-1 text-gray-800 pb-2 border-b-2 border-gray-700 font-serif">มังงะขายดี</div>
        <div className="pt-4 flex gap-4">
          {products.map((el) => (
            <ProductCard key={el.id} el={el} setTrigger={setTrigger} />
          ))}
        </div>
      </div>
    </div>
  );
}

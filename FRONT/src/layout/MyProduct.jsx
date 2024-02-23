import axios from "axios";
import { useEffect, useState } from "react";
import MyProductCard from "../components/MyProductCard";
import { Link, useNavigate } from 'react-router-dom'

export default function MyProduct() {
  const [myProducts, setMyProducts] = useState([]);
  const [editIdx, setEditIdx] = useState(-1)
  const [trigger, setTrigger] = useState(false)

  const adminTool = [
    { to: '/product/new', text: 'Create Product' },
    { to: '/publishing/new', text: 'Create Publishing' },
    { to: '/category/new', text: 'Create Category' },
    { to: '/author/new', text: 'Create Author' },
    { to: '/series/new', text: 'Create series' },
  ]

  useEffect(() => {
    const run = async () => {
      let token = localStorage.getItem("token");
      const rs = await axios.get("http://localhost:8000/admin/landing", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMyProducts(rs.data.products);
    };
    run();
  }, [trigger]);

  return (
    <div className="grid place-items-center gap-4 mt-6">
      <ul className="menu menu-horizontal px-1">
          {adminTool.map(el => (
            <li key={el.to} >
              <Link to={el.to}>{el.text}</Link>
            </li>
          ))}
        </ul>
      <div className="container mx-auto bg-gray-100 rounded-lg p-4">
        <div className="pt-4 flex gap-4">
        {myProducts.map((el) => (
          <MyProductCard key={el.id} el={el} setTrigger={setTrigger} />
        ))}
        </div>
      </div>
    </div>
  );
}

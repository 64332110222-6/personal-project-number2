import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductDetailCard from "../components/ProductDetailCard";

export default function ProductDetail() {
    const [trigger, setTrigger] = useState(false);
    const [productDetail, setProductDetail] = useState(null); 
    const { productId } = useParams();

    useEffect(() => {
        const run = async () => {
            try {
                let token = localStorage.getItem("token");
                const rs = await axios.get(`http://localhost:8000/product/${productId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setProductDetail(rs.data.product);
            } catch (error) {
                console.error("Function run is error:", error);
            }
        };
        run();
    }, [productId]);

    if (!productDetail) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="text-center text-2xl text-blue-500">รายละเอียดสินค้า</div>
            <div className="block gap-4">
                <ProductDetailCard key={productDetail.id} el={productDetail} setTrigger={setTrigger} />
                {/* Render other details as needed */}
            </div>
        </div>
    );
}

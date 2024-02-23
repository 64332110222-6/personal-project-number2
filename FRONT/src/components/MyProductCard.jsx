import axios from "axios";
import React from "react";
import { Link, useNavigate } from 'react-router-dom'

export default function MyProductCard(props) {
    const { el } = props;

    return (
        <Link to={`/admin/product/${el.id}`} key={el.id}>
            <div className="card-body flex flex-col items-center justify-center bg-white rounded-lg p-4 shadow-md"
            style={{ width: '220px', height: '400px'}}>
                <div className="w-full flex flex-wrap items-center justify-center">
                    {el.product_img.map((img, index) => (
                        <img
                        className="w-full h-full"
                            key={index}
                            src={img.url}
                            alt={`Product Image ${index + 1}`}
                            style={{ maxWidth: '100%', border: '2px solid #444', borderRadius: '5px' }}
                        />
                    ))}
                </div>
                <div className="text-center">
                    <p className="text-base font-semibold text-gray-800 mt-2 line-clamp-2">{`${el.name} (${el.category.name})`}</p>
                    <p className="text-2xl font-semibold text-gray-800 mt-2">{`ราคา ${el.price} บาท`}</p>
                </div>
            </div>
        </Link>
    );
}

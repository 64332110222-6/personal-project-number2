import axios from "axios";
import React from "react";
import { Link, useNavigate } from 'react-router-dom'

export default function ProductCard(props) {
  const { el} = props;

  return (
    <Link to={`/product/${el.id}`} key={el.id}>
      <div className="card-body flex flex-col items-center justify-center bg-white rounded-lg p-4 shadow-md">
        <div className="w-full flex flex-wrap items-center justify-center">
          {el.product_img.map((img, index) => (
            <img
              key={index}
              src={img.url}
              alt={`Product Image ${index + 1}`}
              style={{ width: '1000px', height: '300px', maxWidth: '100%', border: '2px solid #444', borderRadius: '5px' }}
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

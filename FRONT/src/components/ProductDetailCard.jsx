import axios from "axios";
import React from "react";
import { Link} from 'react-router-dom'

export default function ProductDetailCard(props) {
    const { el} = props;

    const onSubmit = () =>{
        const count =1;
         
    }

    let finalCategory = el?.category?.name === 'MG' ? 'มังงะ' : 'ไลท์โนเวล';
    return (
        <Link to={`/product/${el.id}`} key={el.id}>
            <div className="card-body">
                <div className="block w-50 h-60">
                    {el.product_img.map((img, index) => (
                        <img
                            key={index}
                            src={img.url}
                            alt={`Product Image ${index + 1}`}
                            className="w-50 h-60 mr-2"
                        />
                    ))}
                    <p className="card-title">{`${el.name} (${el.category.name})`}</p>
                    <p className="card-title">{`โดย: ${el.author.name}`}</p>
                    <p className="card-title">{`สำนักพิมพ์: ${el.publishing.name}`}</p>
                    <p className="card-title">{`หมวดหมู่: ${finalCategory}`}</p>
                    <p className="card-title">{`${el.synopsis}`}</p>
                    <p className="card-title">{`ราคา ${el.price} บาท`}</p>
                    <button className="btn" onSubmit={()=>onSubmit}>ADD TO CART</button>
                </div>
            </div>
        </Link>
    );
}


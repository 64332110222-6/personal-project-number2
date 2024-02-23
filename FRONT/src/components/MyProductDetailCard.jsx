import axios from "axios";
import React from "react";
import { useState ,useEffect} from "react";
import { Link, useNavigate } from 'react-router-dom'
import ModalEdit from "./ModalEdit";
import { useParams } from "react-router-dom";


export default function MyProductDetailCard(props) {
    const { el } = props;
    const navigate = useNavigate();
    // const [editIdx, setEditIdx] = useState(-1)
    const [editProduct, setEditProduct] = useState(null);
    const { productId } = useParams();
    const [trigger, setTrigger] = useState(false)


    //* hdlDelete ---------------------------------------------------------
    const hdlDelete = async e => {
        try {
            e.stopPropagation()
            const token = localStorage.getItem('token')
            let rs = await axios.delete(`http://localhost:8000/admin/product/delete/${el.id}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            alert('Delete successful')
            navigate('/admin')
        } catch (err) {
            console.log(err)
        }
    }
    let finalCategory = el?.category?.name === 'MG' ? 'มังงะ' : 'ไลท์โนเวล';
    return (
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
                <Link to={`/edit/${el.id}`}><button className="btn" >Edit</button></Link>
                <div className="btn" onClick={hdlDelete}>delete</div>
            </div>
        </div>
    );
}


import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom'

export default function MyShippingCard(props) {
    const { el } = props;
    const navigate = useNavigate();


    //* hdlDelete ---------------------------------------------------------
    const hdlDelete = async e => {
        try {
            e.stopPropagation()
            const token = localStorage.getItem('token')
            let rs = await axios.delete(`http://localhost:8000/shipping/delete/${el.id}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            alert('Delete successful')
            navigate('/shipping')
            window.location.reload()
        } catch (err) {
            console.log(err)
        }
    }

    return (
        // <Link to={`/admin/product/${el.id}`} key={el.id}>
        <div className="card-body">
            <div className="block w-100 h-60">
                <p className="card-title">{`${el.firstName}`}</p>
                <p className="card-title">{`${el.lastName}`}</p>
                <p className="card-title">{`${el.phone}`}</p>
                <p className="card-title">{`${el.email}`}</p>
                <p className="card-title">{`${el.address}`}</p>
                <p className="card-title">{`${el.subDistrict}`}</p>
                <p className="card-title">{`${el.district}`}</p>
                <p className="card-title">{`${el.province}`}</p>
                <p className="card-title">{`${el.postalCode}`}</p>
                <Link to={`/shipping/edit/${el.id}`}><button className="badge badge-secondary" >Edit</button></Link>
                <div className="badge badge-secondary" onClick={hdlDelete}>delete</div>
            </div>
        </div>
        // </Link>
    );
}

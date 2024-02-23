import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
import MyShippingCard from '../components/MyShippingCard';
import { Link, useNavigate } from 'react-router-dom'

export default function Shipping() {
    const [myShipping, setMyShipping] = useState([]);
    const [trigger, setTrigger] = useState(false)


    const profileTool = [
        { to: '/profile', text: 'Profile' },
        { to: '/order', text: 'Orders' },
        { to: '/shipping', text: 'Shipping' },
        { to: '/point', text: 'Point' },
    ]

    useEffect(() => {
        const run = async () => {
            let token = localStorage.getItem("token");
            const rs = await axios.get("http://localhost:8000/shipping/my/landing", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setMyShipping(rs.data.shippings);
        };
        run();
    }, [trigger]);

    return (
        <div>
            <div>Shipping</div>
            <div className="flex justify-end pr-10">
                <ul className="menu menu-horizontal px-1">
                    {profileTool.map(el => (
                        <li key={el.to} >
                            <Link to={el?.to}>{el?.text}</Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="flex justify-end pr-10">
                <ul className="menu menu-horizontal px-1">
                    <li >
                        <Link to={"/shipping/new"}>{"NEW"}</Link>
                    </li>
                </ul>
            </div>
            <div className="flex gap-4">
                <div className="flex gap-4">
                    {myShipping.map((el) => (
                        <MyShippingCard key={el?.id} el={el} setTrigger={setTrigger} />
                    ))}
                </div>
            </div>
        </div>
    )
}


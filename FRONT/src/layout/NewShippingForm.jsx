import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom'

export default function NewShippingForm() {
    const [category, setCategory] = useState([])
    const [author, setAuthor] = useState([]);
    const [publishing, setPublishing] = useState([]);
    
    const navigate = useNavigate();
    const [input, setInput] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        address: "",
        postalCode: "",
        province: "",
        district: "",
        subDistrict: "",
        isMainAddress: null
    })

   
    const mainAddress = [
        { id: 1 ,val: true, text: 'ใช่' },
        { id: 2 ,val: false, text: 'ไม่ใช่' },
    ]

    const hdlChange = e => {
        setInput(prv => ({ ...prv, [e.target.name]: e.target.value }))
    }

    const hdlSubmit = async (e) => {
        try {
            e.preventDefault();
            const token = localStorage.getItem("token");
            const rs = await axios.post("http://localhost:8000/shipping/new",
                input,
                { headers: { Authorization: `Bearer ${token}`} }
            );
            alert("Create new shipping ok!");
            navigate('/my/shipping')
        } catch (err) {
            console.log(err.message);
        }
    };


    return (
        <div>
            <form className="flex flex-col min-w-[600px] border rounded w-5/6 mx-auto p-4 gap-6" onSubmit={hdlSubmit}>
                <label className="form-control w-full ">
                    <div className="label">
                        <span className="label-text">Create new Address</span>
                    </div>
                    <input
                        type="text"
                        placeholder="First Name"
                        className="input input-bordered w-full "
                        name="firstName"
                        value={input.firstName}
                        onChange={hdlChange}
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        className="input input-bordered w-full "
                        name="lastName"
                        value={input.lastName}
                        onChange={hdlChange}
                    />
                    <input
                        type="text"
                        placeholder="Phone"
                        className="input input-bordered w-full "
                        name="phone"
                        value={input.phone}
                        onChange={hdlChange}
                    />
                    <input
                        type="text"
                        placeholder="E-mail"
                        className="input input-bordered w-full "
                        name="email"
                        value={input.email}
                        onChange={hdlChange}
                    />

                    <input
                        type="text"
                        placeholder="Address"
                        className="input input-bordered w-full "
                        name="address"
                        value={input.address}
                        onChange={hdlChange}
                    />

                    <input
                        type="text"
                        placeholder="Sub District"
                        className="input input-bordered w-full "
                        name="subDistrict"
                        value={input.subDistrict}
                        onChange={hdlChange}
                    />

                    <input
                        type="text"
                        placeholder="District"
                        className="input input-bordered w-full "
                        name="district"
                        value={input.district}
                        onChange={hdlChange}
                    />

                    <input
                        type="text"
                        placeholder="Province"
                        className="input input-bordered w-full "
                        name="province"
                        value={input.province}
                        onChange={hdlChange}
                    />

                    <input
                        type="text"
                        placeholder="Postal Code"
                        className="input input-bordered w-full "
                        name="postalCode"
                        value={input.postalCode}
                        onChange={hdlChange}
                    />

                    <span className="label-text">เป็นค่าที่อยู่เริ่มต้นหรือไม่</span>
                    <select
                        className="select select-bordered w-full max-w-xs"
                        name="isMainAddress"
                        value={input.isMainAddress}
                        onChange={hdlChange}
                    >
                        <option value="">กรุณาเลือก</option>
                        {mainAddress.map((el) => (
                            <option key={el.id} value={el.val}>
                                {el.text}
                            </option>
                        ))}
                    </select>

                    <div className="flex gap-5 justify-end">
                        <button type="submit" className="btn" onClick={hdlSubmit}>Confirm</button>
                        <Link to={'/admin'}><button className="btn" >Cancel</button></Link>
                    </div>
                </label>
            </form>
        </div>
    );
}
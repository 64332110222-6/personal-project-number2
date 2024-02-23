import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom'

export default function EditForm(props) {
    const { el, closeModal, setTrigger } = props;
    const navigate = useNavigate();
    const { shippingId } = useParams();
    // const [status, setStatus] = useState([])

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
    

    useEffect(() => {
        try {
            const run = async () => {
                let token = localStorage.getItem("token");
                const rs = await axios.get(`http://localhost:8000/shipping/${shippingId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setInput((prv) => ({
                    ...prv,
                    firstName: rs.data.shipping.firstName,
                    lastName: rs.data.shipping.lastName,
                    phone: rs.data.shipping.phone,
                    email: rs.data.shipping.email,
                    address: rs.data.shipping.address,
                    postalCode: rs.data.shipping.postalCode,
                    province: rs.data.shipping.province,
                    district: rs.data.shipping.district,
                    subDistrict: rs.data.shipping.subDistrict,
                    isMainAddress: rs.data.shipping.isMainAddress
                }));
            };
            run();
        } catch (err) {
            console.log(err.message);
        }
    }, [shippingId]);

    const hdlChange = (e) => {
        setInput((prv) => ({ ...prv, [e.target.name]: e.target.value }));
    };


    const hdlSubmit = async (e) => {
        try {
            e.preventDefault();
            const output = { ...input };
            const token = localStorage.getItem("token");
            const rs = await axios.put(`http://localhost:8000/shipping/update/${shippingId}`, output, {
                headers: { Authorization: `Bearer ${token}` }
            })
            alert("Update OK");
            navigate('/shipping')
        } catch (err) {
            console.log(err.message);
        }
    };

    return (
        <div>
            <form className="flex flex-col border rounded w-5/6 mx-auto p-4 gap-6" onSubmit={hdlSubmit}>
                <label className="form-control w-full ">
                    <div className="label">
                        <span className="label-text">Edit Page</span>
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
                </label>
                <button type='submit' className="btn btn-primary">Update</button>
                <button type='button' className="btn btn-secondary" >Cancel</button>
            </form>
        </div>
    );
}

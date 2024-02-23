import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom'

export default function NewCategoryForm() {
    const navigate = useNavigate()
    const [input, setInput] = useState({
        name: '',
    })

    const hdlChange = e => {
        setInput(prv => ({ ...prv, [e.target.name]: e.target.value }))
    }

    const hdlSubmit = async (e) => {
        try {
            e.preventDefault();
            const token = localStorage.getItem("token");
            const rs = await axios.post("http://localhost:8000/admin/category",
                input,
                { headers: { Authorization: `Bearer ${token}`} }
            );
            alert("Create new category ok!");
            navigate('/admin')
        } catch (err) {
            console.log(err.message);
        }
    };

    return (
        <div>
            <form className="flex flex-col min-w-[600px] border rounded w-5/6 mx-auto p-4 gap-6" onSubmit={hdlSubmit}>
                <label className="form-control w-full ">
                    <div className="label">
                        <span className="label-text">Create new category</span>
                    </div>
                    <input
                        type="text"
                        placeholder="Category name"
                        className="input input-bordered w-full "
                        name="name"
                        value={input.name}
                        onChange={hdlChange}
                    />
                    <div className="flex gap-5 justify-end">
                        <button type="submit" className="btn" onClick={hdlSubmit}>Confirm</button>
                        <Link to={'/admin'}><button className="btn" >Cancel</button></Link>
                    </div>
                </label>
            </form>
        </div>
    );
}
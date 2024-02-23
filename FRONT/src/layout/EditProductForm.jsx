import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom'

export default function EditProductForm(props) {
    const { el, closeModal, setTrigger } = props;
    const [category, setCategory] = useState([])
    const [author, setAuthor] = useState([]);
    const [publishing, setPublishing] = useState([]);
    const [series, setSeries] = useState([]);
    const navigate = useNavigate();
    const { productId } = useParams();
    // const [status, setStatus] = useState([])

    const [input, setInput] = useState({
        name: '',
        volume: '',
        synopsis: '',
        stock: '',
        unit: '',
        price: '',
        categoryId: '',
        authorId: '',
        seriesId: '',
        publishingId: '',
        images: null,
    })

    useEffect(() => {
        const run = async () => {
            const categoryResponse = await axios.get(
                "http://localhost:8000/category/landing"
            );
            const authorResponse = await axios.get(
                "http://localhost:8000/author/landing"
            );
            const publishingResponse = await axios.get(
                "http://localhost:8000/publishing/landing"
            );
            const seriesResponse = await axios.get(
                "http://localhost:8000/series/landing"
            );
            setCategory(categoryResponse.data.categories);
            setAuthor(authorResponse.data.authors);
            setPublishing(publishingResponse.data.publishings);
            setSeries(seriesResponse.data.seriess);
        };
        run();
    }, []);

    useEffect(() => {
        try {
            const run = async () => {
                let token = localStorage.getItem("token");
                const rs = await axios.get(`http://localhost:8000/product/${productId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setInput((prv) => ({
                    ...prv,
                    name: rs.data.product.name,
                    volume: rs.data.product.volume,
                    synopsis: rs.data.product.synopsis,
                    stock: rs.data.product.stock,
                    unit: rs.data.product.unit,
                    price: rs.data.product.price,
                    categoryId: rs.data.product.categoryId,
                    authorId: rs.data.product.authorId,
                    seriesId: rs.data.product.seriesId,
                    publishingId: rs.data.product.publishingId,
                }));
            };
            run();
        } catch (err) {
            console.log(err.message);
        }
    }, [productId]);

    const hdlChange = (e) => {
        setInput((prv) => ({ ...prv, [e.target.name]: e.target.value }));
    };

    const handleImageChange = (e) => {
        setInput((prev) => ({ ...prev, images: e.target.files[0] }));
    };

    const hdlSubmit = async (e) => {
        try {
            e.preventDefault();
            delete input.images;
            const output = { ...input };
            const token = localStorage.getItem("token");
            const rs = await axios.put(`http://localhost:8000/admin/product/update/${productId}`, output, {
                headers: { Authorization: `Bearer ${token}` }
            })
            alert("Update OK");
            navigate('/admin')
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
                        placeholder="Product name"
                        className="input input-bordered w-full "
                        name="name"
                        value={input.name}
                        onChange={hdlChange}
                    />
                    <input
                        type="text"
                        placeholder="volume"
                        className="input input-bordered w-full "
                        name="volume"
                        value={input.volume}
                        onChange={hdlChange}
                    />
                    <textarea
                        className="input input-bordered w-full h-80"
                        type="text"
                        placeholder="synopsis"
                        name="synopsis"
                        id="synopsis"
                        cols="30"
                        rows="10"
                        value={input.synopsis}
                        onChange={hdlChange}></textarea>
                    <input
                        type="text"
                        placeholder="stock"
                        className="input input-bordered w-full "
                        name="stock"
                        value={input.stock}
                        onChange={hdlChange}
                    />
                    <input
                        type="text"
                        placeholder="unit"
                        className="input input-bordered w-full "
                        name="unit"
                        value={input.unit}
                        onChange={hdlChange}
                    />

                    <input
                        type="text"
                        placeholder="price"
                        className="input input-bordered w-full "
                        name="price"
                        value={input.price}
                        onChange={hdlChange}
                    />
                    <span className="label-text">Create new product</span>
                    <select
                        className="select select-bordered w-full max-w-xs"
                        name="publishingId"
                        value={input.publishingId}
                        onChange={hdlChange}
                    >
                        <option value="">กรุณาเลือก</option>
                        {publishing.map((el) => (
                            <option key={el.id} value={el.id}>
                                {el.name}
                            </option>
                        ))}
                    </select>
                    <span className="label-text">Create new product</span>
                    <select
                        className="select select-bordered w-full max-w-xs"
                        name="authorId"
                        value={input.authorId}
                        onChange={hdlChange}
                    >
                        <option value="">กรุณาเลือก</option>
                        {author.map((el) => (
                            <option key={el.id} value={el.id}>
                                {el.name}
                            </option>
                        ))}
                    </select>
                    <span className="label-text">Create new product</span>
                    <select
                        className="select select-bordered w-full max-w-xs"
                        name="seriesId"
                        value={input.seriesId}
                        onChange={hdlChange}
                    >
                        <option value="">กรุณาเลือก</option>
                        {series.map((el) => (
                            <option key={el.id} value={el.id}>
                                {el.name}
                            </option>
                        ))}
                    </select>
                    <span className="label-text">Create new product</span>
                    <select
                        className="select select-bordered w-full max-w-xs"
                        name="categoryId"
                        value={input.categoryId}
                        onChange={hdlChange}
                    >
                        <option value="">กรุณาเลือก</option>
                        {category.map((el) => (
                            <option key={el.id} value={el.id} >
                                {el.name}
                            </option>
                        ))}
                    </select>
                </label>
                <div className="flex gap-5 justify-end">
                    <button type='submit' className="btn btn-primary">Update</button>
                    <Link to={'/admin'}><button className="btn btn-secondary" >Cancel</button></Link>
                </div>
            </form>
        </div>
    );
}

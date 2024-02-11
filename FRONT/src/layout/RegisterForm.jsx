import axios from 'axios'
import { useState } from "react";

export default function RegisterForm() {
  const [input, setInput] = useState({
    name: '',
    password: '',
    confirmpassword: '',
    email: '',
    phone: ''
  })

  const hdlChange = e => {
    setInput(prv => ({ ...prv, [e.target.name]: e.target.value }))
  }

  const hdlSubmit = async e => {
    try {
      e.preventDefault()

      //* validation
      if (input.password !== input.confirmpassword) {
        return alert('Password and confirm password not match')
      }

      const rs = await axios.post('http://localhost:8000/auth/register', input)
      console.log(rs)
      if (rs.status === 200) {
        alert('Register Successful')
      }
    } catch (err) {
      console.log(err.message)
    }

  }

  return (
    <div className="p-5 border w-[20%] min-w-[400px] mx-auto rounded-[20px] mt-5 bg-[#4CCCCC]">
      <div className="text-5xl mb-8 font-bold text-center text-[#344054]">Register</div>
      <form className="flex flex-col gap-2" onSubmit={hdlSubmit}>

        <label className="form-control w-full mb-3">

          <input
            type="text"
            className="input input-bordered w-full rounded-full"
            name="name"
            value={input.name}
            onChange={hdlChange}
            placeholder='Username'
          />
        </label>

        <label className="form-control w-full mb-3">

          <input
            type="email"
            className="input input-bordered w-full rounded-full"
            name="email"
            value={input.email}
            onChange={hdlChange}
            placeholder='E-mail'
          />
        </label>

        <label className="form-control w-full mb-3">

          <input
            type="text"
            className="input input-bordered w-full rounded-full"
            name="phone"
            value={input.phone}
            onChange={hdlChange}
            placeholder='Phone'
          />
        </label>

        <label className="form-control w-full mb-3">

          <input
            type="password"
            className="input input-bordered w-full rounded-full"
            name="password"
            value={input.password}
            onChange={hdlChange}
            placeholder='Password'
          />
        </label>

        <label className="form-control w-full mb-1">

          <input
            type="password"
            className="input input-bordered w-full rounded-full"
            name="confirmpassword"
            value={input.confirmpassword}
            onChange={hdlChange}
            placeholder='Confirm Password'
          />
        </label>

        <div className="flex gap-5 ">
          <button type="submit" className="btn btn-info mt-7 rounded-full w-full bg-[#344054] mb-3 text-lg text-white border-white hover:bg-deeppink">Register</button>
        </div>
      </form>
    </div>
  );
}

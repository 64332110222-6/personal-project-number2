import axios from 'axios'
import { useState } from "react";
import useAuth from '../hooks/useAuth'

export default function LoginForm() {
  const { setUser } = useAuth()
  const [input, setInput] = useState({
    email: '',
    password: ''
  })

  const hdlChange = e => {
    setInput(prv => ({ ...prv, [e.target.name]: e.target.value }))
  }

  const hdlSubmit = async e => {
    try {
      e.preventDefault()
      // validation
      const rs = await axios.post('http://localhost:8000/auth/login', input)
      console.log(rs.data.token)
      localStorage.setItem('token', rs.data.token)
      const rs1 = await axios.get('http://localhost:8000/auth/me', {
        headers: { Authorization: `Bearer ${rs.data.token}` }
      })
      console.log(rs1.data)
      setUser(rs1.data)

    } catch (err) {
      console.log(err.message)
    }
  }

  return (
    <div className="p-5 border w-[20%] min-w-[400px] mx-auto rounded-[20px] mt-5 bg-[#4CCCCC]">
      <div className="text-5xl mb-8 font-bold text-center text-[#344054]">Login</div>
      <form className="flex flex-col gap-2" onSubmit={hdlSubmit}>

        <label className="form-control w-full mb-3">
          <input
            type="email"
            className="input input-bordered w-full rounded-full"
            name="email"
            value={input.email}
            onChange={hdlChange}
            required
            placeholder='E-mail'
          />
        </label>

        <label className="form-control w-full mb-3">
          <input
            type="password"
            className="input input-bordered w-full rounded-full"
            name="password"
            value={input.password}
            onChange={hdlChange}
            required
            placeholder='Password'
          />
        </label>

        <div className="flex gap-5">
          <button type="submit" className="btn btn-info mt-7 rounded-full w-full bg-[#344054] mb-3 text-lg text-white border-white hover:bg-deeppink">Login</button>
        </div>
      </form>
    </div>
  );
}

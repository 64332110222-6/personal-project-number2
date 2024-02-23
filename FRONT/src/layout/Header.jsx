import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth';

const guestNav = [
  { to: '/', text: 'Login' },
  { to: '/register', text: 'Register' },
]

const userNav = [
  { to: '/', text: 'HOME' },
  { to: '/profile', text: 'Profile' },
  { to: '/cart', text: 'Cart' },
]

const adminNav = [
  { to: '/admin', text: 'ADMIN' },
  { to: '/', text: 'HOME' },
  { to: '/profile', text: 'Profile' },
  { to: '/cart', text: 'Cart' },
]

export default function Header() {
  const { user, logout } = useAuth()

  let finalNav = null
  if (!(user?.id)) {
    finalNav = guestNav
  }
  if (user?.id && user?.role === 'ADMIN') {
    finalNav = adminNav
  }
  if (user?.id && user?.role === 'USER') {
    finalNav = userNav
  }

  const navigate = useNavigate()

  const hdlLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="navbar bg-[#4CCCCC]">
      <div className="flex-1 flex items-center">
        <Link to='/'>
          <a className="btn btn-ghost text-xl">Hello, {user?.id ? user.name : 'Guest'}</a>
        </Link>
        <div className="mx-auto rounded-full overflow-hidden" style={{ width: '500px', height: '40px' }}>
          <input type="text" placeholder="Search..." className="input input-bordered w-full h-full rounded-full" />
        </div>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 font-bold">
          {finalNav.map(el => (
            <li key={el.to}>
              <Link to={el.to}>{el.text}</Link>
            </li>
          ))}
          {user?.id && (
            <li>
              <Link to='#' onClick={hdlLogout}>Logout</Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Point() {

    const profileTool = [
        { to: '/profile', text: 'Profile' },
        { to: '/order', text: 'Orders' },
        { to: '/shipping', text: 'Shipping' },
        { to: '/point', text: 'Point' },
    ]

    return (
        <div>
            <div>Point</div>
            <div className="flex justify-end pr-10">
                <ul className="menu menu-horizontal px-1">
                    {profileTool.map(el => (
                        <li key={el.to} >
                            <Link to={el.to}>{el.text}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

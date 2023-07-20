import React from 'react'
import { FaUserCircle } from 'react-icons/fa'
import styles from './Navbar.module.scss'
import { useSelector } from 'react-redux'
import { selectUserName } from '../../../redux/slice/AuthSlice'
import { NavLink } from 'react-router-dom'

const activeLink = ({isActive})=>(isActive && `${styles.active}`)

const Navbar = () => {
    const userName = useSelector(selectUserName)
  return (
    <div className={styles.navbar}>
     <div className={styles.user}>
        <FaUserCircle size={40} color='white'/>
        <br></br>
        <h4>{userName}</h4>
     </div>
     <nav>
        <ul>
            <li>
                <NavLink to='./home' className={activeLink}>
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink to='./all-products' className={activeLink}>
                    All Products
                </NavLink>
            </li>
            <li>
                <NavLink to='./add-product/ADD' className={activeLink}>
                    Add product
                </NavLink>
            </li>
            <li>
                <NavLink to='./orders' className={activeLink}>
                    Orders
                </NavLink>
            </li>
        </ul>
     </nav>
    </div>
  )
}

export default Navbar
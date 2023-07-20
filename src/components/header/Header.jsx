import React, { useEffect, useState } from 'react'
import styles from './Header.module.scss'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { FaBuilding, FaRegBuilding, FaShoppingBag, FaShoppingCart, FaUserCircle} from 'react-icons/fa'
import {GiHamburgerMenu}  from "react-icons/gi"
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../../firebase/config'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { REMOVE_ACTIVE_USER, SET_ACTIVE_USER } from '../../redux/slice/AuthSlice'
import AdminOnlyRoute, { AdminOnlyLink } from '../adminOnlyRoute/AdminOnlyRoute'
import { COUNT_ITEMS, selectCartTotalQuantity } from '../../redux/slice/CartSlice'






const activeLink = ({isActive})=>(isActive && `${styles.active}`)


const Header = () => {

  const [marketPlaceSelected, setMarketPlaceSelected] = useState('false')
  const [propertiesSelected, setPropertiesSelected] = useState('false')
  const marketPlace =()=>{
  setMarketPlaceSelected(true)
  setPropertiesSelected(false)
  }

  const properties =()=>{
  setPropertiesSelected(true)
  setMarketPlaceSelected(false)
  }
  useEffect(()=>{
    setPropertiesSelected(false)
    setMarketPlaceSelected(false)
    // marketPlace()
    // properties()
  },[])
  const logo = (
    <div className={styles.logo}  // 'w-full bg-red-500'  // 
    >
      
        <div style={{width: "250px", display:'flex', justifyContent:'space-between'}}>
          <Link to='/' ><h2 
          // className='text-gray-100'
          style={{backgroundColor:'',height:'max', padding:'5%', }} onClick={()=>{
            setMarketPlaceSelected(false)
            setPropertiesSelected(false)
          }}
          >
            <div>sh<span>ay</span>. </div></h2> 
          </Link>  
          <div>
            <div  style={{width:'120px', display:'flex', justifyContent:'space-between', backgroundColor:''}}> 
              <Link to="/market-place" 
              style={marketPlaceSelected ? 
              {cursor:'pointer', border:'2px solid white', boxShadow:'0px 10px 0px white', padding:'5px', borderRadius:'5px 5px 0 0 '}: 
              {cursor:'pointer', border:'0px solid white', padding:'5px', borderRadius:'5px 5px', color:'white'}} 
              onClick={()=>marketPlace()}> 
                <FaShoppingBag size={40}   
                color={marketPlaceSelected && 'rgba(255,70,1,0.9)'}
                /> 
              </Link>

              <Link to="/properties"
              style={propertiesSelected ? 
              {cursor:'pointer', border:'2px solid white', boxShadow:'0px 10px 0px white', padding:'5px', borderRadius:'5px 5px 0 0'} : {cursor:'pointer', border:'0px solid white', padding:'5px', borderRadius:'5px', color:'white'}}
              onClick={()=>properties()}
              > 
                <FaBuilding size={40}  
                color={propertiesSelected && 'rgba(255,70,1,0.9)'}
                />
              </Link>
            </div>
          </div>
        </div>
      
    </div>
  )
  



  const cartTotalQuantity = useSelector(selectCartTotalQuantity)
  useEffect(() => {
    dispatch(COUNT_ITEMS())
  },[cartTotalQuantity])
  const [showMenu, setShowMenu] = useState(false)
  const [displayName, setDisplayName] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [scrollPage, setScrollPage] = useState(false)
  const cart = (
  <span className={styles.cart}>
    <Link to="/cart">
      Saved
      <FaShoppingCart size={20} />
      <p style={{fontSize:'12px'}}>
      {cartTotalQuantity}
      </p>
    </Link>
    </span>
  );
const fixedNavbar = ()=>{
    if (window.scrollY>50){
      setScrollPage(true)
    }
    else setScrollPage(false)
    window.addEventListener("scroll", fixedNavbar)
  }
  
  
  // To monitor currebtky signed in user
  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // const uid = user.uid;
        // console.log(user.displayName);
        // console.log(user);
        if (user.displayName==null){
        setDisplayName( user.displayName ? user.displayName : user.email.slice(0,user.email.indexOf('@')).toUpperCase())}
        else setDisplayName( user.displayName )


        dispatch(SET_ACTIVE_USER({// dispatch passes info to redux store
          email: user.email, // left side variable =!= right side variable
          userName: displayName,
          userId: user.uid,
        }))

      } else {
        setDisplayName("")
        dispatch(REMOVE_ACTIVE_USER())
      }
    });
  },[dispatch, displayName])

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  const hideMenu = ()=>{
    setShowMenu(false)
  }
  

  const logoutUser = () =>{
    signOut(auth).then(() => {
      toast.success('Logged out successfully')
      console.log("Logged out")
      navigate('/')
      navigate('/')
      
    }).catch((error) => {
      toast.error(error.message)
    });
  }


  return (
    <header className={scrollPage ? `${styles.fixed}` : null}>
      <div className={styles.header} >
        {logo}
        <nav className={showMenu? `${styles["show-nav"]}` : `${styles["hide-nav"]}`}>
`
        <div className={showMenu? `${styles["nav-wrapper"]} ${styles["show-nav-wrapper"]}` : `${styles["nav-wrapper"]}`} 
        onClick={hideMenu}>
        </div>


          <ul onClick={hideMenu}>
            <li>
            <AdminOnlyLink>
                <Link to='/admin/home'>
                <button className='--btn --btn-primary'>
                  Admin
                </button></Link>
              </AdminOnlyLink>
            </li>
            <li><NavLink to='/' className={activeLink}>Home</NavLink></li>
            <li> <NavLink to='/contact' className={activeLink } >Contact Us</NavLink></li>
          </ul>
          <div className={styles["header-right"]} onClick={hideMenu}>
            <span className={styles.links}>
            {displayName ?'': <NavLink to='/login' className={activeLink }>Login</NavLink>}
            {displayName && <a href='#'>
            <FaUserCircle size={16}/>  Hi,  {displayName}
            </a>
            }
            {displayName ?'': <NavLink to='/register' className={activeLink }>Register</NavLink>}
            <NavLink to='/order-history' className={activeLink }>My Orders</NavLink>
            {displayName && <NavLink to='/' onClick={logoutUser}> { 'Logout'}</NavLink>}
              
            </span>
            {cart }
            </div>
        
        </nav>

        <div className={styles['menu-icon']}>
          {cart}

          <GiHamburgerMenu size={28} onClick={toggleMenu}/>

          
        </div>
    </div>
    </header>
  )
}

export default Header
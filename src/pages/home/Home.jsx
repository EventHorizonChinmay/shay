// import styles from './Home.module.scss::'
import React, { useEffect } from 'react'
import Slider from '../../components/slider/Slider'
import AdminOnlyRoute from '../../components/adminOnlyRoute/AdminOnlyRoute'
import Products from '../../components/products/Products'
import Properties from '../../components/properties/Properties'

const Home = () => {
  const url = window.location.href;
  const scrollToProducts= ()  => {
    if (url.includes("#prod")) {
      window.scrollTo({
        top: 650,
        behavior: "smooth",
      })
    }
  }
  useEffect(() => {
    scrollToProducts()
  },[])
  return (
 
  <div>
      {/* <h1> HOME </h1> */}
      {/* <AdminOn lyRoute/> */}
      {/* <Properties/> */}
      <Slider/> 
      <Products type='any'/>
    </div>
  )
}

export default Home
import React, { useEffect, useState } from 'react'
import ProductFilters from './productFilters/ProductFilters'
import styles from './Products.module.scss'
import ProductList from './productList/ProductList'
import useFetchCollection from '../../customHooks/useFetchCollection'
import { useDispatch, useSelector } from 'react-redux'
import { STORE_PRODUCTS, selectProducts } from '../../redux/slice/ProductSlice'
import spinnerImg from "../../assets/spinner.jpg"
import { FaCogs } from 'react-icons/fa'


const Products = (type) => {
  console.log(type)
  const {data , isLoading} = useFetchCollection('products') // returns data and isLoading
  const [showFilter, setShowFilter] = useState(false)
  // const [products, setProducts] = useState([])
  const products = useSelector(selectProducts)
  const dispatch = useDispatch()
  // console.log(products)

  useEffect(() => {
    dispatch(STORE_PRODUCTS({
      products: data,
    }))
  })

  return (
    <section>
      <div className={`container ${styles.product}`}>
        {type.type.includes('mar')? <aside className={showFilter? `${styles.filter} ${styles.show}`: `${styles.filter}`}>
        {isLoading ? null : (<ProductFilters/> )}
        </aside>:''}
        {/* {console.log("type2:",type)} */}
        <div className={styles.content}>
          {isLoading? 
          <img src={spinnerImg}alt='Loading...' style={{width: "50px"}} className='--center-all' /> : 
          
          <ProductList products={products} type={type}/>}
          {type.type.includes('mar')?  <div className={styles.icon} onClick={()=>{setShowFilter(!showFilter)}}>
            <FaCogs size={20} color='orangered'/>
            <p><b>{type.type.includes('mar')?  showFilter?  'Hide Categories': 'Show Categories':''}</b></p>
          </div>:''}
          
        </div>
      </div>
    </section>
  )
}

export default Products
import React, { useEffect, useState } from 'react'
import styles from "./ProductList.module.scss"
import {BsFillGridFill} from "react-icons/bs"
import {FaListAlt} from "react-icons/fa"
import Search from '../../search/Search'
import ProductItem from '../productItem/ProductItem'
import { useDispatch, useSelector } from 'react-redux'
import { FILTER_BY_SEARCH, SORT_PRODUCTS, selectFilteredProducts } from '../../../redux/slice/filterSLice'


const ProductList = ({products,type}) => {
  // console.log("typeeeee",type)
  // console.log("products",products)
  
  const [grid, setGrid] = useState(true)
  const [search, setSearch] = useState("")
  const [sort, setSort] = useState("latest")
  const filteredProducts = useSelector(selectFilteredProducts)

  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(FILTER_BY_SEARCH({products: products, search}))
  },[dispatch ,search, products])
  
  useEffect(() => {
    dispatch(SORT_PRODUCTS({products: products, sort: sort}))
  },[dispatch ,sort, products])
  
  return (
    <div className={styles["product-list"]} id='product'>
      <div className={styles.top}> 
        <div className={styles.icons}>
          {!grid ? <BsFillGridFill size={22} color='orangered' onClick={()=>setGrid(!grid)} /> : <FaListAlt size={22} color='#0066d4' onClick={()=>setGrid(!grid)}/>}
          <p> <b>{ type.type.includes('any') ? products.length: filteredProducts.filter((prod)=>prod.type.includes(type.type.slice(0,3))).length }</b> products found. </p>
        </div>
        <div>
          <Search value={search} onChange={(e)=> setSearch(e.target.value)}/>
        </div>
        {/* Sort Products */}
        <div className={styles.sort}>
          <label> Sort by: </label>
          <select value={sort} onChange={(e)=> setSort(e.target.value)}>
            <option value='latest'> Latest </option>
            <option value='lowest-price'> Lowest price first </option>
            <option value='highest-price'> Highest price first </option>
            <option value='a-z'> A to Z </option>
            <option value='z-a'> Z to A </option>
          </select>
        </div>
      </div>

      <div className={grid? `${styles.grid}` : `${styles.list}`}>
        {products.length ===0? (<p> No products found.</p>) : (
          <> { filteredProducts.map((product)=>{
            if(product.type.includes(type.type.slice(0,3))) {
              return (
              
              <div key={product.id}>
            {/* {typeof(product.type)} */}

              {/* {product.type.slice(0,5)} */}
              {/* {type.type} */}
              {/* {product.type} */}
              
              {/* {console.log(product)} */}
                <ProductItem {...product} grid={grid} product={product}/> {/* ...product makes the component ave access to all the object properties of product object */}

              </div>
            )}
            else if (type.type.includes('any')) return(
              <div key={product.id}>
              {/* {console.log(product)} */}
                <ProductItem {...product} grid={grid} product={product}/> {/* ...product makes the component ave access to all the object properties of product object */}

              </div>
            )
          })}</>
        )}
      </div>
    </div>
  )
}

export default ProductList
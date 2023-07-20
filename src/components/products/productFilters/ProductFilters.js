import React, { useState } from 'react'
import styles from './ProductFilters.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { selectProducts } from '../../../redux/slice/ProductSlice'
import { FILTER_BY_CATEGORY } from '../../../redux/slice/filterSLice'


const ProductFilters = () => {
  const products = useSelector(selectProducts)
  const [category, setCategory] = useState("All")
  const dispatch = useDispatch()
  const filteredProducts = (cat) => {products.filter(() => {setCategory(cat)})
  // console.log(cat);
  dispatch(FILTER_BY_CATEGORY({products, category:cat}))
  }

  const allCategories = [
    'All',
    ...new Set(products.map((products)=>products.category))
  ]
  // console.log(allCategories);
  return (
    <div className={styles.filter}>
      <h4>
        Categories
      </h4>
      <div className={styles.category}>
        {allCategories.map((cat, index)=>{
          return (
            <button key={index} type='button' className={`${category}` === cat && '${styles.active}'} onClick={()=>filteredProducts(cat)}> &#8250; {cat}</button>
          )
        })}
      {/* </div>
        <h4> Brand</h4>
        <div className={styles.brand}>
          <select name='brand' >
            <option value='all'>All</option>
          </select> 
          <h4> Price</h4>
          <p> 52015</p>
          <div className={styles.price}>
          <input type='range' name='price' min='0' max='5000'/>
          </div>
        <br/>
        <button className='--btn --btn-danger'> Clear Filter</button> */}
        </div>
      </div>
  )
}

export default ProductFilters
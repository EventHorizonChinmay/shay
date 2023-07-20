import React, { useState } from 'react'
import styles from './ProductItem.module.scss'
import Card from '../../card/Card'
import { Link } from 'react-router-dom'
import { ADD_TO_CART } from '../../../redux/slice/CartSlice'
import { useDispatch } from 'react-redux'



const ProductItem = ({product, grid, id, name, price, desc, original_cost, brand, imageURL, sellerName, sellerAddress, extraRemark, yearsSinceBought , sellerContact, rent_sell}) => {
  const [contactSeller, setContactSeller] = useState(false)

  
  const shortenText = (text, n) =>{
    if (text.length> n ){
      const shortenedText=text.substring(0,n)+'...'
      return shortenedText
    }
    return text
  }
const dispatch = useDispatch()
  const addToCart =(product) =>{
    dispatch(ADD_TO_CART(product))
  }
  return (
    <Card cardClass={grid ? `${styles.grid}` : `${styles.list}`}>
      {/* {rent_sell} */}
      <Link to={`/product-details/${id}`}>
      <div className={styles.img}>
        <img src={imageURL} alt={name} />  
        {yearsSinceBought>0 && <p className={styles.resell}>Reselling</p>}
        {rent_sell && rent_sell.includes('sel') && <p className={styles.resell}>To Sell</p> }
        {rent_sell && rent_sell.includes('rent') && <p className={styles.rent}>For Rent</p>}
      </div>
      </Link>
      <div className={styles.content}>
        <div className={styles.details}>
          <p style={{color:'rgba(255,69,0,1)',margin:'5px'}}> <span>&#8377;</span> {`${price}`} <span style={{color:'#000080'}}>  {yearsSinceBought>0 && '(Reselling)'}</span></p>
          <Link to={`/product-details/${id}`}><h4>{(grid && name.length > 18)  ? name.substring(0,18)+'...' : name}</h4>
          </Link>
        </div>
        {!grid && <p className={styles.desc}> {shortenText(desc,200)} </p> }
        {!grid && yearsSinceBought>0 && <p className={styles.desc}> The product was first bought {yearsSinceBought} year/s back. Its cost back then was &#8377;{original_cost} </p> }
       
        <div className={styles.buttonss}><button className='--btn --btn-danger' 
        // style={{ marginRight:'20%', marginLeft:'20%', width:'60%', margin:'auto', marginBottom:'1rem', minWidth:'10rem'}}
         onClick={()=>addToCart(product)}> Save  </button>
        <button className='--btn --btn-danger' onClick={()=>setContactSeller(!contactSeller)}> Contact the seller </button>
        </div>
        {contactSeller && 
        <div  className={styles.contactSeller}>
            {/* {ContactSeller(product)} */}
            <div > <h4>Seller Info: </h4> 
              <h4 className={styles.close} onClick={()=>setContactSeller(false)}>x</h4>
            </div>
              <div >
              <p >Seller's name :</p> <p> <b>{sellerName}</b> </p>
              </div>
              <div style={{display:''}}>
              <p style={{minWidth:'125px'}}> Phone number :</p> 
              <p> <b>{sellerContact}</b></p>
              </div>
              <div style={{display:''}}>
              <p style={{minWidth:'125px'}}>Pickup address :</p> <p> <b>{sellerAddress}</b></p>
              </div>
              <div style={{display:'flex'}}>
              <p> {product.extraRemark && 'Extra remarks :'}<b>{product.extraRemark &&  product.extraRemark}</b></p>
              </div>
            </div>
            }
      </div>
    </Card>
  )
}

export default ProductItem
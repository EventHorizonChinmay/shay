import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { doc, getDoc } from "firebase/firestore";
import { db } from '../../../firebase/config';
import { toast } from 'react-toastify';
import styles from "./ProductDetails.module.scss";
import spinnerImg from '../../../assets/spinner.jpg'
import { useDispatch, useSelector } from 'react-redux';
import { ADD_TO_CART, COUNT_ITEMS, DECREASE_CART, selectCartItems } from '../../../redux/slice/CartSlice';
// import ContactSeller from '../../contactSeller/ContactSeller';




const ProductDetails = () => {
  const {id}= useParams()
  const [product, setProduct] = useState(null)
  const dispatch = useDispatch()
  const cartItem = useSelector(selectCartItems)
  const cart= cartItem.find((cart)=>cart.id === id)
  const isAddedToCart = cartItem.findIndex((cart)=> {return cart.id === id})
  

  const addToCart = ()=>{
    dispatch(ADD_TO_CART(product))
    dispatch(COUNT_ITEMS())
  }
  const decreaseCart =  ()=>{
    dispatch(DECREASE_CART(product))
    dispatch(COUNT_ITEMS())
  }
  const getProduct = async ()=>{
    console.log("getting product")
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);
    // console.log("ddddddddd", docSnap);
    if (docSnap.exists()) {
      const obj={ 
        id:id,
        ...docSnap.data()
      }
      setProduct(obj)
      setProduct(obj)
      console.log("Document data:", docSnap.data());

      console.log("Product=",product);
    } else {
      // docSnap.data() will be undefined in this case
      toast.error("Product not found.")
      console.log("No such document!");
    }
  }
  useEffect(()=>{
    
  },[cart])  
  useEffect(()=>{
    getProduct()

  },[id]);
  return (
    <section>
    {/* {console.log(product)} */}
    {/* {async ()=> {return product.prodType}} */}
    {/* {product && product.prodType} */}
      <div className={`container ${styles.product}`}>
        {/* <h2 style={{marginLeft:'10px'}}> {product.name}</h2> */}
      <Link to='/#products'> &larr; All Products</Link>

      {product === null ? (
        <img src={spinnerImg} alt="Loading" style={{width: "50px"}} />
      ) : (<> 
        <div className={styles.details}>
          <div className={styles.img}>
            <img src={product.imageURL} alt={product.name} /> 
          </div>

          <div className={styles.content}>
            <h3> {product.name}</h3>
            <p style={{fontSize:'12px'}}> {product.yearsSinceBought >0 && '(Item was first bought '+ product.yearsSinceBought+ ' year/s back for ₹' + product.original_cost+ ')'  }</p>
            <p className={styles.price}> {product.rent_sell && (product.rent_sell.includes('rent')? 'Rent:' : 'Selling Price:') } ₹ {product.price} </p>
            <p>{product.desc}</p>

            <p > <b> {product != null && product.type.includes('pro') ? 'Carpet Area: ':'Brand'} </b> {product.brand} {product.brand.includes('sqft')? '':'sqft'}</p>
            <div className={styles.count}>
            {isAddedToCart <0 ? null : 
            (
              <>
              <button className='--btn' onClick={()=>decreaseCart(product)}>-</button>
              <p> <b>{cart.cartQuantity ? cart.cartQuantity : 0}</b></p>
              <button className='--btn' onClick={()=>addToCart(product)}>+</button>
              </>
            )}
            </div>
            <button className='--btn --btn-danger' onClick={()=>addToCart(product)}> SAVE FOR LATER </button>
          </div>
          <div  className={styles.contactSeller}>
            {/* {ContactSeller(product)} */}
            <h4>Seller Info: </h4>
              <div style={{display:''}}>
              <p style={{minWidth:'125px'}}>Seller's name :</p> <p> <b>{product.sellerName}</b> </p>
              </div>
              <div style={{display:''}}>
              <p style={{minWidth:'125px'}}> Phone number :</p> 
              <p> <b>{product.sellerContact}</b></p>
              </div>
              <div style={{display:''}}>
              <p style={{minWidth:'125px'}}>Pickup address :</p> <p> <b>{product.sellerAddress}</b></p>
              </div>
              <div style={{display:'flex'}}>
              <p> {product.extraRemark && 'Extra remarks :'}<b>{product.extraRemark &&  product.extraRemark}</b></p>
              </div>
            </div>
        </div>
      </>)}
      </div>
    </section>
  )
  

}



export default ProductDetails
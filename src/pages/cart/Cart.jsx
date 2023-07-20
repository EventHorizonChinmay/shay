import React, { useEffect } from 'react'
import styles from "./Cart.module.scss"
import { useDispatch, useSelector } from 'react-redux'
import { ADD_TO_CART, CALCULATE_SUBTOTAL, CLEAT_CART, COUNT_ITEMS, DECREASE_CART, DELETE_PRODUCT, selectCartItems, selectCartTotalAmount, selectCartTotalQuantity, selectCartProducts, SAVE_URL } from '../../redux/slice/CartSlice'
import { Link, useNavigate } from 'react-router-dom'
import { FaTrashAlt } from 'react-icons/fa'
import Card from '../../components/card/Card'
import { selectIsLoggedIn } from '../../redux/slice/AuthSlice'



const Cart = () => {
  const cartItems = useSelector(selectCartItems)
  const cartTotalAmount = useSelector(selectCartTotalAmount)
  var cartTotalQuantity = useSelector(selectCartTotalQuantity)
  var cartProducts = useSelector(selectCartProducts)
  const isLoggedIn = useSelector(selectIsLoggedIn) 

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const increaseCart =(cart)=>{
    dispatch(ADD_TO_CART(cart))
  }
  const decreaseCart =(cart)=>{
    dispatch(DECREASE_CART(cart))
  }
  const deleteItem = (cart)=>{
    dispatch(DELETE_PRODUCT(cart))
  }
  const clearCart = (cart)=>{
    dispatch(CLEAT_CART(cart))
  }
  useEffect(()=>{
    dispatch(SAVE_URL(''))      
    dispatch(CALCULATE_SUBTOTAL())
    dispatch(COUNT_ITEMS())  
  },[dispatch, cartItems])
  
  
    const checkout =()=>{
      if (isLoggedIn){
        navigate("/checkout-details")
      }
      else{
        dispatch(SAVE_URL(url))
        navigate('/login')
      }
    }
  const url = window.location.href;
  console.log("URL", url)
  // console.log('isLoggedIn',isLoggedIn)
  return (
    <section >
      <div className={`container ${styles.table}`}>
        <h2> Saved</h2>
        {cartItems.length <=0 ? (
          <>
            <p> Your cart is empty</p>
            <br/>
            <div>
              <Link to='/#products'>
                &larr; Continue Shopping
              </Link> 
            </div>
          </>
        ) : (
          <div>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Action</th>
                  
              </tr>
            </thead>
            <tbody>
              {cartItems.map((cart,index)=>{
                const {id, name, price, cartQuantity, imageURL} = cart
                return (
                  <tr key={id}>
                    <td>{index+1}</td>
                    <td>
                      <Link to={`/product-details/${id}`}>
                        <p>{name}</p>
                        <img src={imageURL} alt={name} style={{maxWidth:'140px', maxHeight:'100px'}}></img> 
                      </Link>
                    </td>
                    <td>{price}</td>
                    <td>
                      <div className={styles.count}>
                        <button className='--btn' onClick={()=>increaseCart(cart)}> + </button>
                        <b>{cartQuantity}</b>
                        <button className='--btn' onClick={()=>decreaseCart(cart)}> - </button>
                      </div>
                    </td>
                    <td>{(cartQuantity*price).toFixed(2)}</td>
                    <td><button style={{border:'none', cursor:'pointer'}} onClick={()=>deleteItem(cart)}><FaTrashAlt color='red' size={19}/></button></td>
                    {/* <td>{index+1}</td> */}
                  </tr>
                )
              })}

            </tbody>
          </table>

          <div className={styles.summary}>
              <button className='--btn --btn-danger' onClick={(cart)=>clearCart(cart)}> Clear Cart</button>
              <div className={styles.checkout}>
                <div>
                  <Link to='/#products' > &larr; Continue shopping</Link>
                </div>

                <Card cardClass={styles.card}>
                  {/* <p>{`Cart item(s): ${cartTotalQuantity}`}</p> */}
                  <p>{`${cartProducts} Product(s) & ${cartTotalQuantity} item(s) `}</p>
                  <div className={styles.text}>
                    <h4> Subtotal: <br/> </h4>
                    <h3>{`${cartTotalAmount.toFixed(2)}`}</h3>

                  </div>
                  {/* {isLoggedIn?
                  <Link to='/'> */}
                    {/* <button className='--btn --btn-primary --btn-block' onClick={()=>checkout()}> CHECKOUT</button> */}
                  {/* </Link>  
                  : 
                  <Link to='/login'><button className='--btn --btn-primary --btn-block'> Sign in to Checkout </button></Link>
                  } */}
                </Card>
              </div>
          </div>
          </div>
        )}
      </div>
      
    </section>
  )
}

export default Cart
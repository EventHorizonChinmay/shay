import React, { useState } from 'react'
import styles from './CheckoutDetails.module.scss'
import { Form, useNavigate } from 'react-router-dom'
import Card from '../../components/card/Card'
import { SAVE_BILLING_ADDRESS, SAVE_SHIPPING_ADDRESS } from '../../redux/slice/CheckoutSlice'
import { useDispatch } from 'react-redux'
const initialAddressState = {
    name:'',
    line1:'',
    line2:'',
    line3:'',
    city:'',
    state:'',
    postal_code:"",
    phone:'',
    
}

const CheckoutDetails = () => {

    const [billingAddress, setBillingAddress] = useState({...initialAddressState})
    const [shippingAddress, setShippingAddress] = useState({...initialAddressState})

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleShipping=(e)=>{
        const {name, value} = e.target
        setShippingAddress({...shippingAddress, [name]:value})
     }
    const handleBilling =(e)=>{
        const {name, value} = e.target
        setBillingAddress({...billingAddress, [name]:value})
        
    }
    const handleSubmit = (e)=>{
        e.preventDefault()
        // console.log(shippingAddress, billingAddress);
        dispatch(SAVE_BILLING_ADDRESS(billingAddress))
        dispatch(SAVE_SHIPPING_ADDRESS(shippingAddress))
        navigate('/checkout')


    }

  return (
    <section>
    <div className={`container ${styles.checkout}`}>
        <h2>Checkout Details</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <Card cardClass={styles.card}>
                <h3>
                    Shipping Address
                </h3>
                <label> Recipient Name</label>
                <input placeholder='Recipients name' name='name' value={shippingAddress.name} onChange={(e)=>handleShipping(e)} required></input>
                <label> Recipient Address line 1</label>
                <input placeholder='Recipients address line 1' name='line1' value={shippingAddress.line1} onChange={(e)=>handleShipping(e)} required></input>
                <label> Recipient Address line 2</label>
                <input placeholder='Recipients address line 2' name='line2' value={shippingAddress.line2} onChange={(e)=>handleShipping(e)} required></input>
                <label> Recipient Address line 3</label>
                <input placeholder='Recipients name' name='line3' value={shippingAddress.line3} onChange={(e)=>handleShipping(e)}></input>
                <label> City</label>
                <input placeholder='Recipients city' name='city' value={shippingAddress.city} onChange={(e)=>handleShipping(e)}></input>
                <label> State</label>
                <input placeholder='Recipients state' name='state' value={shippingAddress.state} onChange={(e)=>handleShipping(e)}></input>
                <label> Postal Code</label>
                <input placeholder='Pincode' name='postal_code' value={shippingAddress.postal_code} onChange={(e)=>handleShipping(e)}></input>
                <label> Phone Number</label>
                <input placeholder='Phone number' name='phone' value={shippingAddress.phone} onChange={(e)=>handleShipping(e)}></input>


            </Card>
            
            <Card cardClass={styles.card}>
                <h3>
                    Billing Address
                </h3>
                <label> Recipient Name</label>
                <input placeholder='Recipients name' name='name' value={billingAddress.name} onChange={(e)=>handleBilling(e)} required></input>
                <label> Recipient Address line 1</label>
                <input placeholder='Recipients address line 1' name='line1' value={billingAddress.line1} onChange={(e)=>handleBilling(e)} required></input>
                <label> Recipient Address line 2</label>
                <input placeholder='Recipients address line 2' name='line2' value={billingAddress.line2} onChange={(e)=>handleBilling(e)} required></input>
                <label> Recipient Address line 3</label>
                <input placeholder='Recipients name' name='line3' value={billingAddress.line3} onChange={(e)=>handleBilling(e)}></input>
                <label> City</label>
                <input placeholder='Recipients city' name='city' value={billingAddress.city} onChange={(e)=>handleBilling(e)}></input>
                <label> State</label>
                <input placeholder='Recipients state' name='state' value={billingAddress.state} onChange={(e)=>handleBilling(e)}></input>
                <label> Postal Code</label>
                <input placeholder='Pincode' name='postal_code' value={billingAddress.postal_code} onChange={(e)=>handleBilling(e)}></input>
                <label> Phone Number</label>
                <input placeholder='Phone number' name='phone' value={billingAddress.phone} onChange={(e)=>handleBilling(e)}></input>

                <button type='submit'className='--btn --btn-primary'>Proceed to checkout</button>
            </Card>


        </div>

        </form>
        </div>
    </section>
  )
}

export default CheckoutDetails
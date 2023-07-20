import React, { useState } from 'react'
import styles from './auth.module.scss'

import ResetImg from '../../assets/forgot.png'
import { Link } from 'react-router-dom'
import Card from '../../components/card/Card'
import { sendPasswordResetEmail } from 'firebase/auth'
import { toast } from 'react-toastify'
import { auth } from '../../firebase/config'
import Loader from '../../components/loader/Loader'


const Reset = () => {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  
  const resetPassword = (e) => {
    e.preventDefault();

    setIsLoading(true)
    sendPasswordResetEmail(auth, email).then(()=>{
      toast.success('Check your email for a reset link')
      setIsLoading(false)
    })
    .catch((error)=>{
      setIsLoading(false)
      toast.error(error.message)
    })
  }
  return (
    <>
    {isLoading && <Loader/>}
    <section className={`container ${styles.auth}`}>
    <div className={styles.img}>
        <img src={ResetImg} alt='' width={500}></img>
    </div>
    
    <Card>
    <div className={styles.form}>
        <h2> Reset Password</h2>
        
        <form>
            <input placeholder='Email' type='email' required  onChange={(e)=> setEmail(e.target.value)}/>
            {/* <input placeholder='Password ' type='password' required/> */}
            {/* <input placeholder='Confirm password' type='password' required/> */}
            <button className='--btn --btn-primary --btn-block' onClick={resetPassword}> Reset Password </button>
            
            <span className={styles.links}>
                {/* <p>Already have an account?</p> */}
                <p><Link to='/login'>-Login-</Link></p>
                <p><Link to='/register'>-Register-</Link></p>
                
            </span>

        </form>
        

    </div>
    </Card>
    </section>
    </>
  )
}
export default Reset
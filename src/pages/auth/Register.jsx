import React, { useState } from 'react'
import styles from './auth.module.scss'

import RegisterImg from '../../assets/register.png'
import { Link } from 'react-router-dom'
// import { FaGoogle } from 'react-icons/fa'
import Card from '../../components/card/Card'

import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import {createUserWithEmailAndPassword} from 'firebase/auth'
import {auth } from "../../firebase/config"
import Loader from '../../components/loader/Loader'
import { useNavigate } from 'react-router-dom'


const Register = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [cPassword, setCPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()
    const registerUser=(e)=>{
        e.preventDefault()
        if (password !== cPassword){
            toast.error("Passwords don't match")
        }
        setIsLoading(true)
    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in    
    const user = userCredential.user;
    // ...
    console.log(user)
    setIsLoading(false)
    toast.success("Registration Successful!")
    navigate("/login")
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    toast.error(errorCode, ':', errorMessage)
    setIsLoading(false)
    // ..
  });


    }
  return (
    <>
    <ToastContainer/>
    {isLoading && <Loader/>}
    <section className={` container ${styles.auth}`}>
    <div className={styles.img}>
        <img src={RegisterImg} alt='' width={500}></img>
    </div>
    
    <Card>
    <div className={styles.form}>
        <h2> Register</h2>
        
        <form onSubmit={registerUser}>
            <input placeholder='Email' type='email' required value={email} onChange={(e)=> setEmail(e.target.value)}/>
            <input placeholder='Password ' type='password' required value={password} onChange={(e)=> setPassword(e.target.value)}/>
            <input placeholder='Confirm password' type='password' required value={cPassword} onChange={(e)=> setCPassword(e.target.value)}/>
            <button className='--btn --btn-primary --btn-block' type='submit'> Register </button>
            <div className={styles.links}>
                <Link to='/reset'> Reset Password </Link>
            </div> 

            <span className={styles.register}>
                <p>Already have an account?</p>
                <Link to='/login'>Login</Link>
            </span>

        </form>
        

    </div>
    </Card>
    </section>
    </>
  )


}
export default Register
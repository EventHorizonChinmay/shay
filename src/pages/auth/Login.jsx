import {useState} from 'react'
import styles from './auth.module.scss'
import LoginImg from '../../assets/login.png'
import { Link, useNavigate } from 'react-router-dom'
import { FaAlignJustify, FaGoogle } from 'react-icons/fa'
import Card from '../../components/card/Card'
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { auth } from '../../firebase/config'
import {ToastContainer, toast } from 'react-toastify'
import Loader from '../../components/loader/Loader'
import { useSelector } from 'react-redux'
import { selectPreviousURL } from '../../redux/slice/CartSlice'


const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const previousURL = useSelector(selectPreviousURL)
    const redirect =()=>{
      if (previousURL.includes('cart')){
        return navigate("/cart")
      }
      else{
        return navigate("/")
      }
    }
    const loginUser = (e) =>{
        e.preventDefault();
        setIsLoading(true)
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // const user = userCredential.user;
                setIsLoading(false)
                toast.success('Logged in Successfully!')
                navigate('/')
            })
            .catch((error) => {
                setIsLoading(false)
                const errorCode = error.code;
                const errorMessage = error.message;
                toast.error(errorCode,  errorMessage)
                
            });

    }

    //Login with Google 
    const provider = new GoogleAuthProvider()
    const signInWithGoogle =() =>{
        signInWithPopup(auth, provider)
  .then((result) => {
    // const user = result.user;
    toast.success("Logged in Successfully!")
    redirect()
  }).catch((error) => {
    toast.error(error.message)
  });
    }


  return (
    <><ToastContainer/>
    {isLoading && <Loader/>}
    <section className={` container ${styles.auth}`}>
    <div className={styles.img}>
        <img src={LoginImg} alt='' width={500}></img>
    </div>
    
    <Card>
    <div className={styles.form}>
        <h2> Login</h2>
        
        <form onSubmit={loginUser}>
            <input placeholder='Email' type='email' required value={email} onChange={(e)=> setEmail(e.target.value)}/>
            <input placeholder='Password' type='password' required value={password} onChange={(e)=> setPassword(e.target.value)}/>
            <button type='submit' className='--btn --btn-primary --btn-block'>Login</button>
            <div className={styles.links} style={{width:'100%', }}> 
                <Link to='/reset' style={{textAlign:'end' , justifyContent:'end'}}> Forgot Password? </Link>
            </div> 

            <p> -- or -- </p>

            <button className='--btn --btn-danger --btn-block' onClick={signInWithGoogle}> <span><FaGoogle color='#fff'/></span> <span> </span>  Login with Google</button>

            <span className={styles.register}>
                <p>Don't have an account?</p>
                <Link to='/register'>Register</Link>
            </span>

        </form>
        

    </div>
    </Card>
    </section></>

  )
}

export default Login
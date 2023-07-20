import React from 'react'
import { useSelector } from 'react-redux'
import { selectEmail } from '../../redux/slice/AuthSlice'
import { Link } from 'react-router-dom'

const AdminOnlyRoute = ({children}) => {
    const userEmail =useSelector(selectEmail)
    // console.log(userEmail)
    // if (userEmail ==='chinmay.g2022@gmail.com'){
    if (userEmail){
        // console.log(userEmail);
        
        return children
    }
    return (
        <section style={{height: "80vh"}}>
            <div className='container'>
                <h2> Permission Denied </h2>
                <p> This content is only accessible to admin users.</p>
                <Link to='/'>
                <button className='--btn '> &larr; Back to Home</button>
                </Link>
            </div>
        </section>
    )
}

export const AdminOnlyLink = ({children}) => {
    const userEmail =useSelector(selectEmail)
    // console.log(userEmail)
    // if (userEmail ==='chinmay.g2022@gmail.com'){
    if (userEmail){

        return children
    }
    // }
    return null
}

export default AdminOnlyRoute

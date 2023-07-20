import React, { useEffect, useState } from 'react'
import styles from './ViewProducts.module.scss'
import { toast } from 'react-toastify'
import { collection, deleteDoc, doc, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import { db, storage } from '../../../firebase/config'
import { Link } from 'react-router-dom'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import Loader from '../../loader/Loader'
import { deleteObject, ref } from 'firebase/storage'
import Notiflix from 'notiflix'
import { useDispatch, useSelector } from 'react-redux'
import { STORE_PRODUCTS, selectProducts } from '../../../redux/slice/ProductSlice'
import useFetchCollection from '../../../customHooks/useFetchCollection'
import { selectEmail, selectUserId } from '../../../redux/slice/AuthSlice'


const ViewProducts = () => {
  const userID  = useSelector(selectEmail)
  console.log('sellerID', userID  )
  const {data , isLoading} = useFetchCollection('products') // returns data and isLoading
  // const [products, setProducts] = useState([])
  const products = useSelector(selectProducts)
  // const [isLoading, setIsLoading] = useState(false) 
  const [deleteConfirmation, setDeleteConfirmation] = useState(false)
  const [wantToDelete, setWantToDelete] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(STORE_PRODUCTS({
      products: data,
    }))
  })

  // useEffect(() => {
  //   getProducts()
  // },[])


  //   const getProducts =()=>{
  //   setIsLoading(true)
  //   try{
  //     const productsRef = collection(db, "products");
  //     const q = query(productsRef, orderBy("firebaseEntryTime",'desc'));
  //     onSnapshot(q, (querySnapshot) => {
  //       // console.log(querySnapshot.docs)
  //       const allProducts = querySnapshot.docs.map((doc)=>(
  //         {
  //           id: doc.id,
  //           ...doc.data()
  //         }
  //       ))
  //       // console.log(allProducts)
  //       setProducts(allProducts)
  //       setIsLoading(false)
  //       dispatch(
  //         STORE_PRODUCTS({
  //           products: allProducts, // products is the key
  //         })
  //         )
  //     });

  //   }catch(err){
  //     setIsLoading(false)
  //     toast.error(err.message)
  //   }
  //   }


  const confirmDelete=(id, imageURL)=>{
    Notiflix.Confirm.show(
      'Delete Product',
      'You are about the delete the product, are you sure?',
      'Delete',
      'Cancel',
      function okCb() {
        deleteProduct(id, imageURL)
        alert('Product Delisted...');
      },
      function cancelCb() {
        alert('Retained..');
      },
      {
        width: '320px',
        borderRadius: '4px',
        titleColor:'orangered',
        okButtonBackground:"orangered",
        cssAnimationStyle:'zoom'
        // etc...
      },
    );
  }
  const deleteProduct=async(id, imageURL)=>{
    if(window.confirm('Are you sure you want to delete this component?')){
    try{
      setDeleteConfirmation(true)
      setWantToDelete(true)
      if (wantToDelete ===true){//to delete DB entry
      await deleteDoc(doc(db, "products", id));
      //to delete image file:
      try{
      const storageRef = ref(storage, imageURL);
      await deleteObject(storageRef)
        }catch(err){
        toast.error('Image Not Found')
      }
      toast.success('Product deleted successfully')}
    }catch(err){
      setWantToDelete(false)
      toast.error(err.message)
    }
    }

  }
  return (
    <>
    {isLoading && <Loader/>}
    <div className={styles.table}>
    <h2>All Products</h2>
      {products.length ===0? (<p> No Products Found.</p>) : (
        <table>
        <thead>
          <tr>
            <th>#</th>
            <th> Image</th>
            <th> Name/Brand </th>
            <th> Category </th>
            <th> Price</th>
            <th> Seller </th>
            <th> New/Reselling</th>
            <th> Quantity Available</th>
            <th> Actions </th>
            {/* <th> </th>
            <th> </th>
            <th> </th> */}
          </tr>
          </thead> 
          {products.map((product, index)=>{
            const {id, name, brand, price, imageURL, category, sellerName, availablity, sellerAddress, sellerContact, yearsSinceBought, sellerID} = product
            if(userID==='chinmay.g2022@gmail.com'){
              return(
              <tr key={id}>
                <td> {index+1} </td>
                <td>
                  <img src={imageURL} alt={name} style={{maxWidth:'100px', height:'100px'}}/>
                </td>
                <td>
                  {name}
                  <p>{brand}</p>
                </td>
                <td>
                  {category}
                </td>
                <td>
                {`\u20B9${price}`} 
                </td>
                <td>
                  {sellerName} <b>;</b> &nbsp; {sellerAddress} <b>;</b> &nbsp; {sellerContact}
                </td>
                <td>
                  {yearsSinceBought >0 ? 'Re-sell' : "New"}
                </td>
                <td>
                  {availablity}
                </td>
                <td>
                  <Link to={`/admin/add-product/${id}`}>
                    <FaEdit size={20} color='green'/></Link>
                  &nbsp;
                  <FaTrashAlt size={20} color='red' onClick={()=>confirmDelete(id,imageURL)
                  // deleteProduct(id, imageURL)
                  }/>
                </td>
              </tr>
            )
            }
            if(userID.includes(sellerID)){            
            return(
              <tr key={id}>
                <td> {index+1} </td>
                <td>
                  <img src={imageURL} alt={name} style={{maxWidth:'100px', height:'100px'}}/>
                </td>
                <td>
                  {name}
                  <p>{brand}</p>
                </td>
                <td>
                  {category}
                </td>
                <td>
                {`\u20B9${price}`} 
                </td>
                <td>
                  {sellerName} <b>;</b> &nbsp; {sellerAddress} <b>;</b> &nbsp; {sellerContact}
                </td>
                <td>
                  {yearsSinceBought >0 ? 'Re-sell' : "New"}
                </td>
                <td>
                  {availablity}
                </td>
                <td>
                  <Link to={`/admin/add-product/${id}`}>
                    <FaEdit size={20} color='green'/></Link>
                  &nbsp;
                  <FaTrashAlt size={20} color='red' onClick={()=>confirmDelete(id,imageURL)
                  // deleteProduct(id, imageURL)
                  }/>
                </td>
              </tr>
            )


          }
          })}
        </table>
      )}
    </div>
    </>)
}

export default ViewProducts
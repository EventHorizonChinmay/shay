import React, { useState } from 'react'
import styles from './AddProduct.module.scss'
import Card from '../../card/Card'
import { ToastContainer, toast } from 'react-toastify'
import  {deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { db, storage } from '../../../firebase/config'
import { Timestamp, addDoc, collection, doc, setDoc } from 'firebase/firestore'
import { useNavigate, useParams } from 'react-router-dom'
import Loader from '../../loader/Loader'
import { useSelector } from 'react-redux'
import { selectProducts } from '../../../redux/slice/ProductSlice'
import { selectEmail, selectUserId } from '../../../redux/slice/AuthSlice'


const categories = [
  {id:1, name:'Furniture'},
  {id:2, name:"Electrical/Electronics"},
  {id:3, name:"Food items"},
  {id:4, name:"Sports"},
  {id:5, name:"Luggage"},
  {id:6, name:"Lifestyle (Apparels)"},
  {id:7, name:"Decoration"},
  {id:8, name:"Others"},
  
]

const initialState = {
  availablity:1,
  name:'',
  original_cost: '',
  yearsSinceBought: '',
  imageURL: '',
  price:  '',
  category: '',
  brand: '',
  keywords:'',
  desc: '',
  sellerName:'',
  sellerID:'',
  sellerContact:'',
  sellerAddress:'',
  type:''
}
const AddProduct = () => {

  const [prodType, setProdType] = useState("")
  const sellerEmail = useSelector(selectEmail)
  const sellerID = sellerEmail.slice(0,sellerEmail.indexOf('@'))

  const {id} =useParams()
  // console.log(id)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const [payment,setPayment] = useState(false)

  const products = useSelector(selectProducts)
  // console.log('products: ',products)
  const productEdit = products.find((item)=> item.id===id)
  // console.log(productEdit)
  function detectForm(id, f1, f2){ // check if adding the product first time (f1) or editting it
    if(id==='ADD'){
      return f1 //f1 f2 can be anything a function a string or anything else
    }
    else  return f2
  }
  const makePayment =()=>{
    return
  }

  const [product, setProduct] = useState(()=>{
    const newState =detectForm(id, {...initialState},productEdit)
    return newState
  }
    // {...initialState,
    // name:'',
    // original_cost: null,
    // yearsSinceBought: null,
    // imageURL: '',
    // price:  null,
    // category: '',
    // keywords:'',
    // brand: '',
    // desc: '',
    // sellerName:'',
    // sellerContact:'',
    // sellerAddress:'',
  // }
  )
  
const handleInputChange = (e) => {
  try{
  const {name, value}=e.target //destructures the e.target
    setProduct({...product, [name]:value})// frst get value of prev obj and is updated with current state . Name is updated on base of value
  }catch(err){
    toast.error(err.message)
  }
  }
  const handleImageChange = (e) => {
    try{


    const file = e.target.files[0]
    // console.log("THIS IS THE FULE", file)
    // console.log(file)
    const storageRef = ref(storage, `ShMymarket/${Date.now()}${file.name}`)
    const uploadTask = uploadBytesResumable(storageRef, file);
    

    // Register three observers:
// 1. 'state_changed' observer, called any time the state changes
// 2. Error observer, called on failure
// 3. Completion observer, called on successful completion
uploadTask.on('state_changed', 
(snapshot) => {
  // Observe state change events such as progress, pause, and resume
  // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
  const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  console.log('Upload is ' + progress + '% done');
  setUploadProgress(progress)
}, 
(error) => {
  toast.error(error.message)
}, 
() => {
  // Handle successful uploads on complete
  // For instance, get the download URL: https://firebasestorage.googleapis.com/...
  getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    // console.log('File available at', downloadURL);
    setProduct({...product, imageURL:downloadURL})
    toast.success("Image uploaded successfully")
  });
}
);
}catch(err){
  toast.error(err.message)
}
  }

  const  addProduct =(e) =>{
    e.preventDefault()
    // console.log(product)
    setIsLoading(true)

  try{
    const uploadDate = Date.now()
    const docRef = addDoc(collection(db, "products"), {
      availablity: product.availablity,
      name: product.name,
      imageURL: product.imageURL,
      original_cost: +(product.yearsSinceBought? product.original_cost:0),
      yearsSinceBought: +(product.yearsSinceBought? product.yearsSinceBought:0),
      price: +product.price,
      keywords: product.keywords,      
      category: product.category,
      brand: product.brand,
      desc: product.desc,
      sellerContact: product.sellerContact,
      sellerName: product.sellerName,
      sellerAddress: product.sellerAddress,
      firebaseEntryTime: Timestamp.now().toDate(),
      frontToBackDelay: Timestamp.now().toDate()-uploadDate ,
      sellerID: sellerID,
      type:prodType,
      rent_sell: selectedPropOption,



    });
    setIsLoading(false)
    toast.success("Product Uploaded Successfully.")
    setUploadProgress(0)
    setProduct({...initialState})
    navigate('/admin/all-products')
  } catch(err){
    setIsLoading(false)
    toast.error(err.message)

  }
  }


  const editProduct = (e) =>{
    e.preventDefault()
    setIsLoading(true)

    if (product.imageURL !== productEdit.imageURL){
      const storageRef = ref(storage, productEdit.imageURL);
      deleteObject(storageRef)  
    }
    try{
      setDoc(doc(db,'products', id ),{ //id comes from params
        availablity: product.availablity,
        name: product.name,
        imageURL: product.imageURL,
        original_cost: +(product.yearsSinceBought? product.original_cost:0),
        yearsSinceBought: +(product.yearsSinceBought? product.yearsSinceBought:0),
        price: +product.price,
        keywords: product.keywords,
        category: product.category,
        brand: product.brand,
        desc: product.desc,
        sellerContact: product.sellerContact,
        sellerName: product.sellerName,
        sellerAddress: product.sellerAddress,
        firebaseEntryTime: productEdit.firebaseEntryTime,
        frontToBackDelay: productEdit.frontToBackDelay,
        editedAt: Timestamp.now().toDate(),
        sellerID,
        type: prodType,
        rent_sell: selectedPropOption,
        })
      setIsLoading(false)
      toast.success('Product Edited Successfully!')
      navigate('/admin/all-products')
      //Here the previous image is still there in firestore, we need to delete it separately hennce the above if condition is added

    }catch(err){
      setIsLoading(false)
      toast.error(err.message)
    }
  }
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedProdOption, setSelectedProdOption] = useState('');
  const [selectedPropOption, setSelectedPropOption] = useState('');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    // console.log(event.target.value)
  };
  const handleProdOptionChange = (event) => {
    setSelectedProdOption(event.target.value);
    setProdType(event.target.value.slice(0,7))
    // console.log(event.target.value)
  };
  const handlePropOptionChange = (event) => {
    setSelectedPropOption(event.target.value);
    // console.log(event.target.value)
  };
  

  const star=()=>{
    return (<span style={{color:'red'}}>*</span>)
  }

  return (
    <>
    {isLoading && <Loader/>}
    <ToastContainer/>
    <div className={styles.product}>
      <h2> {detectForm(id, 'Add New Product', 'Edit Product Details' )}</h2>

      <div style={{width:'50%', display:'flex', justifyContent:'space-evenly', textAlign:'center', margin:'auto'}}>
        <div className='item' style={{display:'flex'}}> 
          <p>Item </p> <input type='radio' value='item' name='item_property'
          checked={selectedProdOption === 'item'}
          onChange={handleProdOptionChange}
          ></input>
        </div>

        <div className='property' style={{display:'flex'}}> 
          <p>Property</p><input type='radio' 
          value='property'
          name='item_property' 
          onChange={handleProdOptionChange}
          />
        </div>
      </div>

      {selectedProdOption.includes('item') ? 
      <Card cardClass={styles.card}>
        <form onSubmit={detectForm(id, addProduct, editProduct)}>
        
        {/* PRODUCT NAME */}
          <label> Product Name: {star()}</label>
          <input type="text" 
          placeholder='Product Name' 
          required name='name' 
          value={product.name} 
          onChange={(e)=>{handleInputChange(e)}}/>


                              {/* NEW OR OLD PRODUCT */}
          {/* <label>New product or is it out for reselling? {star()} </label> */}
          <Card>
            <label> New/Re-sell: {star()}</label>
            <div style={{width:'50%', display:'flex', justifyContent:'space-evenly', textAlign:'center', margin:'auto'}}>
              <div className='new' style={{display:'flex'}}> 
                <p>New </p> <input type='radio' value='new' name='old_new'
                checked={selectedOption === 'new'}
                onChange={handleOptionChange}
                ></input>
              </div>

              <div className='old' style={{display:'flex'}}> 
                <p>Re-sell</p><input type='radio' 
                value='old'
                name='old_new' 
                onChange={handleOptionChange}
                />
              </div>
            </div>
            {selectedOption === 'old' && (
        <div>

          <label> How many years back was the product first bought? {star()}</label> 
          {/* <label> (Leave it empty if the product is new)</label> */}
          <input type='number' placeholder='in year/s' required
            name='yearsSinceBought' 
            value={product.yearsSinceBought} 
            onChange={(e)=>{handleInputChange(e)}}   />


            {/* ORGINAL PRICE */}
            <label> Price when it was first bought: {star()}</label>
            <input type='number' placeholder='' required
            name='original_cost'
            value={product.original_cost} 
            onChange={(e)=>{handleInputChange(e)}}  /> 

        </div>
        
      )}
      <br/>
          </Card>

          {/* PRODUCT IMAGE */}
          <label> Product Image: {star()}</label>
          <Card cardClass={styles.group}>
          {uploadProgress===0 ? null : (<div className={styles.progress}>

              <div className={styles['progress-bar']} style={{width:`${uploadProgress}%`}}>
              {(uploadProgress<100 && uploadProgress>0) ? 'Uploading ' : 'Uploaded '} {Math.floor(uploadProgress*10)/10}% 
              </div>
            </div>)}
          <input type='file' accept='image/*' name='Image' placeholder='Product Image' onChange={(e)=>handleImageChange(e)}></input>
          {product.imageURL === '' ? null : (
          <input type='text' 
          // required 
          placeholder='Image URL'
          name='imageURL' value={product.imageURL} disabled/>
          )}
          </Card>
      <br/>

            

            {/* PRICE */}
          <label> Price: {star()}</label>
          <input type="number"
           placeholder='Product Price' required 
           name='price' 
           value={product.price} 
           onChange={(e)=>{handleInputChange(e)}}/>
          
          {/* CATEGORY */}
          <label> Product Category: {star()}</label>
          <select required name='category' value={product.category} onChange={(e)=>handleInputChange(e)}>
            <option value = '' disabled>
              -- Choose Product Category --
            </option>
            {categories.map((cat)=>{return(
              <option key={cat.id}  value={cat.name}>
                {cat.name}
              </option>
            )})}
            </select>

              {/* BRAND/ COMPANY */}
              <label> Product Brand/Company: {star()}</label>
            <input type="text" placeholder='Product brand' required name='brand' value={product.brand} onChange={(e)=>{handleInputChange(e)}}/>

            <label> Product Description: {star()}</label>
            <textarea name='desc' cols='30' rows='15' required value={product.desc} onChange={(e)=>{handleInputChange(e)}}></textarea> 

                            {/* BRAND/ COMPANY */}
            <label> Quantity in Stock: {star()}</label>
            <input type="number" placeholder='Availability' required name='availablity' value={product.availablity} onChange={(e)=>{handleInputChange(e)}}/>


            {/* Keywords */}
            <label> Relevant keywords (for quicker response): </label>
            <input type='text' 
            placeholder='Eg. organiser, cleanliness, decoration etc'
            name='keywords'
            value={product.keywords}
              onChange={(e)=>{handleInputChange(e)}}
            />

            {/* seller Info */}
            <label> Seller Name: {star()} </label>
            <input type='text' 
            placeholder='Seller Name'
            name='sellerName'
            required
            value={product.sellerName}
              onChange={(e)=>{handleInputChange(e)}}
            />
            <label> Seller Contact Number: {star()} </label>
            <input type='text' 
            placeholder='Phone Number'
            name='sellerContact'
            required
            value={product.sellerContact}
              onChange={(e)=>{handleInputChange(e)}}
            />

            <label> Seller Address: {star()} </label>
            <input type='text' 
            placeholder='Flat No., Wing No., Society.'
            name='sellerAddress'
            required
            value={product.sellerAddress}
              onChange={(e)=>{handleInputChange(e)}}
            />
            

            {detectForm(id, (<><button className='--btn --btn-primary' onClick={()=>makePayment()}>Pay Ad fee</button></>), '')}
            {payment&&
            <button className='--btn --btn-primary' type='submit'>
              {detectForm(id, "Save Product", "Save Edits")}
            </button>}
          
        </form>
      </Card>:

      <Card>
      <form onSubmit={detectForm(id, addProduct, editProduct)}>
        
        {/* PROPERTY TYPE */}
          <label> Property type: {star()}</label>
          <input type="text" 
          placeholder='n BHK, Row house/Flat/Penthouse' 
          required name='name' 
          value={product.name} 
          onChange={(e)=>{handleInputChange(e)}}/>


                              {/* NEW OR OLD PRODUCT */}
          {/* <label>New product or is it out for reselling? {star()} </label> */}
          <Card>
            <label> Rent/Sell: {star()}</label>
            <div style={{width:'50%', display:'flex', justifyContent:'space-evenly', textAlign:'center', margin:'auto'}}>
              <div className='rent' style={{display:'flex'}}> 
                <p>Rent </p> <input type='radio' value='rent' name='rent_sell'
                checked={selectedPropOption === 'rent'}
                onChange={handlePropOptionChange}
                ></input>
              </div>

              <div className='sell' style={{display:'flex'}}> 
                <p>Sell</p><input type='radio' 
                value='sell'
                name='rent_sell' 
                onChange={handlePropOptionChange}
                />
              </div>
            </div>
            {selectedPropOption === '' && (
        <div>

          {/* <label> How many years back was the product first bought? {star()}</label>  */}
          {/* <label> (Leave it empty if the product is new)</label> */}
          {/* <input type='number' placeholder='in year/s' required */}
            {/* name='yearsSinceBought'  */}
            {/* value={product.yearsSinceBought}  */}
            {/* onChange={(e)=>{handleInputChange(e)}}   /> */}


            {/* ORGINAL PRICE */}
            {/* <label> Price when it was first bought: {star()}</label>
            <input type='number' placeholder='' required
            name='original_cost'
            value={product.original_cost} 
            onChange={(e)=>{handleInputChange(e)}}  />  */}

        </div>
        
      )}
      <br/>
          </Card>

          {/* PROPERTY IMAGE */}
          <label> Property Image: {star()}</label>
          <Card cardClass={styles.group}>
          {uploadProgress===0 ? null : (<div className={styles.progress}>

              <div className={styles['progress-bar']} style={{width:`${uploadProgress}%`}}>
              {(uploadProgress<100 && uploadProgress>0) ? 'Uploading ' : 'Uploaded '} {Math.floor(uploadProgress*10)/10}% 
              </div>
            </div>)}
          <input type='file' accept='image/*' name='Image' placeholder='Product Image' onChange={(e)=>handleImageChange(e)}></input>
          {product.imageURL === '' ? null : (
          <input type='text' 
          // required 
          placeholder='Image URL'
          name='imageURL' value={product.imageURL} disabled/>
          )}
          </Card>
      <br/>

            

            {/* PRICE */}
          <label> Rent/Price: {star()}</label>
          <input type="number"
           placeholder='Rent (per month) / Price' required 
           name='price' 
           value={product.price} 
           onChange={(e)=>{handleInputChange(e)}}/>
          
          {/* CATEGORY */}
          {/* <label> Product Category: {star()}</label>
          <select required name='category' value={product.category} onChange={(e)=>handleInputChange(e)}>
            <option value = '' disabled>
              -- Choose Product Category --
            </option>
            {categories.map((cat)=>{return(
              <option key={cat.id}  value={cat.name}>
                {cat.name}
              </option>
            )})}
            </select> */}

              {/* BRAND/ COMPANY */}
              <label> Carpet Area: {star()}</label>
            <input type="number" placeholder='in sq feet' required name='brand' value={product.brand} onChange={(e)=>{handleInputChange(e)}}/>

            <label> Property Description: {star()}</label>
            <textarea name='desc' cols='30' rows='15' required value={product.desc} onChange={(e)=>{handleInputChange(e)}}></textarea> 

                            {/* BRAND/ COMPANY */}
            {/* <label> Quantity in Stock: {star()}</label>
            <input type="number" placeholder='Availability' required name='availablity' value={product.availablity} onChange={(e)=>{handleInputChange(e)}}/> */}

            
              
              
            {/* Keywords */}
            <label> Relevant keywords (for quicker response): </label>
            <input type='text' 
            placeholder='Eg. organiser, cleanliness, decoration etc'
            name='keywords'
            value={product.keywords}
              onChange={(e)=>{handleInputChange(e)}}
            />

            {/* seller Info */}
            <label> Seller Name: {star()} </label>
            <input type='text' 
            placeholder='Seller Name'
            name='sellerName'
            required
            value={product.sellerName}
              onChange={(e)=>{handleInputChange(e)}}
            />
            <label> Seller Contact Number: {star()} </label>
            <input type='text' 
            placeholder='Phone Number'
            name='sellerContact'
            required
            value={product.sellerContact}
              onChange={(e)=>{handleInputChange(e)}}
            />

            <label> Seller Address: {star()} </label>
            <input type='text' 
            placeholder='Flat No., Wing No., Society.'
            name='sellerAddress'
            required
            value={product.sellerAddress}
              onChange={(e)=>{handleInputChange(e)}}
            />
            

            {detectForm(id, (<><button className='--btn --btn-primary' onClick={()=>makePayment()}>Pay Ad fee</button></>), '')}
            {payment&&
            <button className='--btn --btn-primary' type='submit'>
              {detectForm(id, "Save Product", "Save Edits")}
            </button>}
          
        </form>
      </Card>}
    </div>
    
    </>
    )
}

export default AddProduct
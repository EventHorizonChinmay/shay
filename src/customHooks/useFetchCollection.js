import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../firebase/config'
import { toast } from 'react-toastify'

const useFetchCollection = (collectionName) => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false) 
    
    const getCollection =()=>{
        setIsLoading(true)
        try{
          const docRef = collection(db, collectionName);
          const q = query(docRef, orderBy("firebaseEntryTime",'desc'));
          onSnapshot(q, (querySnapshot) => {
            // console.log(querySnapshot.docs)
            const allData = querySnapshot.docs.map((doc)=>(
              {
                id: doc.id,
                ...doc.data()
              }
            ))
            // console.log(allData)
            setData(allData)
            setIsLoading(false)
            
          });
    
        }catch(err){
          setIsLoading(false)
          toast.error(err.message)
        }
      }
      useEffect(()=>{
          getCollection()
        },[])
        return {data,isLoading}
}

export default useFetchCollection
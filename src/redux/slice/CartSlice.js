import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';

const initialState = {
    cartItems:localStorage.getItem("cartItems")? JSON.parse(localStorage.getItem("cartItems")): [],
    cartTotalQuantity:0,
    cartTotalAmount:0,
    cartProducts:0,
    previousURL:'',
}

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    ADD_TO_CART(state,action){
        // console.log(action.payload)
        const productIndex = state.cartItems.findIndex((item)=> item.id===action.payload.id)

        if(productIndex>-1){ //ITem already in cart
            //Increase cartQty
            if(state.cartItems[productIndex].cartQuantity<action.payload.availablity){

                state.cartItems[productIndex].cartQuantity ++
                toast.info(`Another ${action.payload.name} added to the cart!`,{position:'top-left'})
            }
            else toast.error(`Sorry, stock only contains ${action.payload.availablity} of ${action.payload.name}; There is/are ${state.cartItems[productIndex].cartQuantity} already in the cart`,{position:"top-left"})
        }else{  //Item not in cart
            // ADd item to cart
            const tempProduct ={...action.payload, cartQuantity:1}
            state.cartItems.push(tempProduct)
            toast.info(`${action.payload.name} added to the cart!`,{position:'top-left'})
        }
        // Save cart to Local storage
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
    },
    DECREASE_CART(state, action){
        const productIndex = state.cartItems.findIndex((item)=> item.id===action.payload.id)
        if (state.cartItems[productIndex].cartQuantity>1){
            state.cartItems[productIndex].cartQuantity--
            toast.info(`A ${action.payload.name} removed from the cart!`,{position:'top-left'})
        }
        else if (state.cartItems[productIndex].cartQuantity===1){
            const newCartItem = state.cartItems.filter((item)=>item.id !== action.payload.id)
            state.cartItems = newCartItem
            toast.info(`${action.payload.name} removed from the cart!`,{position:'top-left'})
        }
    },
    DELETE_PRODUCT(state, action){
        const productIndex = state.cartItems.findIndex((item)=> item.id===action.payload.id)
        if (state.cartItems[productIndex].cartQuantity>0){
            const newCartItem = state.cartItems.filter((item)=>item.id !== action.payload.id)
            state.cartItems = newCartItem
            toast.info(`${action.payload.name} deleted from the cart!`,{position:'top-left'})
        }
        else{
            toast.error("Product not in the cart!")
        }
    },
    CLEAT_CART(state, action){
        state.cartItems = []
        toast.success('You have succesfully emptied the cart. Shop for more!')
    },
    CALCULATE_SUBTOTAL(state, action){
        const subTotalArr = []
        state.cartItems.forEach((element) =>{
            const {price, cartQuantity} = element
            const cartItemAmount = price*cartQuantity
            return subTotalArr.push(cartItemAmount)
        })
        const totalAmount = subTotalArr.reduce((a,b)=> {return a+b});
        state.cartTotalAmount=totalAmount
    },
    COUNT_ITEMS(state, action){
        var totalItems = []
        state.cartItems.forEach((item)=>{
            return totalItems.push(item.cartQuantity)
            
        })
        state.cartTotalQuantity=totalItems.reduce((a,b)=>{return a+b})
        state.cartProducts = state.cartItems.length
    },
    SAVE_URL(state, action){
        state.previousURL = action.payload
    },
  }
});

export const {ADD_TO_CART, DECREASE_CART, DELETE_PRODUCT, CLEAT_CART, CALCULATE_SUBTOTAL, COUNT_ITEMS, SAVE_URL} = CartSlice.actions
export const selectCartItems = (state) =>state.cart.cartItems
export const selectCartTotalQuantity = (state) =>state.cart.cartTotalQuantity
export const selectCartTotalAmount = (state) =>state.cart.cartTotalAmount
export const selectCartProducts = (state) =>state.cart.cartProducts
export const selectPreviousURL = (state)=> state.cart.previousURL


export default CartSlice.reducer
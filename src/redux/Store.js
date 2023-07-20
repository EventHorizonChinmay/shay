import {configureStore, combineReducers} from '@reduxjs/toolkit'
import authReducer from './slice/AuthSlice' //renamed reducer to authReducer
import productReducer from './slice/ProductSlice' //renamed reducer to productReducer
import filterReducer from './slice/filterSLice'
import cartReducer from './slice/CartSlice'
import checkoutReducer from './slice/CheckoutSlice'


const rootReducer = combineReducers(
    {
        auth: authReducer,
        product: productReducer,
        filter: filterReducer,
        cart: cartReducer,
        checkout: checkoutReducer,
    }
)

const Store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck:false
    }),
})

export default Store
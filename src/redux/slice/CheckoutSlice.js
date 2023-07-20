import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    shippingAddress:{},
    billingAddress:{},
}

const CheckoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    SAVE_SHIPPING_ADDRESS(state,action) {
        state.shippingAddress = action.payload
    },
    SAVE_BILLING_ADDRESS(state,action) {
        state.billingAddress = action.payload
    },
  }
});

export const {SAVE_BILLING_ADDRESS, SAVE_SHIPPING_ADDRESS} = CheckoutSlice.actions

export const selectShippingAddress = (state) => state.checkout.shippingAddress
export const selectBillingAddress = (state) => state.checkout.billingAddress

export const {} = CheckoutSlice.actions

export default CheckoutSlice.reducer
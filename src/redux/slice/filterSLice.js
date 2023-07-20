import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    filteredProducts: []

}

const filterSLice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    FILTER_BY_SEARCH(state, action){
        // console.log(action.payload);
        const {products, search} = action.payload
        let tempProducts = products.filter((product)=> 
          product.name.toLowerCase().includes(search.toLowerCase()) || product.category.toLowerCase().includes(search.toLowerCase())|| product.desc.toLowerCase().includes(search.toLowerCase())|| product.keywords.toLowerCase().includes(search.toLowerCase())
        )
        state.filteredProducts = tempProducts
    },
    SORT_PRODUCTS(state, action){
      // console.log(action.payload);
      const {products, sort} = action.payload
      let tempProducts = []
      if (sort === 'latest'){
        tempProducts = products
      }
      else if (sort === "lowest-price"){
        tempProducts = products.slice().sort((a,b)=> {return a.price-b.price})
      }
      else if (sort === "highest-price"){
        tempProducts = products.slice().sort((a,b)=> {return b.price-a.price})
  
      }
      else if (sort === "z-a"){
        tempProducts = products.slice().sort((b,a)=> {return a.name.toLowerCase().localeCompare(b.name.toLowerCase())})
      }
      else if (sort === "a-z"){
        tempProducts = products.slice().sort((a,b)=> {return a.name.toLowerCase().localeCompare(b.name.toLowerCase())})
      }
      
      state.filteredProducts = tempProducts
    },
    FILTER_BY_CATEGORY(state, action){
      // console.log(action.payload);
      const {products, category}  = action.payload
      let tempProducts =[]
      if (category === "All"){
        tempProducts = products
      }
      else {
        tempProducts = products.filter((product)=> product.category === category)
      }

      state.filteredProducts =tempProducts
    }

  },
  }
);

export const {FILTER_BY_SEARCH, SORT_PRODUCTS, FILTER_BY_CATEGORY} = filterSLice.actions
export const selectFilteredProducts = (state) => state.filter.filteredProducts
export const {} = filterSLice.actions

export default filterSLice.reducer
// import logo from './logo.svg';
// import './App.css';
// import Footer from './components/footer/Footer';
// import Header from './components/header/Header';
// import Home from './pages/home/Home';
// import Admin from './pages/admin/Admin'
// import  Cart from './pages/cart/Cart'
// import Contact from './pages/contact/Contact'
// import OrderHistory from './pages/orderHistory/OrderHistory'
import { Route, BrowserRouter, Routes } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//Pages
import {Home, Admin, Contact, OrderHistory, Cart, Login, Register, Reset } from './pages/index'

// Components
import {Header, Footer} from './components'
import AdminOnlyRoute from './components/adminOnlyRoute/AdminOnlyRoute';
import ProductDetails from './components/products/productDetails/ProductDetails';
import CheckoutDetails from './pages/checkout/CheckoutDetails';
import Checkout from './pages/checkout/Checkout';
import Products from './components/products/Products';
import Properties from './components/properties/Properties';
// import Login from './pages/auth/Login';

function App() {
  return (
    <div className="App">

      {/* Hello!! */}
      <BrowserRouter>
      <ToastContainer/>
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/contact' element={<Contact/>} />
          <Route path='/home' element={<Home/>} />
          {/* <Route path='/admin' element={<Admin/>} /> */}
          <Route path='/cart' element={<Cart/>} />
          <Route path='/order-history' element={<OrderHistory/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/reset' element={<Reset/>} />
          <Route path='/admin/*' element={<AdminOnlyRoute>
              <Admin/>
          </AdminOnlyRoute>} />
          <Route path='/product-details/:id' element={<ProductDetails/>} />
          {/* <Route path='/product-details/:id' element={<ProductDetails/>} /> */}
          <Route path='/checkout-details' element={<CheckoutDetails/>}/>
          <Route path='/checkout' element={<Checkout/>}/>
          <Route path='/market-place' element={<Products type='market-place'/>}/>
          {/* <Route path='/properties' element={<Properties/>}/> */}
          <Route path='/properties' element={<Products type='properties'/>}/>
        
        
        </Routes>
        <Footer/>
      </BrowserRouter>

    </div>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Header from "./components/AnotherPage/Header";
import Footer from "./components/AnotherPage/Footer";
import { ToastContainer } from "react-toastify";
import "./App.css";
// import {
//   createProductsCollection,
//   createUsersCollection,
//   createOrdersCollection,
//   createCategorysCollection,
// } from "./AddDataBaseDemo";
// import Mail from "./Mail";
// lazy loading components
const LandingPage = lazy(() => import("./components/AnotherPage/LandingPage"));
const About = lazy(() => import("./components/AnotherPage/About"));
const Shop = lazy(() => import("./components/Product/Shop"));
const Cart = lazy(() => import("./components/Cart/Cart"));
const ProductDetail = lazy(() => import("./components/Product/ProductDetail"));
const Account = lazy(() => import("./components/Account/Account"));
const Checkout = lazy(() => import("./components/Cart/Checkout"));
const ViewOrder = lazy(() => import("./components/Cart/ViewOrder"));

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Suspense
          fallback={
            <div className="d-flex justify-content-center mt-3">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          }
        >
          <Routes>
            <Route exact path="/" element={<LandingPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/productdetail/:id" element={<ProductDetail />} />
            <Route path="/account" element={<Account />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/vieworder/:mahd" element={<ViewOrder />} />
          </Routes>
        </Suspense>
        <Footer />
        {/* <button type="button" onClick={() => createProductsCollection()}>
          Add Products
        </button>
        <button type="button" onClick={() => createCategorysCollection()}>
          Add Categorys
        </button>
        <button type="button" onClick={() => createUsersCollection()}>
          Add Users
        </button>
        <button type="button" onClick={() => createOrdersCollection()}>
          Add Orders
        </button> */}
        <ToastContainer />
        {/* <Mail/> */}
      </BrowserRouter>
    </div>
  );
}

export default App;

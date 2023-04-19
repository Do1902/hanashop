import React, { useEffect, useState } from "react";
import CryptoJS from "crypto-js";
import { Link } from "react-router-dom";
import app from "../../firebase";
import { getStorage, getDownloadURL, ref } from "firebase/storage";
import {
  getFirestore,
  query,
  collection,
  where,
  getDocs,
} from "firebase/firestore";
function Cart() {
  const [cart, setCart] = useState([]);
  const [IsLoading, setLoading] = useState(true);
  useEffect(() => {
    const datacart = JSON.parse(localStorage.getItem("cart"));
    if (datacart) {
      const secretKey = process.env.REACT_APP_KEY_TOKEN;
      // Giải mã
      const decryptedBytes = CryptoJS.AES.decrypt(datacart, secretKey);
      const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
      const cartObject = JSON.parse(decryptedText);
      // Lấy thông tin sản phẩm từ Firestore
      const db = getFirestore(app);
      const products = collection(db, "products");
      const storage = getStorage(app);
      const cartItems = cartObject.map(async (item) => {
        const querySnapshot = await getDocs(
          query(products, where("id", "==", item.id))
        );
        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0];
          const data = doc.data();
          const imageRef = ref(storage, `images/${data.image}`);
          const imageUrl = await getDownloadURL(imageRef);
          return { ...data, image: imageUrl, quantity: item.quantity };
        }
        return null;
      });

      Promise.all(cartItems).then((result) => {
        const filteredResult = result.filter((item) => item !== null);
        setCart(filteredResult);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);
  const RefeshCart = (newCart) => {
    //Key mã hóa
    const secretKey = process.env.REACT_APP_KEY_TOKEN;
    // Convert array to string
    const plainTextString = JSON.stringify(newCart);
    // Mã hóa
    const encryptedText = CryptoJS.AES.encrypt(
      plainTextString,
      secretKey
    ).toString();
    localStorage.setItem("cart", JSON.stringify(encryptedText));
  };
  // Hàm tính tổng giá trị sản phẩm
  const getTotal = () => {
    return cart.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);
  };
  const priveVND = (price) => {
    const x = price.toLocaleString("vi", {
      style: "currency",
      currency: "VND",
    });
    return x;
  };
  const deleteProduct = (productId) => {
    const newCart = cart.filter((product) => product.id !== productId);
    console.log(newCart);
    setCart(newCart);
    if (newCart.length === 0) {
      localStorage.removeItem("cart");
    } else {
      RefeshCart(newCart);
    }
  };

  const decrease = (productId) => {
    const newCart = [...cart];
    const index = newCart.findIndex((product) => product.id === productId);
    if (newCart[index].quantity > 1) {
      newCart[index].quantity--;
      setCart(newCart);
      RefeshCart(newCart);
    }
  };

  const increase = (productId) => {
    const newCart = [...cart];
    const index = newCart.findIndex((product) => product.id === productId);
    if (newCart[index].quantity < 99) {
      newCart[index].quantity++;
      setCart(newCart);
      RefeshCart(newCart);
    }
  };

  const handleQuantityChange = (productId, quantity) => {
    const newCart = [...cart];
    const index = newCart.findIndex((product) => product.id === productId);
    if (parseInt(quantity) <= 0 || isNaN(parseInt(quantity))) {
      newCart[index].quantity = 1;
    } else if (parseInt(quantity) > 99) {
      newCart[index].quantity = 100;
    } else {
      newCart[index].quantity = parseInt(quantity);
    }
    setCart(newCart);
    RefeshCart(newCart);
  };
  if (IsLoading === true) {
    return (
      <div className="d-flex justify-content-center mt-3">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        {cart.length > 0 ? (
          <div className="Cart">
            <div className="breadcrumbs">
              <div
                className="page-header d-flex align-items-center"
                style={{ backgroundImage: `url('assets/img/cart.jpg')` }}
              >
                <div className="container position-relative">
                  <div className="row d-flex justify-content-center">
                    <div className="col-lg-6 text-center">
                      <h2>Cart</h2>
                      <p>
                        Odio et unde deleniti. Deserunt numquam exercitationem.
                        Officiis quo odio sint voluptas consequatur ut a odio
                        voluptatem. Sit dolorum debitis veritatis natus dolores.
                        Quasi ratione sint. Sit quaerat ipsum dolorem.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <section className="h-100 gradient-custom">
              <div className="container py-5">
                <div className="row d-flex justify-content-center my-4">
                  <div className="col-md-8">
                    <div className="card mb-4">
                      <div className="card-header py-3">
                        <h5 className="mb-0">Cart items</h5>
                      </div>
                      <div className="card-body">
                        {cart.map((product, key) => (
                          <div className="row" key={key}>
                            <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                              <div
                                className="bg-image hover-overlay hover-zoom ripple rounded"
                                data-mdb-ripple-color="light"
                              >
                                <img
                                  src={product.image}
                                  className="w-100"
                                  alt="Product"
                                  cache="true"
                                />
                              </div>
                            </div>

                            <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
                              <p className="link-product">
                                <Link to={`/productdetail/${product.id}`}>
                                  <strong>{product.name}</strong>
                                </Link>
                              </p>
                              <p>Price:{priveVND(product.price)}</p>
                              <button
                                type="button"
                                className="btn btn-primary btn-sm me-1 mb-2"
                                onClick={() => deleteProduct(product.id)}
                                title="Remove item"
                              >
                                <i className="fas fa-trash"></i>
                              </button>
                            </div>

                            <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                              <div
                                className="d-flex mb-4"
                                style={{ maxWidth: "300px" }}
                              >
                                <button
                                  className="btn btn-primary"
                                  onClick={() => decrease(product.id)}
                                >
                                  <i className="fas fa-minus"></i>
                                </button>

                                {/* <div className="form-outline"> */}
                                <input
                                  id="form1"
                                  name="quantity"
                                  value={product.quantity}
                                  onChange={(event) =>
                                    handleQuantityChange(
                                      product.id,
                                      event.target.value
                                    )
                                  }
                                  type="number"
                                  className="form-control"
                                  style={{ width: "50px", margin: "0 10px" }}
                                />
                                {/* </div> */}

                                <button
                                  className="btn btn-primary"
                                  onClick={() => increase(product.id)}
                                >
                                  <i className="fas fa-plus"></i>
                                </button>
                              </div>

                              <p className="text-start text-md-center">
                                <strong>
                                  {" "}
                                  {priveVND(product.price * product.quantity)}
                                </strong>
                              </p>
                            </div>
                            <hr
                              style={{
                                margin: "5px",
                                height: 1,
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="card mb-4">
                      <div className="card-header py-3">
                        <h5 className="mb-0">Summary</h5>
                      </div>
                      <div className="card-body">
                        <ul className="list-group list-group-flush">
                          <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                            Products
                            <span>{priveVND(getTotal())}</span>
                          </li>
                          <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                            <div>
                              <strong>Total amount</strong>
                              <strong>
                                <p className="mb-0">(including VAT)</p>
                              </strong>
                            </div>
                            <span>{priveVND(getTotal())}</span>
                          </li>
                        </ul>
                        <Link to="/checkout">
                          <button
                            type="button"
                            className="btn btn-primary btn-lg btn-block"
                          >
                            Go to checkout
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        ) : (
          <div className="text-center no-cart">
            <div className="container">
              <h3>Không có gì trong cart</h3>
              <Link to={"/shop"}>
                <button type="">Trở lại shop </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default Cart;

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import CryptoJS from "crypto-js";
import { CheckLogin } from "../Account/ActionsUser";
import app from "../../firebase";
import { v4 as uuidv4 } from "uuid";
import {
  collection,
  addDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import moment from "moment";
function Checkout() {
  const [cart, setCart] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState();
  const [cartroot, setCartRoot] = useState([]);
  const [IsLoading, setLoading] = useState(true);
  useEffect(() => {
    const checkLoginStatus = async () => {
      const access_token = JSON.parse(localStorage.getItem("access_token"));
      if (access_token) {
        setIsLoggedIn(true);
        const data = await CheckLogin();
        setUserData(data);
      } else {
        setIsLoggedIn(false);
        setUserData();
      }
    };
    checkLoginStatus();
  }, [setIsLoggedIn]);
  useEffect(() => {
    const datacart = JSON.parse(localStorage.getItem("cart"));
    if (datacart) {
      const secretKey = process.env.REACT_APP_KEY_TOKEN;
      // Giải mã
      const decryptedBytes = CryptoJS.AES.decrypt(datacart, secretKey);
      const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
      const cartObject = JSON.parse(decryptedText);
      setCartRoot(cartObject);
      // Lấy thông tin sản phẩm từ Firestore
      const db = getFirestore(app);
      const products = collection(db, "products");
      const cartItems = cartObject.map(async (item) => {
        const querySnapshot = await getDocs(
          query(products, where("id", "==", item.id))
        );
        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0];
          const data = doc.data();
          return { ...data, quantity: item.quantity };
        }
        return null;
      });

      Promise.all(cartItems).then((result) => {
        const filteredResult = result.filter((item) => item !== null);
        setCart(filteredResult);
        setLoading(false);
      });
    }
  }, []);

  const priveVND = (price) => {
    const x = price.toLocaleString("vi", {
      style: "currency",
      currency: "VND",
    });
    return x;
  };
  const Total = () => {
    let x = cart.reduce(
      (total, item) => (total = total + item.quantity * item.price),
      0
    );
    return x;
  };
  var navigate = useNavigate();
  const CheckOrder = async (e) => {
    e.preventDefault();
    const now = moment();
    const formattedDate = now.format("DD/MM/YYYY HH:mm:ss");
    const id = toast.loading("Đang xử lí...");
    let name = document.getElementById("name").value;
    let sdt = document.getElementById("sdt").value;
    let address = document.getElementById("address").value;
    let erName = "";
    let erSdt = "";
    let erAdress = "";
    let regexName = /[0-9]*/;
    let regexSdt =
      /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
    let regexEmail = /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (name === "") {
      erName = "Tên không được để trống";
    } else if (!regexName.test(name)) {
      erName = "Tên không hợp lệ";
    }
    if (sdt === "") {
      erSdt = "Số điện thoại không được để trống";
    } else if (!regexSdt.test(sdt)) {
      erSdt = "Số điện thoại không hợp lệ";
    }
    if (address === "") {
      erAdress = "Địa chỉ không được để trống";
    }
    if (isLoggedIn === true && userData) {
      if (erName === "" && erAdress === "" && erSdt === "") {
        toast.update(id, {
          render: "Xử lí thành công",
          type: "success",
          isLoading: false,
          autoClose: 1000,
          closeOnClick: true,
        });
        let db = getFirestore(app);
        const order = collection(db, "orders");
        let idToSearch = uuidv4();

        // Tìm kiếm tất cả các documents có id = idToSearch
        const querySnapshot = await getDocs(
          query(order, where("id", "==", idToSearch))
        );

        let idAlreadyExists = querySnapshot.docs.length > 0;
        let idToUse = idToSearch;

        // Nếu id đã tồn tại, tạo id mới và kiểm tra lại cho đến khi không trùng
        while (idAlreadyExists) {
          idToUse = uuidv4();
          const querySnapshot = await getDocs(
            query(order, where("id", "==", idToUse))
          );
          idAlreadyExists = querySnapshot.docs.length > 0;
        }
        let total = Total();
        const data = {
          id: idToUse,
          email: userData["email"],
          name: name,
          sdt: sdt,
          address: address,
          cart: cartroot,
          total: total,
          time: formattedDate,
          status: "Pending",
        };
        addDoc(order, data);
        toast.update(id, {
          render: "Đặt hàng thành công",
          type: "success",
          isLoading: false,
          autoClose: 1000,
          closeOnClick: true,
        });
        setTimeout(() => navigate("/"), 1000);
        localStorage.removeItem("cart");
      } else {
        if (erName !== "") {
          toast(erName, {
            type: "error",
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
        if (erAdress !== "") {
          toast(erAdress, {
            type: "error",
            autoClose: 2000,
            position: "top-right",
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
        if (erSdt !== "") {
          toast(erSdt, {
            type: "error",
            autoClose: 2000,
            position: "top-right",
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
        toast.update(id, {
          render: "Xử lí thành công",
          type: "success",
          isLoading: false,
          autoClose: 1000,
          closeOnClick: true,
        });
      }
    } else {
      let email = document.getElementById("email").value;
      let erEmail = "";
      if (email === "") {
        erEmail = "Email không được để trống";
      } else if (!regexEmail.test(email)) {
        erEmail = "Email không hợp lệ";
      }
      if (erName === "" && erEmail === "" && erAdress === "" && erSdt === "") {
        toast.update(id, {
          render: "Xử lí thành công",
          type: "success",
          isLoading: false,
          autoClose: 1000,
          closeOnClick: true,
        });
        toast.update(id, {
          render: "Đặt hàng thành công",
          type: "success",
          isLoading: false,
          autoClose: 1000,
          closeOnClick: true,
        });
        setTimeout(() => navigate("/"), 1000);
        localStorage.removeItem("cart");
      } else {
        if (erName !== "") {
          toast(erName, {
            type: "error",
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
        if (erEmail !== "") {
          toast(erEmail, {
            type: "error",
            autoClose: 2000,
            position: "top-right",
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
        if (erAdress !== "") {
          toast(erAdress, {
            type: "error",
            autoClose: 2000,
            position: "top-right",
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
        if (erSdt !== "") {
          toast(erSdt, {
            type: "error",
            autoClose: 2000,
            position: "top-right",
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
        toast.update(id, {
          render: "Xử lí thành công",
          type: "success",
          isLoading: false,
          autoClose: 1000,
          closeOnClick: true,
        });
      }
    }
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
      <section className="checkout_area section_gap">
        {cart.length > 0 ? (
          <div className="container">
            <div className="billing_details">
              <div className="row">
                <div className="col-lg-8">
                  <h3>Billing Details</h3>
                  <form
                    className="row contact_form"
                    onSubmit={(e) => CheckOrder(e)}
                  >
                    <div className="col-md-6 form-group p_star">
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        placeholder="Full name"
                      />
                      <span></span>
                    </div>
                    <div className="col-md-6 form-group p_star">
                      <input
                        type="text"
                        className="form-control"
                        id="sdt"
                        name="number"
                        placeholder="Phone number"
                      />
                      <span></span>
                    </div>
                    {isLoggedIn !== true ? (
                      <div className="col-md-12 form-group p_star">
                        <input
                          type="text"
                          className="form-control"
                          id="email"
                          name="add1"
                          placeholder="Email"
                        />
                        <span></span>
                      </div>
                    ) : null}
                    <div className="col-md-12 form-group p_star">
                      <input
                        type="text"
                        className="form-control"
                        id="address"
                        name="city"
                        placeholder="Address"
                      />
                    </div>

                    <button className="btn-primary" type="submit">
                      Update Shipping
                    </button>
                  </form>
                </div>
                <div className="col-lg-4">
                  <div className="order_box">
                    <h2>Your Order</h2>
                    <ul className="list">
                      <li>Product:</li>
                      <li>
                        <ul>
                          {cart.map((product) => (
                            <li key={product.id}>
                              <span style={{ float: "left" }}>
                                {product.name}
                                <span
                                  className="middle"
                                  style={{ margin: 0, width: "30px" }}
                                >
                                  &nbsp;x{product.quantity}
                                </span>
                              </span>
                              <br />
                            </li>
                          ))}
                        </ul>
                      </li>
                    </ul>
                    <ul className="list list_2">
                      <li>
                        Total <span>{priveVND(Total() + 40000)}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
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
      </section>
    );
  }
}
export default Checkout;

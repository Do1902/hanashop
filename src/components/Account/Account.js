import React, { useState, useEffect } from "react";
import { CheckLogin, ThemUser, AddTokenUser } from "./ActionsUser";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  updateDoc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import app from "../../firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Table from "./TableOrders";
import moment from "moment";
import Swal from "sweetalert2";
function Account() {
  const [IsLoading, setLoading] = useState(true);
  const [profilePage, setProfilePage] = useState("profile"); // setup state phần hiển thị bên phải
  const [userData, setUserData] = useState(); //setup thông tin khách hàng vào state
  const [isLoggedIn, setIsLoggedIn] = useState(false); // setup login true/false
  //Kiểm tra login
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
  //Lấy các orders
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    async function fetchData() {
      if (!userData) {
        return;
      }
      const db = getFirestore(app);
      const querySnapshot = await getDocs(
        query(collection(db, "orders"), where("email", "==", userData["email"]))
      );
      if (querySnapshot.empty) {
        setOrders([]);
        return;
      } else {
        let orderData = querySnapshot.docs;
        orderData.sort((a, b) => {
          const dateA = moment(a.data().time, "DD/MM/YYYY HH:mm:ss").toDate();
          const dateB = moment(b.data().time, "DD/MM/YYYY HH:mm:ss").toDate();
          return dateB - dateA;
        });
        orderData = orderData.map((doc, index) => ({
          id: index + 1,
          ...doc.data(),
        }));
        setOrders(orderData);
        setLoading(false);
      }
    }
    fetchData();
  }, [userData]);
  //Chuyển qua lại 2 form login hoặc regis
  const [containerClass, setContainerClass] = useState("");
  const handleRegisterClick = () => {
    setContainerClass("right-panel-active");
    document.getElementById("Login").reset();
  };
  const handleLoginClick = () => {
    document.getElementById("register").reset();
    setContainerClass("");
  };
  //Đăng xuất
  const handleLogOutClick = () => {
    Swal.fire({
      title: "Bạn Muốn Đăng Xuất?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        toast("Đăng xuất thành công! Đang chuyển hướng trang...", {
          type: "success",
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => window.location.reload(), 1000);
        localStorage.removeItem("access_token");
      }
    });
  };
  //Tạo tài khoản
  const nameReg = /^[^0-9]*$/;
  const passReg =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  const emailReg = /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/;
  async function RegisterUser(event) {
    event.preventDefault();
    const id = toast.loading("Đang xử lí...");
    //Lấy dữ liệu
    let email = document.getElementById("emailReg").value;
    let name = document.getElementById("nameReg").value;
    let pass = document.getElementById("passReg").value;
    let repass = document.getElementById("RepassReg").value;
    //Check dữ liệu
    let emailCheck = emailReg.test(email);
    let passCheck = passReg.test(pass);
    let nameCheck = nameReg.test(name);
    let erName = "";
    let erPass = "";
    let erEmail = "";
    if (name === "") {
      erName = "Tên không được để trống";
    } else if (nameCheck === false) {
      erName = "Tên không hợp lệ";
    }
    if (pass === "") {
      erPass = "Password không được để trống";
    } else if (passCheck === false) {
      erPass =
        "Password phải chứa ít nhất 8 kí tự, 1 chữ in hoa, 1 chữ thương, 1 kí tự, 1 số";
    } else if (repass !== pass) {
      erPass = "Mật khẩu không giống nhau";
    }
    if (email === "") {
      erEmail = "Email không được để trống";
    } else if (emailCheck === false) {
      erEmail = "Email không hợp lệ";
    } else {
      const db = getFirestore(app);
      const querySnapshot = await getDocs(
        query(collection(db, "users"), where("email", "==", email))
      );
      if (!querySnapshot.empty) {
        erEmail = "Email đã tồn tại trên hệ thống";
      }
    }
    if (erName === "" && erEmail === "" && erPass === "") {
      await ThemUser(email, name, pass);
      toast.update(id, {
        render: "Xử lí thành công",
        type: "success",
        isLoading: false,
        autoClose: 1000,
        closeOnClick: true,
      });
      toast("Đăng kí thành công", {
        type: "success",
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      document.getElementById("register").reset();
      handleLoginClick();
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
      if (erPass !== "") {
        toast(erPass, {
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
      toast.update(id, {
        render: "Xử lí thành công",
        type: "success",
        isLoading: false,
        autoClose: 1000,
        closeOnClick: true,
      });
    }
  }
  //Login
  async function LoginUser(event) {
    event.preventDefault();
    const id = toast.loading("Đang xử lí...");
    //Lấy dữ liệu
    let email = document.getElementById("emailLogin").value;
    let pass = document.getElementById("passLogin").value;
    //Check dữ liệu
    let data = "";
    let erPass = "";
    let erEmail = "";
    if (email === "") {
      erEmail = "Email không được để trống";
    } else {
      const db = getFirestore(app);
      const querySnapshot = await getDocs(
        query(collection(db, "users"), where("email", "==", email))
      );
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        data = doc.data();
        if (pass === "") {
          erPass = "Password không được để trống";
        } else if (pass !== data.pass) {
          erPass = "Password sai";
          document.getElementById("passLogin").value = "";
        } else {
        }
      } else {
        erEmail = "Email không tồn tại";
      }
    }
    if (erEmail === "" && erPass === "") {
      await AddTokenUser(email, pass);
      toast("Đăng nhập thành công! Đang chuyển hướng trang...", {
        type: "success",
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      document.getElementById("Login").reset();
      setTimeout(() => window.location.reload(), 1000);
    } else {
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
      if (erPass !== "") {
        toast(erPass, {
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
    }
    toast.update(id, {
      render: "Xử lí thành công",
      type: "success",
      isLoading: false,
      autoClose: 1000,
      closeOnClick: true,
    });
  }
  //Đổi mật khẩu
  async function ChangePass(event) {
    event.preventDefault();
    const id = toast.loading("Đang xử lí...");
    let oldpass = document.getElementById("passold").value;
    let newpass = document.getElementById("newpass").value;
    let retype = document.getElementById("repass").value;
    var passErr = "";
    var newpassErr = "";
    var retypeErr = "";
    var pErr = "";
    if (oldpass === "") {
      passErr = "Password không được để trống";
    } else if (oldpass !== userData["pass"]) {
      passErr = "Password không đúng";
    }
    if (newpass === "") {
      newpassErr = "Password mới không được để trống";
    } else if (newpass === oldpass) {
      newpassErr = "Password mới không được giống password cũ";
    } else {
      if (retype === "") {
        retypeErr = "Nhập lại mật khẩu không được để trống";
      }
      if (retype !== newpass) {
        pErr = "Nhập lại password không đúng";
      }
    }
    if (
      passErr === "" &&
      newpassErr === "" &&
      retypeErr === "" &&
      pErr === ""
    ) {
      const db = getFirestore(app);
      const querySnapshot = await getDocs(
        query(collection(db, "users"), where("email", "==", userData["email"]))
      );
      const doc = querySnapshot.docs[0];
      // Cập nhật dữ liệu của tài liệu đó
      await updateDoc(doc.ref, {
        pass: newpass,
      });
      toast.update(id, {
        render: "Đổi mật khẩu thành công! Đang chuyển hướng",
        type: "success",
        isLoading: false,
        autoClose: 1000,
        closeOnClick: true,
      });
      setTimeout(() => window.location.reload(), 1000);
      localStorage.removeItem("access_token");
    } else {
      toast.update(id, {
        render: "Xử lí thành công",
        type: "success",
        isLoading: false,
        autoClose: 1000,
        closeOnClick: true,
      });
      //Thông báo lỗi
      if (passErr !== "") {
        toast(passErr, {
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
      if (pErr !== "") {
        toast(pErr, {
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
      if (newpassErr !== "") {
        toast(newpassErr, {
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
      if (retypeErr !== "") {
        toast(retypeErr, {
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
    }
  }
  //Đổi thông tin
  async function ChangeInfo(event) {
    event.preventDefault();
    const id = toast.loading("Đang xử lí...");
    let name = document.getElementById("name").value;
    let address = document.getElementById("address").value;
    let sdt = document.getElementById("sdt").value;
    var nameErr = "";
    var addressErr = "";
    var sdtErr = "";
    if (name === "") {
      nameErr = "Họ tên không được để trống";
    }
    if (address === "") {
      addressErr = "Địa chỉ không được để trống";
    }
    if (sdt === "") {
      sdtErr = "Số điện thoại không được để trống";
    }
    if (nameErr === "" && addressErr === "" && sdtErr === "") {
      const db = getFirestore(app);
      const querySnapshot = await getDocs(
        query(collection(db, "users"), where("email", "==", userData["email"]))
      );
      const doc = querySnapshot.docs[0];
      const data = doc.data();
      // Cập nhật dữ liệu của tài liệu đó
      if (name !== data.name) {
        await updateDoc(doc.ref, { name: name });
      }
      if (sdt !== data.sdt) {
        await updateDoc(doc.ref, { sdt: sdt });
      }
      if (address !== data.address) {
        await updateDoc(doc.ref, { address: address });
      }
      toast.update(id, {
        render: "Thay đổi thành công! Đang chuyển hướng",
        type: "success",
        isLoading: false,
        autoClose: 1000,
        closeOnClick: true,
      });
      setTimeout(() => window.location.reload(), 1000);
    } else {
      toast.update(id, {
        render: "Xử lí thành công",
        type: "success",
        isLoading: false,
        autoClose: 1000,
        closeOnClick: true,
      });
      //Thông báo lỗi
      if (nameErr !== "") {
        toast(nameErr, {
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
      if (sdtErr !== "") {
        toast(sdtErr, {
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
      if (addressErr !== "") {
        toast(addressErr, {
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
    }
  }
  //Đổi avt
  const [imageFile, setImageFile] = useState(null);
  //Chọn ảnh và kiểm tra
  const handleFileChange = (e) => {
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (e.target.files[0]) {
      const fileSize = e.target.files[0].size;
      if (fileSize > maxSize) {
        alert("File is too large. Maximum file size is 10MB.");
        e.target.value = null;
        return;
      }
      const file = e.target.files[0];
      if (file.type.split("/")[0] !== "image") {
        alert("File ís not image");
        e.target.value = null;
        return;
      }
      setImageFile(e.target.files[0]);
    }
  };
  //Đổi tên file cho không bị trùng
  const renameFile = (file) => {
    const newFileName = userData.email;
    return new File([file], newFileName, { type: file.type });
  };
  //Thực hiện đổi avt
  const ChangeAvt = async (event) => {
    event.preventDefault();
    const id = toast.loading("Đang xử lí...");
    if (imageFile) {
      const storage = getStorage(app);
      let newFile = renameFile(imageFile);
      console.log(newFile);
      const storageRef = ref(storage, "users/" + newFile.name);
      await uploadBytes(storageRef, newFile);
      const db = getFirestore(app);
      const querySnapshot = await getDocs(
        query(collection(db, "users"), where("email", "==", userData["email"]))
      );
      const doc = querySnapshot.docs[0];
      let data = doc.data();
      if (data.image === "None") {
        await updateDoc(doc.ref, {
          image: newFile.name,
        });
      }
      toast.update(id, {
        render: "Đã tải thành công! Đang chuyển hướng",
        type: "success",
        isLoading: false,
        autoClose: 1000,
        closeOnClick: true,
      });
      setTimeout(() => window.location.reload(), 1000);
    } else {
      toast.update(id, {
        render: "Xử lí thành công",
        type: "success",
        isLoading: false,
        autoClose: 1000,
        closeOnClick: true,
      });
      toast("Chưa tải lên ảnh", {
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
  };
  return (
    <div className="Account">
      <div className="breadcrumbs">
        <div
          className="page-header d-flex align-items-center"
          style={{ backgroundImage: `url('assets/img/carousel3.jpg')` }}
        >
          <div className="container position-relative">
            <div className="row d-flex justify-content-center">
              <div className="col-lg-6 text-center">
                <h2>Account</h2>
                <p>
                  Shop at our store to experience amazing shopping and receive
                  special benefits for your account!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Login thì sẽ hiển thị dashboad */}
      {isLoggedIn ? (
        <div className="d-flex profiletem">
          <div className="profile d-flex flex-column flex-shrink-0 p-3 text-dark bg-light">
            <span className="fs-4 text-center">
              <i className="fa-solid fa-user"></i> Profile
            </span>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
              <li className="nav-item mt-3">
                <span onClick={() => setProfilePage("profile")}>
                  <i className="fa-solid fa-house"></i> Home
                </span>
              </li>
              <li className="nav-item mt-3">
                <span onClick={() => setProfilePage("changepass")}>
                  <i className="fa-solid fa-key"></i> Change Password
                </span>
              </li>
              <li className="nav-item mt-3">
                <span onClick={() => setProfilePage("changeinfo")}>
                  <i className="fa-solid fa-circle-info"></i> Change Info
                </span>
              </li>
              <li className="nav-item mt-3">
                <span onClick={() => setProfilePage("changeavt")}>
                  <i className="fa-solid fa-image"></i> Change Avatar
                </span>
              </li>
              <li className="nav-item mt-3">
                <span onClick={() => setProfilePage("order")}>
                  <i className="fa-solid fa-file-invoice-dollar"></i> Orders
                </span>
              </li>
              <li className="nav-item mt-3">
                <span onClick={() => handleLogOutClick()}>
                  <i className="fa-solid fa-right-from-bracket"></i> LogOut
                </span>
              </li>
            </ul>
          </div>
          {profilePage === "profile" ? (
            <div className="profileinfor">
              <div className="card">
                <img
                  className="card-img-top"
                  src={userData ? userData["image"] : ""}
                  alt="loading"
                />
                <div className="card-body text-center">
                  <h4 className="card-title">
                    {userData ? userData["name"] : ""}
                  </h4>
                  <label className="card-text">
                    Email: {userData ? userData["email"] : ""}
                  </label>
                  <br />
                  <label className="card-text">
                    Số điện thoại: {userData ? userData["sdt"] : ""}
                  </label>
                  <br />
                  <label className="card-text">
                    Địa chỉ: {userData ? userData["address"] : ""}
                  </label>
                </div>
              </div>
            </div>
          ) : null}
          {/* Hiên thị form đổi pass */}
          {profilePage === "changepass" ? (
            <form className="m-auto" onSubmit={(e) => ChangePass(e)}>
              <div className="mb-3">
                <label className="form-label ">Password cũ</label>
                <input
                  type="password"
                  className="form-control"
                  id="passold"
                  placeholder="Nhập password cũ"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password mới</label>
                <input
                  type="password"
                  className="form-control"
                  id="newpass"
                  placeholder="Nhập password mới"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Nhập lại password</label>
                <input
                  type="password"
                  className="form-control"
                  id="repass"
                  placeholder="Nhập lại password"
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          ) : null}
          {/* Hiển thị form đổi thông tin */}
          {profilePage === "changeinfo" ? (
            <form className="m-auto" onSubmit={(e) => ChangeInfo(e)}>
              <div className="mb-3">
                <label className="form-label">Họ tên</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Nhập họ tên"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  placeholder="Nhập address"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Số điện thoại</label>
                <input
                  type="text"
                  className="form-control"
                  id="sdt"
                  placeholder="Nhập số điện thoại"
                />
              </div>

              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          ) : null}
          {/* Hiển thị form đổi svt */}
          {profilePage === "changeavt" ? (
            <form className="m-auto" onSubmit={(e) => ChangeAvt(e)}>
              <div className="mb-3">
                <label htmlFor="image">Select an image:</label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <br />
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          ) : null}
          {/* Hiển thị ds đơn hàng */}
          {profilePage === "order" ? (
            <div className="order">
              {IsLoading === true ? (
                <div className="d-flex justify-content-center mt-3">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : orders.length > 0 ? (
                <Table data={orders} />
              ) : (
                <div>Không có đơn nào cả!</div>
              )}
            </div>
          ) : null}
        </div>
      ) : (
        // Ngược lại hiển thị form đăng nhập/đăng kí
        <div>
          <div className="body">
            <div
              className={"containeraccount " + containerClass}
              id="container"
            >
              <div className="form-container register-container">
                <form
                  id="register"
                  onSubmit={(e) => {
                    RegisterUser(e);
                  }}
                >
                  <h1>Register here.</h1>
                  <input type="text" placeholder="Name" id="nameReg" />
                  <input type="text" placeholder="Email" id="emailReg" />
                  <input type="password" placeholder="Password" id="passReg" />
                  <input
                    type="password"
                    placeholder="Repassword"
                    id="RepassReg"
                  />
                  <button>Register</button>
                </form>
              </div>

              <div className="form-container login-container">
                <form
                  action=""
                  id="Login"
                  onSubmit={(e) => {
                    LoginUser(e);
                  }}
                >
                  <h1>Login hire.</h1>
                  <input type="text" placeholder="Email" id="emailLogin" />
                  <input
                    type="password"
                    placeholder="Password"
                    id="passLogin"
                  />
                  <div className="content">
                    <div className="pass-link">
                      <a href=" ">Forgot password?</a>
                    </div>
                  </div>
                  <button>Login</button>
                </form>
              </div>

              <div className="overlay-container">
                <div className="overlay">
                  <div className="overlay-panel overlay-left">
                    <h1 className="title">
                      Hello <br /> friends
                    </h1>
                    <p>if Yout have an account, login here and have fun</p>
                    <button
                      className="ghost"
                      id="login"
                      onClick={handleLoginClick}
                    >
                      Login
                      <i className="lni lni-arrow-left login"></i>
                    </button>
                  </div>
                  <div className="overlay-panel overlay-right">
                    <h1 className="title">
                      Start yout <br /> journy now
                    </h1>
                    <p>
                      if you don't have an account yet, join us and start your
                      journey.
                    </p>
                    <button
                      className="ghost"
                      id="register"
                      onClick={handleRegisterClick}
                    >
                      Register
                      <i className="lni lni-arrow-right register"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Account;

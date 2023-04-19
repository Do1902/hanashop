import CryptoJS from "crypto-js";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getFirestore,
  collection,
  updateDoc,
  arrayRemove,
  arrayUnion,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import app from "../../firebase";
// import { CheckLogin } from "../Account/ActionsUser";
export async function addToFavoritesList(check, id) {
  if (check) {
    const idloading = toast.loading("Đang xử lí...");
    const db = getFirestore(app);
    const querySnapshot = await getDocs(
      query(collection(db, "users"), where("email", "==", check.email))
    );
    const doc = querySnapshot.docs[0];
    const data = doc.data();
    const index = data.favorites.findIndex(
      (item) => parseInt(item) === parseInt(id)
    );
    if (index === -1) {
      // Nếu chưa tồn tại thì thêm nó vào mảng favorites
      await updateDoc(doc.ref, {
        favorites: arrayUnion(id),
      });
      toast.update(idloading, {
        render: "Thêm vào danh sách yêu thích thành công",
        type: "success",
        isLoading: false,
        autoClose: 1000,
        closeOnClick: true,
      });
    } else {
      await updateDoc(doc.ref, {
        favorites: arrayRemove(id),
      });
      toast.update(idloading, {
        render: "Xóa khỏi danh sách yêu thích thành công",
        type: "success",
        isLoading: false,
        autoClose: 1000,
        closeOnClick: true,
      });
    }
  } else {
    Swal.fire({
      title: "Bạn chưa đăng nhập",
      text: "Vui lòng đăng nhập để thêm vào danh sách yêu thích",
      icon: "error",
    });
  }
}
export function addCart(product, soluong) {
  let cart = JSON.parse(localStorage.getItem("cart")) || null;
  const secretKey = process.env.REACT_APP_KEY_TOKEN;
  if (cart) {
    try {
      // Giải mã
      const decryptedBytes = CryptoJS.AES.decrypt(cart, secretKey);
      const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
      // Convert giải mã to object
      const cartObject = JSON.parse(decryptedText);
      if (cartObject.length > 0) {
        const index = cartObject.findIndex((item) => product.id === item.id);
        if (index === -1) {
          const item = {
            id: product.id,
            quantity: soluong,
          };
          cartObject.push(item);
        } else {
          cartObject[index].quantity += soluong;
        }
        const plainTextString = JSON.stringify(cartObject);
        // Mã hóa
        const encryptedText = CryptoJS.AES.encrypt(
          plainTextString,
          secretKey
        ).toString();
        localStorage.setItem("cart", JSON.stringify(encryptedText));
        toast("Add Success!", {
          type: "success",
          limit: 3,
          position: "bottom-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Shopping Cart Unknown Error",
        text: "We Will Clear Your Cart",
        icon: "error",
      });
      localStorage.removeItem("cart");
    }
  } else {
    cart = [];
    const item = {
      id: product.id,
      quantity: soluong,
    };
    cart.push(item);
    const plainTextString = JSON.stringify(cart);
    // Mã hóa
    const encryptedText = CryptoJS.AES.encrypt(
      plainTextString,
      secretKey
    ).toString();
    localStorage.setItem("cart", JSON.stringify(encryptedText));
    toast("Add Success!", {
      type: "success",
      limit: 3,
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
}

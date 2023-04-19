import app from "../../firebase";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import Swal from "sweetalert2";
import CryptoJS from "crypto-js";
export function ThemUser(email, name, pass) {
  let db = getFirestore(app);
  const users = collection(db, "users");
  const data = {
    email: email,
    name: name,
    pass: pass,
    address: "None",
    sdt: "None",
    image: "None",
    favorites: [],
  };
  addDoc(users, data);
  if (window.Email) {
    window.Email.send({
      SecureToken: "b085a665-dbbf-4d88-87ac-584318c71ca8",
      To: email,
      From: "hanashop5924@gmail.com",
      Subject: "Create Account Successfully",
      Body: `
      <!DOCTYPE html>
<html lang="en">
<head>
  <title></title>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>
    .banner img {
      width: 220px;
    }
    .banner {
      width: max-content;
      margin: auto;
    }
    .container {
      border: solid 1px darkgray;
    }
  </style>
</head>
<body>
  <div className="container">
    <div className="banner">
      <img
        src="https://firebasestorage.googleapis.com/v0/b/my-app-c7d1c.appspot.com/o/users%2Fadmin%40gmail.com?alt=media&token=09ba4815-926c-4477-ba7a-62f54a49e90e"
        alt=""
      />
    </div>
    <div style="text-align: center">
      <h3>Hana Shop</h3>
    </div>
    <div style="text-align: center">
      Chúc mừng ${name} đã tạo tài khoản thành công tại shop!
      <br />Email: ${email} <br />Password: ${pass}
    </div>
  </div>
</body>
</html>
`,
    });
  }
}

export function AddTokenUser(email, pass) {
  //Key mã hóa
  const secretKey = process.env.REACT_APP_KEY_TOKEN;
  // Convert object to string
  const plainText = {
    email,
    pass,
  };
  const plainTextString = JSON.stringify(plainText);
  // Mã hóa
  const encryptedText = CryptoJS.AES.encrypt(
    plainTextString,
    secretKey
  ).toString();
  localStorage.setItem("access_token", JSON.stringify(encryptedText));
}
export async function CheckLogin() {
  const access_token = JSON.parse(localStorage.getItem("access_token"));
  if (access_token) {
    // Key mã hóa
    const secretKey = process.env.REACT_APP_KEY_TOKEN;
    try {
      // Giải mã
      const decryptedBytes = CryptoJS.AES.decrypt(access_token, secretKey);
      const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
      // Convert giải mã to object
      const decryptedObject = JSON.parse(decryptedText);
      const db = getFirestore(app);
      const querySnapshot = await getDocs(
        query(
          collection(db, "users"),
          where("email", "==", decryptedObject.email),
          where("pass", "==", decryptedObject.pass)
        )
      );
      const doc = querySnapshot.docs[0];
      let data = doc.data();
      if (data.image !== "None") {
        const storage = getStorage(app);
        const imageRef = ref(storage, `users/${data.image}`);
        const imageUrl = await getDownloadURL(imageRef);
        data = { ...data, image: imageUrl };
      } else {
        data = { ...data, image: "/assets/img/images.png" };
      }
      return data;
    } catch (error) {
      Swal.fire({
        title: "Login session has expired",
        text: "Please log in again",
        icon: "error",
      });
      console.log(error);
      localStorage.removeItem("access_token");
      return false;
    }
  } else {
    return false;
  }
}

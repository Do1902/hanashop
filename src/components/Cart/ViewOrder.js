import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import app from "../../firebase";
import {
  getFirestore,
  getDocs,
  query,
  collection,
  where,
} from "firebase/firestore";
import { getStorage, getDownloadURL, ref } from "firebase/storage";
import TableProduct from "./TableViewOrder";
function ViewOrder() {
  const { mahd } = useParams();
  const [order, setOrder] = useState();
  const [isOrderLoading, setIsOrderLoading] = useState(true);
  const [userOrder, setUserOrder] = useState();
  useEffect(() => {
    const db = getFirestore(app);
    async function fetchProduct() {
      const querySnapshot = await getDocs(
        query(collection(db, "orders"), where("id", "==", mahd))
      );
      if (!querySnapshot.empty) {
        const products = collection(db, "products");
        const storage = getStorage(app);
        const doc = querySnapshot.docs[0];
        const data = doc.data();
        setUserOrder(data);
        const orderItems = data.cart.map(async (item) => {
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
        Promise.all(orderItems).then((result) => {
          const filteredResult = result.filter((item) => item !== null);
          setOrder(filteredResult);
          setIsOrderLoading(false);
        });
      } else {
        setIsOrderLoading(false);
      }
    }
    fetchProduct();
  }, [mahd]);
  console.log(order);
  if (isOrderLoading) {
    return (
      <div className="d-flex justify-content-center mt-3">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  } else {
    if (!order) {
      return (
        <div className="page_404">
          <div className="four_zero_four_bg">
            <h1 className="text-center ">404</h1>
          </div>
          <div className="contant_box_404">
            <h3 className="h2">Look like you're lost</h3>
            <p>The order you are looking for is not available!</p>
            <Link to="/" className="link_404">
              Go to Home
            </Link>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="d-flex justify-content-center m-3">
            <div className="text-muted">
              <h3>Chi Tiết Hóa Đơn</h3>
            </div>
          </div>
          <TableProduct data={order} />
          <div className="d-flex justify-content-center">
            <div className="text-muted">
              <h4>Thông Tin Người Nhận</h4>
              <br />
              <p>
                Tên: {userOrder.name} <br />
                Số điện thoại: {userOrder.sdt}
                <br />
                Địa chỉ: {userOrder.address}
                <br />
                Thời gian đặt: {userOrder.time}
                <br />
                Trạng thái: {userOrder.status}
              </p>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default ViewOrder;

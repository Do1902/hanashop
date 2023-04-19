import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { addCart, addToFavoritesList } from "./ActionsProduct";
import Page404 from "../AnotherPage/Page404";
import app from "../../firebase";
import "react-toastify/dist/ReactToastify.css";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { CheckLogin } from "../Account/ActionsUser";
function ProductDetail() {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState();
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const fetchUserData = async () => {
      const access_token = JSON.parse(localStorage.getItem("access_token"));
      if (access_token) {
        const data = await CheckLogin();
        setUserData(data);
      } else {
        setUserData(null);
      }
    };
    fetchUserData();
  }, []);
  useEffect(() => {
    const db = getFirestore(app);
    async function fetchProduct() {
      const querySnapshot = await getDocs(
        query(collection(db, "products"), where("id", "==", parseInt(id)))
      );
      if (!querySnapshot.empty) {
        const storage = getStorage(app);
        const doc = querySnapshot.docs[0];
        const data = doc.data();
        const loai = await getDocs(
          query(
            collection(db, "category"),
            where("id", "==", parseInt(data.category))
          )
        );
        const docloai = loai.docs[0];
        const dataloai = docloai.data();
        const imageRef = ref(storage, `images/${data.image}`);
        const imageUrl = await getDownloadURL(imageRef);
        data.image = imageUrl;
        data.category = dataloai.name;
        setProduct(data);
      } else {
        setProduct(-999);
      }
    }
    fetchProduct();
  }, [id]);
  const priveVND = (price) => {
    const x = price.toLocaleString("vi", {
      style: "currency",
      currency: "VND",
    });
    return x;
  };
  const handleQuantityChange = (event) => {
    let newQuantity = event.target.value;
    setQuantity(newQuantity);
  };
  const CheckQuantity = () => {
    if (quantity <= 0) {
      setQuantity(1);
    }
    if (quantity > 99) {
      setQuantity(99);
    }
  };
  const addToFavorites = async (id) => {
    addToFavoritesList(userData, id);
    const data = await CheckLogin();
    setUserData(data);
  };
  return (
    <div className="ProductDetail">
      {product !== undefined && product !== -999 ? (
        <div className="container">
          <div className="row mb-5">
            <div className="col-md-8">
              <div className="row">
                <div className="col-md-12 mb-4">
                  <img
                    alt={product.name}
                    className="img-thumbnail p-0 border-0"
                    src={product.image}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <h1 style={{ fontWeight: "500", color: "darkgreen" }}>
                    {product?.name}
                  </h1>
                  <p className="star m-0">
                    <i className="fas fa-star fa-sm"></i>
                    <i className="fas fa-star fa-sm"></i>
                    <i className="fas fa-star fa-sm"></i>
                    <i className="fas fa-star fa-sm"></i>
                    <i className="fas fa-star fa-sm"></i>
                  </p>
                  <ul className="list-group list-group-flush mb-4">
                    <li className="list-group-item pl-0 pr-0 pt-2 pb-2">
                      Brand: {product.category}
                    </li>
                    <li className="list-group-item pl-0 pr-0 pt-2 pb-2">
                      Model: {product.name}
                    </li>
                    <li className="list-group-item pl-0 pr-0 pt-2 pb-2">
                      Availability: Pre-order
                    </li>
                    <li className="list-group-item pl-0 pr-0 pt-2 pb-2">
                      Price: {priveVND(product.price)}
                    </li>
                    <li className="list-group-item pl-0 pr-0 pt-2 pb-2">
                      Structure: Coming soon
                    </li>
                  </ul>
                  <div className="quantity input-group mb-4">
                    <input
                      type="number"
                      className="form-control text-center"
                      placeholder="Quantity"
                      name="quantity"
                      inputMode="numeric"
                      step="1"
                      value={quantity}
                      onChange={handleQuantityChange}
                      onBlur={CheckQuantity}
                    />
                    <div className="input-group-append">
                      <span className="input-group-text">Quantity</span>
                    </div>
                  </div>
                  <div
                    className="btn-group btn-group-lg"
                    role="group"
                    aria-label="Basic example"
                  >
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => addCart(product, quantity)}
                    >
                      <i className="fas fa-cart-plus"></i>
                      <span>Add Cart</span>
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary button-heart"
                      onClick={() => addToFavorites(product.id)}
                    >
                      <i
                        className={`fa fa-heart${
                          userData && userData.favorites.includes(product.id)
                            ? " active"
                            : ""
                        }`}
                      ></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          {product !== -999 ? (
            <div className="d-flex justify-content-center mt-3">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="d-flex justify-content-center mt-3">
              <Page404 />
            </div>
          )}
        </div>
      )}
      ;
    </div>
  );
}
export default ProductDetail;

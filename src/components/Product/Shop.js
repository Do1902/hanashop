import React, { useState, useEffect, useCallback } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import app from "../../firebase";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { Pagination } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import { addCart, addToFavoritesList } from "./ActionsProduct";
import { CheckLogin } from "../Account/ActionsUser";
function Shop() {
  const [loading, setLoading] = useState(true);
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
  const [activePage, setActivePage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [totalPages, setTotalPages] = useState(0);
  const [productList, setProductList] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentProducts, setCurrentProducts] = useState([]);
  const [pageNumbers, setPageNumbers] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [category, setCategory] = useState("");
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const db = getFirestore(app);
      const querySnapshot = await getDocs(collection(db, "products"));
      const productsData = querySnapshot.docs.map((doc) => doc.data());
      const storage = getStorage(app);
      let urls = JSON.parse(localStorage.getItem("imageUrls")) || {};
      const productsWithImages = await Promise.all(
        productsData.map(async (product) => {
          let imageUrl = urls[product.image];
          if (!imageUrl) {
            const imageRef = ref(storage, `images/${product.image}`);
            imageUrl = await getDownloadURL(imageRef);
            urls[product.image] = imageUrl;
            localStorage.setItem("imageUrls", JSON.stringify(urls));
          }
          return { ...product, image: imageUrl };
        })
      );
      setProductList(productsWithImages);
      setLoading(false);
    }
    fetchData();
  }, []);

  useEffect(() => {
    setTotalPages(Math.ceil(filteredProducts.length / itemsPerPage));
  }, [filteredProducts, itemsPerPage]);

  useEffect(() => {
    setFilteredProducts(productList);
  }, [productList]);

  useEffect(() => {
    const startIndex = (activePage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setCurrentProducts(filteredProducts.slice(startIndex, endIndex));
  }, [activePage, filteredProducts, itemsPerPage]);
  // console.log(currentProducts);
  useEffect(() => {
    setPageNumbers([...Array(totalPages).keys()].map((number) => number + 1));
  }, [totalPages]);

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const applyFilters = useCallback(() => {
    let filtered = productList;

    if (searchString) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchString.toLowerCase())
      );
    }
    if (category) {
      filtered = filtered.filter(
        (product) => product.category === parseInt(category)
      );
    }
    if (priceRange) {
      const [minPrice, maxPrice] = priceRange.split(",");
      filtered = filtered.filter(
        (product) =>
          (!minPrice || product.price >= minPrice) &&
          (!maxPrice || product.price <= maxPrice)
      );
    }
    if (sortBy) {
      switch (sortBy) {
        case "tangdan":
          filtered.sort((a, b) => a.price - b.price);
          break;
        case "giamdan":
          filtered.sort((a, b) => b.price - a.price);
          break;
        case "A-Z":
          filtered.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case "Z-A":
          filtered.sort((a, b) => b.name.localeCompare(a.name));
          break;
        default:
          break;
      }
    }

    setFilteredProducts(filtered);
    setActivePage(1);
  }, [searchString, priceRange, category, sortBy, productList]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const FilterBySearch = (value) => {
    setSearchString(value);
  };

  const filterProductsByPriceRange = (value) => {
    setPriceRange(value);
  };

  const sortProducts = (value) => {
    setSortBy(value);
  };
  const FilterByCategory = (value) => {
    setCategory(value);
  };
  const priveVND = (price) => {
    const x = price.toLocaleString("vi", {
      style: "currency",
      currency: "VND",
    });
    return x;
  };
  const addToFavorites = async (id) => {
    addToFavoritesList(userData, id);
    const data = await CheckLogin();
    setUserData(data);
  };
  if (loading === true) {
    return (
      <div className="d-flex justify-content-center mt-3">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  } else {
    return (
      <div className="Shop">
        <div className="breadcrumbs">
          <div
            className="page-header d-flex align-items-center"
            style={{ backgroundImage: `url('assets/img/shop.jpg')` }}
          >
            <div className="container position-relative">
              <div className="row d-flex justify-content-center">
                <div className="col-lg-6 text-center">
                  <h2>Shop</h2>
                  <p>
                    Chào mừng đến với Shop của tôi - Nơi mang đến sự trải nghiệm
                    mua sắm tuyệt vời!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {productList.length > 0 ? (
          <div
            className="p-1 bg-light rounded rounded-pill shadow-sm"
            id="search"
          >
            <div className="input-group">
              <input
                type="search"
                name="search"
                placeholder="Nhập sản phẩm bạn cần tìm?"
                aria-describedby="button-addon1"
                className="form-control border-0 bg-light shadow-none"
                onChange={(e) => FilterBySearch(e.target.value)}
              />
              <div className="input-group-append">
                <button type="" className="btn btn-link text-primary" disabled>
                  <i className="fa fa-search"></i>
                </button>
              </div>
            </div>
          </div>
        ) : null}
        <div className="filter d-flex">
          <select
            className="form-select"
            name=""
            id=""
            defaultValue="Sắp Xếp"
            onChange={(e) => sortProducts(e.target.value)}
          >
            <option value="">Sắp Xếp</option>
            <option value="tangdan">Giá Tăng dần</option>
            <option value="giamdan">Giá Giảm dần</option>
            <option value="A-Z">A-Z</option>
            <option value="Z-A">Z-A</option>
          </select>
          <select
            className="form-select"
            name=""
            id=""
            defaultValue="Khoảng Giá"
            onChange={(e) => filterProductsByPriceRange(e.target.value)}
          >
            <option value="0,Infinity">Khoảng Giá</option>
            <option value="0,1000000">Dưới 1 triệu</option>
            <option value="1000000,2000000">Từ 1-2 triệu</option>
            <option value="2000000,5000000">Từ 2-5 triệu</option>
            <option value="5000000,Infinity">Trên 5 triệu</option>
          </select>
          <select
            className="form-select"
            name=""
            id=""
            defaultValue="Loại Hoa"
            onChange={(e) => FilterByCategory(e.target.value)}
          >
            <option value="">Loại Hoa</option>
            <option value="1">Hoa Bó</option>
            <option value="2">Hoa Bình</option>
            <option value="3">Hoa Hộp</option>
          </select>
        </div>
        {currentProducts.length > 0 ? (
          <div className="Products">
            {currentProducts.map((product) => (
              <div key={product.id} className="product-card">
                <div className="badge">Hot</div>
                <div className="product-tumb">
                  <img src={product.image} alt="" cache="true" />
                </div>
                <div className="product-details">
                  <h4>
                    <Link to={`/productdetail/${product.id}`}>
                      {product.name}
                    </Link>
                  </h4>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Vero, possimus nostrum!
                  </p>
                  <div className="product-bottom-details">
                    <div className="product-price">
                      {priveVND(product.price)}
                    </div>
                    <div className="product-links">
                      <button
                        type="button"
                        className="button-product"
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
                      <button
                        type="button"
                        className="button-product"
                        onClick={() => addCart(product, 1)}
                      >
                        <i className="fa fa-shopping-cart"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="d-flex justify-content-center m-3">
            <div className="text-dark">
              Không có sản phẩm phù hợp với yêu cầu
            </div>
          </div>
        )}
        {filteredProducts.length > 0 ? (
          <div className="d-flex justify-content-center">
            <Pagination>
              <Pagination.First
                disabled={activePage === 1}
                onClick={() => handlePageChange(1)}
              />
              {pageNumbers.map((number) => (
                <Pagination.Item
                  key={number}
                  active={number === activePage}
                  onClick={() => handlePageChange(number)}
                >
                  {number}
                </Pagination.Item>
              ))}
              <Pagination.Last
                disabled={activePage === totalPages}
                onClick={() => handlePageChange(totalPages)}
              />
            </Pagination>
          </div>
        ) : null}
        <div id="mess"></div>
      </div>
    );
  }
}

export default Shop;

import React from "react";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <footer id="footer" className="footer">
      <div className="container">
        <div className="row gy-4">
          <div className="col-lg-5 col-md-12 footer-info">
            <Link to="/" className="logo d-flex align-items-center">
              <span>Shop Flower</span>
            </Link>
            <p>
              Cras fermentum odio eu feugiat lide par naso tierra. Justo eget
              nada terra videa magna derita valies darta donna mare fermentum
              iaculis eu non diam phasellus.
            </p>
            <div className="social-links d-flex mt-4">
              <button className="link-button">
                <i className="bi bi-twitter"></i>
              </button>
              <button className="link-button">
                <i className="bi bi-facebook"></i>
              </button>
              <button className="link-button">
                <i className="bi bi-instagram"></i>
              </button>
              <button className="link-button">
                <i className="bi bi-linkedin"></i>
              </button>
            </div>
          </div>

          <div className="col-lg-2 col-6 footer-links">
            <h4>Useful Links</h4>
            <ul>
              <li>
                <button className="link-button">Home</button>
              </li>
              <li>
                <button className="link-button">About us</button>
              </li>
              <li>
                <button className="link-button">Services</button>
              </li>
              <li>
                <button className="link-button">Terms of service</button>
              </li>
              <li>
                <button className="link-button">Privacy policy</button>
              </li>
            </ul>
          </div>

          <div className="col-lg-2 col-6 footer-links">
            <h4>Our Services</h4>
            <ul>
              <li>
                <button className="link-button">Web Design</button>
              </li>
              <li>
                <button className="link-button">Web Development</button>
              </li>
              <li>
                <button className="link-button">Product Management</button>
              </li>
              <li>
                <button className="link-button">Marketing</button>
              </li>
              <li>
                <button className="link-button">Graphic Design</button>
              </li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-12 footer-contact text-center text-md-start">
            <h4>Contact Us</h4>
            <p>
              12 Trịnh Đình Thảo, Hoà Thanh, Tân Phú, Thành phố Hồ Chí Minh
              <br /> <strong>Phone:</strong> +(028) 397 349 83
              <br />
              <strong>Email:</strong> info@itc.edu.vn
            </p>
          </div>
        </div>
      </div>

      <div className="container mt-4">
        <div className="copyright">
          &copy; Copyright{" "}
          <strong>
            <span>Shop Flower</span>
          </strong>
          . All Rights Reserved
        </div>
        <div className="credits">
          Designed by <a href="https://bootstrapmade.com/">Bùi Văn Đô</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

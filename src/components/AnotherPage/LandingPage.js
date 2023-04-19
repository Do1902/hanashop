import React from "react";
import Carousel from "react-bootstrap/Carousel";
function LandingPage() {
  return (
    <div className="landingpage">
      <Carousel fade touch={true} interval={2000} pause={false}>
        <Carousel.Item>
          <img
            className="d-block"
            src="/assets/img/carousel1.jpg"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>Không Gian Sống Tươi Mới</h3>
            <p>
              Nâng tầm không gian sống với những bông hoa tươi tắn và thơm ngát
              từ cửa hàng của chúng tôi!
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block"
            src="/assets/img/carousel2.jpg"
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3>Cuộc Sống Tràn Đầy Màu Sắc</h3>
            <p>
              Mỗi bông hoa đều là một tác phẩm nghệ thuật đầy màu sắc và sự
              sống. Đặt hàng ngay để mang vẻ đẹp đó vào ngôi nhà của bạn!
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block"
            src="/assets/img/carousel3.jpg"
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3>Những Món Quà Ý Nghĩa</h3>
            <p>
              Gửi tặng những món quà ý nghĩa nhất với những bó hoa tươi nguyên
              sơ của chúng tôi, chắc chắn sẽ làm người nhận vô cùng hạnh phúc!
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <section className="features-icons bg-light text-center">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                <div className="features-icons-icon d-flex">
                  <i className="fa-regular fa-circle-check m-auto text-primary"></i>
                </div>
                <h3>Fully Responsive</h3>
                <p className="lead mb-0">
                  Complete range of floral products available. We have
                  everything you need!
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                <div className="features-icons-icon d-flex">
                  <i className="bi bi-shop-window m-auto text-primary"></i>
                </div>
                <h3>Shop Is Ready</h3>
                <p className="lead mb-0">
                  Featured with the latest designs of flowers!
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="features-icons-item mx-auto mb-0 mb-lg-3">
                <div className="features-icons-icon d-flex">
                  <i className="fa-solid fa-pen-ruler m-auto text-primary"></i>
                </div>
                <h3>Easy to All</h3>
                <p className="lead mb-0">
                  Ready to design with your own template or custom design with
                  you!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="showcase">
        <div className="container-fluid p-0">
          <div className="row g-0">
            <div className="col-lg-6 order-lg-2 text-white showcase-img showcase1"></div>
            <div className="col-lg-6 order-lg-1 my-auto showcase-text">
              <h2>Fully Design</h2>
              <p className="lead mb-0">
                Designing flowers is not just a job, it's an art that requires
                creativity, passion, and a deep understanding of nature's
                beauty.
              </p>
            </div>
          </div>
          <div className="row g-0">
            <div className="col-lg-6 text-white showcase-img showcase3"></div>
            <div className="col-lg-6 my-auto showcase-text">
              <h2>Updated For Flower</h2>
              <p className="lead mb-0">
                Updated flowers bring a fresh and modern twist to traditional
                floral arrangements, allowing us to appreciate the timeless
                beauty of nature in a new and exciting way.
              </p>
            </div>
          </div>
          <div className="row g-0">
            <div className="col-lg-6 order-lg-2 text-white showcase-img showcase2"></div>
            <div className="col-lg-6 order-lg-1 my-auto showcase-text">
              <h2>Easy and fast ordering</h2>
              <p className="lead mb-0">
                Ordering flowers has never been easier - our streamlined process
                allows you to quickly and efficiently select the perfect blooms
                for any occasion, with fast and reliable delivery to your door.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="testimonials text-center bg-light">
        <div className="container">
          <h2 className="mb-5">What people are saying...</h2>
          <div className="row">
            <div className="col-lg-3">
              <div className="testimonial-item mx-auto mb-5 mb-lg-0">
                <img
                  className="img-fluid rounded-circle mb-3"
                  src="https://raw.githubusercontent.com/NguyenVoMinhQuan/reactimgs/main/z4210973301692_1c76a73cc48a40cc799ed0359111c98c.jpg"
                  alt="..."
                />
                <h5>Bùi Văn Đô</h5>
                <p className="font-weight-light mb-0">
                  "Y như cái tên của mình chú Đô đã gánh đội trên toàn mặt trận
                  "
                </p>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="testimonial-item mx-auto mb-5 mb-lg-0">
                <img
                  className="img-fluid rounded-circle mb-3"
                  src="https://raw.githubusercontent.com/NguyenVoMinhQuan/reactimgs/main/3.jpg"
                  alt="..."
                />
                <h5>Nguyễn Đình Thanh Khoa</h5>
                <p className="font-weight-light mb-0">
                  "Đồng hành cùng chú Đô ta có chú Khoa chúa tể code trên con
                  máy tàn nhưng không phế!"
                </p>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="testimonial-item mx-auto mb-5 mb-lg-0">
                <img
                  className="img-fluid rounded-circle mb-3"
                  src="https://raw.githubusercontent.com/NguyenVoMinhQuan/reactimgs/main/4.jpg"
                  alt="..."
                />
                <h5>Nguyễn Võ Minh Quân</h5>
                <p className="font-weight-light mb-0">
                  "Là team leader bù nhìn không làm được cái gì cả chỉ rủ rê anh
                  em đi cafe làm bài, tốn hơi nhiều xèng đãi anh em chầu nước."
                </p>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="testimonial-item mx-auto mb-5 mb-lg-0">
                <img
                  className="img-fluid rounded-circle mb-3"
                  src="https://raw.githubusercontent.com/NguyenVoMinhQuan/reactimgs/main/2.jpg"
                  alt="..."
                />
                <h5>Phan Văn Thọ</h5>
                <p className="font-weight-light mb-0">
                  "Báo thủ, chú Đô nhìn bài than trời nhưng ít ra còn làm bài
                  nhiều hơn thèn team leader!"
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;

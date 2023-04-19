import React from "react";
function About() {
  return (
    <div className="About">
      <div className="breadcrumbs">
        <div
          className="page-header d-flex align-items-center"
          style={{
            backgroundImage: `url('https://raw.githubusercontent.com/NguyenVoMinhQuan/reactimgs/main/6.jpg')`,
          }}
        >
          <div className="container position-relative">
            <div className="row d-flex justify-content-center">
              <div className="col-lg-6 text-center">
                <h2>About</h2>
                <p>
                  Những con người cùng chung chí hướng. Những cá thể không có gì
                  nổi trội. Chúng tôi ghép với nhau để tạo nên một tập thể vững
                  mạnh bềnh chặt gắn bó.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section id="about" className="about">
        <div className="container" data-aos="fade-up">
          <div className="row gy-4">
            <div className="col-lg-6 position-relative align-self-start order-lg-last order-first">
              <img
                src="https://raw.githubusercontent.com/NguyenVoMinhQuan/reactimgs/main/5.jpg"
                className="img-fluid"
                alt=""
              />
              <a
                href="https://www.youtube.com/watch?v=LZN4I3K8SC0"
                className="glightbox play-btn"
              >
                {null}
              </a>
            </div>
            <div className="col-lg-6 content order-last  order-lg-first">
              <h3>About Us</h3>
              <p>
                Là những sinh viên ITC kiểu mấu. Chúng tôi bổ trợ cho nhau về
                mọi mặt. Giúp đỡ hoàn thiện lẫn nhau dẫn đếnt kết quả tốt nhất.
              </p>
              <ul>
                <li data-aos="fade-up" data-aos-delay="100">
                  <i className="bi bi-diagram-3"></i>
                  <div>
                    <h5>Hoạt động đội nhóm</h5>
                    <p>
                      Phân chia cụ thể các hoạt động đề ra của nhóm để tạo sự
                      công bằng và hiệu quả.
                    </p>
                  </div>
                </li>
                <li data-aos="fade-up" data-aos-delay="200">
                  <i className="bi bi-fullscreen-exit"></i>
                  <div>
                    <h5>Tập trung</h5>
                    <p>
                      Tập trung vào thái độ và chất lượng công việc mang đến cho
                      người dùng những gì tuyệt vời nhất.
                    </p>
                  </div>
                </li>
                <li data-aos="fade-up" data-aos-delay="300">
                  <i className="bi bi-broadcast"></i>
                  <div>
                    <h5>Liên Kết</h5>
                    <p>
                      Vận dụng nhiều nguồn lực tạo ra những liên kết chặt chẽ
                      giữa người dùng và đội nhóm.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section id="team" className="team pt-0">
        <div className="container" data-aos="fade-up">
          <div className="section-header">
            <span>Our Team</span>
            <h2>Our Team</h2>
          </div>

          <div className="row" data-aos="fade-up" data-aos-delay="100">
            <div className="col-lg-3 col-md-6 d-flex">
              <div className="member">
                <img
                  src="https://raw.githubusercontent.com/NguyenVoMinhQuan/reactimgs/main/4.jpg"
                  className="img-fluid"
                  alt=""
                />
                <div className="member-content">
                  <h4>Nguyễn Võ Minh Quân</h4>
                  <span>Team Leader</span>
                  <p>
                    Leader của nhóm nói chung chỉ trên danh nghĩa. Là người đầu
                    tàu đưa ra ý kiến. Tạo việc làm cho cả nhóm dù chả làm gì.
                  </p>
                  <div className="social">
                    <a href="# ">
                      <i className="bi bi-facebook"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 d-flex">
              <div className="member">
                <img
                  src="https://raw.githubusercontent.com/NguyenVoMinhQuan/reactimgs/main/2.jpg"
                  className="img-fluid"
                  alt=""
                />
                <div className="member-content">
                  <h4>Phan Văn Thọ</h4>
                  <span>Content</span>
                  <p>
                    Báo thủ chỉnh hiệu, có rất nhiều kiến thức nền nhưng hay
                    choke nên bị chú Đô Clrl+A del bài mãi.
                  </p>
                  <div className="social">
                    <a href="# ">
                      <i className="bi bi-facebook"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 d-flex">
              <div className="member">
                <img
                  src="https://raw.githubusercontent.com/NguyenVoMinhQuan/reactimgs/main/3.jpg"
                  className="img-fluid"
                  alt=""
                />
                <div className="member-content">
                  <h4>Nguyễn Đình Thanh Khoa</h4>
                  <span>Web Development</span>
                  <p>
                    Là đồng đội chính hiệu của chú Đô, luôn luôn giúp đỡ song
                    hành cùng chú Đô trên mọi mặt trận dù con máy cà tàng.
                  </p>
                  <div className="social">
                    <a href="# ">
                      <i className="bi bi-facebook"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 d-flex">
              <div className="member">
                <img
                  src="https://raw.githubusercontent.com/NguyenVoMinhQuan/reactimgs/main/z4210973301692_1c76a73cc48a40cc799ed0359111c98c.jpg"
                  className="img-fluid"
                  alt=""
                />
                <div className="member-content">
                  <h4>Bùi Văn Đô</h4>
                  <span>Web Development</span>
                  <p>
                    Là người gánh chỉnh cả đội. Luôn luôn tìm tòi cái mới gánh
                    cả nhóm. Đúng là con người có phụ nữ sau lưng.
                  </p>
                  <div className="social">
                    <a href="# ">
                      <i className="bi bi-facebook"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="faq" className="faq">
        <div className="container" data-aos="fade-up">
          <div className="section-header">
            <span>Frequently Asked Questions</span>
            <h2>Frequently Asked Questions</h2>
          </div>

          <div
            className="row justify-content-center"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div className="col-lg-10">
              <div className="accordion accordion-flush" id="faqlist">
                <div className="accordion-item">
                  <h3 className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#faq-content-1"
                    >
                      <i className="bi bi-question-circle question-icon"></i>
                      Non consectetur a erat nam at lectus urna duis?
                    </button>
                  </h3>
                  <div
                    id="faq-content-1"
                    className="accordion-collapse collapse"
                    data-bs-parent="#faqlist"
                  >
                    <div className="accordion-body">
                      Feugiat pretium nibh ipsum consequat. Tempus iaculis urna
                      id volutpat lacus laoreet non curabitur gravida. Venenatis
                      lectus magna fringilla urna porttitor rhoncus dolor purus
                      non.
                    </div>
                  </div>
                </div>

                <div className="accordion-item">
                  <h3 className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#faq-content-2"
                    >
                      <i className="bi bi-question-circle question-icon"></i>
                      Feugiat scelerisque varius morbi enim nunc faucibus a
                      pellentesque?
                    </button>
                  </h3>
                  <div
                    id="faq-content-2"
                    className="accordion-collapse collapse"
                    data-bs-parent="#faqlist"
                  >
                    <div className="accordion-body">
                      Dolor sit amet consectetur adipiscing elit pellentesque
                      habitant morbi. Id interdum velit laoreet id donec
                      ultrices. Fringilla phasellus faucibus scelerisque
                      eleifend donec pretium. Est pellentesque elit ullamcorper
                      dignissim. Mauris ultrices eros in cursus turpis massa
                      tincidunt dui.
                    </div>
                  </div>
                </div>

                <div className="accordion-item">
                  <h3 className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#faq-content-3"
                    >
                      <i className="bi bi-question-circle question-icon"></i>
                      Dolor sit amet consectetur adipiscing elit pellentesque
                      habitant morbi?
                    </button>
                  </h3>
                  <div
                    id="faq-content-3"
                    className="accordion-collapse collapse"
                    data-bs-parent="#faqlist"
                  >
                    <div className="accordion-body">
                      Eleifend mi in nulla posuere sollicitudin aliquam ultrices
                      sagittis orci. Faucibus pulvinar elementum integer enim.
                      Sem nulla pharetra diam sit amet nisl suscipit. Rutrum
                      tellus pellentesque eu tincidunt. Lectus urna duis
                      convallis convallis tellus. Urna molestie at elementum eu
                      facilisis sed odio morbi quis
                    </div>
                  </div>
                </div>

                <div className="accordion-item">
                  <h3 className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#faq-content-4"
                    >
                      <i className="bi bi-question-circle question-icon"></i>
                      Ac odio tempor orci dapibus. Aliquam eleifend mi in nulla?
                    </button>
                  </h3>
                  <div
                    id="faq-content-4"
                    className="accordion-collapse collapse"
                    data-bs-parent="#faqlist"
                  >
                    <div className="accordion-body">
                      <i className="bi bi-question-circle question-icon"></i>
                      Dolor sit amet consectetur adipiscing elit pellentesque
                      habitant morbi. Id interdum velit laoreet id donec
                      ultrices. Fringilla phasellus faucibus scelerisque
                      eleifend donec pretium. Est pellentesque elit ullamcorper
                      dignissim. Mauris ultrices eros in cursus turpis massa
                      tincidunt dui.
                    </div>
                  </div>
                </div>

                <div className="accordion-item">
                  <h3 className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#faq-content-5"
                    >
                      <i className="bi bi-question-circle question-icon"></i>
                      Tempus quam pellentesque nec nam aliquam sem et tortor
                      consequat?
                    </button>
                  </h3>
                  <div
                    id="faq-content-5"
                    className="accordion-collapse collapse"
                    data-bs-parent="#faqlist"
                  >
                    <div className="accordion-body">
                      Molestie a iaculis at erat pellentesque adipiscing
                      commodo. Dignissim suspendisse in est ante in. Nunc vel
                      risus commodo viverra maecenas accumsan. Sit amet nisl
                      suscipit adipiscing bibendum est. Purus gravida quis
                      blandit turpis cursus in
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default About;

import logo from '../assets/images/logo.png'
import Banner from '../assets/images/banner-img.png'
import AboutBanner from '../assets/images/about-img.png'
import OderItem1 from '../assets/images/img-1.png'
import OderItem2 from '../assets/images/img-2.png'
import OderItem3 from '../assets/images/img-3.png'
import OderItem4 from '../assets/images/img-4.png'
import OderItem5 from '../assets/images/img-5.png'
import ImageIcon1 from '../assets/images/icon-1.png'
import ImageIcon2 from '../assets/images/icon-2.png'
import ClinetImage from '../assets/images/client-img.png'


const HomePage = () => {
  return (
    <>
      <div className="header_section">
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="index.html">
              <img src={logo} />
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item active">
                  <a className="nav-link" href="index.html">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="about.html">
                    About
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="icecream.html">
                    Icecream
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="services.html">
                    Services
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="blog.html">
                    Blog
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="contact.html">
                    Contact Us
                  </a>
                </li>
              </ul>
              <form className="form-inline my-2 my-lg-0">
                <div className="login_bt">
                  <a href="#">
                    Login{" "}
                    <span style={{ color: "#222222" }}>
                      <i className="fa fa-user" aria-hidden="true" />
                    </span>
                  </a>
                </div>
                <div className="fa fa-search form-control-feedback" />
              </form>
            </div>
          </nav>
        </div>
        {/* banner section start */}
        <div className="banner_section layout_padding">
          <div className="container">
            <div
              id="carouselExampleIndicators"
              className="carousel slide"
              data-ride="carousel"
            >
              <ol className="carousel-indicators">
                <li
                  data-target="#carouselExampleIndicators"
                  data-slide-to={0}
                  className="active"
                >
                  01
                </li>
                <li data-target="#carouselExampleIndicators" data-slide-to={1}>
                  02
                </li>
                <li data-target="#carouselExampleIndicators" data-slide-to={2}>
                  03
                </li>
                <li data-target="#carouselExampleIndicators" data-slide-to={3}>
                  04
                </li>
              </ol>
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <div className="row">
                    <div className="col-sm-6">
                      <h1 className="banner_taital">Ice Cream</h1>
                      <p className="banner_text">
                        It is a long established fact that a reader will be
                        distracted by the readable content of a page when looking at
                        its layout. The point of using Lorem
                      </p>
                      <div className="started_text">
                        <a href="#">Order Now</a>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="banner_img">
                        <img src={Banner} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="carousel-item">
                  <div className="row">
                    <div className="col-sm-6">
                      <h1 className="banner_taital">Ice Cream</h1>
                      <p className="banner_text">
                        It is a long established fact that a reader will be
                        distracted by the readable content of a page when looking at
                        its layout. The point of using Lorem
                      </p>
                      <div className="started_text">
                        <a href="#">Order Now</a>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="banner_img">
                        <img src="images/banner-img.png" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="carousel-item">
                  <div className="row">
                    <div className="col-sm-6">
                      <h1 className="banner_taital">Ice Cream</h1>
                      <p className="banner_text">
                        It is a long established fact that a reader will be
                        distracted by the readable content of a page when looking at
                        its layout. The point of using Lorem
                      </p>
                      <div className="started_text">
                        <a href="#">Order Now</a>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="banner_img">
                        <img src="images/banner-img.png" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="carousel-item">
                  <div className="row">
                    <div className="col-sm-6">
                      <h1 className="banner_taital">Ice Cream</h1>
                      <p className="banner_text">
                        It is a long established fact that a reader will be
                        distracted by the readable content of a page when looking at
                        its layout. The point of using Lorem
                      </p>
                      <div className="started_text">
                        <a href="#">Order Now</a>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="banner_img">
                        <img src="images/banner-img.png" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* banner section end */}
      </div>
      {/* header section end */}
      {/* about sectuion start */}
      <div className="about_section layout_padding">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="about_img">
                <img src={AboutBanner} />
              </div>
            </div>
            <div className="col-md-6">
              <h1 className="about_taital">About Icecream</h1>
              <p className="about_text">
                Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Duis aute irure dolor in reprehenderit in voluptate velit
                esse cillum dolore euconsectetur adipiscing esequat. Duis aute irure
                dolor in reprehenderit in voluptate velit esse cillum dolore eu
              </p>
              <div className="read_bt_1">
                <a href="#">Read More</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* about sectuion end */}
      {/* cream sectuion start */}
      <div className="cream_section layout_padding">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="cream_taital">Our Featured Ice Cream</h1>
              <p className="cream_text">
                tempor incididunt ut labore et dolore magna aliqua
              </p>
            </div>
          </div>
          <div className="cream_section_2">
            <div className="row">
              <div className="col-md-4">
                <div className="cream_box">
                  <div className="cream_img">
                    <img src={OderItem1} />
                  </div>
                  <div className="price_text">$10</div>
                  <h6 className="strawberry_text">Strawberry Ice Cream</h6>
                  <div className="cart_bt">
                    <a href="#">Add To Cart</a>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="cream_box">
                  <div className="cream_img">
                    <img src={OderItem2} />
                  </div>
                  <div className="price_text">$10</div>
                  <h6 className="strawberry_text">Strawberry Ice Cream</h6>
                  <div className="cart_bt">
                    <a href="#">Add To Cart</a>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="cream_box">
                  <div className="cream_img">
                    <img src={OderItem3} />
                  </div>
                  <div className="price_text">$10</div>
                  <h6 className="strawberry_text">Strawberry Ice Cream</h6>
                  <div className="cart_bt">
                    <a href="#">Add To Cart</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="cream_section_2">
            <div className="row">
              <div className="col-md-4">
                <div className="cream_box">
                  <div className="cream_img">
                    <img src={OderItem4} />
                  </div>
                  <div className="price_text">$10</div>
                  <h6 className="strawberry_text">Strawberry Ice Cream</h6>
                  <div className="cart_bt">
                    <a href="#">Add To Cart</a>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="cream_box">
                  <div className="cream_img">
                    <img src={OderItem5} />
                  </div>
                  <div className="price_text">$10</div>
                  <h6 className="strawberry_text">Strawberry Ice Cream</h6>
                  <div className="cart_bt">
                    <a href="#">Add To Cart</a>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="cream_box">
                  <div className="cream_img">
                    <img src={OderItem1} />
                  </div>
                  <div className="price_text">$10</div>
                  <h6 className="strawberry_text">Strawberry Ice Cream</h6>
                  <div className="cart_bt">
                    <a href="#">Add To Cart</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="seemore_bt">
            <a href="#">See More</a>
          </div>
        </div>
      </div>
      {/* cream sectuion end */}
      {/* services section start */}
      <div className="services_section layout_padding">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="services_taital">Our Ice Cream Services</h1>
              <p className="services_text">
                tempor incididunt ut labore et dolore magna aliqua
              </p>
            </div>
          </div>
          <div className="services_section_2">
            <div className="row">
              <div className="col-md-4">
                <div className="services_box">
                  <h5 className="tasty_text">
                    <span className="icon_img">
                      <img src={ImageIcon1} />
                    </span>
                    Cookies Ice Cream
                  </h5>
                  <p className="lorem_text">
                    commodo consequat. Duis aute irure dolor in reprehenderit in
                    voluptate velit esse cillum dolore eu fat{" "}
                  </p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="services_box">
                  <h5 className="tasty_text">
                    <span className="icon_img">
                      <img src={ImageIcon2} />
                    </span>
                    Cookies Ice Cream
                  </h5>
                  <p className="lorem_text">
                    commodo consequat. Duis aute irure dolor in reprehenderit in
                    voluptate velit esse cillum dolore eu fat{" "}
                  </p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="services_box">
                  <h5 className="tasty_text">
                    <span className="icon_img">
                      <img src={ImageIcon1} />
                    </span>
                    Cookies Ice Cream
                  </h5>
                  <p className="lorem_text">
                    commodo consequat. Duis aute irure dolor in reprehenderit in
                    voluptate velit esse cillum dolore eu fat{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="seemore_bt">
            <a href="#">Read More</a>
          </div>
        </div>
      </div>
      {/* services section end */}
      {/* testimonial section start */}
      <div className="testimonial_section layout_padding">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="testimonial_taital">Testimonial</h1>
            </div>
          </div>
          <div className="testimonial_section_2">
            <div className="row">
              <div className="col-md-12">
                <div className="testimonial_box">
                  <div
                    id="main_slider"
                    className="carousel slide"
                    data-ride="carousel"
                  >
                    <div className="carousel-inner">
                      <div className="carousel-item active">
                        <p className="testimonial_text">
                          tempor incididunt ut labore et dolore magna aliqua. Ut
                          enim ad minim veniam, quis nostrud exercitation ullamco
                          laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                          irure dolor in reprehenderit in voluptate velit esse
                          cillum dolore eu fugiat nulla pariatur. Excepteur sint
                        </p>
                        <h4 className="client_name">Marri Fen</h4>
                        <div className="client_img">
                          <img src={ClinetImage} />
                        </div>
                      </div>
                      <div className="carousel-item">
                        <p className="testimonial_text">
                          tempor incididunt ut labore et dolore magna aliqua. Ut
                          enim ad minim veniam, quis nostrud exercitation ullamco
                          laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                          irure dolor in reprehenderit in voluptate velit esse
                          cillum dolore eu fugiat nulla pariatur. Excepteur sint
                        </p>
                        <h4 className="client_name">Marri Fen</h4>
                        <div className="client_img">
                          <img src="images/client-img.png" />
                        </div>
                      </div>
                      <div className="carousel-item">
                        <p className="testimonial_text">
                          tempor incididunt ut labore et dolore magna aliqua. Ut
                          enim ad minim veniam, quis nostrud exercitation ullamco
                          laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                          irure dolor in reprehenderit in voluptate velit esse
                          cillum dolore eu fugiat nulla pariatur. Excepteur sint
                        </p>
                        <h4 className="client_name">Marri Fen</h4>
                        <div className="client_img">
                          <img src="images/client-img.png" />
                        </div>
                      </div>
                    </div>
                    <a
                      className="carousel-control-prev"
                      href="#main_slider"
                      role="button"
                      data-slide="prev"
                    >
                      <i className="fa fa-angle-left" />
                    </a>
                    <a
                      className="carousel-control-next"
                      href="#main_slider"
                      role="button"
                      data-slide="next"
                    >
                      <i className="fa fa-angle-right" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* testimonial section end */}
      {/* contact section start */}
      <div className="contact_section layout_padding">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="contact_main">
                <h1 className="contact_taital">Contact Us</h1>
                <form action="/action_page.php">
                  <div className="form-group">
                    <input
                      type="text"
                      className="email-bt"
                      placeholder="Name"
                      name="Name"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="email-bt"
                      placeholder="Email"
                      name="Name"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="email-bt"
                      placeholder="Phone Numbar"
                      name="Email"
                    />
                  </div>
                  <div className="form-group">
                    <textarea
                      className="massage-bt"
                      placeholder="Massage"
                      rows={5}
                      id="comment"
                      name="Massage"
                      defaultValue={""}
                    />
                  </div>
                </form>
                <div className="main_bt">
                  <a href="#">SEND</a>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <div className="location_text">
                <ul>
                  <li>
                    <a href="#">
                      <span className="padding_left_10 active">
                        <i className="fa fa-map-marker" aria-hidden="true" />
                      </span>
                      Making this the first true
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <span className="padding_left_10">
                        <i className="fa fa-phone" aria-hidden="true" />
                      </span>
                      Call : +01 1234567890
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <span className="padding_left_10">
                        <i className="fa fa-envelope" aria-hidden="true" />
                      </span>
                      Email : demo@gmail.com
                    </a>
                  </li>
                </ul>
              </div>
              <div className="mail_main">
                <h3 className="newsletter_text">Newsletter</h3>
                <div className="form-group">
                  <textarea
                    className="update_mail"
                    placeholder="Enter Your Email"
                    rows={5}
                    id="comment"
                    name="Enter Your Email"
                    defaultValue={""}
                  />
                  <div className="subscribe_bt">
                    <a href="#">Subscribe</a>
                  </div>
                </div>
              </div>
              <div className="footer_social_icon">
                <ul>
                  <li>
                    <a href="#">
                      <i className="fa fa-facebook" aria-hidden="true" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-twitter" aria-hidden="true" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-linkedin" aria-hidden="true" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-instagram" aria-hidden="true" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* contact section end */}
      {/* copyright section start */}
      <div className="copyright_section">
        <div className="container">
          <p className="copyright_text">
            2020 All Rights Reserved. Design by{" "}
            <a href="https://html.design">Free Html Templates</a> Distribution by{" "}
            <a href="https://themewagon.com">ThemeWagon</a>
          </p>
        </div>
      </div>
      {/* copyright section end */}
      {/* Javascript files*/}
      {/* sidebar */}
      {/* javascript */}
    </>

  )
}

export default HomePage

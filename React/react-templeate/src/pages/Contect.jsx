import React from 'react'

const Contect = () => {
  return (
    <>
      <div className="header_section header_bg">
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="index.html">
              <img src="images/logo.png" />
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
      </div>
      {/* header section end */}
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

export default Contect

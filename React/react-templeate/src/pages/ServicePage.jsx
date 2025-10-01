import Icons from '../assets/images/icon-1.png'
import icon_img from '../assets/images/icon-2.png';

const ServicePage = () => {
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
                      <img src={icon_img} />
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
                      <img src={Icons} />
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
                      <img src={Icons} />
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
      {/* copyright section start */}
      <div className="copyright_section margin_top90">
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

export default ServicePage

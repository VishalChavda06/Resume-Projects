import logo from '../assets/images/logo.png'
import AboutIce from '../assets/images/about-img.png'
const AboutPage = () => {
  return (
    <>
      <div className="header_section header_bg">
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
      </div>
      {/* header section end */}
      {/* about sectuion start */}
      <div className="about_section layout_padding">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="about_img">
                <img src={AboutIce} />
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

export default AboutPage

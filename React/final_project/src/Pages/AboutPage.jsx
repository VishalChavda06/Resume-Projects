import { Link } from "react-router";

const AboutPage = () => {
  return (
    <>
      <div className="mb-10 bg-white">
        {/* Header Section */}
        <div className="h-[250px] bg-[url('https://gearo-html.vercel.app/images/page-title/page-title-6.jpg')] text-white bg-fixed py-12">
          <div className="max-w-[1400px] mx-auto px-8">
            <h1 className="text-4xl font-semibold mb-2">About</h1>
            <div className="text-base text-white">
              <Link to="/" className="hover:underline">
                Homepage
              </Link>{" "}
              <span>&gt;</span> <span>Page</span> <span>&gt;</span>{" "}
              <span>About Us</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-center mt-10 text-6xl">We Are Gear0</h1>
          <p className="text-center mt-8 px-97 text-gray-800">
            We create unique furniture that improves the new ways in which
            people live, work and play. For more than 70 years, we've
            collaborated with the world's best designers to create furniture
            renowned for its modularity, functionality, and uncompromising
            quality.
          </p>
        </div>
        {/* banner Image */}
      </div>
      <div className="mx-30 mb-5 ">
        <img
          src="https://gearonextjs.vercel.app/images/section/section-about.jpg"
          className="rounded-4xl"
          alt=""
        />
      </div>
      {/* About text Context */}
      <div className=" mx-30 flex justify-between p-2">
        <div className=" w-[48%] ">
          <h1 className="text-4xl mb-2">Our Mission</h1>
          <p className="text-gray-700 ps-2">
            To create growth opportunities through education, community
            engagement, and innovative solutions. Our mission is to uplift the
            lives of people in Odisha by driving positive social change,
            enhancing access to resources, and fostering equitable development
            across the region.
          </p>
        </div>
        <div className=" w-[48%]">
          <h1 className="text-4xl mb-2">Our Vision</h1>
          <p className="text-gray-700 ps-2">
            To empower the people of Odisha by promoting sustainable
            development, preserving cultural heritage, and fostering innovation.
            Our vision is to build a thriving community where economic growth
            and social progress go hand in hand, ensuring a brighter future for
            all.
          </p>
        </div>
      </div>
      {/*Side with Banner Context  */}
      <div className=" mt-10 mx-30 p-2 flex justify-between">
        <div className="p-1 w-[48%]">
          <img
            src="https://gearonextjs.vercel.app/images/section/box-about.jpg"
            className="rounded-3xl"
            alt=""
          />
        </div>
        <div className="p-10 w-[48%] flex flex-col gap-4">
          <div className="p-1 ">
            <h1 className="text-4xl ">Danish Design DNA</h1>
            <p className=" mt-4 text-gray-700 text-[18px]">
              GearO products reflect the values of craftsmanship, simplicity,
              functionality and quality materials that define our Danish design
              roots.
            </p>
          </div>

          <div className=" p-4 flex mt-2">
            <div className=" me-2 p-2">icon</div>
            <div className=" ps-4 p-5">
              <div>
                <h1 className="font-bold text-xl">Form</h1>
              </div>
              <div>
                <p>
                  We carefully consider each detail, giving our designs a
                  feeling of pure precision and purposeful craft.
                </p>
              </div>
            </div>
          </div>
          <div className=" p-4 flex mt-2">
            <div className=" me-2 p-2">icon</div>
            <div className=" ps-4 p-5">
              <div>
                <h1 className="font-bold text-xl">Feel</h1>
              </div>
              <div>
                <p>
                  Irresistibly crafted. Our products are intuitively inviting
                  and welcoming, appealing to the senses.
                </p>
              </div>
            </div>
          </div>
          <div className=" p-4 flex mt-2">
            <div className=" me-2 p-2">icon</div>
            <div className=" ps-4 p-5">
              <div>
                <h1 className="font-bold text-xl">Functionality</h1>
              </div>
              <div>
                <p>
                  Our designs are purposeful, carrying on the Danish tradition
                  of design that values functionality and form.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Meet Out Team's */}
      <div className="mx-30 p-2">
        <h1 className="text-center text-4xl">Meet Out Team's</h1>
        <p className="text-center mt-2 text-gray-700">
          Discover exceptional experiences through testimonials from our
          satisfied customers.
        </p>
      </div>

      <div className=" flex justify-around mx-30 p-3 gap-2.5">
        <div className=" p-1 ">
          <img
            src="https://gearonextjs.vercel.app/images/section/team-1.jpg"
            className="rounded-xl"
            alt=""
          />
          <div className="mt-5 ps-2">
            <h4>
              <a href="#" className="text-2xl font-medium">
                Dr. Emily Stevens
              </a>
            </h4>
            <p>Co-Founder</p>
          </div>
        </div>
        <div className=" p-1">
          <img
            src="https://gearonextjs.vercel.app/images/section/team-2.jpg"
            className="rounded-xl"
            alt=""
          />
          <div className="mt-5 ps-2">
            <h4>
              <a href="#" className="text-2xl font-medium">
                Michael Cater
              </a>
            </h4>
            <p>Chief Operating Officer</p>
          </div>
        </div>
        <div className=" p-1">
          <img
            src="https://gearonextjs.vercel.app/images/section/team-3.jpg"
            className="rounded-xl"
            alt=""
          />
          <div className="mt-5 ps-2">
            <h4>
              <a href="#" className="text-2xl font-medium">
                Sarah Martinez
              </a>
            </h4>
            <p>Marketing</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;

import React from 'react'

const ContactPage = () => {
  return (
    <>
      {/* Map */}
      <div style={{ width: "100%", height: "450px" }}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d212675.20202903735!2d72.41492881144384!3d23.020474101422124!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e848aba5bd449%3A0x4fcedd11614f6516!2sAhmedabad%2C%20Gujarat!5e1!3m2!1sen!2sin!4v1755253702637!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Ahmadabad Map"
        ></iframe>
      </div>
      {/* Information */}
      <div className=' p-3 mx-20 mt-6 flex justify-between mb-10'>
        <div className=' p-2 w-[49%] font-lighter'>
          <div>
            <h1 className='font-medium text-3xl'>New York</h1>
          </div>
          <div className='mt-9'>
            <h4>Phone:</h4>
            <p>+1 666 234 8888</p>
          </div>
          <div className='mt-9'>
            <h4>Email:</h4>
            <p>example@example.com</p>
          </div>
          <div className='mt-9'>
            <h4>Address:</h4>
            <p>+2163 Phillips Gap Rd, West Jefferson, North Carolina , <br /> United States </p>
          </div>
          <div className='mt-9'>
            <h4>Open Time::</h4>
            <p>Mon - Sat:
              7:30am - 8:00pm PST
              <br />
              Sunday:
              9:00am - 5:00pm PST </p>
          </div>
        </div>
        <div className='p-2 w-[49%]'>
          <h2 className="text-3xl font-medium mb-4">Get In Touch</h2>
          <p className="mb-6 text-lg">Use the form below to get in touch with the sales team</p>
          <form className="space-y-4">
            <div className="flex gap-4 mb-4">
              <input type="text" placeholder="Your Name*" className="flex-1 border rounded px-4 py-3 text-lg" />
              <input type="email" placeholder="Your Email*" className="flex-1 border rounded px-4 py-3 text-lg" />
            </div>
            <div className="flex gap-4 mb-4">
              <input type="text" placeholder="Phone*" className="flex-1 border rounded px-4 py-3 text-lg" />
              <input type="text" placeholder="Order Numbers*" className="flex-1 border rounded px-4 py-3 text-lg" />
            </div>
            <div className="mb-4">
              <textarea placeholder="Your Message*" className="w-full border rounded px-4 py-3 text-lg min-h-[150px]" />
            </div>
            <button type="submit" className="bg-black text-white rounded-full px-8 py-4 text-lg flex items-center gap-2 hover:bg-gray-800 transition">
              Send Message
              <span aria-hidden="true">→</span>
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default ContactPage

import React from 'react'
import '../styles/Contact/Contact.css'
const Contact = () => {
  return (
    <section className='contact-section'>
        <div className="section-top">
            <input placeholder='Your Name' type="text" />
            <input  placeholder='Your Email' type="text" />
            <input placeholder='Your Phone' type="text" />
        </div>
        <div className="section-bottom">
        <textarea placeholder='Your Message' cols="50" rows="10"></textarea>
        </div>
        <button>Send Message</button>
    </section>
  )
}

export default Contact
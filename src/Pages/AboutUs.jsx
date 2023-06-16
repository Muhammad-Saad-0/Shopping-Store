import React from 'react'
import Footer from '../Components/Footer/Footer'
import '../styles/about/aboutus.css'
const AboutUs = () => {
  return (
    <>

<div className="about-section">
    <div className="about-left">
       <p>Our Story</p>
       <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias aliquam, illo vero perferendis corrupti laudantium dignissimos nostrum voluptate obcaecati illum numquam hic nisi minima natus cumque suscipit voluptatem consectetur recusandae officiis vel labore tenetur odio. Nesciunt incidunt soluta ex doloremque. Maiores commodi velit nisi ullam numquam molestias at officiis quo vitae voluptas sed, saepe recusandae minus unde error odit natus nam exercitationem laudantium perferendis veritatis. Ratione quam, consectetur voluptates nihil incidunt consequuntur velit iusto molestias aspernatur! Recusandae non incidunt maxime? Hic enim labore culpa, nisi maxime, repudiandae beatae sequi earum harum ex rerum? Blanditiis adipisci minima, in odio quis velit!</p>
    </div>
    <div className="about-right">
        <img src="https://images.unsplash.com/photo-1682306002010-c4dbcbef02f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80" alt="" />
    </div>
</div>
    {/* <section className="about-footer" > */}
    <Footer />
    {/* </section> */}
    </>
  )
}

export default AboutUs
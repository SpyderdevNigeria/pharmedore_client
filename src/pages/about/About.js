import Hero2 from '../../components/hero2/Hero2'
import Nav from '../../components/nav/Nav'
import Footer from '../../components/footer/Footer'
import Cards2 from '../../components/cards2/Cards2'

// import text data
import { aboutTxt } from '../../utils/heroTxt'
import AboutNote from '../../components/aboutNote/AboutNote'
import { foundersMessage, values } from '../../utils/secTxt'
import { testimonies } from '../../utils/secTxt'
import Sec from '../../components/sec/Sec'
import Testimonials from '../../components/testimonials/Testimonials'

export default function About() {
  return (
    <>
      <Nav />
      <Hero2 data={aboutTxt}/>
      <AboutNote />
      <Cards2 data={values}/>
      <Sec data={foundersMessage}/>
      <Testimonials data={testimonies}/>
      <Footer />
    </>
  )
}

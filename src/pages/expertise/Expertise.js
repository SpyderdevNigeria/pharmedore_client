import Hero2 from '../../components/hero2/Hero2'
import Nav from '../../components/nav/Nav'
import Footer from '../../components/footer/Footer'

// import text data
import { expertiseTxt } from '../../utils/heroTxt'
import Cards from '../../components/cards/Cards'
import { expertise } from '../../utils/secTxt'

export default function Expertise() {
  return (
    <>
      <Nav />
      <Hero2 data={expertiseTxt}/>
      <Cards cards={expertise} isExperttise={true}/>
      <Footer />
    </>
  )
}

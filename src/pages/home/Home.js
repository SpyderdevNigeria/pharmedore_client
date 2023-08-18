import Hero from '../../components/hero/Hero'
import Nav from '../../components/nav/Nav'
import s from './Home.module.css'
import Recents from '../../components/recents/Recents'
import Sec from '../../components/sec/Sec'
import Cards from '../../components/cards/Cards'

// import text data
import { homeTxt } from '../../utils/heroTxt'
import { recentDrugs } from '../../utils/drugs'
import { secTxt1, secTxt2, secTxt3 } from '../../utils/secTxt'
import Region from '../../components/region/Region'
import Footer from '../../components/footer/Footer'

export default function Home() {
  return (
    <div className={s.ctn}>
      <Nav />
      <Hero data={homeTxt}/>
      <Recents drugs={recentDrugs} />
      <Sec data={secTxt1}/>
      <Cards cards={secTxt2}/>
      <Region />
      <Sec data={secTxt3} wide={true}/>
      <Footer />
    </div>
  )
}

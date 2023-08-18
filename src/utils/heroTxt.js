import homeHeroImg from '../assets/floating-pills.png'
import aboutHeroBg from '../assets/abstract-blur-shopping-mall.jpg'
import malePh from '../assets/white-male-pharmacist.png'
import femalePh from '../assets/white-female-pharmacist.png'
import holdingdrugs from '../assets/female-pharmacist-holdingdrugs.png'
import smilingDr from '../assets/smiling-doctor.png'
import expertiseHeroBg from '../assets/abstract-blur-shopping-mall.jpg'
import { RiArrowRightLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'

export const homeTxt = {
  title: <h1>Experience the Future of <span>Healthcare</span></h1>,
  subtitle: <p> Our platform empowers healthcare providers to make well-informed decisions regarding drug purchases, leading to substantial cost savings.</p>,
  btn: <Link to="/all-medications" className='bigBtn'>All Medications <RiArrowRightLine /></Link>,
  img: <img src={homeHeroImg} alt='floating pills' />
}

export const aboutTxt = {
  title: <h1>About <span>Us</span></h1>,
  subtitle: 
  <p>
    Pharmedore is a leading eCommerce pharmaceutical company dedicated to improving people's 
    lives by ensuring access to safe, affordable medicines and convenient healthcare solutions..
  </p>,
  img1: <img src={malePh} alt='pharmacist' />,
  img2: <img src={femalePh} alt='pharmacist' />,
  bg: aboutHeroBg
}

export const expertiseTxt = {
  title: <h1>Our <span>Expertise</span></h1>,
  subtitle: 
  <p>Pharmedore is a leading eCommerce pharmaceutical company dedicated to improving 
    people's lives by ensuring access to safe, affordable medicines and convenient healthcare solutions.. 
  </p>,
  img1: <img className='holdingDrugs' src={holdingdrugs} alt='pharmacist' />,
  img2: <img className='smilingDoctor' src={smilingDr} alt='pharmacist' />,
  bg: expertiseHeroBg
}
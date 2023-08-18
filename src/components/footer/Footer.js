import s from './Footer.module.css'
import logo from '../../assets/logo.svg'
import { GoLocation } from 'react-icons/go'
import { AiOutlineMail, AiOutlinePhone } from 'react-icons/ai'
import { FaFacebookSquare, FaInstagramSquare, FaTwitterSquare } from 'react-icons/fa'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <div className={s.ctn}>
      <div className={s.wrp}>
        <div className={s.logo}>
          <Link to='/'><img src={logo} alt='logo' /></Link>
          <p className={s.subtitle}>MEDICINE WITHOUT BORDERS</p>
          <p className={s.desc}>
            By bridging the gap between pharmaceutical companies and retailers, we strive to enhance healthcare accessibility.
          </p>
        </div>
        <div className={s.quickLinks}>
          <h1 className={s.title}>Quick Links</h1>
          <Link to="/">About</Link>
          <Link to="/">Expertise</Link>
          <Link to="/">Contact</Link>
          <Link to="/">Medications</Link>
        </div>
        <div className={s.contactDetails}>
          <h1 className={s.title}>Contact Details</h1>
          <Link to="/"><GoLocation /> 2501 Bill Moses Parkway, Farmers Branch, 75234 Texas</Link>
          <Link to="/"><AiOutlineMail /> support@pharmedore.com</Link>
          <Link to="/"><AiOutlinePhone /> +1(431) 023 9876</Link>
        </div>
        <div className={s.legal}>
          <h1 className={s.title}>Legal</h1>
          <Link to="/">Terms of use</Link>
          <Link to="/">Privacy policy</Link>
          <div className={s.social}>
            <FaFacebookSquare size='1.6rem'/>
            <FaInstagramSquare size='1.6rem'/>
            <FaTwitterSquare size='1.6rem'/>
          </div>
        </div>
      </div>

      <div className={s.copyright}>Copyright 2023 All Rights Reserved | Pharmedore</div>
    </div>
  )
}

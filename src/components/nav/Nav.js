import { Link } from "react-router-dom"
import s from "./Nav.module.css"
import { useState } from "react"
import logo from "../../assets/logo.png"
import { CgMenuRight } from "react-icons/cg"
import { VscChromeClose } from "react-icons/vsc"
import { RiArrowDownSLine } from 'react-icons/ri'
 
// import cart icon as svg
import { ReactComponent as CartIcon } from '../../assets/cart.svg';
import { useAuthContext } from "../../context/AuthContext"
import { useCart } from "../../context/CartContext"

export default function Nav() {
  const { user } = useAuthContext()
  const { cartItems } = useCart()
  const [showMenu, setShowMenu] = useState(false)
  const [showDrop, setShowDrop] = useState(false)

  const handleClick = () => {
      setShowMenu(!showMenu)
      console.log(showMenu)
  }

  
  const handleCart = () => {
    document.getElementById('cart').style.display = 'flex'
  }


  return (
    <nav className={s.ctn}>
      <div className={s.wrp}>
        <Link to="/" className={s.logo}>
          <img src={logo} alt="logo"/>
        </Link>

        <div className={s.menu}  style={showMenu ? {right:  "0"} : {right:  '-100%'}}>
          <div className={s.links}>
            <Link to="/" onClick={() => setShowMenu(false)}>Home</Link>
            <Link to="/all-medications" onClick={() => setShowMenu(false)}>All-Medications</Link>
            <Link to="/about" onClick={() => setShowMenu(false)}>About</Link>
            <Link to="/expertise" onClick={() => setShowMenu(false)}>Expertise</Link>
            <Link to="/contact" onClick={() => setShowMenu(false)}>Contact-Us</Link>
            <div to="/" className={s.pharmacy} onClick={() => setShowDrop(!showDrop)} onMouseEnter={() => setShowDrop(true)} onMouseLeave={() => setShowDrop(false)}>
                Pharmacy 
                <RiArrowDownSLine />

                {showDrop &&
                <div className={s.drop} onMouseLeave={() => setShowDrop(false)}>
                  <a href="/dashboard/retailer">Retailers</a>
                  <a href="/dashboard/wholesaler">Wholesalers</a>
                </div>
                }
            </div>
          </div>

          <div className={s.auth}>   
            <VscChromeClose className={s.close} onClick={() => setShowMenu(false)}/>
            
            {!user &&
            <>
              <Link className={s.login} to="/login">Sign In</Link>
              <Link className={s.signup} to="/signup">Register</Link>
            </>
            }

            {user &&
            <>
              <div className={s.cartWrp}>
                <p className={s.itemNumber}>{cartItems.length}</p>
                <CartIcon className={s.cart1} onClick={handleCart} />
              </div>
              <Link to={`/dashboard/${user.accountType}`} className={s.signup}>Dashboard</Link>
            </>
            }
          </div>
        </div>


        <div className={s.mobileIcons}> 
          {user && 
          <div className={s.cartWrp}>
            <p className={s.itemNumber2}>{cartItems.length}</p>
            <CartIcon className={s.cart2} onClick={handleCart} />
          </div>
          }
          <CgMenuRight className={s.hamburger} onClick={handleClick} />
        </div>
      </div>
    </nav>
  )
}

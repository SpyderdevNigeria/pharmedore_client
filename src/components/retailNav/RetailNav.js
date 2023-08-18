import { NavLink, Link } from "react-router-dom"
import s from "./RetailNav.module.css"
import { useEffect, useState } from "react"
import logo from "../../assets/logo.png"
import { CgMenuRight } from "react-icons/cg"
import { VscChromeClose } from "react-icons/vsc"
import { HiUserCircle } from 'react-icons/hi'
 
// import cart icon as svg
import { ReactComponent as CartIcon } from '../../assets/cart.svg';
import { useAuthContext } from "../../context/AuthContext"
import { useCart } from "../../context/CartContext"

export default function RetailNav() {
  const { logout } = useAuthContext()
  const [showMenu, setShowMenu] = useState(false)
  const [showDrop, setShowDrop] = useState(false)
  const { cartItems } = useCart()

  const handleClick = () => {
      setShowMenu(!showMenu)
      console.log(showMenu)
  }

  const handleCart = () => {
    document.getElementById('cart').style.display = 'flex'
  }

  useEffect(() => {
    const handleWidth = () => {
      if (window.innerWidth <= 900) {
      } else {
      }
    };

    handleWidth();
    window.addEventListener('resize', handleWidth);

    return () => {
      window.removeEventListener('resize', handleWidth);
    };
  }, []);



  return (
    <nav className={s.ctn}>
      <div className={s.wrp}>
        <Link to="/dashboard/retailer/" className={s.logo}>
          <img src={logo} alt="logo"/>
        </Link>

        <div className={s.menu}  style={showMenu ? {right:  "0"} : {right:  '-100%'}}>
          <div className={s.homeLinks}>
            <NavLink to="/about" onClick={() => setShowMenu(false)}>About</NavLink>
            <NavLink to="/expertise" onClick={() => setShowMenu(false)}>Expertise</NavLink>
            <NavLink to="/contact" onClick={() => setShowMenu(false)}>Contact Us</NavLink>

            <div className={s.mobileLinks}>
              <Link onClick={() => setShowMenu(false)} to="/dashboard/retailer/orders">Orders</Link>
              <Link onClick={() => setShowMenu(false)} to="/dashboard/retailer/profile">Health Profile</Link>
              <Link onClick={() => setShowMenu(false)} to="/dashboard/retailer/shipping">Shipping</Link>
              <Link onClick={() => setShowMenu(false)} to="/dashboard/retailer/settings">Settings</Link>

              <p className={s.logout} onClick={logout}>Log Out</p>
            </div>

            <VscChromeClose className={s.close} onClick={() => setShowMenu(false)}/>
          </div>

          <div className={s.profileLinks} id="profileLinks">
          <div className={s.cartWrp}>
            <p className={s.itemNumber}>{cartItems.length}</p>
            <CartIcon className={s.cart1} onClick={handleCart}/>
          </div>
            <HiUserCircle className={s.profileLogo} onClick={() => setShowDrop(!showDrop)}/>


            {showDrop &&
            <div className={`${s.drop} menuPop`}>
              <Link to="/dashboard/retailer/orders">Orders</Link>
              <Link to="/dashboard/retailer/profile">Health Profile</Link>
              <Link to="/dashboard/retailer/shipping">Shipping</Link>
              <Link to="/dashboard/retailer/settings">Settings</Link>

              <p className={s.logout} onClick={logout}>Log Out</p>
            </div>
            }
          </div>
        </div>


        <div className={s.mobileIcons}> 
          <div className={s.cartWrp}>
            <p className={s.itemNumber2}>{cartItems.length}</p>
            <CartIcon className={s.cart2} onClick={handleCart}/>
          </div>
          <CgMenuRight className={s.hamburger} onClick={handleClick} />
        </div>
      </div>
    </nav>
  )
}

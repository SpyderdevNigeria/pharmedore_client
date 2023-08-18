import { useEffect } from 'react'
import s from './AdminSideNav.module.css'
import { NavLink } from 'react-router-dom'
import { CgClose } from 'react-icons/cg'
import { useAuthContext } from '../../context/AuthContext'

export default function AdminSideNav({activeLink}) {
  const { logout } = useAuthContext()


  const handleNav = () => {
    const adminSideNav = document.getElementById('adminSideNav')
    const closeNav = document.getElementById('closeNav')
    if(window.innerWidth < 700) {
      closeNav.style.display = 'block'
      adminSideNav.style.transform = 'translateX(-100%)'
    } else {
      closeNav.style.display = 'none'
      adminSideNav.style.transform = 'translateX(0)'
    }
  }

  const handleCloseNav = () => {
    const adminSideNav = document.getElementById('adminSideNav')
    const adminNav = document.getElementById('adminNav')
    adminSideNav.style.transform = 'translateX(-100%)'
    adminNav.style.display = 'block'
  }

  useEffect(() => {
    window.addEventListener('resize', handleNav)
    return () => {
      window.removeEventListener('resize', handleNav)
    }
  }, [])


  return (
    <div className={s.ctn} id='adminSideNav'>
      <CgClose onClick={handleCloseNav} className={s.close} id='closeNav'/>
      <div className={s.wrp}>
        <div className={s.logo}>
          <img src="/logo192.png" alt="logo" />
        </div>

        <div className={s.links}>
          <NavLink to="/admin/drug-crud" className={`${activeLink && 'active'} ${s.link}`}>Drugs</NavLink>
          <NavLink to="/admin/prescriptions" className={s.link}>Prescriptions</NavLink>
          <NavLink to="/admin/transactions" className={s.link}>Transactions</NavLink>
          <NavLink to="/admin/bulk-mails" className={s.link}>Bulk Mails</NavLink>
        </div>

        <p className={s.logout} onClick={logout}>Log Out</p>
      </div>
    </div>
  )
}

import s from './AdminNav.module.css'
import { CgMenuLeft } from 'react-icons/cg'

export default function AdminNav() {

  const handleNav = () => {
    const adminSideNav = document.getElementById('adminSideNav')
    adminSideNav.style.transform = 'translateX(0)'
  }


  return (
    <div className={s.ctn} id='adminNav'><CgMenuLeft onClick={handleNav}/></div>
  )
}

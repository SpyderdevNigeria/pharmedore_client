import s from './RetailSetting.module.css'
import ToggleButton from '../toggleButton/ToggleButton'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ImSpinner8 } from 'react-icons/im'

export default function RetailSetting({ user }) {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleDeleteAccount = async () => {
    const confirm = window.confirm('Are you sure you want to delete your account?')
    if (confirm) {
      try {
        setLoading(true)
        localStorage.removeItem('retailerPH')
  
        const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/users/delete/retailer/${user._id}`, {
          method: 'DELETE',
          headers: {'Content-Type': 'application/json'}
        })
        const data = await res.json()
        if (res.ok) {
          setLoading(false)
          navigate('/login')
        } else throw new Error(data.message)
      } catch (err) {
        console.log(err)
        setLoading(false)
      }
    }
  }




  const handleChangePassword = () => {
    const confirm = window.confirm('Are you sure you want to change your password?')
    if (confirm) {
      navigate('/forgot-password')
    }
  }



  return (
    <div className={s.ctn}>
      <div className={s.wrp}>
        <h1 className={s.title}>Settings</h1>
        
        <div className={s.security}>
          <h2 className={s.subtitle}>Security</h2>
          <div className={s.password}>
            <p>Password <span>**********</span></p>
            <button className={s.passwordBtn} onClick={handleChangePassword}>Change Password</button>
          </div>
        </div>
        
        <div className={s.security}>
          <h2 className={s.subtitle}>Communication Preferences</h2>
          <div className={s.details}>
            <p>Emails get sent to: <span>{user.email}</span></p>
          </div>
        </div>

        <div className={s.details}>
          <h2 className={s.subtitle}>Account & Health Updates <ToggleButton /></h2>
          <p className={s.note}>
            We will email you to provide order updates, to remind you 
            to refill your prescriptions, or if you prescription is expiring. 
            We will also email you if there are any changes made to your account.
          </p>
        </div>

        <div className={s.details}>
          <h2 className={s.subtitle}>Company News & Offers <ToggleButton /></h2>
          <p className={s.note}>
            We will periodically send updates about our company and 
            special offers on our products. Select "On" if you would like to 
            receive these emails. You can unsubscribe at any time.
          </p>
        </div>

        <div className={s.acount}>
          <h2 className={s.subtitle}>Account</h2>
          <div className={s.details}>
            <h2 className={s.subtitle}>Delete your account Permanently</h2>
            <p className={s.note}>Deleting your account will prevent you from logging back in.</p>
            <button className={s.deleteBtn} onClick={handleDeleteAccount}>
              {loading? <ImSpinner8 className="spin" /> : 'Delete Account'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

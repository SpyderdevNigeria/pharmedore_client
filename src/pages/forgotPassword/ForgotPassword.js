import styles from './ForgotPassword.module.css';
import Nav from '../../components/nav/Nav';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ImSpinner8 } from 'react-icons/im';


export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [accountType, setAccountType] = useState('')
  const { page } = useParams();

  // handling reset
  const handleReset = async(e) => {
    e.preventDefault()

    if(email === "" || !email.includes("@") || email.length < 5) return setError('Email is invalid');

    // sending data to server
    try {
      setLoading(true)
      setError(null)

      const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/users/forgot-password/${email}`)
      const data = await res.json()

      if(res.ok) {
        setLoading(false)
        setSuccess("Check your email for a reset link")
      } else throw new Error(data.message)
    } catch (error) {
      setLoading(false)
      setError(error.message)
    }
  }



  // handling new password
  const handleNewPassword = async(e) => {
    e.preventDefault()

    if(accountType === "") return setError('Select Account Type');
    if(email === "" || !email.includes("@") || email.length < 5) return setError('Email is invalid');
    if(newPassword === "" || newPassword.length < 5) return setError('password is invalid');

    // sending data to server
    try {
      setLoading(true)
      setError(null)

      const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/users/reset-password/${accountType}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email, password: newPassword})
       })

       const data = await res.json()

      if(res.ok) {
        setLoading(false)
        setSuccess("Password Changed Successfully, Login to continue")
      }
      else throw new Error(data.message)
    } catch (error) {
      setLoading(false)
      setError(error.message)
    }
  }


  return (
    <div className="formCtn">
      <Nav />
      {page === 'newPassword' ? 
      <form className="formCtn" onSubmit={handleNewPassword}>
          <div className="formWrp">
          <h1 className='formTitle' style={{fontSize: '1.2rem'}}>Enter Email & New Password!</h1> 
          <select className="formInput" value={accountType} onChange={(e) => setAccountType(e.target.value)}>
            <option value="">Select Account Type</option>
            <option value="retailer">Retailer</option> 
            <option value="wholesaler">Wholesaler</option>
          </select>
          <input className="formInput" value={email} placeholder='Email' onChange={(e) => setEmail(e.target.value.toLowerCase())}/>       
          <input className="formInput" value={newPassword} placeholder='Password' onChange={(e) => setNewPassword(e.target.value)}/>

          <button onClick={handleNewPassword} disabled={loading} className='bigBtn formBtn slideAnim'>{loading? <ImSpinner8 className="spin" /> : 'Reset'}</button>
          {error && <p className='formError'>{error}</p>}
          {success && <p className="formSuccess">{success}</p>}     
          <div className='formLinks'> 
            <Link style={{width: "100%"}} to="/login" className={styles.link}>Back to <span>Login?</span></Link>
          </div>
        </div>
      </form>

      :<form className="formCtn" onSubmit={handleReset}>
        <div className="formWrp">
          <h1 className='formTitle'>Reset Password</h1>
          <input className="formInput" type='email' placeholder='Email' onChange={(e) => setEmail(e.target.value.toLowerCase())}/>

          <button onClick={handleReset} disabled={loading} className='bigBtn formBtn slideAnim'>{loading? <ImSpinner8 className="spin" /> : 'Send Mail'}</button>
          {error && <p className='formError'>{error}</p>}
          {success && <p className="formSuccess">{success}</p>}       
          <div className='formLinks'> 
            <Link style={{width: "100%"}} to="/login" className={styles.link}>Back to <span>Login?</span></Link>
          </div>
        </div>
      </form>
      }

    </div>
  )
}

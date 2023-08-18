// import logo from "../../assets/logo.svg"
import { useState } from "react"
import { ImSpinner8 } from "react-icons/im"
import { Link, useNavigate } from "react-router-dom"
import { MdVisibility } from "react-icons/md"

export default function Login() {
  const navigate = useNavigate()
  const [accountType, setAccountType] = useState('none')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [showButton, setShowButton] = useState(false)
  


  const handleChange = (e) => {
    if(e.target.type === 'select-one') {
      setAccountType(e.target.value)
      if(e.target.value !== 'none' &&  email.length > 7 && email.includes('@') && password.length > 7)
        setShowButton(true)
      else setShowButton(false)
    }

    if(e.target.type === 'email') {
      setEmail(e.target.value.toLowerCase())
      if(accountType !== 'none' &&  e.target.value.length > 7 && e.target.value.includes('@') && password.length > 7)
        setShowButton(true)
      else setShowButton(false)
    }

    if(e.target.type === 'password' || e.target.type === 'text') {
      setPassword(e.target.value)
      if(accountType !== 'none' &&  email.length > 7 && email.includes('@') && e.target.value.length > 7)
        setShowButton(true)
      else setShowButton(false)
    }
  }

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }



  const handleSubmit = async(e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    localStorage.removeItem('retailerPH')
    localStorage.removeItem('wholesalerPH')

    try{
      // send info to server
      const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/users/${accountType}/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ email, password })
      })
      const data = await res.json()

      if (res.ok) {
        setSuccess(true)
        navigate(`/login/otp/${accountType}`)
      }
      else throw new Error(data.message)
      setLoading(false)
    } catch(err) {
      setError(err.message)
      setLoading(false)
    }
  }



  return (
    <div className='formCtn'>
      <div className='formWrp'>
          <div className="formLinks">
            <Link to="/login"  style={{borderBottom: '2px solid #031C6E'}}>Sign <span>In</span></Link>
            <Link to="/signup">Sign <span>Up</span></Link>
          </div>
          <select className='formInput' onChange={handleChange}>
            <option value='none' readOnly>Select Account Type</option>
            <option value='wholesaler'>Wholesaler</option>
            <option value='retailer'>Retailer</option>
          </select>

          <input value={email} onChange={handleChange} className='formInput' type='email' placeholder='Email' autoComplete="off"/>
          <div className="inputWrp">
            {
              showPassword ?
              <input value={password} onChange={handleChange} className='formInput' type='text' placeholder='Password' autoComplete="new-password"/>
            : <input value={password} onChange={handleChange} className='formInput' type='password' placeholder='Password' autoComplete="new-password"/>
            }
            <MdVisibility onClick={handleShowPassword} className="visibility"/>
          </div>
          {showButton && <button onClick={handleSubmit} className='bigBtn formBtn slideAnim'>{loading? <ImSpinner8 className="spin" /> : 'Sign In'}</button>}
          {error && <p className='formError'>{error}</p>}
          {success && <p className='formSuccess'>A Verification Mail Was Sent To Your Mail</p>}
      </div>
    </div>
  )
}

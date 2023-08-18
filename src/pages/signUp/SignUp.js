// import logo from "../../assets/logo.svg"
import { useState } from "react"
import { Link } from "react-router-dom"
import { ImSpinner8 } from 'react-icons/im'
import { MdVisibility } from "react-icons/md"

export default function SignUp() {
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
      setEmail(e.target.value)
      if(accountType !== 'none' &&  e.target.value.length > 7 && e.target.value.includes('@') && password.length > 7)
        setShowButton(true)
      else setShowButton(false)
    }

    if(e.target.type === 'password' || e.target.type === 'text') {
      setPassword(e.target.value.toLowerCase())
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
      const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/users/${accountType}/signup`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email, password})
      })
      console.log(res)
      const data = await res.json()
      if (res.ok) setSuccess(true) 
      else  throw new Error(data.message)

      setLoading(false)
    } catch(err) {
      setError(err.message)
      setLoading(false)
    }
  }


  return (
    <div className='formCtn'>
      <form className='formWrp' autoComplete="off">
          <div className="formLinks">
            <Link to="/login">Sign <span>In</span></Link>
            <Link to="/signup" style={{borderBottom: '2px solid #031C6E'}}>Sign <span>Up</span></Link>
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
          
          <div style={{gap: '10px'}}>
            <input checked disabled style={{width: '25px'}} type='checkbox'/>
            <p>Agree to Pharmedore <br/><Link to='#'><span>Terms & Condition | Privacy Policy</span></Link></p>
          </div>
          {showButton && <button onClick={handleSubmit} className='bigBtn formBtn slideAnim'>{loading? <ImSpinner8 className="spin" /> : 'Sign Up'}</button>}
          {error && <p className='formError'>{error}</p>}
          {success && <p className='formSuccess'>A Verification Mail Was Sent To Your Mailbox!</p>}
      </form>
    </div>
  )
}

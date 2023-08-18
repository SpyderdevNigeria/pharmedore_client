import { useState } from "react"
import { ImSpinner8 } from "react-icons/im"
import { useNavigate } from "react-router-dom"
import { MdVisibility } from "react-icons/md"
import { useAuthContext } from "../../context/AuthContext"

export default function AdminLogin() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [showButton, setShowButton] = useState(false)
  const { login } = useAuthContext()
  


  const handleChange = (e) => {
    if(e.target.type === 'email') {
      setEmail(e.target.value.toLowerCase())
      if(e.target.value.length > 7 && e.target.value.includes('@') && password.length > 7)
        setShowButton(true)
      else setShowButton(false)
    }

    if(e.target.type === 'password' || e.target.type === 'text') {
      setPassword(e.target.value)
      if(email.length > 7 && email.includes('@') && e.target.value.length > 7)
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
      const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/users/admin/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ email, password })
      })
      const data = await res.json()

      if (res.ok) {
        setSuccess(true)
        login(data)
        localStorage.setItem('Admin', JSON.stringify(data))
        navigate(`/admin`)
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
        <h2 className='formTitle'>Admin Login</h2>
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
          {success && <p className='formSuccess'>Redirecting To Dashboard...</p>}
      </div>
    </div>
  )
}


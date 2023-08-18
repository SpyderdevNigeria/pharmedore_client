import { useState } from "react"
import { ImSpinner8 } from "react-icons/im"
import { useNavigate } from "react-router-dom"
import { useAuthContext } from "../../context/AuthContext"

export default function Otp({ accountType }) {
  const navigate = useNavigate()
  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuthContext()
  


  const handleChange = (e) => {
    setOtp(e.target.value)
  }



  const handleSubmit = async(e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try{
      const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/users/otp/${accountType}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ code: otp })
      })
      const data = await res.json()

      if (res.ok) {
        if(accountType === 'retailer') {
          login(data)
          localStorage.setItem('retailerPH', JSON.stringify(data))
          localStorage.removeItem('wholesalerPH')
          navigate('/dashboard/createProfile/retailer')
        }
        else if(accountType === 'wholesaler') {
          login(data)
          localStorage.setItem('wholesalerPH', JSON.stringify(data))
          localStorage.removeItem('retailerPH')
          navigate('/dashboard/createProfile/wholesaler')
        }
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
        <h1 className='formTitle'>Enter Code</h1>
          <input value={otp} onChange={handleChange} className='formInput' type='text' placeholder='* * * * * *'/>
          <button onClick={handleSubmit} className='bigBtn formBtn slideAnim'>{loading? <ImSpinner8 className="spin" /> : 'Send Code'}</button>
          {error && <p className='formError'>{error}</p>}
      </div>
    </div>
  )
}

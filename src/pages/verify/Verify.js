import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import s from './Verify.module.css';
import { SiGmail } from 'react-icons/si';
import { ImSpinner8 } from 'react-icons/im';

const Verify = ({accountType}) => {
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  let { email } = useParams();
  const navigate = useNavigate()

  useEffect(() => {
    async function verifyUser() {
      setLoading(true)
      localStorage.removeItem('retailerPH')
      localStorage.removeItem('wholesalerPH')
      try {
        const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/users/${accountType}/verifyMail`,{
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({ email })
        })
        const data = await res.json()
        if(res.ok) {
          setVerified(true)
          if(accountType === 'retailer') localStorage.setItem('retailerPH', JSON.stringify(data))
          if(accountType === 'wholesaler') localStorage.setItem('wholesalerPH', JSON.stringify(data))
          setTimeout(() => navigate('/login'), 2000)
        }
        throw new Error(data.message)
      } catch (error) { console.log(error) }
      finally { setLoading(false) }
    }

    if(email) verifyUser()
  }, [email, navigate, accountType]);



  
  if(loading) 
  return (
    <div className="formCtn">
      <ImSpinner8 className="spin" style={{color: '#031C6E', fontSize: '4rem'}}/>
    </div>
  )


  if(verified && !loading) {
    return (
      <div className={s.ctn}>
          <div className={s.wrapper}>
            <SiGmail size="4rem" color='#00b35f'/>
            <h1 className={s.success}>User Verified!</h1>
          </div>
      </div>
    );
  }
};

export default Verify;
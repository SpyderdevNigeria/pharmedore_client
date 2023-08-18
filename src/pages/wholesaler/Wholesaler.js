import { useEffect, useState } from "react"
import { ImSpinner8 } from "react-icons/im"
import { useNavigate, useParams } from "react-router-dom"
import Footer from "../../components/footer/Footer"
import WholeSaleNav from "../../components/wholeSaleNav/WholeSaleNav"
import WholesaleDrugCards from "../../components/wholesaleDrugCards/WholesaleDrugCards"
import { useAuthContext } from "../../context/AuthContext"


export default function Wholesaler() {
  const { user, fetching } = useAuthContext()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [drugs, setDrugs] = useState([])
  const { page } = useParams()


  useEffect(() => {
    if(!fetching) if(!user) navigate('/login')
    if(user) if(user.accountType === 'retailer') navigate('/dashboard/retailer')
    setLoading(true)
    
    const getDrugs = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/wholesaleDrugs`)
        const data = await res.json()
        if (res.ok) setDrugs(data)
        else throw new Error(data.message)
      } catch (error) { console.log(error) }
    }

    getDrugs()
    setLoading(false)
  }, [user, navigate, fetching])



  if(loading || !user) 
  return (
    <div className="formCtn">
      <ImSpinner8 className="spin" style={{color: '#031C6E', fontSize: '4rem'}}/>
    </div>
  )


  if(user) {
    if(page === 'home' || !page)   return (
      <div>
        <WholeSaleNav />
        <WholesaleDrugCards drugs={drugs} loading={loading} />
        <Footer />
      </div>
    )
  }
}

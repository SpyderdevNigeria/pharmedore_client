import { useEffect, useState } from "react"
import { ImSpinner8 } from "react-icons/im"
import { useNavigate, useParams } from "react-router-dom"
import Footer from "../../components/footer/Footer"
import RetailNav from "../../components/retailNav/RetailNav"
import RetailDrugCards from "../../components/retailDrugCards/RetailDrugCards"
import Prescription from "../../components/prescription/Prescription"
import RetailOrder from "../../components/retailOrder/RetailOrder"
import RetailProfile from "../../components/retailProfile/RetailProfile"
import RetailShipping from "../../components/retailShipping/RetailShipping"
import RetailSetting from "../../components/retailSetting/RetailSetting"
import { useAuthContext } from "../../context/AuthContext"


export default function Retailer() {
  const { user, fetching } = useAuthContext()
  let { page } = useParams()
  const [loading, setLoading] = useState(false)
  const [drugs, setDrugs] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    if(!fetching) if(!user) navigate('/login')
    if(user) if(user.accountType === 'wholesaler') navigate('/dashboard/wholesaler')
    setLoading(true)

    const getDrugs = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/retailDrugs`)
        const data = await res.json()
        if (res.ok) setDrugs(data)
        else throw new Error(data.message)
      } catch (error) { console.log(error) }
    }

    getDrugs()
    setLoading(false)
  }, [user, fetching, navigate])



  if(loading || !user) 
  return (
    <div className="formCtn">
      <ImSpinner8 className="spin" style={{color: '#031C6E', fontSize: '4rem'}}/>
    </div>
  )

  if(user) {
    if(page === 'home' || !page)   return (
      <div>
        <RetailNav />
        <Prescription />
        <RetailDrugCards drugs={drugs}/>
        <Footer />
      </div>
    )

    if(page === 'orders') return (
      <div>
        <RetailNav/>
        <RetailOrder />
        <Footer />
      </div>
    )

    if(page === 'profile') return (
      <div>
        <RetailNav/>
        <RetailProfile user={user}/>
        <Footer />
      </div>
    )

    if(page === 'shipping') return (
      <div>
        <RetailNav/>
        <RetailShipping user={user}/>
        <Footer />
      </div>
    )

    if(page === 'settings') return (
      <div>
        <RetailNav/>
        <RetailSetting user={user}/>
        <Footer />
      </div>
    )
  }
}

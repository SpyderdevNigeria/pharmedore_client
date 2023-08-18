import { useParams } from "react-router-dom"
import { ImSpinner8 } from "react-icons/im"
import WholesaleForm from "../../components/wholesaleForm/WholesaleForm"
import Footer from "../../components/footer/Footer"
import RetailForm from "../../components/retailForm/RetailForm"
import { useAuthContext } from "../../context/AuthContext"


export default function Wholesaler() {
  const { user, fetching } = useAuthContext()
  const { accountType } = useParams()


  if(fetching || !user) 
  return (
    <div className="formCtn">
      <ImSpinner8 className="spin" style={{color: '#031C6E', fontSize: '4rem'}}/>
    </div>
  )

  if(user && accountType === 'wholesaler') 
  return (
    <div>
      <WholesaleForm user={user}/>
      <Footer />
    </div>
  )

  if(user && accountType === 'retailer')
  return (
    <div>
      <RetailForm user={user}/>
      <Footer />
    </div>
  )
}


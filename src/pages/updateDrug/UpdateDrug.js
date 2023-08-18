import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import DisplayDrugs from "../../components/displayDrugs/DisplayDrugs"
import AdminSideNav from "../../components/adminSideNav/AdminSideNav"
import AdminNav from "../../components/adminNav/AdminNav"

export default function UpdateDrug() {
  const { type } = useParams()
  const [loading, setLoading] = useState(false)
  const [drugs, setDrugs] = useState([])



  useEffect(() => {
    setLoading(true)
    console.log("hello")

    const fetchDrugs = async () => {
      console.log("i'm fetching")
      try {
        const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/${type}Drugs`)
        const data = await res.json()
        if(res.ok) setDrugs(data)
        else { throw new Error(data.message) }
      } catch (err) { console.log(err) }
    }

    fetchDrugs()
    setLoading(false)
  }, [type])

  return (
    <>
    <AdminNav />
    <div className='adminCtn'>
      <AdminSideNav />
      <DisplayDrugs drugs={drugs} type={type} loading={loading} method={'update'}/>
    </div>
    </>
  )
}

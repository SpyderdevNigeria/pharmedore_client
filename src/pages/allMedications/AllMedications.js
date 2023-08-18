import Nav from '../../components/nav/Nav'
import Footer from '../../components/footer/Footer'
import { useEffect, useState } from 'react'
import RetailDrugCards from '../../components/retailDrugCards/RetailDrugCards'

export default function AllMedications() {
  const [drugs, setDrugs] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getDrugs = async () => {
      try {
        setLoading(true)
        const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/retailDrugs`)
        const data = await res.json()
        if (res.ok) setDrugs(data)
        else throw new Error(data.message)
      } catch (error) { console.log(error) }
      finally { setLoading(false) }
    }

    getDrugs()
  }, [])


  return (
    <>
      <Nav />
      <RetailDrugCards drugs={drugs} loading={loading}/>
      <Footer />
    </>
  )
}

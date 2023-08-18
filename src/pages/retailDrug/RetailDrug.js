import { useEffect, useState } from 'react'
import Footer from '../../components/footer/Footer'
import Nav from '../../components/nav/Nav'
import { useParams } from 'react-router-dom'
import RetailDrugDetails from '../../components/retailDrugDetails/RetailDrugDetails'

export default function RetailDrug() {
  const { id } = useParams()
  const [drug, setDrug] = useState(null)
  const [loading, setLoading] = useState(true)

  
  useEffect(() => {
    const getSingleDrug = async () => {
      setLoading(true)
      try {
        const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/retailDrugs/${id}`)
        const data = await res.json()
        if (res.ok) setDrug(data)
        else throw new Error(data.message)
      } catch (error) { console.log(error) }
      finally { setLoading(false) }
    }


    getSingleDrug()
  }, [id])


  return (
    <>
    <Nav />
    <RetailDrugDetails drug={drug} loading={loading}/>
    <Footer />
    </>
  )
}

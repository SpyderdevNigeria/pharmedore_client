import { ImSpinner8 } from 'react-icons/im'
import s from './DisplayDrugs.module.css'
import { useEffect, useState } from 'react'
import { RiSearch2Line } from 'react-icons/ri'
import UpdateDrugForm from '../updateDrugForm/UpdateDrugForm'

export default function DisplayDrugs({ drugs, type, loading, method }) {
  const [drugList, setDrugList] = useState([])
  const [singleDrug, setSingleDrug] = useState(null)


  const handleDrugSearch = (e) => {
    const search = e.target.value.toLowerCase()
    const filtered = drugs.filter(drug =>
      drug.drugName.toLowerCase().includes(search) || 
      drug.genericName.toLowerCase().includes(search))
    setDrugList(filtered)
  }


  const handleDrugClicked = (drug) => {
    if(method === 'update') setSingleDrug(drug)
    if(method === 'delete') {
      alert('Are you sure you want to delete this drug?')
      const deleteDrug = async () => {
        try {
          const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/${type}Drugs/${drug._id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
          })
          const data = await res.json()
          if(res.ok) alert("Drug deleted successfully")
          else { throw new Error(data.message) }
        } catch (err) { console.log(err) }
      }
      deleteDrug()
    }
  }



  useEffect(() => {
    setDrugList(drugs)
    console.log(drugs)
  }, [drugs])




      
  if(loading) return (
    <div className={s.loadingCtn}>
      <ImSpinner8 className="spin" style={{color: '#031C6E', fontSize: '4rem'}}/>
    </div>
  )

  if(!loading && !singleDrug) return (
    <div className={s.ctn}>
      <div className={`adminWrp ${s.wrp}`}>
        <h2 className='formTitle'>Display Drugs</h2>
        <div className={s.search}>
          <div className={s.searchInputWrp}>
            <RiSearch2Line />
            <input type="text" placeholder='Search For Drug' name='search' onChange={handleDrugSearch}/>
          </div>
        </div>

        <div className={s.drugs}>
          {drugList.map((drug, i) => (
            <div className={s.drug} key={i} onClick={() => handleDrugClicked(drug)}>
              <p className={s.companyName}>{drug.drugCompany}</p>
              <p className={s.drugName}>{drug.genericName} <span>({drug.drugName})</span></p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )


  if(!loading && singleDrug) return (
    <UpdateDrugForm Drug={singleDrug} type={type}/>
  )
}

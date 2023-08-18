import s from './WholesaleDrugCards.module.css'
import { useEffect, useState } from 'react'
import { ReactComponent as DrugListIcon } from '../../assets/drugCtn.svg'
import { RiSearch2Line } from 'react-icons/ri';
import { FaInfo } from 'react-icons/fa';
import { drugCategories } from '../../utils/drugCategory';
import { ImSpinner8 } from 'react-icons/im';
import { Link } from 'react-router-dom';

export default function WholesaleDrugCards({ drugs, loading }) {
  const [filteredDrugs, setFilteredDrugs] = useState([])


  const handleDrugSearch = (e) => {
    const search = e.target.value.toLowerCase()
    const filtered = drugs.filter(drug => 
    drug.drugName.toLowerCase().includes(search) || 
    drug.genericName.toLowerCase().includes(search))
    setFilteredDrugs(filtered)
  }


  const filterByCategory = (e) => {
    const category = e.target.value
    const filtered = drugs.filter(drug => drug.category === category)
    setFilteredDrugs(filtered)
  }



  useEffect(() => {
    setFilteredDrugs(drugs)
  }, [drugs])


    
  if(loading) 
  return (
    <div className={s.loadingCtn}>
      <ImSpinner8 className="spin" style={{color: '#031C6E', fontSize: '4rem'}}/>
    </div>
  )

   
  if(!loading) return (
    <div className={s.ctn}>
      <div className={s.wrp}>
        <div className={s.filters}>
          <div className={s.search}>
            <label htmlFor="search">Search for drugs</label>
            <div className={s.searchInputWrp}>
              <RiSearch2Line />
              <input type="text" name='search' onChange={handleDrugSearch}/>
            </div>
          </div>

          <div className={s.search}>
            <select className={s.searchInputWrp} onChange={filterByCategory}>
              <option className={s.option} value="">Filter Medications By Category</option>
              {drugCategories.map((category, i) => 
                <option className={s.option} key={i} value={category}>{category}</option>
              )}
            </select>
          </div>
        </div>
        <div className={s.cards}>
          {filteredDrugs.map((drug, i) => (
            <div className={s.card} key={i}>
              <Link to={`/dashboard/wholesaler/wholesale-drug-detail/${drug._id}`} className={s.img}>
                <DrugListIcon className={s.drugIcon}/>
              </Link>

              <div className={s.info}>
                <Link to={`/dashboard/wholesaler/wholesale-drug-detail/${drug._id}`} className={s.name}>
                  {drug.drugName}<br/>
                  <span>({drug.genericName})</span>
                </Link>

                <p className={s.price}>₦‎{drug.forms[0]?.price}</p>
                <Link to={`/dashboard/wholesaler/wholesale-drug-detail/${drug._id}`} className={s.infoCtn}>
                  <FaInfo />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

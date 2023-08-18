import s from './Region.module.css'
import region from '../../assets/Regions.png'

export default function Region() {
  return (
    <div className={s.ctn}>
      <h1 className='title' style={{textAlign: 'center'}}>Operational Regions</h1>
      <div className={s.wrp}>
        <img src={region} alt='region'/>
      </div>
    </div>
  )
}

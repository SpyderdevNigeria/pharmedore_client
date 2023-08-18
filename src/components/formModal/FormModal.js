import s from './FormModal.module.css'
import { GrClose } from 'react-icons/gr'

export default function FormModal({ data, txt, setShowModal, handleContinue}) {

  Object.entries(data).forEach(([key, value]) => {
    console.log(key, value)
  })

  const handleSave = () => {
    if(txt.title === 'General Info') handleContinue('stage1', 'stage2')
    if(txt.title === 'Home Address') handleContinue('stage2', 'stage3')
    if(txt.title === 'Contact info') handleContinue('stage3', 'stage4')
    if(txt.title === 'Allergies') handleContinue('stage4', 'stage5')
    if(txt.title === 'Medical Conditions') handleContinue('stage5', 'stage6')

    if(txt.title === 'Business Information') handleContinue('stage1', 'stage2')
    if(txt.title === 'Contact Information') handleContinue('stage2', 'stage3')
    if(txt.title === 'Product Information') handleContinue('stage3', 'stage4')
    if(txt.title === 'Sales Information') handleContinue('stage4', 'stage5')
    if(txt.title === 'Company Overview') handleContinue('stage5', 'stage6')
    if(txt.title === 'Operational Details') handleContinue('stage6', 'stage7')
    if(txt.title === 'Payment Method') handleContinue('stage7', 'stage8')
  }

  return (
    <div className={s.ctn}>
      <div className={s.wrp}>
        <GrClose className={s.close} onClick={() => setShowModal(false)} />
        <h1 className={s.title}>{txt.title}</h1>
        {
          Object.entries(data).map(([key, value]) =>
            <p className={s.txt} key={key}><span>{key}:</span>{value?.slice(0, 15)}{value.length > 14? '...': ''}</p>
          )
        }
        <p className="formWarning">Review Carefully</p>
        <div className={s.btnWrp}><button className="bigBtn" onClick={handleSave}>Save Info</button></div>
      </div>
    </div>
  )
}

import { ImUpload2 } from 'react-icons/im'
import s from './Prescription.module.css'

export default function Prescription() {
  return (
    <div className={s.ctn}>
      <div className={s.wrp}>
        <form className={s.form}>
        <h1 className={s.title}>Right On Time! Submit Your <span>Prescription Now </span> And Get Super Fast Request Approval.</h1>
          <div className={s.inputWrp}>
            <ImUpload2 />
            <p>Upload</p>
            <input type="file" label="Upload Prescription" accept='.jpeg, .jpg, .png'/>
            <button className="bigBtn">Submit</button>
          </div>
          <p className='formWarning'>Please make sure the information on the prescription matches your profile details.</p>
        </form>
      </div>
    </div>
  )
}

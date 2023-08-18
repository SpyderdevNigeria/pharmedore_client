import { useEffect, useState } from 'react'
import s from './RetailForm.module.css'
import FormModal from '../formModal/FormModal'
import { GrClose } from 'react-icons/gr'
import { ImSpinner8 } from "react-icons/im"
import { useNavigate } from 'react-router-dom'

export default function RetailForm({ user }) {
  const navigate = useNavigate()
  const [contactInfo, setContactInfo] = useState({
    phone: '',
  })
  const [generalInfo, setGeneralInfo] = useState({
    firstName: '',
    lastName: '',
    middleInitial: '',
    suffix: '',
    DOB: '',
    sex: '',
  })
  const [homeAddress, setHomeAddress] = useState({
    address: '',
    suite: '',
    city: '',
    state: '',
    zip: '',
  })
  const [allergies, setAllergies] = useState([])
  const [haveAllergies, setHaveAllergies] = useState(false)
  const [allergy, setAllergy] = useState('')
  const [otherAllergy, setOtherAllergy] = useState(false)
  const [medicalConditions, setMedicalConditions] = useState([])
  const [haveMedicalConditions, setHaveMedicalConditions] = useState(false)
  const [medicalCondition, setMedicalCondition] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [txt, setTxt] = useState({})
  const [modalData, setModalData] = useState({})
  const [loading, setLoading] = useState(false)
  const [showBtn, setShowBtn] = useState(false)
  const [error, setError] = useState(null)
  const [stage, setStage] = useState({
    stage1: true,
    stage2: false,
    stage3: false,
    stage4: false,
    stage5: false,
  })
  const [stageCompleted, setStageCompleted] = useState({
    stage1: false,
    stage2: false,
    stage3: false,
    stage4: false,
    stage5: false,
  })


  const handleGeneralInfo = (e) => {
    e.preventDefault()

    if(generalInfo.firstName.trim() === '') {
      setError('First name is required')
      return
    }

    if(generalInfo.lastName.trim() === '') {
      setError('Last name is required')
      return
    }

    if(generalInfo.DOB.trim() === '') {
      setError('Date of birth is required')
      return
    }

    if(generalInfo.sex === 'none') {
      setError('Sex is required')
      return
    }
    setTxt({...txt, title: 'General Info'})
    setModalData(generalInfo)
    setShowModal(true)
  }

  const handleHomeAddress = (e) => {
    e.preventDefault()

    if(homeAddress.address.trim() === '') {
      setError('Address is required')
      return
    }

    if(homeAddress.city.trim() === '') {
      setError('City is required')
      return
    }

    if(homeAddress.state.trim() === '') {
      setError('State is required')
      return
    }

    if(homeAddress.zip.trim() === '') {
      setError('Zip code is required')
      return
    }


    setTxt({...txt, title: 'Home Address'})
    setModalData(homeAddress)
    setShowModal(true)
  }

  const handleContactInfo = (e) => {
    e.preventDefault()

    if(contactInfo.phone.trim() === '') {
      setError('Phone is required')
      return
    }
    setTxt({...txt, title: 'Contact info'})
    setModalData(contactInfo)
    setShowModal(true)
  }

  const handleAllergies = (e) => {
    e.preventDefault()
    setTxt({...txt, title: 'Allergies'})
    setModalData(allergies)
    setShowModal(true)
  }

  const handleMedicalConditions = (e) => {
    e.preventDefault()
    console.log(medicalConditions)
    setTxt({...txt, title: 'Medical Conditions'})
    setModalData(medicalConditions)
    setShowModal(true)
  }

  const handleContinue = (key, next) => {
    if(next !== 'stage6') {
      setStageCompleted({...stageCompleted, [key]: true})
      setStage({...stage, [key]: false, [next]: true})
      setShowModal(false)
    }

    if(next === 'stage6') {
      setStageCompleted({...stageCompleted, [key]: true})
      setStage({...stage, [key]: false})
      setShowModal(false)
      console.log('all done')
    }
  }


    // Handle the "Select" event on the select input
    const handleSelectInputAllergy = (event) => {
      const selectedValue = event.target.value;
      if (selectedValue === 'other') {
        setOtherAllergy(true)
      } 

      if (selectedValue.trim() !== '' && selectedValue !== 'none' && selectedValue !== 'other') {
        const alreadyExit = allergies.find(allergy => allergy === selectedValue)
        if (alreadyExit) {
          return
        }
        setAllergies([...allergies, selectedValue])
      }
    }


    // Handle the "Enter" event on the input
    const handleKeyDownAllergy = (event) => {
      const value = event.target.value;
      if (event.key === 'Enter' && value.trim() !== '') {
        const alreadyExit = allergies.find(allergy => allergy === value)
        if (alreadyExit) {
          return
        }
        setAllergies([...allergies, value])
        setAllergy('')
      }
    }


    // Handle the "Yes" or "No" event on the button
    const handleHaveAllergies = (e) => {
      e.preventDefault()
      const value = e.target.textContent;
      if (value === 'Yes') {
        setHaveAllergies(true)
      } else {
        setStage({...stage, stage4: false, stage5: true})
        setStageCompleted({...stageCompleted, stage4: true})
        setHaveAllergies(false)
      }
    }


    const deleteAllergy = (index) => {
      const newAllergies = [...allergies];
      newAllergies.splice(index, 1);
      setAllergies(newAllergies);
    }


    // Handle the "Enter" event on the input
    const handleKeyDownMC = (event) => {
      const value = event.target.value;
      if (event.key === 'Enter' && value.trim() !== '') {
        const alreadyExit = medicalConditions.find(mc => mc === value)
        if (alreadyExit) {
          return
        }
        setMedicalConditions([...medicalConditions, value])
        setMedicalCondition('')
      }
    }


    // Handle the "Yes" or "No" event on the button
    const handleHaveMC = (e) => {
      e.preventDefault()
      const value = e.target.textContent;
      if (value === 'Yes') {
        setHaveMedicalConditions(true)
      } else {
        setStage({...stage, stage5: false})
        setStageCompleted({...stageCompleted, stage5: true})
        setHaveMedicalConditions(false)
      }
    }


    const deleteMC = (index) => {
      const newMC = [...medicalConditions];
      newMC.splice(index, 1);
      setMedicalConditions(newMC);
    }


    const handleEditStage = (key) => {
      setStage({...stage, [key]: true})
      setStageCompleted({...stageCompleted, [key]: false})
    }

    const handleProfileSubmit = async(e) => {
      e.preventDefault()
      setLoading(true)
      setError(null)

      const profileData = {
        ...generalInfo, 
        ...homeAddress, 
        ...contactInfo, 
        allergies, 
        medicalConditions,
      }

      try{
        const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/users/updateProfile/retailer/${user._id}`, {
          method: 'PUT',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(profileData),
        })

        const data = await res.json()
        if(res.ok) {
          navigate('/dashboard/retailer')
        } else throw new Error(data.message)
      } catch(err) { setError(err.message) }

      setLoading(false)
    }






    useEffect(() => {
      if(user.firstName !== "" && user.address !== "") {
        navigate('/dashboard/retailer')
      }
    }, [navigate, user])

    useEffect(() => {
      if(stageCompleted.stage1 && stageCompleted.stage2 && stageCompleted.stage3 && stageCompleted.stage4 && stageCompleted.stage5) {
        setShowBtn(true)
      }
    }, [stageCompleted.stage1, stageCompleted.stage2, stageCompleted.stage3, stageCompleted.stage4, stageCompleted.stage5])



  return ((user.firstName === "") &&
    <>
    {showModal && <FormModal data={modalData} txt={txt} setShowModal={setShowModal} handleContinue={handleContinue}/>}
    <div className={s.ctn}>
      <div className={s.wrp}>
        <h1 className={s.title}>Create Your Health Profile</h1>
        <h3 className={s.subtitle}>We use this information to match prescriptions to your profile.</h3>

        {/* General Info form */}
        <form className={s.form}>
          <h1 className={s.formTitle}>General Information {stageCompleted.stage1 && <span  onClick={() => handleEditStage('stage1')}>Edit</span>}</h1>
          {(stage.stage1 && !stageCompleted.stage1) &&
            <>
            <div className={s.formGroup}>
              <label htmlFor="First Name">First Name</label>
              <input onChange={(e) => setGeneralInfo({...generalInfo, firstName: e.target.value})} 
              type="text" name="First Name" placeholder="Enter your first name"/>
            </div>

            <div className={s.formGroup}>
              <label htmlFor="Last Name">Last Name</label>
              <input onChange={(e) => setGeneralInfo({...generalInfo, lastName: e.target.value})} 
              type="text" name="Last Name" placeholder="Enter your last name"/>
            </div>

            <div className={`${s.formGroup} ${s.formGroupShort}`}>
              <label htmlFor="Middle Initial">Middle Initial</label>
              <input onChange={(e) => setGeneralInfo({...generalInfo, middleInitial: e.target.value})} 
              type="text" name="Middle Initial" placeholder="M"/>
            </div>

            <div className={`${s.formGroup} ${s.formGroupShort}`}>
              <label htmlFor="Suffix">Suffix</label>
              <input onChange={(e) => setGeneralInfo({...generalInfo, suffix: e.target.value})} 
              type="text" name="Suffix" placeholder="(Sr, Mrs...)"/>
            </div>

            <div className={`${s.formGroup} ${s.formGroupShort}`}>
              <label htmlFor="Date Of Birth">Date Of Birth</label>
              <input onChange={(e) => setGeneralInfo({...generalInfo, DOB: e.target.value})} 
              type="date" name="Date Of Birth"/>
            </div>

            <div className={s.formGroup}>
              <label htmlFor="Sex">Sex Assigned at birth</label>
              <select onChange={(e) => setGeneralInfo({...generalInfo, sex: e.target.value})}>
                <option value='none' readOnly>Select</option>
                <option value='female'>Female</option>
                <option value='male'>Male</option>
              </select>
            </div>

            <p className='formWarning'> Review carefully; This info is used to match prescriptions to your health profile.</p>

            <div className={s.btnWrp}>
              <button onClick={handleGeneralInfo} disabled={loading} className='bigBtn'>Save & Continue</button>
            </div>
            </>
          }
        </form>





        {/* Home address form */}
        <form className={s.form}>
          <h1 className={s.formTitle}>Home Address {stageCompleted.stage2 && <span  onClick={() => handleEditStage('stage2')}>Edit</span>}</h1>
          {(stage.stage2 && !stageCompleted.stage2) &&
            <>
            <div className={s.formGroup}>
              <label htmlFor="Address">Address</label>
              <input onChange={(e) => setHomeAddress({...homeAddress, address: e.target.value})}
              type="text" name="Address" placeholder="Enter your address"/>
            </div>

            <div className={`${s.formGroup} ${s.formGroupShort}`}>
              <label htmlFor="Suite">Suite, Building...</label>
              <input onChange={(e) => setHomeAddress({...homeAddress, suite: e.target.value})}
              type="text" name="Suite" placeholder="Suite"/>
            </div>

            <div className={`${s.formGroup} ${s.formGroupShort}`}>
              <label htmlFor="City">City</label>
              <input onChange={(e) => setHomeAddress({...homeAddress, city: e.target.value})} 
              type="text" name="City" placeholder="Port Harcourt"/>
            </div>

            <div className={`${s.formGroup} ${s.formGroupShort}`}>
              <label htmlFor="State">State</label>
              <input onChange={(e) => setHomeAddress({...homeAddress, state: e.target.value})} 
              type="text" name="State" placeholder="Rivers"/>
            </div>

            <div className={`${s.formGroup} ${s.formGroupShort}`}>
              <label htmlFor="Zip Code">Zip Code</label>
              <input onChange={(e) => setHomeAddress({...homeAddress, zip: e.target.value})} 
              type="text" name="Zip Code" placeholder="500101"/>
            </div>

            <div className={s.btnWrp}>
              <button onClick={handleHomeAddress} className='bigBtn'>Save & Continue</button>
            </div>
            </>
          }
        </form>




        {/* Contact Info form */}
        <form className={s.form}>
          <h1 className={s.formTitle}>Contact Information {stageCompleted.stage3 && <span  onClick={() => handleEditStage('stage3')}>Edit</span>}</h1>
          {(stage.stage3 && !stageCompleted.stage3) &&
          <>
          <div className={`${s.formGroup}`}>
            <label htmlFor="Phone">Phone</label>
            <input onChange={(e) => setContactInfo({...contactInfo, phone: e.target.value})}
            type="text" name="Phone" placeholder="+234 90 7777 9999"/>
          </div>

          <div className={s.btnWrp}>
            <button onClick={handleContactInfo} className='bigBtn'>Save & Continue</button>
          </div>
          </>
          }
        </form>




        {/* Allergies form */}
        <form className={s.form}>
          <h1 className={s.formTitle}>Allergies {stageCompleted.stage4 && <span  onClick={() => handleEditStage('stage4')}>Edit</span>}</h1>
          {(stage.stage4 && !stageCompleted.stage4) &&
            <>
            <p className={s.subtitle}>Do you have any allergy?</p>
            <div className={s.yesOrNo}>
              <button onClick={handleHaveAllergies}>Yes</button>
              <button onClick={handleHaveAllergies}>No</button>
            </div>

            {haveAllergies &&
              <div className={`${s.formGroup}`}>
                <label htmlFor="Allergies">Allergies</label>
                <select onChange={handleSelectInputAllergy}>
                  <option value='none' readOnly>Select</option>
                  <option value='amoxicillin'>Amoxicillin</option>
                  <option value='cephalosporins'>Cephalosporins</option>
                  <option value='codeine'>Codeine</option>
                  <option value='erythromycin'>Erythromycin</option>
                  <option value='penicillin'>Penicillin</option>
                  <option value='sulfa'>Sulfa</option>
                  <option value='tetracyclines'>Tetracyclines</option>
                  <option value='other' readOnly>Other</option>
                </select>
              </div>
            }

            {(otherAllergy && haveAllergies) && 
            <div className={`${s.formGroup}`}>
              <label htmlFor="Other Allergies">Other Allergies</label>
              <input
               onChange={(e) => setAllergy(e.target.value)} onKeyDown={handleKeyDownAllergy} value={allergy}
              type="text" name="Other Allergies" placeholder="Type your allergy & hit enter"/>
            </div>
            }

            <div className={s.listArr}>
              {allergies.map((allergy, i) => <p key={i}>{allergy} <GrClose onClick={() => deleteAllergy(i)}/></p>)}
            </div>

            <div className={s.btnWrp}>
              <button onClick={handleAllergies} className='bigBtn'>Save & Continue</button>
            </div>
            </>
          }
        </form>




        {/* Medical Conditions form */}
        <form className={s.form}>
          <h1 className={s.formTitle}>Medical Conditions  {stageCompleted.stage5 && <span  onClick={() => handleEditStage('stage5')}>Edit</span>}</h1>
          {(stage.stage5 && !stageCompleted.stage5) &&
            <>
            <p className={s.subtitle}>Do you have any Medical Condition?</p>
            <div className={s.yesOrNo}>
              <button onClick={handleHaveMC}>Yes</button>
              <button onClick={handleHaveMC}>No</button>
            </div>

            {haveMedicalConditions &&
            <div className={`${s.formGroup}`}>
              <label htmlFor="Medical Conditions">Medical Conditions</label>
              <input onChange={(e) => setMedicalCondition(e.target.value)} onKeyDown={handleKeyDownMC} value={medicalCondition}
              type="text" name="Medical Conditions" placeholder="Type your medical condition & hit enter"/>
            </div>
            }
            
            <div className={s.listArr}>
              {medicalConditions.map((mc, i) => <p key={i}>{mc} <GrClose onClick={() => deleteMC(i)}/></p>)}
            </div>

            <div className={s.btnWrp}>
              <button onClick={handleMedicalConditions} className='bigBtn'>Save & Continue</button>
            </div>
            </>
          }
        </form>


        {error && <p className='formError'>{error}</p>}
        <div className={s.btnWrp}>
          {showBtn && <button onClick={handleProfileSubmit} className='bigBtn'>{!loading? 'Submit': <ImSpinner8 className='spin'/>}</button>}
        </div>
      </div>
    </div>
    </>
  )
}

import { useState } from 'react'
import s from './CreateDrugForm.module.css'
import { drugCategories } from '../../utils/drugCategory'
import { ImSpinner8, ImUpload2 } from 'react-icons/im'
import { GrClose } from 'react-icons/gr'

export default function CreateDrugForm({ type }) {
  const [drugCompany, setDrugCompany] = useState('')
  const [drugName, setDrugName] = useState('')
  const [drugGenericName, setDrugGenericName] = useState('')
  const [drugCategory, setDrugCategory] = useState('')
  const [forms, setForms] = useState([])
  const [drugForm, setDrugForm] = useState('')
  const [drugPrice, setDrugPrice] = useState('')
  const [strengths, setStrengths] = useState([])
  const [drugStrength, setDrugStrength] = useState('')
  const [pricePercent, setPricePercent] = useState('')
  const [images, setImages] = useState([])
  const [otc, setOtc] = useState(false)
  const [drugDescription, setDrugDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  // Add drug form
  const handleDrugForm = (e) => {
    e.preventDefault();
    const newForms = [...forms];
    newForms.push({form: drugForm, price: drugPrice});
    setForms(newForms);
    setDrugForm('');
    setDrugPrice('');
  }
  
  // Delete drug form
  const deleteForm = (index) => {
    const newForms = [...forms];
    newForms.splice(index, 1);
    setForms(newForms);
  }

  // Add drug strength
  const handleDrugStrength = (e) => {
    e.preventDefault();
    const newStrengths = [...strengths];
    newStrengths.push({strength: drugStrength, pricePercent});
    setStrengths(newStrengths);
    setDrugStrength('');
    setPricePercent('');
  }


  // Delete drug strength
  const deleteStrength = (index) => {
    const newStrengths = [...strengths];
    newStrengths.splice(index, 1);
    setStrengths(newStrengths);
  }



  // handle image upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    setImages(files)
  }

  // delete an image{
  const deleteImage = (index) => {
    const newImages = [...images]
    newImages.splice(index, 1)
    setImages(newImages)
  }


  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    setSuccess(false)

    const formData = new FormData()
    formData.append('drugCompany', drugCompany)
    formData.append('drugName', drugName)
    formData.append('genericName', drugGenericName)
    formData.append('category', drugCategory)
    formData.append('forms', JSON.stringify(forms))
    formData.append('strengths', JSON.stringify(strengths))
    formData.append('description', drugDescription)
    formData.append('OTC', otc)
    images.forEach((image, i) => {
      formData.append(`images`, image)
    })

    try {
      const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/${type}Drugs`, {
        method: 'POST',
        body: formData
      })
      const data = await res.json()
      if(res.ok) {
        setSuccess(true)
        setLoading(false)
      } 
      else { throw new Error(data.message) }
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }


  return (
    <div className={`formCtn ${s.ctn}`}>
      <form onSubmit={handleSubmit} className={`formWrp adminWrp ${s.wrp}`} id='createDrugform'>
        <h2 className='formTitle'>Create <span>{type}</span> Drug</h2>

        <input value={drugCompany} onChange={(e) => setDrugCompany(e.target.value)} className='formInput' type='text' placeholder='Drug Company' autoComplete="off"/>
        <input value={drugName} onChange={(e) => setDrugName(e.target.value)} className='formInput' type='text' placeholder='Drug Name' autoComplete="off"/>
        <input value={drugGenericName} onChange={(e) => setDrugGenericName(e.target.value)} className='formInput' type='text' placeholder='Drug Generic Name' autoComplete="off"/>
        
        <select value={drugCategory} onChange={(e) => setDrugCategory(e.target.value)} className='formInput'>
          {drugCategories.map((category, i) => <option key={i} value={category}>{category}</option>)}
        </select>

        <div className={s.formGroup}>
          <input value={drugForm}  className='formInput' type='text' placeholder='Drug Form' onChange={(e) => setDrugForm(e.target.value)}/>
          <input value={drugPrice}  className='formInput' type='number' placeholder='Drug Price' onChange={(e) => setDrugPrice(e.target.value)}/>
          <button className={s.addBtn} onClick={handleDrugForm}>Add</button>
        </div>

        <div className={s.listArr}>
          {forms.map((form, i) => <p key={i}>{form.form} ₦‎{form.price}<GrClose onClick={() => deleteForm(i)}/></p>)}
        </div>

        <div className={s.formGroup}>
          <input value={drugStrength}  className='formInput' type='text' placeholder='Drug Strength' onChange={(e) => setDrugStrength(e.target.value)}/>
          <input value={pricePercent}  className='formInput' type='number' placeholder='Price Percent' onChange={(e) => setPricePercent(e.target.value)}/>
          <button className={s.addBtn} onClick={handleDrugStrength}>Add</button>
        </div>

        <div className={s.listArr}>
          {strengths.map((strength, i) => <p key={i}>{strength.strength}mg {strength.pricePercent}%<GrClose onClick={() => deleteStrength(i)}/></p>)}
        </div>

        <div className={s.inputWrp}>
          <ImUpload2 />
          <p>Upload</p>
          <input onChange={handleImageUpload} type="file" multiple  name='image' accept='.jpeg, .jpg, .png'/>
        </div>

        <div className={s.listArr}>
          {images.map((image, i) => <p key={i}>{image.name}<GrClose onClick={() => deleteImage(i)}/></p>)}
        </div>

        <input value={drugDescription} onChange={(e) => setDrugDescription(e.target.value)} className='formInput' type='text' placeholder='Drug Description' autoComplete="off"/>

        <div className={s.checkbox}>
          <input type="checkbox" checked={otc} onChange={() => setOtc(!otc)}/>
          <p>Over The Counter</p>
        </div>

        <button className='bigBtn formBtn' onClick={handleSubmit}>
          {loading? <ImSpinner8 className="spin" /> : 'Create New Drug'}
        </button>

        {error && <p className='formError'>{error}</p>}
        {success && <p className='formSuccess'>Drug Created Successfully</p>}
      </form>
    </div>
  )
}
import s from './WholesaleForm.module.css'
import { useEffect, useState } from 'react'
import FormModal from '../formModal/FormModal'
import { ImSpinner8 } from "react-icons/im"
import { useNavigate } from 'react-router-dom'

export default function WholesaleForm({ user }) {
    const navigate = useNavigate()
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
      stage6: false,
      stage7: false,
    })
    const [stageCompleted, setStageCompleted] = useState({
      stage1: false,
      stage2: false,
      stage3: false,
      stage4: false,
      stage5: false,
      stage6: false,
      stage7: false,
    })
    const [businessInfo, setBusinessInfo] = useState({
      businessName: '',
      businessType: '',
      businessRegNum: '',
      businessAddress: '',
      taxId: '',
      url: '',
    })

    const [contactInfo, setContactInfo] = useState({
      contactName: '',
      phone: '',
      suffix: '',
    })

    const [productInfo, setProductInfo] = useState({
      productCategory: '',
      productDesc: '',
      brandName: '',
      manufactureCountry: '',
      packagingDetails: '',
    })

    const [salesInfo, setSalesInfo] = useState({
      salesChannel: '',
      annualSalesRevenue: '',
      marketPresence: '',
    })

    const [companyOverview, setCompanyOverview] = useState({
      companyMission: '',
      companyOverview: '',
      companyDuration: '',
    })

    const [operationalDetails, setOperationalDetails] = useState({
      warehouseLocations: '',
      shipmentMethod: '',
      returnPolicy: '',
      OrderFulfillmentTimeframe: '',
      InventoryManagementSystem: '',
    })

    const [paymentMethod, setPaymentMethod] = useState({
      preferredPaymentTerms: '',
      contractualAgreement: '',
      specialRequirement: '',
    })

      


    const handleBusinessInfo = (e) => {
      e.preventDefault()
      if (businessInfo.businessName === '') return setError('Enter business name')
      if (businessInfo.businessType === '') return setError('Select business type')
      if (businessInfo.businessRegNum === '') return setError('Enter business registration number')
      if (businessInfo.businessAddress === '') return setError('Enter business address')
      if (businessInfo.taxId === '') return setError('Enter tax ID')

      setTxt({...txt, title: 'Business Information'})
      setModalData(businessInfo)
      setShowModal(true)
    }

    const handleContactInfo = (e) => {
      e.preventDefault()
      if (contactInfo.contactName === '') return setError('Enter contact name')
      if (contactInfo.phone === '') return setError('Enter phone number')

      setTxt({...txt, title: 'Contact Information'})
      setModalData(contactInfo)
      setShowModal(true)
    }

    const handleProductInfo = (e) => {
      e.preventDefault()
      if (productInfo.productCategory === '') return setError('Enter product category')
      if (productInfo.productDesc === '') return setError('Enter product description')
      if (productInfo.brandName === '') return setError('Enter brand name')
      if (productInfo.manufactureCountry === '') return setError('Enter manufacture country')
      if (productInfo.packagingDetails === '') return setError('Enter packaging details')

      setTxt({...txt, title: 'Product Information'})
      setModalData(productInfo)
      setShowModal(true)
    }

    const handleSalesInfo = (e) => {
      e.preventDefault()
      if (salesInfo.salesChannel === '') return setError('Select sales channel')
      if (salesInfo.annualSalesRevenue === '') return setError('Select annual sales revenue')
      if (salesInfo.marketPresence === '') return setError('Select market presence')

      setTxt({...txt, title: 'Sales Information'})
      setModalData(salesInfo)
      setShowModal(true)
    }

    const handleCompanyOverview = (e) => {
      e.preventDefault()
      if (companyOverview.companyMission === '') return setError('Enter company mission')
      if (companyOverview.companyOverview === '') return setError('Enter company overview')
      if (companyOverview.companyDuration === '') return setError('Select company duration')

      setTxt({...txt, title: 'Company Overview'})
      setModalData(companyOverview)
      setShowModal(true)
    }

    const handleOperationalDetails = (e) => {
      e.preventDefault()
      if (operationalDetails.warehouseLocations === '') return setError('Enter warehouse locations')
      if (operationalDetails.shipmentMethod === '') return setError('Enter shipment method')
      if (operationalDetails.returnPolicy === '') return setError('Enter return policy')
      if (operationalDetails.OrderFulfillmentTimeframe === '') return setError('Enter order fulfillment timeframe')
      if (operationalDetails.InventoryManagementSystem === '') return setError('Enter inventory management system')

      setTxt({...txt, title: 'Operational Details'})
      setModalData(operationalDetails)
      setShowModal(true)
    }

    const handlePaymentMethod = (e) => {
      e.preventDefault()
      if (paymentMethod.preferredPaymentTerms === '') return setError('Enter preferred payment terms')
      if (paymentMethod.contractualAgreement === '') return setError('Enter contractual agreement')
      if (paymentMethod.specialRequirement === '') return setError('Enter special requirements')

      setTxt({...txt, title: 'Payment Method'})
      setModalData(paymentMethod)
      setShowModal(true)
    }

    const handleEditStage = (key) => {
      setStage({...stage, [key]: true})
      setStageCompleted({...stageCompleted, [key]: false})
    }

    
  
    const handleContinue = (key, next) => {
      if(next !== 'stage8') {
        setStageCompleted({...stageCompleted, [key]: true})
        setStage({...stage, [key]: false, [next]: true})
        setShowModal(false)
      }
  
      if(next === 'stage8') {
        setStageCompleted({...stageCompleted, [key]: true})
        setStage({...stage, [key]: false})
        setShowModal(false)
        console.log('all done')
      }
    }
  

    const handleProfileSubmit = async (e) => {
      e.preventDefault()
      setLoading(true)
      setError(null)

      const profileData = { ...businessInfo, ...contactInfo, ...productInfo, ...salesInfo, 
        ...companyOverview, ...operationalDetails, ...paymentMethod }
      console.log(profileData)
      try {
        const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/users/updateProfile/wholesaler/${user._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(profileData)
        })
        const data = await res.json()
        if (res.ok) {
          navigate('/dashboard/wholesaler')
        }
        else throw new Error(data.message)
      } catch (error) { setError(error.message) }
      finally { setLoading(false) }
    }
  
  
  
  
    useEffect(() => {
      if(user.businessName !== "" && user.productCategory !== "") {
        navigate('/dashboard/wholesaler')
      }
    }, [navigate, user])


  
    useEffect(() => {
      if(stageCompleted.stage1 && stageCompleted.stage2 && 
        stageCompleted.stage3 && stageCompleted.stage4 && 
        stageCompleted.stage5 && stageCompleted.stage6 && 
        stageCompleted.stage7) {
        setShowBtn(true)
      }
    }, [stageCompleted.stage1, stageCompleted.stage2, 
      stageCompleted.stage3, stageCompleted.stage4, 
      stageCompleted.stage5, stageCompleted.stage6, 
      stageCompleted.stage7
    ])
  
  
  
    return ((user.businessName === "" && user.productCategory === "") &&
      <>
      {showModal && <FormModal data={modalData} txt={txt} setShowModal={setShowModal} handleContinue={handleContinue}/>}
      <div className={s.ctn}>
        <div className={s.wrp}>
          <h1 className={s.title}>Create Business Profile</h1>

          {/* Business info form */}
          <form className={s.form}>
            <h2 className={s.formTitle}>Business Information {stageCompleted.stage1 && <span  onClick={() => handleEditStage('stage1')}>Edit</span>}</h2>
          {stage.stage1 && 
          <>
            <div className={s.formGroup}>
              <label htmlFor="businessName">Business Name</label>
              <input onChange={(e) => setBusinessInfo({...businessInfo, businessName: e.target.value})} value={businessInfo.businessName} type="text" name="businessName" id="businessName" required/>
            </div>

            <div className={`${s.formGroup} ${s.formGroupShort}`}>
              <label htmlFor="businessType">Business Type</label>
              <select onChange={(e) => setBusinessInfo({...businessInfo, businessType: e.target.value})} value={businessInfo.businessType} name="businessType" id="businessType" required>
                <option value="">Select</option>
                <option value="Sole Proprietorship">Sole Proprietorship</option>
                <option value="Partnership">Partnership</option>
                <option value="Limited Liability Company">Limited Liability Company</option>
                <option value="Corporation">Corporation</option>
                <option value="Non-Profit">Non-Profit</option>
              </select>
            </div>

            <div className={`${s.formGroup} ${s.formGroupShort}`}>
              <label htmlFor="businessRegNum">Business Registration Number</label>
              <input onChange={(e) => setBusinessInfo({...businessInfo, businessRegNum: e.target.value})} value={businessInfo.businessRegNum} type="text" name="businessRegNum" id="businessRegNum" required/>
            </div>

            <div className={s.formGroup}>
              <label htmlFor="businessAddress">Business Address</label>
              <input onChange={(e) => setBusinessInfo({...businessInfo, businessAddress: e.target.value})} value={businessInfo.businessAddress} type="text" name="businessAddress" id="businessAddress" required/>
            </div>

            <div className={s.formGroup}>
              <label htmlFor="taxId">Tax ID</label>
              <input onChange={(e) => setBusinessInfo({...businessInfo, taxId: e.target.value})} value={businessInfo.taxId} type="text" name="taxId" id="taxId" required/>
            </div>

            <div className={s.formGroup}>
              <label htmlFor="url">Website URL</label>
              <input onChange={(e) => setBusinessInfo({...businessInfo, url: e.target.value})} value={businessInfo.url} type="text" name="url" id="url"/>
            </div>

            <div className={s.btnWrp}>
              <button className='bigBtn' onClick={handleBusinessInfo}>Continue</button>
            </div>
          </>
          }
          </form>


          {/* Contact info form */}
          <form className={s.form}>
            <h2 className={s.formTitle}>Contact Information {stageCompleted.stage2 && <span  onClick={() => handleEditStage('stage2')}>Edit</span>}</h2>
          {stage.stage2 &&
            <>
              <div className={s.formGroup}>
                <label htmlFor="contactName">Contact Name</label>
                <input onChange={(e) => setContactInfo({...contactInfo, contactName: e.target.value})} value={contactInfo.contactName} type="text" name="contactName" id="contactName" required/>
              </div>
              <div className={s.formGroup}>
                <label htmlFor="suffix">Suffix</label>
                <select onChange={(e) => setContactInfo({...contactInfo, suffix: e.target.value})} value={contactInfo.suffix} name="suffix" id="suffix">
                  <option value="">Select</option>
                  <option value="Mr">Mr</option>
                  <option value="Mrs">Mrs</option>
                  <option value="Miss">Miss</option>
                  <option value="Dr">Dr</option>
                </select>
              </div>

              <div className={s.formGroup}>
                <label htmlFor="phone">Phone Number</label>
                <input onChange={(e) => setContactInfo({...contactInfo, phone: e.target.value})} value={contactInfo.phone} type="text" name="phone" id="phone" required/>
              </div>


              <div className={s.btnWrp}>
                <button className='bigBtn' onClick={handleContactInfo}>Continue</button>
              </div>
            </>
          }
          </form>


          {/* Product info form */}
          <form className={s.form}>
            <h2 className={s.formTitle}>Product Information {stageCompleted.stage3 && <span  onClick={() => handleEditStage('stage3')}>Edit</span>}</h2>
          {stage.stage3 &&
            <>
              <div className={s.formGroup}>
                <label htmlFor="productCategory">Product Category</label>
                <input onChange={(e) => setProductInfo({...productInfo, productCategory: e.target.value})} value={productInfo.productCategory} type="text" name="productCategory" id="productCategory" required/>
              </div>

              <div className={s.formGroup}>
                <label htmlFor="productDesc">Product Description</label>
                <textarea onChange={(e) => setProductInfo({...productInfo, productDesc: e.target.value})} value={productInfo.productDesc} name="productDesc" id="productDesc"required></textarea>
              </div>

              <div className={s.formGroup}>
                <label htmlFor="brandName">Brand Name</label>
                <input onChange={(e) => setProductInfo({...productInfo, brandName: e.target.value})} value={productInfo.brandName} type="text" name="brandName" id="brandName" required/>
              </div>

              <div className={s.formGroup}>
                <label htmlFor="manufactureCountry">Manufacture Country</label>
                <input onChange={(e) => setProductInfo({...productInfo, manufactureCountry: e.target.value})} value={productInfo.manufactureCountry} type="text" name="manufactureCountry" id="manufactureCountry" required/>
              </div>

              <div className={s.formGroup}>
                <label htmlFor="packagingDetails">Packaging Details</label>
                <textarea onChange={(e) => setProductInfo({...productInfo, packagingDetails: e.target.value})} value={productInfo.packagingDetails} name="packagingDetails" id="packagingDetails" required></textarea>
              </div>

              <div className={s.btnWrp}>
                <button className='bigBtn' onClick={handleProductInfo}>Continue</button>
              </div>
            </>
          }
          </form>


          {/* Sales info form */}
          <form className={s.form}>
            <h2 className={s.formTitle}>Sales Information {stageCompleted.stage4 && <span  onClick={() => handleEditStage('stage4')}>Edit</span>}</h2>
          {stage.stage4 &&
            <>
              <div className={s.formGroup}>
                <label htmlFor="salesChannel">Sales Channel</label>
                <select onChange={(e) => setSalesInfo({...salesInfo, salesChannel: e.target.value})} value={salesInfo.salesChannel} name="salesChannel" id="salesChannel" required>
                  <option value="">Select</option>
                  <option value="Online">Online</option>
                  <option value="Offline">Offline</option>
                  <option value="Both">Both</option>
                </select>
              </div>

              <div className={s.formGroup}>
                <label htmlFor="annualSalesRevenue">Annual Sales Revenue</label>
                <select onChange={(e) => setSalesInfo({...salesInfo, annualSalesRevenue: e.target.value})} value={salesInfo.annualSalesRevenue} name="annualSalesRevenue" id="annualSalesRevenue" required>
                  <option value="">Select</option>
                  <option value="Less than $100,000">Less than $100,000</option>
                  <option value="$100,000 - $500,000">$100,000 - $500,000</option>
                  <option value="$500,000 - $1,000,000">$500,000 - $1,000,000</option>
                  <option value="$1,000,000 - $5,000,000">$1,000,000 - $5,000,000</option>
                  <option value="$5,000,000 - $10,000,000">$5,000,000 - $10,000,000</option>
                  <option value="$10,000,000 - $50,000,000">$10,000,000 - $50,000,000</option>
                  <option value="$50,000,000 - $100,000,000">$50,000,000 - $100,000,000</option>
                  <option value="$100,000,000 - $500,000,000">$100,000,000 - $500,000,000</option>
                  <option value="$500,000,000 - $1,000,000,000">$500,000,000 - $1,000,000,000</option>
                  <option value="More than $1,000,000,000">More than $1,000,000,000</option>
                </select>
              </div>

              <div className={s.formGroup}>
                <label htmlFor="marketPresence">Market Presence</label>
                <select onChange={(e) => setSalesInfo({...salesInfo, marketPresence: e.target.value})} value={salesInfo.marketPresence} name="marketPresence" id="marketPresence" required>
                  <option value="">Select</option>
                  <option value="Local">Local</option>
                  <option value="Regional">Regional</option>
                  <option value="National">National</option>
                  <option value="International">International</option>
                </select>
              </div>

              <div className={s.btnWrp}>
                <button className='bigBtn' onClick={handleSalesInfo}>Continue</button>
              </div>
            </>
          }
          </form>


          {/* Company overview form */}
          <form className={s.form}>
            <h2 className={s.formTitle}>Company Overview {stageCompleted.stage5 && <span  onClick={() => handleEditStage('stage5')}>Edit</span>}</h2>
          {stage.stage5 &&
            <>
              <div className={s.formGroup}>
                <label htmlFor="companyMission">Company Mission</label>
                <textarea onChange={(e) => setCompanyOverview({...companyOverview, companyMission: e.target.value})} value={companyOverview.companyMission} name="companyMission" id="companyMission" required></textarea>
              </div>

              <div className={s.formGroup}>
                <label htmlFor="companyOverview">Company Overview</label>
                <textarea onChange={(e) => setCompanyOverview({...companyOverview, companyOverview: e.target.value})} value={companyOverview.companyOverview} name="companyOverview" id="companyOverview" required></textarea>
              </div>

              <div className={s.formGroup}>
                <label htmlFor="companyDuration">How long has your company been in business?</label>
                <select onChange={(e) => setCompanyOverview({...companyOverview, companyDuration: e.target.value})} value={companyOverview.companyDuration} name="companyDuration" id="companyDuration" required>
                  <option value="">Select</option>
                  <option value="Less than 1 year">Less than 1 year</option>
                  <option value="1 - 5 years">1 - 5 years</option>
                  <option value="5 - 10 years">5 - 10 years</option>
                  <option value="10 - 20 years">10 - 20 years</option>
                  <option value="More than 20 years">More than 20 years</option>
                </select>
              </div>

              <div className={s.btnWrp}>
                <button className='bigBtn' onClick={handleCompanyOverview}>Continue</button>
              </div>
            </>
          }
          </form>


          {/* Operational details form */}
          <form className={s.form}>
            <h2 className={s.formTitle}>Operational Details {stageCompleted.stage6 && <span  onClick={() => handleEditStage('stage6')}>Edit</span>}</h2>
          {stage.stage6 &&
            <>
              <div className={s.formGroup}>
                <label htmlFor="warehouseLocations">Warehouse Locations</label>
                <input onChange={(e) => setOperationalDetails({...operationalDetails, warehouseLocations: e.target.value})} value={operationalDetails.warehouseLocations} name="warehouseLocations" id="warehouseLocations" required />
              </div>

              <div className={s.formGroup}>
                <label htmlFor="shipmentMethod">Shipment Method</label>
                <textarea onChange={(e) => setOperationalDetails({...operationalDetails, shipmentMethod: e.target.value})} value={operationalDetails.shipmentMethod} name="shipmentMethod" id="shipmentMethod" required></textarea>
              </div>

              <div className={s.formGroup}>
                <label htmlFor="returnPolicy">Return Policy</label>
                <textarea onChange={(e) => setOperationalDetails({...operationalDetails, returnPolicy: e.target.value})} value={operationalDetails.returnPolicy} name="returnPolicy" id="returnPolicy" required></textarea>
              </div>

              <div className={s.formGroup}>
                <label htmlFor="OrderFulfillmentTimeframe">Order Fulfillment Timeframe</label>
                <input onChange={(e) => setOperationalDetails({...operationalDetails, OrderFulfillmentTimeframe: e.target.value})} value={operationalDetails.OrderFulfillmentTimeframe} name="OrderFulfillmentTimeframe" id="OrderFulfillmentTimeframe" required/>
              </div>

              <div className={s.formGroup}>
                <label htmlFor="InventoryManagementSystem">Inventory Management System</label>
                <textarea onChange={(e) => setOperationalDetails({...operationalDetails, InventoryManagementSystem: e.target.value})} value={operationalDetails.InventoryManagementSystem} name="InventoryManagementSystem" id="InventoryManagementSystem" required></textarea>
              </div>

              <div className={s.btnWrp}>
                <button className='bigBtn' onClick={handleOperationalDetails}>Continue</button>
              </div>
            </>
          }
          </form>


          {/* Payment method form */}
          <form className={s.form}>
            <h2 className={s.formTitle}>Payment Method {stageCompleted.stage7 && <span  onClick={() => handleEditStage('stage7')}>Edit</span>}</h2>
          {stage.stage7 &&
            <>
              <div className={s.formGroup}>
                <label htmlFor="preferredPaymentTerms">Preferred Payment Terms</label>
                <textarea onChange={(e) => setPaymentMethod({...paymentMethod, preferredPaymentTerms: e.target.value})} value={paymentMethod.preferredPaymentTerms} name="preferredPaymentTerms" id="preferredPaymentTerms" required></textarea>
              </div>

              <div className={s.formGroup}>
                <label htmlFor="contractualAgreement">Contractual Agreement</label>
                <textarea onChange={(e) => setPaymentMethod({...paymentMethod, contractualAgreement: e.target.value})} value={paymentMethod.contractualAgreement} name="contractualAgreement" id="contractualAgreement" required></textarea>
              </div>

              <div className={s.formGroup}>
                <label htmlFor="specialRequirement">Special Requirement</label>
                <textarea onChange={(e) => setPaymentMethod({...paymentMethod, specialRequirement: e.target.value})} value={paymentMethod.specialRequirement} name="specialRequirement" id="specialRequirement" required></textarea>
              </div>

              <div className={s.btnWrp}>
                <button className='bigBtn' onClick={handlePaymentMethod}>Continue</button>
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
  
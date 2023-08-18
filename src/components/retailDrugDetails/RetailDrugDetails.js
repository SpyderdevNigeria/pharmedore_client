import { Link } from 'react-router-dom'
import s from './RetailDrugDetails.module.css'
import { ReactComponent as DrugListIcon } from '../../assets/drugCtn.svg'
import { ImSpinner8 } from 'react-icons/im'
import { useEffect, useState } from 'react'
import { useCart } from '../../context/CartContext'

export default function RetailDrugDetails({ drug, loading }) {
  const [quantity, setQuantity] = useState(1)
  const [totalPrice, setTotalPrice] = useState(0)
  const [currentPrice, setCurrentPrice] = useState(0)
  const [initialFormPrice, setInitialFormPrice] = useState(0)
  const { cartItems, dispatch } = useCart();

  const handleIncreaseQuantity = () => {
    if(quantity < 100){
      setQuantity(quantity + 1)
      setTotalPrice(totalPrice + currentPrice)
    }
  }

  const handleReduceQuantity = () => {
    if(quantity > 1) {
      setQuantity(quantity - 1)
      setTotalPrice(totalPrice - currentPrice)
    }
  }


  const handleFormChange = (price) => {
    setTotalPrice(price)
    setInitialFormPrice(price)
    setCurrentPrice(price)
  }


  const handleStrengthChange = (price) => {
    setTotalPrice(price)
    setCurrentPrice(price)
  }
    

  const handleAddToCart = () => {
    // check if it's an OTC drug
    if(!drug.OTC) {
    // Check if the item already exists in the cart
    const itemExists = cartItems.some(item => item.id === drug._id);

    if (!itemExists) {
      dispatch({ type: 'ADD_ITEM', payload: {...drug, price: totalPrice, id: drug._id, quantity} });
    } else {
      alert('Item is already in the cart.');
    }
  } else {
    alert('This drug is not available for purchase...')
  }
  };


  useEffect(() => {
    if(drug) {
      setTotalPrice(drug.forms[0]?.price)
      setInitialFormPrice(drug.forms[0]?.price)
      setCurrentPrice(drug.forms[0]?.price)
    }
  }, [drug])

      
  if(loading) 
  return (
    <div className={s.loadingCtn}>
      <ImSpinner8 className="spin" style={{color: '#031C6E', fontSize: '4rem'}}/>
    </div>
  )

  if(!loading) return (
    <div className={s.ctn}>
      <div className={s.wrp}>
        <h1 className={s.mainTitle}>
          <Link to="/dashboard/retailer">All Medications {'>'}</Link> {drug.drugName}
        </h1>

        <div className={s.details}>
          <div className={s.left}>
            <div className={s.imgCtn}>
              <DrugListIcon className={s.drugIcon}/>
            </div>

            <div className={s.info}>
              <h1 className={s.title}>{drug.drugName} ({drug.genericName})</h1>
              <p className={s.subtitle}>Why does my medication look different?</p>
              <p className={s.desc}>Different manufacturers produce different looking medications to distinguish themselves from one another, but the drug, strength, and ingredients are the same.</p>
            </div>
          </div>


          <div className={s.right}>
            <h1 className={s.title}>Price Calculator</h1>

            <div className={s.drugDetails}>

              <div className={s.form}>
                <p className={s.label}>Form</p>
                {drug.forms.map((form, i) => <p onClick={() => handleFormChange(form.price)} key={i} className={s.box}>{form.form}</p>)}
              </div>

              <div className={s.strength}>
                <p className={s.label}>Strength</p>
                {drug.strengths.map((strength, i) => 
                <p onClick={() => handleStrengthChange(initialFormPrice + (initialFormPrice * strength.pricePercent))} 
                key={i} className={s.box}>{strength.strength}<span>mg</span></p>)}
              </div>

              <div className={s.quantity}>
                <p className={s.label}>Quantity</p>
                <div className={s.quantityBtn}><span onClick={handleReduceQuantity}>-</span><p>{quantity}</p><span onClick={handleIncreaseQuantity}>+</span></div>
              </div>

              <p className={s.price}><span>Price:</span>${totalPrice}</p>
            </div>
            
            <button className="bigBtn" onClick={handleAddToCart}>Add to Cart</button>
            <p className='formWarning'>Please note, the total price will be shown at checkout</p>
          </div>
        </div>
      </div>
    </div>
  )
}


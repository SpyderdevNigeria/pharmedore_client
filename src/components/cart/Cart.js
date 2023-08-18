// Cart.js
import s from './Cart.module.css';
import { TfiClose } from 'react-icons/tfi';
import { useCart } from '../../context/CartContext';
import { useAuthContext } from '../../context/AuthContext';
import pillsCtn from '../../assets/pill-bottle-blue-lid.svg';
import { RiDeleteBin2Line } from 'react-icons/ri';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';

const Cart = () => {
  const { cartItems, dispatch } = useCart();
  const { user } = useAuthContext();
  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);
  const randomNum = Math.floor(Math.random() * 100000000000) + 1000000000000;
  const name = user.accountType === 'wholesaler' ? user.businessName : user.firstName + ' ' + user.lastName;


  const config = {
    public_key: 'FLWPUBK_TEST-efbe53864c5db83581e565ca6451941e-X',
    tx_ref: randomNum,
    amount: totalPrice,
    currency: 'NGN',
    payment_options: 'card',
    customer: {
      email: user.email,
      phone_number: user.phone,
      name,
    },
    customizations: {
      title: '',
      description: 'Payment for items in cart',
      logo: "https://bit.ly/3OQ5Wvc",
    },
  };

  const handleFlutterPayment = useFlutterwave(config);
  
  



  const handleRemoveItem = itemId => {
    dispatch({ type: 'REMOVE_ITEM', payload: itemId });
  };


  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const CartItem = ({ item, onRemove }) => (
    <div className={s.cartItem}>
      <img src={pillsCtn} alt={item.name} className={s.itemImage} />
      <div className={s.itemDetails}>
        <h3>{item.drugName} <span>Qty {item.quantity}</span></h3>
        <p>${item.price.toFixed(2)}</p>
        <RiDeleteBin2Line className={s.removeItemButton} onClick={onRemove} />
      </div>
    </div>
  );

  const cartItemsElements = cartItems.map(item => (
    <CartItem key={item.id} item={item} onRemove={() => handleRemoveItem(item.id)} />
  ));

  return (
    <div className={s.cartContainer} id='cart'>
      <TfiClose className={s.close} onClick={() => document.getElementById('cart').style.display = 'none'} />

      {cartItems.length === 0 ? (
        <div className={s.wrp}>
          <h2 className='formTitle'>Your Cart Is Empty...</h2>
        </div>
      ) : (
        <div className={s.wrp}>
        <h2 className='formTitle'>Your Cart</h2>
        <div className={s.cartItems}>{cartItemsElements}</div>
        <div className={s.cartTotal}>Total: ${totalPrice.toFixed(2)}</div>
        <button className="bigBtn formBtn" onClick={() => {
          handleFlutterPayment({
            callback: (response) => {
               console.log(response);
               if (response.status === 'successful') {
                clearCart();
                alert('Payment Successful');
                }
                closePaymentModal()
            },
            onClose: () => {},
            });
          }}>
          Proceed to Checkout
        </button>
      </div>
      )}
    </div>
  );
};

export default Cart;

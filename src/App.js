import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// importing pages
import Home from './pages/home/Home';
import About from './pages/about/About';
import Expertise from './pages/expertise/Expertise';
import Contact from './pages/contact/Contact';
import SignUp from './pages/signUp/SignUp';
import Login from './pages/login/Login';
import Otp from './pages/otp/Otp';
import Verify from './pages/verify/Verify';
import Retailer from './pages/retailer/Retailer';
import Wholesaler from './pages/wholesaler/Wholesaler';
import CreateProfile from './pages/createProfile/CreateProfile';
import AllMedications from './pages/allMedications/AllMedications';
import RetailDrug from './pages/retailDrug/RetailDrug';
import ForgotPassword from './pages/forgotPassword/ForgotPassword';
import WholesaleDrug from './pages/wholesaleDrug/WholesaleDrug';
import { useAuthContext } from './context/AuthContext';
import { ImSpinner8 } from 'react-icons/im';
import Cart from './components/cart/Cart';
import AdminLogin from './pages/adminLogin/AdminLogin';
import Admin from './pages/admin/Admin';
import CreateDrug from './pages/createDrug/CreateDrug';
import UpdateDrug from './pages/updateDrug/UpdateDrug';
import DeleteDrug from './pages/deleteDrug/DeleteDrug';

function App() {
  const { user, fetching } = useAuthContext();

  
  if(fetching) 
  return (
    <div className="formCtn">
      <ImSpinner8 className="spin" style={{color: '#031C6E', fontSize: '4rem'}}/>
    </div>
  )


  if(!fetching)   return (
    <div className="App">
      {user&& <Cart />}
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/expertise" element={<Expertise />} />
          <Route path="/all-medications" element={<AllMedications />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={!user ? <SignUp /> : <Home />} />
          <Route exact path="/login" element={!user ? <Login /> : <Home />} />
          <Route exact path="/admin-login" element={<AdminLogin />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/forgot-password/:page" element={<ForgotPassword />} />
          <Route path="/verify/retailer/:email" element={<Verify accountType={'retailer'}/>} />
          <Route path="/verify/wholesaler/:email" element={<Verify accountType={'wholesaler'}/>} />
          <Route path="/login/otp/retailer" element={<Otp accountType={'retailer'}/>} />
          <Route path="/login/otp/wholesaler" element={<Otp accountType={'wholesaler'}/>} />
          <Route path="/dashboard/createProfile/:accountType" element={<CreateProfile />} />
          <Route path="/dashboard/retailer" element={user? <Retailer /> : <Login />} />
          <Route path="/dashboard/retailer/:page" element={user? <Retailer /> : <Login />} />
          <Route path="/dashboard/retailer/retail-drug-detail/:id" element={<RetailDrug />} />
          <Route path="/dashboard/wholesaler/wholesale-drug-detail/:id" element={<WholesaleDrug />} />
          <Route path="/dashboard/wholesaler" element={user ? <Wholesaler /> : <Login />} />
          <Route path="/dashboard/wholesaler/:page" element={user ? <Wholesaler /> : <Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/:page" element={<Admin />} />
          <Route path="/admin/drug-crud/create/:type" element={<CreateDrug />} />
          <Route path="/admin/drug-crud/update/:type" element={<UpdateDrug />} />
          <Route path="/admin/drug-crud/delete/:type" element={<DeleteDrug />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

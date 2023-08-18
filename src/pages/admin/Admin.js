import { useNavigate, useParams } from "react-router-dom";
import AdminSideNav from "../../components/adminSideNav/AdminSideNav";
import SelectDrugOperation from "../../components/selectDrugOperation/SelectDrugOperation";
import { useAuthContext } from "../../context/AuthContext";
import { useEffect } from "react";
import AdminNav from "../../components/adminNav/AdminNav";

export default function Admin() {
  const { page } = useParams()
  const { navigate } = useNavigate()
  const { user, fetching } = useAuthContext();


  useEffect(() => {
    if(!user) {
      navigate('/admin-login')
    }
  }, [user, navigate])

  if(!fetching) {
    if (page === 'drug-crud' || page === undefined) {
      return (
        <>
        <AdminNav />
        <div className="adminCtn">
          <AdminSideNav activeLink={page === undefined ? true : false}/>
          <SelectDrugOperation />
        </div>
        </>
      )
    }
  }

}

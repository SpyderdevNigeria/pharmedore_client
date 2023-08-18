import { useParams } from 'react-router-dom'
import AdminSideNav from '../../components/adminSideNav/AdminSideNav'
import CreateDrugForm from '../../components/createDrugForm/CreateDrugForm'
import AdminNav from '../../components/adminNav/AdminNav'

export default function CreateDrug() {
  const { type } = useParams()


  return (
    <>
    <AdminNav />
    <div className='adminCtn'>
      <AdminSideNav />
      <CreateDrugForm type={type}/>
    </div>
    </>
  )
}

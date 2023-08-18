import s from './SelectDrugOperation.module.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function SelectDrugOperation() {
  const [type, setType] = useState(null)



  return (
    <div className='formCtn'>
      <div className={`formWrp adminWrp ${s.wrp}`}>
        {!type &&
          <>
            <button onClick={() => setType('retail')}>Retail?</button>
            <button onClick={() => setType('wholesale')}>Wholesale?</button>
          </>
        }

        {type &&
        <>
          <Link to={`/admin/drug-crud/create/${type}/`}>Create New Drug</Link>
          <Link to={`/admin/drug-crud/update/${type}/`}>Update Drugs</Link>
          <Link to={`/admin/drug-crud/delete/${type}/`}>Delete Drugs</Link>
        </>
        }
      </div>
    </div>
  )
}

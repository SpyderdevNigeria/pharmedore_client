import s from './RetailProfile.module.css'

export default function RetailProfile({ user }) {
  return (
    <div className={s.ctn}>
      <div className={s.wrp}>
        <h1 className={s.title}>Health Profile</h1>
        <p className={s.subtitle}>General Information</p>
        <p className={s.note}>
          We use this information to match prescriptions to your account. 
          You cannot update these details once your account has been created. 
          You will need to create a new account to change these details.
        </p>

        <div className={s.details}>
          <div className={s.detail}>
            <p className={s.label}>Legal Name</p>
            <p className={s.value}>{user.firstName} {user.lastName}</p>
          </div>

          <div className={s.detail}>
            <p className={s.label}>Email</p>
            <p className={s.value}>{user.email}</p>
          </div>

          <div className={s.detail}>
            <p className={s.label}>Phone</p>
            <p className={s.value}>{user.phone}</p>
          </div>

          <div className={s.detail}>
            <p className={s.label}>Date Of Birth</p>
            <p className={s.value}>{user.DOB.slice(0, 10)}</p>
          </div>
          <div className={s.detail}>
            <p className={s.label}>Sex Assigned At Birth</p>
            <p className={s.value}>{user.sex}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

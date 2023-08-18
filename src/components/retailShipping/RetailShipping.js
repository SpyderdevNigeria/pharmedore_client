import s from './RetailShipping.module.css'

export default function RetailShipping({ user }) {
  return (
    <div className={s.ctn}>
      <div className={s.wrp}>
        <h1 className={s.title}>Shipping</h1>
        <div className={s.details}>
          <p className={s.default}>Default</p>
          <p className={s.name}>{user.firstName} {user.lastName}</p>
          <p className={s.address}>{user.address} {user.suite} {user.city} {user.state} {user.zip}</p>
        </div>
      </div>
    </div>
  )
}

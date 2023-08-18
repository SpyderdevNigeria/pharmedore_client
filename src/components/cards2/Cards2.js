import s from './Cards2.module.css'

export default function Cards2({data}) {
  return (
    <div className={s.ctn}>
      <h2 className={s.title}>Our Values</h2>
      <div className={s.wrp}>
        {data.map((item, i) => 
        <div key={i} className={s.card}>
          {item.icon}
          {item.title}
          {item.desc}
        </div>
        )}
      </div>
    </div>
  )
}

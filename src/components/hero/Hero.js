import s from './Hero.module.css'

export default function Hero({data}) {
  return (
    <div className={s.ctn}>
      <div className={s.wrp}>
        <div className={s.txt}>{data.title} {data.subtitle} {data.btn}</div>
        <div className={s.img}>{data.img}</div>
      </div>
    </div>
  )
}

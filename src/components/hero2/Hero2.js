import s from './Hero2.module.css'

export default function Hero2({data}) {
  console.log(data.bg)
  return (
    <div 
    className={s.ctn}
    style={{
      backgroundImage: `linear-gradient(60deg, #ffffffda, #ffffffa4), url(${data.bg})`,
    }}>
      <div className={s.wrp}>
        <div className={s.txt}>{data.title} {data.subtitle}</div>
        <div className={s.img}>{data.img1}{data.img2}</div>
      </div>
    </div>
  )
}

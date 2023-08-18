import s from './Sec.module.css'

export default function Sec({ data, wide }) {
  return (
    <div className={s.ctn} style={{background: data.bg}}>
      <div className={`${s.wrp} ${wide && s.wrp2}`}>
        <div className={s.img}>{data.img}</div>
        <div className={`${s.txt} ${wide && s.txt2}`}>
          {data.title}
          {data?.subtitle}
          {data.desc}
          {data?.btn}
        </div>
      </div>
    </div>
  )
}

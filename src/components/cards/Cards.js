import s from './Cards.module.css'

export default function Cards({cards, isExperttise}) {
  return (
    <div className={s.ctn}>
      {!isExperttise && <h1 className='title' style={{textAlign: 'center', padding: "70px 0 30px 0"}}>Our Expertise</h1>}
      <div className={s.wrp} style={isExperttise ? {padding: '100px 5px'} : {}}>
        {cards.map((card, i) => 
          <div className={s.card} key={i} style={isExperttise ? {width: '100%', maxWidth: '500px'} : {}}>
            <div className={s.icon}>{card.icon}</div>
            <h1>{card.title}</h1>
            <p>{card.desc}</p>
            {card?.btn}
          </div>
        )}
      </div>
    </div>
  )
}

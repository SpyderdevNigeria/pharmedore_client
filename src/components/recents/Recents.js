import s from './Recents.module.css'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import { FreeMode, Navigation, Autoplay } from "swiper";
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Recents({ drugs }) {
  const [slidesPerView, setSlidesPerView] = useState(0.94);

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      if (windowWidth >= 600) {
        setSlidesPerView(3.3);
      } else {
        setSlidesPerView(0.97);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  return (
    <div className={s.ctn}>
      <h1 className='title'>Our Recent Products</h1>
      <Swiper
        slidesPerView={slidesPerView}
        freeMode={true}
        navigation={true}
        modules={[FreeMode, Navigation, Autoplay]}
        className={s.wrp}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
      >

          {drugs.map((drug, i) => 
          <SwiperSlide className={s.slide} key={i}>
            <div className={s.img}><img src={drug.img} alt='product'/></div>

            <div className={s.txt}>
              <div className={s.header}>
                <h3>{drug.name}</h3>
              </div>

              <p className={s.amount}>${drug.amount}</p>
            </div>
            <div className={s.btn}>+</div>
          </SwiperSlide> 
          )}
        
      </Swiper>
      <Link to="/all-medications" className='bigBtn'>More Medications</Link>
    </div>
  )
}

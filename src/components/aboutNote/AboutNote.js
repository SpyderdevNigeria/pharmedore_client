import s from './AboutNote.module.css';
import { ReactComponent as Tablet } from '../../assets/tablet.svg';
import { ReactComponent as Binocular } from '../../assets/binocular.svg';

export default function AboutNote() {
  return (
    <div className={s.ctn}>
      <div className={s.wrp}>
        <p>
           As a highly trusted online platform, we prioritize the well-being of individuals and communities by offering an extensive selection of high-quality wholesale pharmaceutical products and services. By bridging the gap between pharmaceutical companies and retailers, we strive to enhance healthcare accessibility. With our customer-centric approach and unwavering commitment to excellence, we are reshaping the future of healthcare.
        </p>
        <p>
           Our platform empowers healthcare providers to make well-informed decisions regarding drug purchases, leading to substantial cost savings. Additionally, we offer customers a wide selection of pharmaceutical products, medications, and healthcare services, ensuring a comprehensive range of options for their needs.
        </p>
        <div>
          <h1><Tablet width={30} height={30} /> Our Mission</h1>
          <p>
             At Pharmedore, our mission is centered around breaking down barriers to healthcare access and enhancing the well-being of individuals throughout Africa. We are committed to improving accessibility to quality and affordable pharmaceutical and healthcare solutions across the continent.
          </p>
        </div>
        <div>
          <h1><Binocular width={30} height={30} /> Our Vision</h1>
          <p>
             At Pharmedore, our mission is centered around breaking down barriers to healthcare access and enhancing the well-being of individuals throughout Africa. We are committed to improving accessibility to quality and affordable pharmaceutical and healthcare solutions across the continent.
          </p>
        </div>
      </div>
    </div>
  )
}

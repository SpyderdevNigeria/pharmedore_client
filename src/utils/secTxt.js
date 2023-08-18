import pharmacist from '../assets/Pharmacist.png'
import childhoodCancer from '../assets/CHILDHOOD-CANCER.jpg'
import founder from '../assets/Business-woman-on-suit.png'
import { ReactComponent as Medcase } from '../assets/medcase.svg';
import { ReactComponent as Med } from '../assets/med.svg';
import { ReactComponent as Micro } from '../assets/medcase.svg';
import { ReactComponent as Star } from '../assets/star.svg';
import { ReactComponent as Gavel } from '../assets/gavel.svg';
import { ReactComponent as Balance } from '../assets/balance.svg';
import { ReactComponent as Heart } from '../assets/heart.svg';
import { ReactComponent as Wave } from '../assets/wave.svg';
import { ReactComponent as Drug } from '../assets/drug.svg';
import { RiArrowRightLine } from 'react-icons/ri'

export const secTxt1 = {
  title: <h1 className='title'>Who We Are</h1>,
  desc: <p  style={{marginTop: "-30px"}}>Pharmedore is a leading eCommerce pharmaceutical company dedicated to improving people's lives  by ensuring access to safe, affordable medicines and convenient healthcare solutions.</p>,
  btn: <button className='bigBtn'>Learn More <RiArrowRightLine /></button>,
  img: <img src={pharmacist} alt='Pharmacist'/>,
  bg: '#F0F5F8'
}

export const foundersMessage = {
  title: <h1 className='title' style={{marginBottom: "0"}}>founder's Message</h1>,
  subtitle: <h3  style={{marginTop: "-25px"}}>Cole Blackborn</h3>,
  desc: <p>Pharmedore is a leading eCommerce pharmaceutical company dedicated to improving people's lives  by ensuring access to safe, affordable medicines and convenient healthcare solutions.</p>,
  img: <img className='founder'  src={founder} alt='founder'/>,
  bg: '#F0F5F8'
}

export const secTxt2 = [
  {
    title: 'Medications',
    desc: 'We cater to your prescription needs, including those recommended by your physician. Our expertise lies in filling rare or hard-to-find medications.',
    icon: <Medcase />,
    btn: <b>View More <RiArrowRightLine /></b>
  },
  {
    title: 'Pharma Solutions',
    desc: 'We serve as a bridge, connecting pharmaceutical manufacturers directly to a network of pharmacies and distributors. By eliminating intermediaries,',
    icon: <Micro />,
    btn: <b>View More <RiArrowRightLine /></b>
  },
  {
    title: 'Diagnostic Solutions',
    desc: 'Our Diagnostic Solution is designed to support healthcare providers in delivering accurate and efficient diagnoses to improved care and outcomes.',
    icon: <Med />,
    btn: <b>View More <RiArrowRightLine /></b>
  },
]

export const expertise = [
  {
    title: 'Order Management',
    desc: 'Order Management: Our Order Management system integrates with inventory management solutions, allowing healthcare providers to monitor medication stock levels, track expiration dates, and receive automated alerts for reordering. This platform provides a user-friendly interface, real-time inventory visibility and automated order processing.',
    icon: <Wave />
  },
  {
    title: 'Medications',
    desc: 'We are dedicated to meeting your prescription needs, including those recommended by your physician. We have the capability to fill even rare or hard-to-find medications. Our inventory consists of a wide range of oral medications, self-injectables, and other supportive therapies.oral medications, self-injectables, and other supportive therapies.',
    icon: <Medcase />
  },
  {
    title: 'Pharma Solutions',
    desc: 'Order Management: Our Order Management system integrates with inventory management solutions, allowing healthcare providers to monitor medication stock levels, track expiration dates, and receive automated alerts for reordering. This platform provides a user-friendly interface, real-time inventory visibility and automated order processing.',
    icon: <Micro />
  },
  {
    title: 'Diagnostic Solutions',
    desc: 'We are dedicated to meeting your prescription needs, including those recommended by your physician. We have the capability to fill even rare or hard-to-find medications. Our inventory consists of a wide range of oral medications, self-injectables, and other supportive therapies.oral medications, self-injectables, and other supportive therapies.',
    icon: <Med />
  },
  {
    title: 'Telemedicine and Remote Monitoring',
    desc: 'Order Management: Our Order Management system integrates with inventory management solutions, allowing healthcare providers to monitor medication stock levels, track expiration dates, and receive automated alerts for reordering. This platform provides a user-friendly interface, real-time inventory visibility and automated order processing.',
    icon: <Drug />
  },
]


export const values = [
  {
    title: <h3>Excellence</h3>,
    desc: <p>StrepsilStrepsilLorem ipsum dolor sit amet, adipiscing elit, adipiscing elit, sed diam nibh ipsuipsum dolor sit amet, m dolor sit amet, adipiscing elit, adipiscing elit, laoreet dolore magna View ipsum dolor sit amet, MoreView More</p>,
    icon: <Star width={50} height={50}/>,
  },
  {
    title: <h3>Courage</h3>,
    desc: <p>StrepsilStrepsilLorem ipsum dolor sit amet, adipiscing elit, adipiscing elit, sed diam nibh ipsuipsum dolor sit amet, m dolor sit amet, adipiscing elit, adipiscing elit, laoreet dolore magna View ipsum dolor sit amet, MoreView More</p>,
    icon: <Gavel width={50} height={50}/>,
  },
  {
    title: <h3>Intergrity & Ethics</h3>,
    desc: <p>StrepsilStrepsilLorem ipsum dolor sit amet, adipiscing elit, adipiscing elit, sed diam nibh ipsuipsum dolor sit amet, m dolor sit amet, adipiscing elit, adipiscing elit, laoreet dolore magna View ipsum dolor sit amet, MoreView More</p>,
    icon: <Balance width={50} height={50}/>,
  },
  {
    title: <h3>Passion</h3>,
    desc: <p>StrepsilStrepsilLorem ipsum dolor sit amet, adipiscing elit, adipiscing elit, sed diam nibh ipsuipsum dolor sit amet, m dolor sit amet, adipiscing elit, adipiscing elit, laoreet dolore magna View ipsum dolor sit amet, MoreView More</p>,
    icon: <Heart width={50} height={50}/>,
  },
]

export const testimonies = [
  {
    id: 'kjdghsntdfmhjldhjhbsi',
    name: 'Frank Richard',
    message: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna',
  },
  {
    id: 'kjdghjhyedldhjhbsi',
    name: 'Jane Watson',
    message: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna',
  },
  {
    id: 'kjdghjdmljldhjhbsi',
    name: 'Williams Cole',
    message: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna',
  },
  {
    id: 'kjdghjkhgkljldhjhbsi',
    name: 'Steph Morgan',
    message: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna',
  },
]



export const secTxt3 = {
  title: <h1 style={{lineHeight: '1.2', }} className='title'>Your Donation Helps To Save Lives </h1>,
  desc: <div  style={{marginTop: "-30px"}}>
    <p>Our mission is to provide vital resources, emotional support, and financial assistance to those in need throughout their cancer journey. To fulfill our mission and make a meaningful impact, we rely on the generosity of individuals like yourself.</p> 
  <p style={{marginTop: '20px', marginBottom: '20px' }}>
    By donating to our cancer foundation, you will help us provide essential services such as access to quality healthcare, funding for medical treatments, support groups, educational programs, and much more.
    </p> 
  <p>Thank you in advance for your kindness and compassion. Together, we can make a lasting impact on the lives of cancer patients and their families.</p></div>,
  btn: <button className='bigBtn'>Donate Now <RiArrowRightLine /></button>,
  img: <img className='cancerImg' height={500} src={childhoodCancer} alt='CHILDHOOD CANCER'/>,
  bg: '#F0F5F8'
}
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@mui/material'
import s from './ContactForm.module.css'
import { BiPhone } from 'react-icons/bi'
import { GoLocation } from 'react-icons/go'
import { VscMail } from 'react-icons/vsc'
import { FaFacebookSquare, FaInstagramSquare, FaTwitterSquare } from 'react-icons/fa'

export default function ContactForm() {
  return (
    <div className={s.ctn}>
      <h1 className={s.title}>Contact Us</h1>
      <p className={s.subtitle}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut <br /> labore et dolore </p>
      <div className={s.wrp}>
        <div className={s.info}>
            <h2>Contact Info</h2>

            <div className={s.contact}>
              <a href="tel:+14310239876"><BiPhone color='white' size='1.6rem'/> +1(431) 023 9876</a>
              <a href="mailto:support@pharmedore.com"><VscMail color='white' size='1.6rem'/> support@pharmedore.com</a>
              <a href="https://www.google.com/maps" target="_blank" rel="noreferrer"><GoLocation color='white' size='2.5rem'/> 2501 Bill Moses Parkway, Farmers Branch, 75234 Texas.</a>
            </div>

            <div className={s.socials}>
              <a href='/'><FaFacebookSquare color='white' size='1.5rem'/></a>
              <a href='/'><FaInstagramSquare color='white' size='1.5rem'/></a>
              <a href='/'><FaTwitterSquare color='white' size='1.5rem'/></a>
            </div>
        </div>

        <form className={s.form}>
          <TextField
            className={s.input}
            label="First Name"
            placeholder="John"
            variant="standard"
          />
          <TextField
            className={s.input}
            label="Last Name"
            placeholder="Doe"
            variant="standard"
          />
          <TextField
            className={s.input}
            label="Email"
            placeholder="Johndoe@gmail.com"
            variant="standard"
          />
          <TextField
            className={s.input}
            label="Phone Number"
            placeholder="+1(431) 023 9876"
            variant="standard"
          />

          <FormControl className={s.select}>
            <FormLabel>Select Subject</FormLabel>
            <RadioGroup row name="Select Subject">
              <FormControlLabel value="General Inquiry" control={<Radio />} label="General Inquiry" />
              <FormControlLabel value="General Inquiry" control={<Radio />} label="General Inquiry" />
              <FormControlLabel value="General Inquiry" control={<Radio />} label="General Inquiry" />
              <FormControlLabel
                value="disabled" disabled
                control={<Radio />}
                label="other"
              />
            </RadioGroup>
          </FormControl>

          <TextField
            className={s.longInput}
            label="Message"
            placeholder="Write Your Message"
            variant="standard" multiline rows={2}
          />

          <button className='bigBtn'>Send Message</button>
        </form>
      </div>
    </div>
  )
}

import React ,{ useRef } from 'react';
import emailjs from '@emailjs/browser';

export default function Contact() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm("service_1z4yf1m", "template_bmayprf", form.current, '_43WQMwV1XM_bbmr7')
      .then(
        () => {
          alert('Message successfully sent!')
        },
        () => {
          alert('Failed to send the message, please try again')
        }
      )
  };

  return (
    <div id='contact'>
        <h1> CONTACT US</h1>
        <form ref={form} onSubmit={sendEmail}>
            <input type="text" name="name" id="name" placeholder='Full Name' required />
            <input type="email" name="email" id="email" placeholder='Type Your E-Mail' required/>
            <textarea name="message" id="message"placeholder='Write Here ...' cols="30" rows="10" style={{ resize: 'none' }} required></textarea>
            <input type="submit" value="SEND" />
        </form>
       
    </div>
  )
}

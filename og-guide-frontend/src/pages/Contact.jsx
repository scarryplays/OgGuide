import { useState } from "react";
import "../css-pages/contact.css"

export const Contact = () => {
  const [contact, setContact] = useState({
    username: "",
    email: "",
    message: "",
  });

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setContact({
      ...contact,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(contact);
  };


  return (
    <>
      <section className="section-contact">
        <div className="contact-content-container">
          <h1 className="main-heading">Message for us</h1>
       
        <div className="container-grid-grid-two-cols">

          <section>
            <form onSubmit={handleSubmit} className="section-form">
              <div className="input-sec">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  autoComplete="off"
                  value={contact.username}
                  onChange={handleInput}
                  required
                />
              </div>

              <div  className="input-sec">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="off"
                  value={contact.email}
                  onChange={handleInput}
                  required
                />
              </div>

              <div className="input-sec">
                <label htmlFor="message">Message</label>
                <textarea
                  name="message"
                  id="message"
                  autoComplete="off"
                  value={contact.message}
                  onChange={handleInput}
                  required
                  cols="30"
                  rows="6"
                ></textarea>
              </div>

              <div className="input-sec">
                <button type="submit" className="btn">Submit</button>
              </div>
            </form>
           
            
          </section>
        </div>

        </div>
        <section className="mb-3">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1212.106521350313!2d76.57315642392905!3d30.76461545533607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ffb140bd63e07%3A0x68591e334d17a988!2sChandigarh%20University!5e0!3m2!1sen!2sin!4v1742302686599!5m2!1sen!2sin" 
        width="100%" 
        height="450" 
        allowFullFcreen
        loading="lazy" 
        referrerPolicy="no-referrer-when-downgrade"> 
        </iframe>
        </section>
      </section>
    </>
  );
};
import React from 'react';
import { observer } from 'mobx-react-lite';
import { infoStore } from '../store/InfoStore';
import './faq.scss';


const FAQ = observer(() => {
  return (
    <div className="faq">

      <div className="faqs">
        {infoStore.faqs.map((faq, i) => (
           <div key={'faq-'+i}>
             <h2>{faq.title}</h2>
             <div className="answer">{faq.body}</div>
           </div>
         ))}
      </div>

       <div className="notice">{notice}</div>

    </div>
  )
});

// const demoLink = 'https://www.youtube.com/watch?v=NGPw8K3Juc0';

const year = new Date().getFullYear();
const notice = `© Alex Roebuck ${year}`;


export default FAQ;

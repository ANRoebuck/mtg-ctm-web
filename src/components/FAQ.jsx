import React from 'react';
import '../styles/faq.scss';


const FAQ = () => {
  return (
    <div className="faq">

      <div className="faqs">
        {FAQs.map((faq, i) => (
           <div key={'faq-'+i}>
             <h2>{faq.title}</h2>
             <div className="answer">{faq.body}</div>
           </div>
         ))}
      </div>
     
       <div className="notice">{notice}</div>

    </div>
  )
};

// const demoLink = 'https://www.youtube.com/watch?v=NGPw8K3Juc0';

const notice = '© Alex Roebuck 2022';

const FAQs = [
  {
      title: 'Disclaimer',
      body:
          'CtM does not endorse any retailer whose prices are listed in this app. ' +
          'Any purchases are an agreement between the buyer and the retailer only. ' +
          'CtM and its creator accept no liability for purchased items that do not arrive or that are not as described. ' +
          '\n\n' +
          'The prices shown in this app should be correct at the time of search, but this can never be guaranteed. ' +
          'Some prices may be out of date, or some in-stock items may be missing. ' +
          'CtM will endeavour to fix any issues that may arise as quickly as possible. '
  },
  {
      title: 'Where do the prices come from? Are you constantly scraping sites?',
      body: "CtM does not scrape sites and store data en masse. At the time of each search, CtM's server makes a live request to each retailer's website and displays up-to-date information. " +
          'In order to increase efficiency, CtM may retain results of recent searches for a short time, and serve those in response to identical searches. ' +
          'This could mean prices are sometimes slightly out of date.',
  },
  {
      title: 'Sponsored?',
      body:
          'No. CtM has no financial relationship with any retailer or other third party in relation to the prices displayed in this app. ' +
          'If ever that changes, this section will be updated accordingly.'
  },
  {
      title: 'When will [website] be added?',
      body:
          'CtM is produced as a passion project by a single developer working in his spare time. ' +
          "Each retailer's website is built differently, which means they are not all equally easy to add. " +
          "Additionally, basic vetting - searching for a few popular or valuable cards - might show that a particular retailer doesn't have good stock levels. " +
          'For these and other practical reasons, a given site might not get a chance to be added to the app. ' +
          'However, this will never be because of "playing favourites". CtM does not favour any retailer and is always looking to provide prices from more sources.'
  },
  {
      title: 'When is your birthday?',
      body: '31st of January, thanks for asking.'
  }
];


export default FAQ;

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
          'In order to increase efficiency, CtM may retain results of recent searches for a short time, and serve those in response to identical searches.' +
          'This could mean prices are sometimes slightly out of date',
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
  // {
  //   title: 'Why am I seeing Tundra Wolves when I search for Tundra?',
  //   body: '  When you search for "Tundra" the app displays the results that each site gives for that term - some of those
  //   might be Tundra Wolves. The app isn't smart enough to know that the extra word means this is a different card.
  //   "Why not just filter out anything that isn't an exact match?", you might ask. It's a good idea, but
  //   unfortunately it would exclude a lot of valid results.
  //   <br/>
  //   Consider these examples of item names a site might use: "Damnation", "Damnation Foil", "Damnation Judge Promo",
  //   "Damnation Player Rewards", "Damnation (JPN)" and so on. In order to know that "Damnation - Secret Lair" is a
  //   valid result but that "Choice of Damnations" isn't, the app would need to have an exhaustive "allow list"
  //   of terms to ignore when trying to filter results. Inevitably something would get missed off the list, and valid
  //   results would not be shown. On balance I think it's better to include a few irrelevant results than to exclude
  //   relevant ones.
  //   <br />
  //   I would like to try and fix this - it's the most common piece of feedback I get from people who've used the
  //   app - but finding an effective solution is proving very difficult, so we're stuck seeing Tundra Wolves for now.',
  // },
  // {
  //   title: 'Can you filter / sort the results in such and such a way ?',
  //   body: 'Ehh... probably not? The app does have options to help control this, but a huge part of the equation is that
  //   each seller's site is very different and it's not practical to pass on this kind of information. What the app
  //   does is make a very basic request, usually by passing on the exact string you type and nothing else, and then
  //   try to manipulate the returned results.',
  // },
  {
      title: 'When is your birthday?',
      body: '31st of January, thanks for asking.'
  }
];


export default FAQ;

import React, { useState } from 'react';
import './app.scss';
import './compare-prices.scss';
import SearchMenu from './components/search/SearchMenu';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from './components/TabPanel';
import FAQ from './components/FAQ';
import Options from './components/options/Options';
import { BookmarksView, ResultsView } from './components/results/ResultsViews';



const views = {
  results: 'Results',
  options: 'Options',
  bookmarks: 'Bookmarks',
  faq: 'FAQ',
};

const App = () => {

  const [tab, setTab] = useState(0);
  const onChangeTab = (event, newValue) => setTab(newValue);


  return (
    <div className="App">

        <div className="compare-the-magic">

            <SearchMenu />

            <AppBar position="static" >
              <Tabs value={tab} onChange={onChangeTab}>
                {Object.values(views).map((view, i) => <Tab label={view} key={'tab-'+i}/>)}
              </Tabs>
            </AppBar>


            <TabPanel value={tab} index={0}>
              <ResultsView />
            </TabPanel>


            <TabPanel value={tab} index={1}>
              <Options />
            </TabPanel>


            <TabPanel value={tab} index={2}>
              <BookmarksView />
            </TabPanel>


            <TabPanel value={tab} index={3}>
              <FAQ/>
            </TabPanel>


        </div>

    </div>
  );
}

export default App;

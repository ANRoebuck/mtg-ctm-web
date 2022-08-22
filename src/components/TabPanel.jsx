import React from 'react';

const TabPanel = ({children, value, index}) => (
    <div className="tab-panel" hidden={value !== index} data-testid={`tab-panel-${index}`}>
      {children}
    </div>
  );

export default TabPanel;
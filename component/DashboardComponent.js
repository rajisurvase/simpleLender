import React from 'react'
// import styles from '../styles/Home.module.css'
import { Box, Tab, Tabs, Typography } from '@mui/material';
import { useState } from 'react';
import Calculator from './Calculator';
const DashboardComponent = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
              {children}
          </Box>
        )}
      </div>
    );
  }
  return (
    <div>
       <Box py={3} >
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
      >
        <Tab value={0} label="Simple Interest Calculator" />
        <Tab value={1} label="Lender Records" />
        {/* <Tab value="three" label="Item Three" /> */}
      </Tabs>
    </Box>
    <TabPanel value={value} index={0}>
       <Calculator />
      </TabPanel>
      <TabPanel value={value} index={1}>
        {/* <RecordTable /> */}
         <Typography>Lender Records</Typography>
      </TabPanel>
    </div>
  )
}

export default DashboardComponent
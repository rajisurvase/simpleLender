import React, { useEffect } from 'react'
// import styles from '../styles/Home.module.css'
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Slide, Tab, Tabs, Typography } from '@mui/material';
import { useState } from 'react';
import Calculator from './Calculator';
import CreateComponent from './CreateComponent';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CreateForm from './CreateForm';
import TableData from './TableData';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const DashboardComponent = () => {
  const [value, setValue] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [list, setList] = useState([])
  const [update, setUpdate] = useState(false)

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    // setList(JSON.parse(localStorage.getItem("borrowerNames")))
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const listUpdate =(input)=>{
    setUpdate(!update)
    setList([...list, input])
  }

  useEffect(()=>{
    setList(JSON.parse(localStorage.getItem("borrowerNames")))
  }, [])

  // console.log("llist", list)

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
       <Box py={2} >
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
      <IconButton onClick={handleClickOpen} >
        <AddCircleIcon />
      </IconButton>
      <TableData list={list} />

      {/* <CreateComponent /> */}
        {/* <RecordTable /> */}
         {/* <Typography>Lender Records</Typography> */}
      </TabPanel>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
       <CreateForm handleClose={handleClose} listUpdate={listUpdate} list={list} />
        {/* <DialogTitle>{"Use Google's location service?"}</DialogTitle>
        <DialogContent> hello</DialogContent>
        <DialogActions>
          <button onClick={handleClose} >Disagree</button>
        </DialogActions> */}
        
        </Dialog>
    </div>
  )
}

export default DashboardComponent
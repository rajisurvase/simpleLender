import React, { useState } from 'react'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import Slide from '@mui/material/Slide';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";


const schema = yup.object().shape({
  borrowerName: yup.string().required("Borrower name is required"),
  lenderName: yup.string().required("Lender name is required"),
  purchaseDate: yup.date().required("Purchase date is required"),
  principalAmount: yup.number()
    .typeError("Principal amount must be a number")
    .required("Principal amount is required"),
  interestAmount: yup.number()
    .typeError("interestAmount must be a number")
    .required("interestAmount is required"),
  roi: yup.number()
    .typeError("Rate of interest must be a number")
    .required("Rate of interest is required"),
  totalAmount: yup.number()
    .typeError("totalAmount  must be a number")
    .required("totalAmount  is required"),
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const CreateComponent = () => {
  const [value, setValue] = useState(dayjs('2022-04-17'));
  const [open, setOpen] = React.useState(false);
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log("data", data);
  };


  return (
    <Box textAlign={'center'} >
      <IconButton onClick={handleClickOpen} >
        <AddCircleIcon />
      </IconButton>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
        <form  onSubmit={handleSubmit(onSubmit)}>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
            <Grid item xs={6} >
              <TextField size='small' fullWidth
                label="Borrower Name"
                {...register("borrowerName")}
              />
              
            </Grid>
            <Typography color='red' >{errors?.borrowerName?.message}</Typography>
            <Grid item xs={6}  >
              <TextField size='small' fullWidth
                label="Lender Name"
              />
            </Grid>
            <Grid item xs={6}  >
              <LocalizationProvider  dateAdapter={AdapterDayjs}>
                <DatePicker  slotProps={{ textField: { size: 'small' } }}
                  label="Controlled picker"
                  value={value}
                  onChange={(newValue) => setValue(newValue)}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={6}  >
              <TextField size='small' fullWidth
                label="Principal Amount"
                type="number"
              />
            </Grid>
            <Grid item xs={6}  >
              <TextField size='small' fullWidth
                label="Rate of Interest"
                name="roi"
                type='number'
              />
            </Grid>
            <Grid item xs={6}  >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker slotProps={{ textField: { size: 'small' } }}
                  label="Due Payment Date"
                  name="duePaymentDate"
                  value={value}
                  defaultValue={new Date().toISOString().slice(0, 10)}
                  onChange={(newValue) => setValue(newValue)}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={6}  >
              <FormControl fullWidth size='small'>
                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={age}
                  label="Age"
                  onChange={handleChange}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}  >
              <TextField size='small' fullWidth
                label="Total interest amount" type='number'  
              >
              </TextField>
            </Grid>
            <Grid item xs={6}  >
              <TextField size='small' fullWidth
                label="Total Amount" type='number'
                {...register("totalAmount")}
              >
              </TextField>
              {/* <p>{errors?.totalAmount?.message}</p> */}
            </Grid>
           

          </Grid>
          <DialogActions>
          <Grid container  rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
          <Grid item xs={6} textAlign={'center'}   >
            <Button variant='outlined' fullWidth  onClick={handleClose} >Disagree</Button>
            </Grid>
            <Grid item xs={6} textAlign={'center'} >
            <Button variant='contained' type="submit" fullWidth>Agree</Button>
            </Grid>
          </Grid>
          </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </Box>
  )
}

export default CreateComponent
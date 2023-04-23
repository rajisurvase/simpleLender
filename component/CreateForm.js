import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const schema = yup.object({
    borrowerName: yup.string().required("Borrower Name is a required field"),
    lenderName: yup.string().required("Lender Name is a required field"),
    principalAmount: yup.string().required("Principal Amount is a required field"),
    roi: yup.string().required("Rate of Interest is a required field"),
    // interestAmount: yup.string().required("Interest Amount is a required field"),
    // totalAmount: yup.string().required("Total Amount is a required field"),
    // purchaseDate : yup.string().required("purchase Date is a required field"),
    // duePaymentDate : yup.string().required("Due Payment Date is a required field"),
    status : yup.string().required("Status is a required field")
}).required();
const CreateForm = ({ handleClose, listUpdate, list }) => {
    const [value, setValue] = useState(dayjs(new Date()));
    const [purchaseDate, setPurchaseDate] = useState(dayjs(new Date()))
    const [getValue, setGetvalue] = useState(0)
    const [roi, setRoi] = useState(0)
    const [interestAmount, setInterestAmount] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0)


    const { register, handleSubmit,reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = data => {
        const input = {
            ...data, 
            interestAmount,
             totalAmount,
              duePaymentDate : value, 
              purchaseDate
        }
        localStorage.setItem("borrowerNames", JSON.stringify([...list, input]))
        listUpdate(input)
        handleClose()
         reset()
    };
    const handleAmount =(_s)=>{
        setGetvalue(_s)
    }

    const handleResult =(_data)=>{
        setRoi(_data)
    }

    useEffect(()=>{
        if(purchaseDate && value) {
              const timeDiff = value.diff(purchaseDate)
              console.log()
              setInterestAmount(getValue * (1 + roi / 100 * Math.floor(timeDiff / (1000 * 3600 * 24))  ) - getValue)
              setTotalAmount(getValue * (1 + roi / 100 * Math.floor(timeDiff / (1000 * 3600 * 24))  ))
            }
      },[value, purchaseDate, roi, getValue])
    

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid p={3} container spacing={2} >
                <Grid item xs={6} >
                    <TextField size='small' fullWidth
                        label="Borrower Name"
                        {...register("borrowerName")} />
                    <Typography color='red' >{errors?.borrowerName?.message}</Typography>
                </Grid>
                <Grid item xs={6} >
                    <TextField
                        size='small' fullWidth
                        label="Lender Name"
                        {...register("lenderName")} />
                    <Typography color='red'>{errors?.lenderName?.message}</Typography>
                </Grid>
                <Grid item xs={6}   >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker slotProps={{ textField: { size: 'small' } }}
                            label="Purchase  Date" 
                            value= {purchaseDate}
                            onChange={(newValue) => setPurchaseDate(newValue)}
                        />
                    </LocalizationProvider>
                    <Typography color='red'>{errors?.purchaseDate?.message}</Typography>
                </Grid>
                <Grid item xs={6} >
                    <TextField type='number'
                        size='small' fullWidth
                        label="Principal Amount"
                        {...register("principalAmount",{
                            onChange : (e)=>{
                                handleAmount(e.target.value)
                            }
                        })} />
                    <Typography color='red'>{errors?.principalAmount?.message}</Typography>
                </Grid>
                <Grid item xs={6} >
                    <TextField type='number'
                        size='small' fullWidth
                        label="Rate of Interest (%)"
                        {...register("roi", {
                            onChange : (e)=>{
                                handleResult(e.target.value)
                            }
                        })} />
                    <Typography color='red'>{errors?.roi?.message}</Typography>
                </Grid>
                <Grid item xs={6}   >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker slotProps={{ textField: { size: 'small' } }}
                            label="Due PaymentDate Date" 
                            minDate={dayjs(new Date())}
                            // {...register("duePaymentDate")}
                            value= {value}
                            onChange={(newValue) => setValue(newValue)}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={6}  >
                    <FormControl fullWidth size='small'>
                        <InputLabel >Status</InputLabel>
                        <Select label='Status' defaultValue={"pending"}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select" 
                            {...register("status")}
                        >
                            <MenuItem value={"pending"}>Pending</MenuItem>
                            <MenuItem value={"paid"}>Paid</MenuItem>
                        </Select>
                    </FormControl>
                    <Typography color='red'>{errors?.status?.message}</Typography>
                </Grid>
                <Grid item xs={6} >
                    <TextField
                        size='small' fullWidth
                        label="Total interest amount" aria-readonly
                         value={interestAmount}
                        />
                </Grid>
                <Grid item xs={6} >
                    <TextField value={totalAmount}
                        size='small' fullWidth aria-readonly
                        label="Total amount"
                         />
                </Grid>

            </Grid>
            <Grid p={3} container spacing={2} >
                <Grid item xs={6} textAlign={'center'}   >
                    <Button variant='outlined' fullWidth onClick={handleClose} >Cancel</Button>
                </Grid>
                <Grid item xs={6} textAlign={'center'} >
                    <Button variant='contained' type="submit" fullWidth>Submit</Button>
                </Grid>
            </Grid>
        </form>
    )
}

export default CreateForm
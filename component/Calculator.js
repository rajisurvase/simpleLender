/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react"
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Box } from "@mui/material";


const period = [
    {
        id: 1,
        name: "Year",
        value: 1
    },
    {
        id: 2,
        name: "Monthly",
        value: 12
    },
    {
        id: 3,
        name: "Weekly",
        value: 52
    },
    {
        id: 4,
        name: "Days",
        value: 365
    },

]

const Calculator = () => {

    const [formValue, setFormValue] = useState({
        amount: '',
        rate: '',
        duration: ''
    })
    const [checkDuration, setCheckDuration] = useState(1);
    const [labelName, setLabelName] = useState('')

    const handleChange = (event) => {
        setCheckDuration(event.target.value);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValue((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };


    useEffect(() => {
        setLabelName(period.find(s => s.value === checkDuration)?.name)

    }, [checkDuration])

    return (
        <div style={{ textAlign: "center"}} >
            <form
            >
                <div>
                    <label>Principle Amount</label> <input type='number' name="amount" value={formValue.amount} onChange={handleInputChange} />
                </div>
                <div>
                    <label>Rate of Interest (%)</label> <input type='number' value={formValue.rate} name="rate" onChange={handleInputChange} />
                </div>
                <Box py={2} sx={{ minWidth: 120 }} >
                    <label> Period Unit </label>
                    <FormControl size="small" >
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={checkDuration}
                            onChange={handleChange}
                        >
                            {period?.map((item, index) => (
                                <MenuItem key={index} value={item?.value}>{item?.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
                <div>
                    <label>Number of {labelName} </label> <input type='number' value={formValue.duration} name="duration" onChange={handleInputChange} />
                </div>
            </form>
            <div>
                <h4>Interest Earned ₹ {formValue.amount * (1 + formValue.rate / 100 * formValue.duration / checkDuration) - formValue.amount}</h4>
                <h4>Principal Amount ₹ {formValue.amount ? formValue.amount : 0}</h4>
                <h4>Total Value ₹ {formValue.amount * (1 + formValue.rate / 100 * formValue.duration / checkDuration)}</h4>
            </div>
        </div>
    )
}

export default Calculator
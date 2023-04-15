import { useState } from "react"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const Calculator = () => {

    const [formValue, setFormValue] = useState({
        amount: '',
        rate: '',
        duration: ''
    })
    const [age, setAge] = useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValue((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };


    // const handleSubmit =(e)=>{
    //     e.preventDefault()
    //     console.log("formValue", formValue)
    // }


    return (
        <div style={{ textAlign: "center", marginTop: "2rem" }} >
            <form
            //  onSubmit={handleSubmit}
            >
                <div>
                    <label>Principle Amount</label> <input type='number' name="amount" value={formValue.amount} onChange={handleInputChange} />
                </div>
                <div>
                    <label>Rate of Interest (%)</label> <input type='number' value={formValue.rate} name="rate" onChange={handleInputChange} />
                </div>
                <div>
                <label> Period Unit </label>
                    <FormControl >
                        <InputLabel id="demo-simple-select-label">duration</InputLabel>
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
                </div>
                <div>
                    <label>Number of year</label> <input type='number' value={formValue.duration} name="duration" onChange={handleInputChange} />
                </div>
                {/* <button type='submit'  >Submit</button> */}
            </form>

            <div>
                <h4>Interest Earned ₹ {formValue.amount * (1 + formValue.rate / 100 * formValue.duration) - formValue.amount}</h4>
                <h4>Principal Amount ₹ {formValue.amount ? formValue.amount : 0}</h4>
                <h4>Total Value ₹ {formValue.amount * (1 + formValue.rate / 100 * formValue.duration)}</h4>
            </div>
        </div>
    )
}

export default Calculator
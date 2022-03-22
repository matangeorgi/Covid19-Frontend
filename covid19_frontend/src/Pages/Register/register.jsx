import React, {useState} from "react";

import axios from "axios";
import {useNavigate} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import {TextField} from "@mui/material";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import Conditions from "./conditionsSelection";
import Divider from '@mui/material/Divider';


const Register = () => {
    const navigate = useNavigate();
    const [CitizenFirstName, setFirstName] = useState('');
    const [CitizenLastName, setLastName] = useState('');
    const [CitizenDOB, setDateOfBirth] = useState('');
    const [CitizenAddress, setAddress] = useState('');
    const [CitizenCity, setCity] = useState('');
    const [CitizenZipCode, setZipCode] = useState('');
    const [CitizenLandLine, setLandLine] = useState('');
    const [CitizenCellular, setCellular] = useState('');
    const [CitizenInfected, setInfected] = useState(false);
    const [conditions, setCondition] = useState([]);
    const [submitedOnce, setSubmitedOnce] = useState(false);
    const [otherTextbox, setOtherTextbox] = useState(false);
    const [otherConditions, setOtherConditions] = useState('');
    const [errorMessage, setError] = useState('');

    const submitForm = async(e) =>{
        e.preventDefault();
        setSubmitedOnce(true);

        // Deep copy, this way we wont change conditions.
        let newConditions = [...conditions];
        if (otherTextbox) {
            newConditions.splice(conditions.indexOf('Other'), 1);
            if(otherConditions)
                newConditions.push(otherConditions);
        }

        let CitizenConditions = '';
        newConditions.forEach(condition => CitizenConditions += `${condition} `);

        const data = {
            CitizenFirstName,
            CitizenLastName,
            CitizenDOB,
            CitizenAddress,
            CitizenCity,
            CitizenZipCode,
            CitizenCellular,
            CitizenLandLine,
            CitizenInfected,
            CitizenConditions
        }
        try{
            await axios.post('http://localhost:8000/register/',data);
            navigate('/summary');
        }
        catch (error) {
            setError(error.response.data.Error);
        }

    }

    // Changing the date into the right format.
    const handleDate = data => {
        if(data)
        {
            const DOB = `${data.getFullYear()}-${data.getUTCMonth()+1}-${data.getUTCDate()+1}`
            setDateOfBirth(DOB);
        }
    }

    return(
        <div>
            <Button variant="contained" style={{right:'50px',position:'absolute'}}
                    onClick={() => navigate('/summary')}>Summary Page</Button>

            <div className="d-flex justify-content-center mt-5">
                <h1>Registration Form</h1>
            </div>

            <Divider variant="middle" width={400} className="mx-auto mt-2 mb-2" />

            <div className="d-flex justify-content-center">
                <div>
                    <form onSubmit={submitForm}>
                        <div>
                            <TextField error={!CitizenFirstName && submitedOnce} className="mx-2 mt-3" id="filled-error"
                                       label="First name" variant="filled" onChange={e => setFirstName(e.target.value)} />
                            <TextField error={!CitizenLastName && submitedOnce} className="mx-2 mt-3" id="filled-error"
                                       label="Last name" variant="filled" onChange={e => setLastName(e.target.value)} />
                        </div>
                        <div>
                            <TextField error={!CitizenCity && submitedOnce} className="mx-2 mt-3" id="filled-error"
                                       label="City" variant="filled" onChange={e => setCity(e.target.value)} />
                            <TextField error={!CitizenZipCode && submitedOnce} className="mx-2 mt-3" id="filled-error"
                                       label="Zip code" variant="filled" onChange={e => setZipCode(e.target.value)} />
                        </div>
                        <div>
                            <TextField error={!CitizenLandLine && submitedOnce} className="mx-2 mt-3" id="filled-error"
                                       label="Land line" variant="filled" onChange={e => setLandLine(e.target.value)} />
                            <TextField error={!CitizenCellular && submitedOnce} className="mx-2 mt-3" id="filled-error"
                                       label="Cellular phone" variant="filled" onChange={e => setCellular(e.target.value)} />
                        </div>
                        <div>
                            <TextField error={!CitizenAddress && submitedOnce} className="mx-2 mt-3" id="filled-error"
                                       label="Address" variant="filled" onChange={e => setAddress(e.target.value)} />
                        </div>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Date of birth"
                                value={CitizenDOB}
                                inputFormat="dd/MM/yyyy"
                                onChange={(newValue) => {
                                    handleDate(newValue);
                                }}
                                renderInput={(params) => <TextField className="mx-2 mt-3 mb-3" {...params} />}
                            />
                        </LocalizationProvider>
                        <div className="mx-2 mb-2">
                            <FormControlLabel control={<Checkbox onChange={()=>setInfected(!CitizenInfected)}/>}
                                              label="I have had COVID-19 before"/>
                        </div >

                        <Conditions setter={setCondition} setOther={setOtherTextbox}/>

                        <div>
                            <TextField hidden={!otherTextbox} error={!otherConditions && submitedOnce} className="mx-2 mt-3" id="filled-error"
                                       label="Add conditions" variant="filled" onChange={e => setOtherConditions(e.target.value)} />
                        </div>

                        <div className="d-flex justify-content-center mt-3">
                            <Button type="submit" variant="contained" endIcon={<SendIcon />}>
                                Send
                            </Button>
                        </div>
                    </form>
                    <div>
                        <p className="text-center mx-auto w-75 mt-4" style={{color: "red"}}>{errorMessage}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;
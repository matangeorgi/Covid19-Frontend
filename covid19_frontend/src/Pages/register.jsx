import React, {useState} from "react";
import {TextField} from "@mui/material";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import 'bootstrap/dist/css/bootstrap.min.css';
import Conditions from "./conditionsSelection";
import Divider from '@mui/material/Divider';
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";


const Register = () => {
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [address, setAddress] = useState();
    const [city, setCity] = useState();
    const [zipCode, setZipCode] = useState();
    const [landLine, setLandLine] = useState();
    const [cellular, setCellular] = useState();
    const [infected, setInfected] = useState(false);
    const [conditions, setCondition] = useState([]);
    const [submitedOnce, setSubmitedOnce] = useState(false);
    const [otherTextbox, setOtherTextbox] = useState(false);
    const [otherConditions, setOtherConditions] = useState('');

    const submitForm = e =>{
        e.preventDefault();
        setSubmitedOnce(true);

        // Deep copy, this way we wont change conditions.
        let newConditions = [...conditions];
        if (otherTextbox) {
            newConditions.splice(conditions.indexOf('Other'), 1);
            if(otherConditions)
                newConditions.push(otherConditions);
        }
    }

    const handleDate = data => {
        const DOB = `${data.getFullYear()}-${data.getUTCMonth()+1}-${data.getUTCDate()+1}`
        setDateOfBirth(DOB);
    }

    return(
        <div>
            <div className="d-flex justify-content-center mt-5">
                <h1>Registration Form</h1>
            </div>
            <Divider variant="middle" width={400} className="mx-auto mt-2 mb-2" />
            <div className="d-flex justify-content-center">
                <div>
                    <form onSubmit={submitForm}>
                        <div>
                            <TextField error={!firstName && submitedOnce} className="mx-2 mt-3" id="filled-error"
                                       label="First name" variant="filled" onChange={e => setFirstName(e.target.value)} />
                            <TextField error={!lastName && submitedOnce} className="mx-2 mt-3" id="filled-error"
                                       label="Last name" variant="filled" onChange={e => setLastName(e.target.value)} />
                        </div>
                        <div>
                            <TextField error={!city && submitedOnce} className="mx-2 mt-3" id="filled-error"
                                       label="City" variant="filled" onChange={e => setCity(e.target.value)} />
                            <TextField error={!zipCode && submitedOnce} className="mx-2 mt-3" id="filled-error"
                                       label="Zip code" variant="filled" onChange={e => setZipCode(e.target.value)} />
                        </div>
                        <div>
                            <TextField error={!landLine && submitedOnce} className="mx-2 mt-3" id="filled-error"
                                       label="Land line" variant="filled" onChange={e => setLandLine(e.target.value)} />
                            <TextField error={!cellular && submitedOnce} className="mx-2 mt-3" id="filled-error"
                                       label="Cellular phone" variant="filled" onChange={e => setCellular(e.target.value)} />
                        </div>
                        <div>
                            <TextField error={!address && submitedOnce} className="mx-2 mt-3" id="filled-error"
                                       label="Address" variant="filled" onChange={e => setAddress(e.target.value)} />
                        </div>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Date of birth"
                                value={dateOfBirth}
                                inputFormat="dd/MM/yyyy"
                                onChange={(newValue) => {
                                    handleDate(newValue);
                                }}
                                renderInput={(params) => <TextField className="mx-2 mt-3 mb-3" {...params} />}
                            />
                        </LocalizationProvider>
                        <div className="mx-2 mb-2">
                            <FormControlLabel control={<Checkbox onChange={()=>setInfected(!infected)}/>}
                                              label="I have had COVID-19 before"/>
                        </div >

                        <Conditions setter={setCondition} setOther={setOtherTextbox}/>
                        <div>
                            <TextField hidden={!otherTextbox} error={!address && submitedOnce} className="mx-2 mt-3" id="filled-error"
                                       label="Add conditions" variant="filled" onChange={e => setOtherConditions(e.target.value)} />
                        </div>

                        <div className="d-flex justify-content-center mt-3">
                            <Button type="submit" variant="contained" endIcon={<SendIcon />}>
                                Send
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register;
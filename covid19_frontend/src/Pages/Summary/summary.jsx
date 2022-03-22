import React, {useEffect, useState} from 'react';

import {useNavigate} from "react-router-dom";
import axios from "axios";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {TextField} from "@mui/material";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";


let index = 0;
const Summary = () => {
    const navigate = useNavigate();
    const [rows, setRows] = useState([]);
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [city, setCity] = useState();
    const [errorMessage, setError] = useState('');

    // Getting the info from the server once when we load the page.
    useEffect(async() => {
        const response = await axios.get('http://localhost:8000/summary/getData')
        setRows(response.data);
    },[])

    const ExportData = async() => {
        await axios.get('http://localhost:8000/summary/exportExcel')
    }

    const submitForm = async(e) => {
        e.preventDefault();

        try {
            if(city && startDate && endDate)
            {
                const response = await axios.get(
                    `http://localhost:8000/summary/getData/?city=${city}&first=${startDate}&second=${endDate}`)
                setRows(response.data);
            }
            else if(startDate && endDate)
            {
                const response = await axios.get(
                    `http://localhost:8000/summary/getData/?first=${startDate}&second=${endDate}`)
                setRows(response.data);
            }
            else if(startDate || endDate)
                setError("Fill both of the dates input.");

            else if(city)
            {
                const response = await axios.get(
                    `http://localhost:8000/summary/getData/?city=${city}`
                )
                setRows(response.data);
            }
            else
            {
                const response = await axios.get('http://localhost:8000/summary/getData')
                setRows(response.data);
            }
            setError('');
        }
        catch (error) {
            setError(error.response.data.Error);
        }

    }

    return(
        <div>
            <div className="mx-5">
                <Button variant="contained" style={{right:'50px',position:'absolute'}} onClick={() => navigate('/')}>Register</Button>
                <h1 className="d-flex justify-content-center mt-5 mx-5">Summary</h1>
                <form onSubmit={submitForm}>
                    filter by city:
                    <div>
                        <TextField className="mx-2 mt-3 mb-2" id="filled-size-small" size="small"
                                   label="City" variant="filled" onChange={e => setCity(e.target.value)} />
                    </div>
                    filter by date of birth:
                    <div>
                        <TextField className="mx-2 mt-3" id="filled-basic" size="small"
                                   label="Start-Date YYYY-MM-DD" variant="filled" onChange={e => setStartDate(e.target.value)} />
                        <TextField className="mx-2 mt-3 mb-3" id="filled-basic" size="small"
                                   label="End-Date YYYY-MM-DD" variant="filled" onChange={e => setEndDate(e.target.value)} />
                    </div>
                    <Button type="submit" variant="contained" className="mx-2">Search</Button>
                    <Button href={'http://localhost:8000/summary/exportExcel'}
                            variant="contained" className="mx-2">Export to Excel</Button>

                </form>
                <div>
                    <p className="text-center mx-auto w-75 mt-4" style={{color: "red"}}>{errorMessage}</p>
                </div>
            </div>

            <Divider variant="middle" className="mx-auto mt-2 mb-2" />

            <TableContainer component={Paper} className="d-flex justify-content-center mt-5">
                <Table sx={{ minWidth: 800,maxWidth: 1200 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>First name</TableCell>
                            <TableCell>Last name</TableCell>
                            <TableCell>Date of birth</TableCell>
                            <TableCell>Address</TableCell>
                            <TableCell>City</TableCell>
                            <TableCell>Zip code</TableCell>
                            <TableCell>Land Line</TableCell>
                            <TableCell>Cellular Phone</TableCell>
                            <TableCell>infected</TableCell>
                            <TableCell>Conditions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={index++}>
                                <TableCell>{row.CitizenFirstName}</TableCell>
                                <TableCell>{row.CitizenLastName}</TableCell>
                                <TableCell>{row.CitizenDOB}</TableCell>
                                <TableCell>{row.CitizenAddress}</TableCell>
                                <TableCell>{row.CitizenCity}</TableCell>
                                <TableCell>{row.CitizenZipCode}</TableCell>
                                <TableCell>{row.CitizenCellular}</TableCell>
                                <TableCell>{row.CitizenLandLine}</TableCell>
                                <TableCell>{row.CitizenInfected? 'True' : 'False'}</TableCell>
                                <TableCell>{row.CitizenConditions}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default Summary;
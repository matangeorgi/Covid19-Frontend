import React from 'react';

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

const names = [
    'Diabetes',
    'Cardio-Vascular problems',
    'Allergies',
    'Other'
];

const Conditions = props => {
    const [condition, setCondition] = React.useState([]);

    const handleChange = (event) => {
        const {target: { value },} = event;
        setCondition(typeof value === 'string' ? value.split(',') : value,);

        if (value.indexOf('Other') >= 0)
            props.setOther(true);
        else
            props.setOther(false);

        props.setter(typeof value === 'string' ? value.split(',') : value,);
    };


    return (
        <div>
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-checkbox-label">Conditions</InputLabel>
                <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={condition}
                    onChange={handleChange}
                    input={<OutlinedInput label="Conditions" />}
                    renderValue={(selected) => selected.join(', ')}
                    //MenuProps={MenuProps}
                >
                    {names.map((name) => (
                        <MenuItem key={name} value={name}>
                            <Checkbox checked={condition.indexOf(name) > -1} />
                            <ListItemText primary={name} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}

export default Conditions;
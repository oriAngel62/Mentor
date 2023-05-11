import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import {AppointmentForm,} from '@devexpress/dx-react-scheduler-material-ui';
import { useState } from 'react';
import CheckSelect from './checkSelect';


export default function UnassignedForm({appointmentData,  onFieldChange}){
    const aa = []
    aa.length = 45;
    const marks = aa.map((val, index) => {
        let qwe = 9 + index * 0.25; 
        // return {value: val, label: (~~val).toString() + ":" + (~~((val - ~~val) * 100 * 0.6)).toString()};
        return {value: qwe, label: "9:00"};
    });
    const valuetext = (value) => {
        return `${value}°C`;
    };
    console.log("appointmentData:", appointmentData);
    const [dayName, setDayName] = useState([]);
    const [interval, setInterval] = useState([20, 37]);

    
    const [data, setData] = useState(0);
    const onDescriptionChange = (nextValue) => {
      onFieldChange({ description: nextValue });
    };
    const onDeadlineChange = (nextValue) => {
      onFieldChange({ deadline: nextValue });
    };
    const onSelectChange = (nextValue) => {
      onFieldChange({ value: nextValue });
    };

    const onSliderChange = (event, newValue) => {
      setInterval(newValue);
    };

    const onRankChange = (nextValue) => {
      onFieldChange({ value: nextValue });
    };
  
    return (
        <>
            <AppointmentForm.Label
            text="Description"
            type="title"
            />
            <AppointmentForm.TextEditor
            value={appointmentData.description}
            onValueChange={onDescriptionChange}
            placeholder="Description"
            />
            <AppointmentForm.Label
            text="Deadline"
            type="titleLabel"
            />
            <AppointmentForm.DateEditor
            value={appointmentData.deadline}
            onValueChange={onDeadlineChange}
            />
            <CheckSelect useNset={[dayName, setDayName]}/>
            <Box sx={{ width: 300 }}>
            <Slider
                marks={marks}
                getAriaLabel={() => 'Temperature range'}
                value={interval}
                onChange={onSliderChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                step={0.25}
                min={9.00}
                max={20.00}
            />
            </Box>
            <Box sx={{ width: 300 }}>
            <Slider
                marks
                onChange={onRankChange}
                valueLabelDisplay="auto"
                step={0.1}
                min={1}
                max={10}
            />
            </Box>
            <AppointmentForm.Select
            onValueChange={onSelectChange}
            availableOptions={[{id: 0, text: "Low"}, {id: 1, text: "Medium"}, {id: 2, text: "High"}]}
            />
        </>
    );
  };
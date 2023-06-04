import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import {AppointmentForm,} from '@devexpress/dx-react-scheduler-material-ui';
import CheckSelect from './checkSelect';


export default function MissionForm({day,onTitleChange,onRankChange=undefined, rank, onDescriptionChange, onDeadlineChange, onSliderChange, onSelectChange, appointmentData, interval, isAssigned=true}){
  console.log("appointmentData:", appointmentData);
  const [dayName, setDayName] = day;
  

  return (
      <>
          <AppointmentForm.TextEditor
          value={appointmentData.title}
          onValueChange={onTitleChange}
          placeholder="Title"
          />
          <AppointmentForm.TextEditor
          value={appointmentData.description}
          onValueChange={onDescriptionChange}
          placeholder="Description"
          type='multilineTextEditor'
          />
          {isAssigned ?
          <>
          <AppointmentForm.Label
            text="Rank:"
            type="regular"
            />
          <Slider
              marks
              onChange={onRankChange}
              valueLabelDisplay="auto"
              step={0.1}
              min={1}
              max={10}
              value={rank}
          />
          </> :
          <>
          <AppointmentForm.Label
          text="Deadline:"
          type="regular"
          />
          <AppointmentForm.DateEditor
          value={appointmentData.deadline}
          onValueChange={onDeadlineChange}
          readOnly={isAssigned}
          />
          <CheckSelect useNset={[dayName, setDayName]}/>
          <Box sx={{ width: 400 }}>
            <AppointmentForm.Label
            text="Optional hours:"
            type="regular"
            />
            <Slider
                marks
                value={interval}
                onChange={onSliderChange}
                valueLabelDisplay="auto"
                step={0.25}
                min={9.00}
                max={20.00}
            />
          </Box>
          <AppointmentForm.Label
          text="Priority:"
          type="regular"
          />
          <AppointmentForm.Select
          sx={{ width: 400 }}
          onValueChange={onSelectChange}
          value={appointmentData.priority ? appointmentData.priority : 0}
          availableOptions={[{id: 0, text: "Low"}, {id: 1, text: "Medium"}, {id: 2, text: "High"}]}
          />
          </>}
          
      </>
  );
};
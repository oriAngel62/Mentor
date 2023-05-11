import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

import { ViewState , EditingState, IntegratedEditing} from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  DayView,
  WeekView,
  MonthView,
  Appointments,
  DateNavigator,
  TodayButton,
  Toolbar,
  ViewSwitcher,
  AppointmentTooltip,
  AppointmentForm,
  ConfirmationDialog,
  DragDropProvider,
  EditRecurrenceMenu,
  AllDayPanel,
} from '@devexpress/dx-react-scheduler-material-ui';
import { useState } from 'react';
import { useKeyPress } from './hooks';
import CheckSelect from './checkSelect';


export default function Demo({ appointments }) {
    const [data, setData] = useState(appointments.map((appointment, index) => (
      {id: index, ...appointment}
    )));
    const isShift = useKeyPress("Shift");
    // const marks = [
    //   {
    //     value: 9,
    //     label: '9:00',
    //   },
    //   {
    //     value: 20,
    //     label: '20:00',
    //   },
    //   {
    //     value: 37,
    //     label: '37°C',
    //   },
    //   {
    //     value: 100,
    //     label: '100°C',
    //   },
    // ];
    const aa = []
    aa.length = 45;
    console.log(aa);
    const marks = aa.map((val, index) => {
      let qwe = 9 + index * 0.25; 
      // return {value: val, label: (~~val).toString() + ":" + (~~((val - ~~val) * 100 * 0.6)).toString()};
      return {value: qwe, label: "9:00"};
    });
    console.log("marks:", marks);
    const valuetext = (value) => {
      return `${value}°C`;
    };

    const TextEditor = (props) => {
      // eslint-disable-next-line react/destructuring-assignment
      if (props.type === 'multilineTextEditor') {
        return null;
      }
      return <AppointmentForm.TextEditor {...props} />;
    };


    const Label = (props) => {
      // eslint-disable-next-line react/destructuring-assignment
      if (props.type === "ordinaryLabel") {
        return null;
      }
      return <AppointmentForm.Label {...props} />;
    };

    const Layout = (props) => {
      // eslint-disable-next-line react/destructuring-assignment
      //return <AppointmentForm.Layout {isRecurrence: false, basicLayoutComponent: null, commandLayoutComponent: props.commandLayoutComponent, recurrenceLayoutComponent: props.recurrenceLayoutComponent} />;
      //const something = {isRecurrence: false, basicLayoutComponent: null, commandLayoutComponent: props.commandLayoutComponent, recurrenceLayoutComponent: props.recurrenceLayoutComponent};
      return <AppointmentForm.Layout {...props} />;
    };
    
    const BasicLayout = ({ onFieldChange, appointmentData, ...restProps }) => {
      console.log(restProps);
      const [dayName, setDayName] = useState([]);
      const [interval, setInterval] = useState([20, 37]);


      console.log(dayName);
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
        <AppointmentForm.BasicLayout
          appointmentData={appointmentData}
          onFieldChange={onFieldChange}
          {...restProps}
        >
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
        </AppointmentForm.BasicLayout>
      );
    };

    function commitChanges({ added, changed, deleted }) {
      setData(() => {
        let d = data;
        if (added) {
          const startingAddedId = d.length > 0 ? d[d.length - 1].id + 1 : 0;
          d = [...d, { id: startingAddedId, ...added }];
        }
        if (changed) {
          if (isShift) {
            const changedAppointment = d.find(appointment => changed[appointment.id]);
            const startingAddedId = d.length > 0 ? d[d.length - 1].id + 1 : 0;
            d = [
              ...d,
              { ...changedAppointment, id: startingAddedId, ...changed[changedAppointment.id] },
            ];
          } else {
            d = d.map(appointment => (
              changed[appointment.id]
                ? { ...appointment, ...changed[appointment.id] }
                : appointment));
          }
        }
        if (deleted !== undefined) {
          d = d.filter(appointment => appointment.id !== deleted);
        }
        return d;
      });
    };

    return (
      <Paper>
        <Scheduler
          data={data}
        >
          <ViewState
            defaultCurrentViewName="Week"
          />
          <EditingState
            onCommitChanges={commitChanges}          />
          <EditRecurrenceMenu />
          <IntegratedEditing />

          <DayView
            startDayHour={9}
            endDayHour={18}
          />
          <WeekView
            startDayHour={10}
            endDayHour={19}
          />
          <MonthView />

          <Toolbar />
          <DateNavigator />
          <TodayButton />
          <ViewSwitcher />
          <ConfirmationDialog />
          <Appointments />
          <AppointmentTooltip
            showCloseButton
            showOpenButton
            showDeleteButton
          />
          <AppointmentForm
            basicLayoutComponent={BasicLayout}
            textEditorComponent={TextEditor}
            layoutComponent={Layout}
            labelComponent={Label}
            booleanEditorComponent={()=>{return null}}
          />
          <AllDayPanel />
          <DragDropProvider
          />
        </Scheduler>
      </Paper>
    );
}

import Paper from '@mui/material/Paper';
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

export default function Demo({ appointments }) {
    const [data, setData] = useState(appointments.map((appointment, index) => (
      {id: index, ...appointment}
    )));
    const isShift = useKeyPress("Shift");

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
          />
          <AllDayPanel />
          <DragDropProvider
          />
        </Scheduler>
      </Paper>
    );
}

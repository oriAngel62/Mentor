import React from 'react'
import { formatDate } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Typography from '../components/Typography';
import Modal from '@mui/material/Modal';
import MissionForm from './missionForm';
import { INITIAL_EVENTS, createEventId } from './event-utils'
import ToolBox from './toolBox';

export default function Demo ({ setteledAppoitments, unSetteledAppoitments }) {
    const appointments = setteledAppoitments.map((appointment) => {
        return {
            id: createEventId(),
            ...appointment
        }
    });
    appointments.push(...INITIAL_EVENTS);
    // console.log(appointments);

    const [currentEvents, setCurrentEvents] = React.useState([]);
    const [selectedEvent, setSelectedEvent] = React.useState({});
    const [drawer, setDrawer] = React.useState(false);
    const [open, setOpen] = React.useState('');

    const handleClose = (event, reason) => {
        console.log(reason);
        setOpen('');
    };

    const handleDateSelect = (selectInfo) => {
        // let title = prompt('Please enter a new title for your event')
        let calendarApi = selectInfo.view.calendar
        calendarApi.unselect() // clear date selection
        const event = {id: createEventId() ,start: selectInfo.startStr, end: selectInfo.endStr, allDay: selectInfo.allDay, settled: true};
        setSelectedEvent(event);
        handleEventClick(event.id);

        console.log(selectInfo)
        // if (title) {
        //   calendarApi.addEvent({
        //     id: createEventId(),
        //     title,
        //     start: selectInfo.startStr,
        //     end: selectInfo.endStr,
        //     allDay: selectInfo.allDay
        //   })
        // }
    }

    const handleEventClick = (id) => {
        // if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
        //   clickInfo.event.remove()
        // }
        setOpen(id);
    }
    
    const handleEvents = (events) => {
        setCurrentEvents(events);
    }

    const handleEventAdd = (addInfo) => {
        const event = {
            id: addInfo.event.id,
            start: addInfo.event.startStr,
            end: addInfo.event.endStr,
        }
        fetch('http://localhost:7204/api/Missions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(addInfo.event)
            }).then((response) => {
                return response.json();
            }
        ).then((data) => {
            console.log(data);
            addInfo.event.id = data.id;
        });
    }
    const handleEventChange = (changeInfo) => {
    }
    const handleEventRemove = (removeInfo) => {
    }

    const renderEventContent = (eventInfo) => {
        // return (
        //   <>
        //     <b>{eventInfo.timeText}</b>
        //     <i>{eventInfo.event.title}</i>
        //   </>
        // )
        return (
            <Typography variant="body2" align="center">
            {eventInfo.timeText} {eventInfo.event.title}
                <Modal
                open={open ? open == eventInfo.event.id : false}
                onClose={handleClose}
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                // slots={{ backdrop: Backdrop }}
                // slotProps={{
                //     backdrop: {
                //     sx: {
                //         borderColor: 'rgba(255, 255, 255, 0)',
                //         backgroundColor: 'rgba(0, 0, 0, 0.05)',
                //     },
                //     },
                // }}
                aria-labelledby="modal-title"
                >
                    <MissionForm appointment={eventInfo.event} isSettled={true} updateAppointment={()=>{}} deleteAppointment={()=>{}} />
                </Modal>
          </Typography>
        );
    }
      
    const renderSidebarEvent = (event) => {
        return (
          <li key={event.id}>
            <b>{formatDate(event.start, {year: 'numeric', month: 'short', day: 'numeric'})}</b>
            <i>{event.title}</i>
          </li>
        )
    }

    const toggleDrawer = (open) => (event) => {
        if (
          event &&
          event.type === "keydown" &&
          (event.key === "Tab" || event.key === "Shift")
        ) {
          return;
        }
        setDrawer(open);
    };

    return (
      <div className='demo-app'>
        <SwipeableDrawer
            anchor={"left"}
            open={drawer}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
        >
            <ToolBox data={appointments} setData={()=>{null}} />
        </SwipeableDrawer>
        <Modal
            open={open == selectedEvent.id}
            onClose={handleClose}
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            // slots={{ backdrop: Backdrop }}
            // slotProps={{
            //     backdrop: {
            //     sx: {
            //         borderColor: 'rgba(255, 255, 255, 0)',
            //         backgroundColor: 'rgba(0, 0, 0, 0.05)',
            //     },
            //     },
            // }}
            aria-labelledby="modal-title"
            >
                <MissionForm appointment={selectedEvent} isSettled={selectedEvent.settled} updateAppointment={()=>{}} deleteAppointment={()=>{}} />
        </Modal>
        <div className='demo-app-main'>
          <FullCalendar
            customButtons={
                {
                    custom1: {
                        text: 'Tool Box',
                        click: toggleDrawer(true),
                    },
                }
            }
            slotMinTime={'09:00:00'}
            slotMaxTime={'22:00:00'}
            height={'auto'}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: 'custom1 prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            initialView='timeGridWeek'
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            initialEvents={appointments} // alternatively, use the `events` setting to fetch from a feed
            select={handleDateSelect}
            eventContent={renderEventContent} // custom render function
            eventClick={(clickInfo)=>{handleEventClick(clickInfo.event.id)}}
            eventsSet={handleEvents} // called after events are initialized/added/changed/removed
            /* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventChange={function(){}}
            eventRemove={function(){}}
            */
          />
        </div>
      </div>
    ) 

}

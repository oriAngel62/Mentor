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

export default function Demo ({ settledAppointments, unSettledAppointments, token}) {
    console.log("SETTLED", settledAppointments);
    console.log("UNSETTLED", unSettledAppointments);

    const [currentEvents, setCurrentEvents] = React.useState([]);
    const [selectedEvent, setSelectedEvent] = React.useState({});
    const [drawer, setDrawer] = React.useState(false);
    const [open, setOpen] = React.useState('');
    const calendarRef = React.useRef(null);
    const [calAPI, setCalAPI] = React.useState(false);

    React.useEffect(() => {
        setCalAPI(calendarRef.current.getApi());
        // Use the calendarApi to interact with the FullCalendar API
        // For example, you can call calendarApi.next() to navigate to the next view
      }, [calendarRef]);

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
        console.log("ENTERED EVENT ADD");
        const event = {
            id: 0,
            title: addInfo.event.title,
            description: addInfo.event.extendedProps.description,
            type: "",
            length: 5,
            optionalDays: addInfo.event.extendedProps.optionalDays,
            optionalHours: addInfo.event.extendedProps.optionalHours,
            deadLine: addInfo.event.extendedProps.deadLine,
            priority: 2,
            setteled: true,
            startDate: addInfo.event.startStr,
            endDate: addInfo.event.endStr,
        };
        // const event = {
        //     id: 0,
        //     title: "string",
        //     description: "string",
        //     type: "string",
        //     length: 0,
        //     optionalDays: [
        //       {
        //         id: 0,
        //         day: "string"
        //       }
        //     ],
        //     optionalHours: [
        //       {
        //         id: 0,
        //         hour: "string"
        //       }
        //     ],
        //     deadLine: "2023-06-12T00:20:48.323Z",
        //     priority: 0,
        //     setteled: true,
        //     startDate: "2023-06-12T00:20:48.323Z",
        //     endDate: "2023-06-12T00:20:48.323Z"
        //   }
        console.log("SENDING:", event);
        fetch("https://localhost:7204/api/Missions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
            body: JSON.stringify(event),
        }).catch((error) => {
            console.log("FETCH ERROR", error);
        })
        .then((response) => {
            console.log("FETCH RESPONSE", response);
            return response.json();
        }).then((data) => {
            console.log(data);
            addInfo.event.setProp("id", data);
        });
    };

    const handleEventChange = (changeInfo) => {
        const event = {
            id: changeInfo.event.id,
            title: changeInfo.event.title,
            description: changeInfo.event.extendedProps.description,
            type: changeInfo.event.extendedProps.type,
            optionalDays: changeInfo.event.extendedProps.optionalDays,
            optionalHours: changeInfo.event.extendedProps.optionalHours,
            setteled: changeInfo.event.extendedProps.setteled,
            startDate: changeInfo.event.extendedProps.startStr,
            endDate: changeInfo.event.extendedProps.endStr,
        };
        fetch("https://localhost:7204/api/Missions/0", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
            body: JSON.stringify(event),
        });
    };

    const handleEventRemove = (removeInfo) => {
        fetch("https://localhost:7204/api/Missions/" + removeInfo.event.id, {
            method: "DELETE",
            headers: {
                "Content-Type": "text/plain",
                Authorization: token,
            },
        });
    };

    const deleteEvent = (appointment) => {
        console.log("Calling deleteEvent", calAPI.getEvents())
        if (appointment.setteled) {
            const event = calAPI.getEventById(appointment.id);
            event.remove();
        } else {
            handleEventRemove({event: {id: appointment.id}});
        }
    }

    const addEvent = (appointment) => {
        console.log("Calling calAPI.addEvent")
        calAPI.addEvent(appointment);
        console.log("Called calAPI.addEvent")
    }

    const updateEvent = (appointment) => {
        const event = calAPI.getEventById(appointment.id);
        if (appointment.start != event.startStr) {
            event.setStart(appointment.start);
        } else if (appointment.end != event.endStr) {
            event.setEnd(appointment.end);
        } else if (appointment.title != event.title) {
            event.setProp('title', appointment.title);
        }
        Object.entries(data).forEach(([key, value]) => {
            if(key == 'start' || key == 'end' || key == 'id' || key == 'title') {
                return;
            }
            if (value != event.extendedProps[key]) {
                event.setExtendedProp(key, value);
            }
        });
    }

    const renderEventContent = (eventInfo) => {
        let calendarAPI = eventInfo.view.calendar;
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
                    <MissionForm
                    appointment={eventInfo.event} isSettled={true} updateAppointment={updateEvent}
                    deleteAppointment={deleteEvent} addAppointment={addEvent} handleClose={handleClose} />
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
            <ToolBox settledAppointments={settledAppointments} unSettledAppointments={unSettledAppointments} addAppointment={addEvent} deleteAppointment={deleteEvent} updateAppointment={updateEvent} token={token}/>
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
                <MissionForm appointment={selectedEvent} isSettled={selectedEvent.settled} updateAppointment={updateEvent}
                    deleteAppointment={deleteEvent} addAppointment={addEvent} handleClose={handleClose} />
        </Modal>
        <div className='demo-app-main'>
          <FullCalendar
            ref={calendarRef}
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
            allDaySlot={false}
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
            initialEvents={settledAppointments} // alternatively, use the `events` setting to fetch from a feed
            select={handleDateSelect}
            eventContent={renderEventContent} // custom render function
            eventClick={(clickInfo)=>{handleEventClick(clickInfo.event.id)}}
            eventsSet={handleEvents} // called after events are initialized/added/changed/removed
            // you can update a remote database when these fire:
            eventAdd={handleEventAdd}
            eventChange={handleEventChange}
            eventRemove={handleEventRemove} 
          />
        </div>
      </div>
    ) 

}

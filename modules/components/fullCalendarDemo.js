import React from 'react'
import { formatDate } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
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
    const [drawer, setDrawer] = React.useState(false);

    const handleDateSelect = (selectInfo) => {
        let title = prompt('Please enter a new title for your event')
        let calendarApi = selectInfo.view.calendar
    
        calendarApi.unselect() // clear date selection
        console.log(selectInfo)
        if (title) {
          calendarApi.addEvent({
            id: createEventId(),
            title,
            start: selectInfo.startStr,
            end: selectInfo.endStr,
            allDay: selectInfo.allDay
          })
        }
    }

    const handleEventClick = (clickInfo) => {
        if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
          clickInfo.event.remove()
        }
    }
    
    const handleEvents = (events) => {
        setCurrentEvents(events);
    }

    const renderEventContent = (eventInfo) => {
        return (
          <>
            <b>{eventInfo.timeText}</b>
            <i>{eventInfo.event.title}</i>
          </>
        )
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
            eventClick={handleEventClick}
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

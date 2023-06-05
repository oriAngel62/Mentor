import Demo from "../modules/components/sched"
import { appointments } from '../public/demo_data/month_appointments';
import * as React from "react";
import { useState } from "react";

async function getData(user) {
  const res = await fetch(user.getBaseURL() + '/api/Missions', {
    headers: { authorization: user.getToken() },
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
 
  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }
 
  return res.json();
}

export default function Dd() {
  const [data, setData] = useState(appointments.map((appointment, index) => (
    {id: index, ...appointment}
  )));

  
    return (
      <Demo data={data} setData={setData} />
    )
    // return (
    //   <React.Fragment key={"left"}>
    //       <Button onClick={toggleDrawer(true)}>{"left"}</Button>
    //       <SwipeableDrawer
    //         anchor={"left"}
    //         open={state}
    //         onClose={toggleDrawer(false)}
    //         onOpen={toggleDrawer(true)}
    //       >
    //         <ToolBox data={data} setData={setData} />
    //       </SwipeableDrawer>
    //   </React.Fragment>
    // );
  }
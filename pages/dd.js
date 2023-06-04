import Demo from "../components/sched"
import ToolBox from "../components/toolBox";
import { appointments } from '../public/demo_data/month_appointments';
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import * as React from "react";
import { useState } from "react";


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
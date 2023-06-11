import Demo from "/modules/components/fullCalendarDemo";
// import { appointments } from '../public/demo_data/month_appointments';
import * as React from "react";
import { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { selectAuthState } from "/modules/model/auth";
import withRoot from "/modules/withRoot";
import { useRouter } from 'next/router';
import AppAppBar from "/modules/views/AppAppBar";
import AppFooter from "/modules/views/AppFooter";


const getAppointments = async (auth) => {
  process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
  const res = await fetch('https://localhost:7204/api/Missions', {
    method: "GET",
    headers: {
      accept: "text/plain",
      Authorization: auth,
      },
      }).catch((err) => {
        return {ok: false};
      });
  if (!res.ok) {
    return {
        redirect: true,
        text: "You are not authorized to view this page",
    };
  }
  const repo = await res.json()
  console.log("REPO", repo);
  const setteledAppoitments = []
  const unSetteledAppoitments = []
  repo.forEach(element => {
    if (element.settled) {
      setteledAppoitments.push(element)
    } else {
      unSetteledAppoitments.push(element)
    }
  });
  return {
      redirect: false,
      setteledAppoitments: setteledAppoitments,
      unSetteledAppoitments: unSetteledAppoitments,
      text: "You are authorized to view this page",
  };
};




function Sched() {
  const auth = useSelector(selectAuthState);
  const [promise, setPromise] = useState(
    {
      redirect: true,
      text: "Loading...",
    }
  );
  useEffect(() => {
    const redirect = () => {
      router.push("/in/sign-in");
    };
    getAppointments(auth).then((res) => {
      setPromise(res);
      if(res.redirect) {
        redirect();
      }
    });
  }, []);
  const router = useRouter();
  if (promise.redirect) {
    return (<div>{promise.text}</div>);
  } else {
    return (
      <React.Fragment>
        <AppAppBar />
        <Demo setteledAppoitments={promise.setteledAppoitments} unSetteledAppoitments={promise.unSetteledAppoitments}/>
        <AppFooter />
      </React.Fragment>
    )
  }    
}

export default withRoot(Sched);
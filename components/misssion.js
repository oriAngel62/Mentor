//expand mission
//edit mission (inside expand)
//mark as complete
//delete mission

//organize looz
//suggest mission
//add mission

//mission data
// "id": 1,
// "name": "Mission 1",
// "description": "Mission 1 Description",
// "category": "Category 1",
// "start": 10.00,
// "length": 1,
// "priority": 1,
// "isCompleted": false

import { useState } from "react";

//import styles from "./toolbox.css";
// console.log(missionData.days[0].missionList[0]);

function mission({ missionData }) {
    const [mission, setMission] = useState(missionData);

    return (
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">{missionData.name}</h5>
                <p class="card-text">{missionData.description}</p>
                <check></check>
                <button type="button" class="btn btn-primary">
                    expand
                </button>
            </div>
        </div>
    );
}

export default mission;

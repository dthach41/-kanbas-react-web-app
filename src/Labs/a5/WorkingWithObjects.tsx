import React, { useState } from "react";
function WorkingWithObjects() {

    const [assignment, setAssignment] = useState({
        id: 1, title: "NodeJS Assignment",
        description: "Create a NodeJS server with ExpressJS",
        due: "2021-10-10", completed: false, score: 0,
    });
    const ASSIGNMENT_URL = "http://localhost:4000/a5/assignment"

    const [module, setModule] = useState({
        id: 1, name: "Module Name",
        description: "Module's Description",
        course: "Module's Course"
    })
    const MODULE_URL = "http://localhost:4000/a5/module"

    return (
        <div>
            <h3>Working With Objects</h3>

            <h4>Retrieving Objects</h4>
            <a href="http://localhost:4000/a5/assignment">
                Get Assignment
            </a>

            <h4>Retrieving Properties</h4>
            <a href="http://localhost:4000/a5/assignment/title">
                Get Title
            </a>

            <h4>Modifying Properties</h4>
            <a href={`${ASSIGNMENT_URL}/title/${assignment.title}`}>
                Update Title
            </a>
            <input type="text"
                onChange={(e) => setAssignment({
                    ...assignment,
                    title: e.target.value
                })}
                value={assignment.title} />

            <h4>Testing Retreiving Module Object</h4>
            <a href="http://localhost:4000/a5/module">
                Get Module
            </a>

            <h4>Retreiving Module Name</h4>
            <a href="http://localhost:4000/a5/module/name">
                Get Module's Name
            </a>

            
            <h4>Modifying Module's Property</h4>
            <a href={`${MODULE_URL}/name/${module.name}`}>
                Update Module Name
            </a>
            <input type="text"
                onChange={(e) => setModule({
                    ...module,
                    name: e.target.value
                })}
                value={module.name} />

            <h4>Modifying Assingment's Score</h4>
            
            
            
        </div>
        
    );
}
export default WorkingWithObjects;
import React from "react";
import { FaBook, FaCheckCircle, FaEllipsisV, FaPlusCircle, FaPlus } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { assignments } from "../../Database";
import "./index.css";


function Assignments() {
  const { courseId } = useParams();

  const assignmentList = assignments.filter(
    (assignment) => assignment.courseId === courseId);
  return (
    <>
      <div className="flex-buttons-container" style={{ marginTop: "0px" }}>
        <input placeholder=" Search for Assignment" style={{marginRight: "auto"}}/>

        <div>
          <div className="btn modules-button"><FaPlus /> Groups </div>
          <div className="btn modules-button-red"><FaPlus /> Assignment</div>
          <div className="btn modules-button"><FaEllipsisV /> </div>
        </div>

      </div>
      
      <hr style={{ marginRight: "15px"}}></hr>


      <ul className="list-group wd-modules" style={{ marginRight: "15px" }}>
        <li className="list-group-item" >
          <div style={{ marginBottom: "10px" }}>
            <FaEllipsisV className="me-2" /> ASSIGNMENTS
            <span className="float-end">
              <FaCheckCircle className="text-success" />
              <FaPlusCircle className="ms-2" /><FaEllipsisV className="ms-2" />
            </span>
          </div>

          <ul className="list-group" >
            {assignmentList.map((assignment) => (
              <li className="list-group-item">

                <span style={{ display: "flex", alignItems: "center"}}>
                  <span>
                    <FaEllipsisV className="me-2" />
                    <FaBook className="me-3 fs-5" style={{ color: "green" }} />
                  </span>

                  <span style={{ marginRight: "auto" }}>
                    <Link to={`/Kanbas/Courses/${courseId}/Assignments/${assignment._id}`}> {assignment.title} </Link>
                    <br />
                    <span style={{fontSize: "13px"}}>
                      <span style={{ color: "red" }}>Multiple Modules </span> | Due: {assignment.duedate} | {assignment.points} pts
                    </span>
                  </span>

                  <span className="float-end"> <FaCheckCircle className="text-success" /><FaEllipsisV className="ms-2" /></span>
                </span>

              </li>))}
          </ul>
        </li>
      </ul>
    </>
  );
}
export default Assignments;
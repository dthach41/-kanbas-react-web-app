
import React from "react";
import { FaBell, FaBullhorn, FaBullseye, FaChartBar, FaCircle, FaCreativeCommons, FaFileImport } from "react-icons/fa";
import { coursesTodos } from "../../Database";
import "./index.css";
import { useParams } from "react-router";

function Status() {

    const { courseId } = useParams();
    const todoList = coursesTodos.filter((courseTodo) => courseTodo.courseId === courseId);
    
    return (
        <div className="flex-grow-0 me-2 d-none d-lg-block" style={{marginLeft: "25px"}}>
            <div>
                <div style={{width: "250px", marginLeft: "20px"}}>
                    <div className="list-group">
                        <button className="btn status-btn" style={{ marginTop: "0px" }}> <FaFileImport /> Import Existing Content</button>
                        <button className="btn status-btn"> <FaCreativeCommons /> Import From Commons</button>
                        <button className="btn status-btn"> <FaBullseye /> Choose Home Page</button>
                        <button className="btn status-btn"> <FaChartBar /> View Course Stream</button>
                        <button className="btn status-btn"> <FaBullhorn /> New Announcement</button>
                        <button className="btn status-btn"> <FaChartBar /> New Analytics</button>
                        <button className="btn status-btn"> <FaBell /> View Course Notifications</button>
                    </div>
                </div>
            </div>
            
            <div style={{marginTop: "20px", marginLeft: "20px"}}>
                <h3>To Do</h3>
            </div>

            <hr style={{margin:"10px"}}></hr>
            <ul>
                {todoList.map((todo) => (
                    <>

                        {todo.todos.map((itemTodo) => (
                            <li>
                                <div style={{color:"red"}}> {itemTodo.name}  </div>
                                <div style={{ color: "grey" }}>{itemTodo.points} Points  <FaCircle size={5} /> {itemTodo.date}</div>
                            </li>
                        ))}

                    </>
                ))}

            </ul>
            

        </div>
    )

}

export default Status;
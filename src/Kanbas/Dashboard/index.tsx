
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { courses } from "../Database";
import "./index.css"; 
import { FaMinus, FaPlus } from "react-icons/fa";
import db from "../Database";

function Dashboard({ courses, course, setCourse, addNewCourse,
    deleteCourse, updateCourse }: {
        courses: any[]; course: any; 
        setCourse: (course: any) => void;
        addNewCourse: () => void;
        deleteCourse: (course: any) => void;
        updateCourse: () => void;
    }) {
    

    
    return (
        <div className="p-4">
            <h1>Dashboard</h1>
            <hr />
            <h2>Published Courses (7)</h2>
            <hr />
            <div className="flex-buttons-container">
                <button className="btn add-btn" onClick={addNewCourse} > Add <FaPlus /> </button>
                <button className="btn add-btn" onClick={updateCourse} > Update </button>

            </div>

            <input value={course.name} className="form-control course-add-menu-input" 
                onChange={(e) => setCourse({ ...course, name: e.target.value })} />
            <input value={course.number} className="form-control course-add-menu-input"
                onChange={(e) => setCourse({ ...course, number: e.target.value })} /> 
            <input value={course.startDate} className="form-control course-add-menu-input" type="date"
                onChange={(e) => setCourse({ ...course, startDate: e.target.value })} />
            <input value={course.endDate} className="form-control course-add-menu-input" type="date"
                onChange={(e) => setCourse({ ...course, endDate: e.target.value })} />

            <hr />

            <div className="row" style={{fontSize: "8"}}>
                <div className="row row-cols-1 row-cols-md-5 g-4">
                    {courses.map((course) => (
                        <div className="col" style={{ width: "270px"}}>
                            <div className="card">
                                <img src={course.image} className="card-img-top" style={{ height: "140px" }} />
                                <div className="card-body">
                                    <Link className="card-title" to={`/Kanbas/Courses/${course._id}`}
                                        style={{ textDecoration: "none", color: "navy", fontWeight: "bold" }}>
                                        <div className="course-info">{course.number + " " + course.name}</div> </Link>
                                    <p className="card-text">{course.number + " " + (new Date(course.startDate).toLocaleDateString("en-US"))}</p>
                                    
                                    <Link to={`/Kanbas/Courses/${course._id}`} className="btn btn-primary"> Go </Link>

                                    <button className="btn del-btn" onClick={(event) => {
                                        event.preventDefault();
                                        deleteCourse(course._id);
                                    }}> <FaMinus /> </button>

                                    <button className="btn edit-btn" onClick={(event) => {
                                        event.preventDefault();
                                        setCourse(course);
                                    }}>
                                        Edit
                                    </button>

                                </div>
                            </div>
                        </div>
                        )
                    )}

                </div>
            </div>
        </div>
    )
    
}

export default Dashboard;
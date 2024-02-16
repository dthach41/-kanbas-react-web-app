
import React from "react";
import { Link } from "react-router-dom";
import { courses } from "../Database";
import "./index.css"; 

function Dashboard() {
    return (
        <div className="p-4">
            <h1>Dashboard</h1>
            <hr />
            <h2>Published Courses (7)</h2>
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
                                    <p className="card-text">{course._id + " " + course.startDate}</p>
                                    <Link to={`/Kanbas/Courses/${course._id}`} className="btn btn-primary"> Go </Link>
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
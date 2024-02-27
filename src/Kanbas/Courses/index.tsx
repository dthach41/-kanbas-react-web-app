import { courses } from "../../Kanbas/Database";
import { useParams } from "react-router-dom";
import { HiMiniBars3 } from "react-icons/hi2";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import CourseNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import "./index.css";
import { FaGlasses, FaGreaterThan } from "react-icons/fa";
import Assignments from "./Assignments";




function Courses() {
    const { courseId } = useParams();
    const course = courses.find((course) => course._id === courseId);
    const { pathname } = useLocation();
    const segments = pathname.split('/');
    const currentDirectory = segments[segments.length - 1];
    return (
        <div>

            <div className="breadcrumb-nav-container">
                    <div className="breadcrumb-nav-item btn"><HiMiniBars3 className="fs-2" /></div>

                <h5 style={{ display: "flex", marginTop: "8px" }}>
                    <span className="breadcrumb-nav-item">{course?.number} <FaGreaterThan className="fs-6" style={{ color: "black" }} /> {currentDirectory}</span>
                </h5>

                <div className="btn modules-button d-none d-sm-block" style={{ marginLeft: "auto", marginRight: "15px" }}>
                    <FaGlasses className="fs-4"/> Student View
                </div>

                <div className="btn modules-button d-sm-none" style={{ marginLeft: "auto", marginRight: "15px" }}>
                    <FaGlasses className="fs-4" />
                </div>
            </div>

            <hr style={{ margin: "15px",  }}></hr>


            <div className="d-flex">
                <div className="d-none d-md-block">
                    <CourseNavigation />
                </div>

                <div className="flex-fill">
                    <Routes>
                        <Route path="/" element={<Navigate to="Home" />} />
                        <Route path="Home" element={<Home />} />
                        <Route path="Modules" element={<Modules />} />
                        <Route path="Piazza" element={<a href="https://piazza.com/">Piazza</a>} />
                        <Route path="Assignments" element={<Assignments />} />
                        <Route path="Assignments/:assignmentId" element={<h1>Assignment Editor</h1>} />
                        <Route path="Grades" element={<h1>Grades</h1>} />
                    </Routes>
                </div>
            </div>

            

        </div>
    );
}

export default Courses;
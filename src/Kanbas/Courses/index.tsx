// import { courses } from "../../Kanbas/Database";
import { useParams } from "react-router-dom";
import { HiMiniBars3 } from "react-icons/hi2";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import CourseNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import "./index.css";
import { FaGlasses, FaGreaterThan } from "react-icons/fa";
import Assignments from "./Assignments";
import { useState, useEffect } from "react";
import axios from "axios";
import Quizzes from "./Quizzes";
import QuizDetails from "./Quizzes/quizDetails";
import QuizDetailsEditor from "./Quizzes/quizDetailsEditor";
import QuizQuestionsEditor from "./Quizzes/quizQuestionsEditor";
import QuizPreview from "./Quizzes/quizPreview";



function Courses() {
    const { pathname } = useLocation();
    const { courseId } = useParams();
    // const course = courses.find((course) => course._id === courseId);
    const segments = pathname.split('/');
    const currentDirectory = segments[segments.length - 1];


    const API_BASE = process.env.REACT_APP_BASE_API;
    const COURSES_API = `${API_BASE}/api/courses`;
    const [course, setCourse] = useState<any>({ _id: "" });
    const findCourseById = async (courseId?: string) => {
        const response = await axios
            .get(`${COURSES_API}/${courseId}`);
        setCourse(response.data);
    };

    useEffect(() => {
        findCourseById(courseId);
    }, [courseId]);




    return (
        <div>

            <div className="breadcrumb-nav-container" style={{ color: "black" }}>
                    <div className="breadcrumb-nav-item btn"><HiMiniBars3 className="fs-2" /></div>

                <h5 style={{ display: "flex", marginTop: "8px" }}>
                    <span className="breadcrumb-nav-item">{course?.number} <FaGreaterThan className="fs-6" style={{ color: "black" }} /> {CreateBreadcrumbNav()}</span>
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
                        <Route path="Quizzes" element={<Quizzes />} />
                        <Route path="Quizzes/QuizDetails/:quizId" element={<QuizDetails />} />
                        <Route path="Quizzes/QuizDetailsEditor/:quizId" element={<QuizDetailsEditor />} />
                        <Route path="Quizzes/QuizQuestionsEditor/:quizId" element={<QuizQuestionsEditor />} />
                        <Route path="Quizzes/QuizPreview/:quizId" element={<QuizPreview />} />
                    </Routes>
                </div>
            </div>

            

        </div>
    );
}

export default Courses;


function CreateBreadcrumbNav() {
    const { pathname } = useLocation();
    let pathSegments = pathname.split("/").filter(segment => segment !== "").slice(3) // removes first 3 elements
    // if there are 3 paths, then remove the id at the end
    if (pathSegments.length >= 3) {
        pathSegments = pathSegments.slice(0, pathSegments.length - 1)
    }
    let result = []

    for (let i = 0; i < pathSegments.length; i++) {
        result.push(
            <span key={i}>{pathSegments[i]} {i < pathSegments.length - 1 && <FaGreaterThan className="fs-6" style={{ color: "black" }} />} </span>
        );
    }

    return <span>{result}</span>

}

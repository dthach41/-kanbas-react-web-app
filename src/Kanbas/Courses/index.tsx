import { courses } from "../../Kanbas/Database";
import { useParams } from "react-router-dom";
import { HiMiniBars3 } from "react-icons/hi2";
import { Route, Routes, Navigate } from "react-router-dom";
import CourseNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";

function Courses() {
    const { courseId } = useParams();
    const course = courses.find((course) => course._id === courseId);
    return (
        <div>
            <h1><HiMiniBars3 /> Course {course?.name}</h1>
            <div className="d-flex">
                <div className="d-none d-md-block">
                    <CourseNavigation />
                </div>

                <div className="flex-fill">
                    <Routes>
                        <Route path="/" element={<Navigate to="Home" />} />
                        <Route path="Home" element={<Home />} />
                        <Route path="Modules" element={<Modules />} />
                        <Route path="Piazza" element={<h1>Piazza</h1>} />
                        <Route path="Assignments" element={<h1>Assignments</h1>} />
                        <Route path="Assignments/:assignmentId" element={<h1>Assignment Editor</h1>} />
                        <Route path="Grades" element={<h1>Grades</h1>} />
                    </Routes>
                </div>
            </div>

            

        </div>
    );
}

export default Courses;
import "./index.css";
import { FaEllipsisV, FaPlus, } from "react-icons/fa";
import { quizzes } from "../../Database";
import { useParams } from "react-router";


function QuizzesList() {
    const { courseId } = useParams();
    const quizList = quizzes.filter((quiz) => quiz.courseId == courseId);

    const defaultQuiz = {
        "courseId": courseId,
        "name": "New Quiz",
        "available": "2023-05-15",
        "due": "2023-05-15",
        "points": "0",
        "open": true,
        "questions": []
}

    return (
        <>
            <div className="flex-buttons-container" style={{ marginTop: "0px" }}>
                <input placeholder=" Search for Quiz" style={{ marginRight: "auto" }} />

                <div className="btn red-btn"><FaPlus /> Quiz</div>
                <div className="btn grey-btn"> <FaEllipsisV /> </div>
            </div>

            <hr style={{ marginRight: "15px" }}></hr>

            <ul className="list-group wd-modules" style={{ marginRight: "15px" }}>
                <li className="list-group-item" >
                    <div style={{ marginBottom: "10px" }}>
                        <FaEllipsisV className="me-2" /> Assignment Quizzes
                    </div>

                    <ul className="list-group" >
                        {quizList.map((quiz) => (
                            <li className="list-group-item">
                                {quiz.name}
                            </li>
                        ))}
                    </ul>

                </li>


            </ul>
        </>
    )
}

export default QuizzesList;

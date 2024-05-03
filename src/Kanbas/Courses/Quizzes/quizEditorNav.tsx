import { useLocation, useParams } from "react-router";
import { Link } from "react-router-dom";


export default function QuizEditorNav() {
    const { pathname } = useLocation();

    const { courseId, quizId } = useParams();

    return (
        <>

            <div style={{marginRight: 15}}>
                <nav className="nav nav-tabs mt-2">
                    <Link to={"/Kanbas/Courses/" + courseId + "/Quizzes/QuizDetailsEditor/" + quizId}
                        className={`nav-link ${pathname.includes("DetailsEditor") ? "active" : ""}`}>Details Editor</Link>
                    <Link to={"/Kanbas/Courses/" + courseId + "/Quizzes/QuizQuestionsEditor/" + quizId}
                        className={`nav-link ${pathname.includes("QuestionsEditor") ? "active" : ""}`}>Questions Editor</Link>
                </nav>
            </div>


        </>
    )
}
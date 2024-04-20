
import { FaTimesCircle } from "react-icons/fa";
import "./index.css";
import { Quiz } from "./client";
import { Link } from "react-router-dom";

// Using a hashmap wheere key: function name, value: actual function
type FunctionMap = {
    [key: string]: () => void;
};

const ContextMenu = ({ isOpen, onClose, quiz, quizFunctions }: { isOpen: boolean, onClose: () => void, quiz: Quiz, quizFunctions: FunctionMap }) => {
    

    // Closes the pop up if the isOpen boolean is false
    if (!isOpen) {
        return null;
    }


    return (
        <>
            <div className="context-menu">
                <FaTimesCircle onClick={onClose} style={{ color: 'red', marginBottom:'10px'}} className="red-btn" />

                <div>
                    <div style={{ fontWeight: 'bold' }}>{quiz.name} {quiz._id}</div>

                    <hr/>

                    <div className="context-menu-item"> <label>Available Date: </label> {quiz.available} </div>
                    <div className="context-menu-item"> <label>Due Date: </label> {quiz.due} </div>
                    <div className="context-menu-item"> <label>Questions: </label> {quiz.questions} </div>
                    <div className="context-menu-item"> <label>Published: </label> {quiz.published + ''} </div>

                    <div style={{ marginTop: '10px' }}>
                        <div onClick={() => { quizFunctions.deleteQuiz(); onClose(); }} className="btn btn-danger red-btn" style={{ marginRight: '7px' }}> Delete </div>
                        <Link className="btn  grey-btn" to={'/Kanbas/Courses/' + quiz.courseId + '/Quizzes/QuizDetailsEditor/' + quiz._id}> Edit </Link>
                        <div onClick={ quizFunctions.publishQuiz } className="btn  grey-btn"> Publish </div>
                    </div>

                </div>
            </div>

        </>
        
    );
};

export default ContextMenu;



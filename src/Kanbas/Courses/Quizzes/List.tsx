import "./index.css";
import { FaBan, FaCheckCircle, FaEllipsisV, FaPlus, FaRocket, } from "react-icons/fa";
import { useParams } from "react-router";
import * as client from "./client";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Quiz } from "./client";
import ContextMenu from "./contextMenu";
import { useDispatch, useSelector } from "react-redux";
import { KanbasState } from "../../store";



function QuizzesList() {
    const { courseId } = useParams();

    const [quizList, setQuizList] = useState<Quiz[]>([]);
    // const [quizList, setQuizList] = useSelector((state: KanbasState) => state.quizzesReducer.quizList)

    const dispatch = useDispatch()

    const fetchQuizzesForCourse = async (courseId?: string) => {
        const quizzes = await client.findQuizzesForCourse(courseId)
        setQuizList(quizzes);
    };

    useEffect(() => { 
        fetchQuizzesForCourse(courseId);
        
     }, []);

    console.log(quizList)


    const defaultQuiz: Quiz = {
        _id: "100",
        courseId: courseId + '',
        name: "New Quiz",
        description: "",
        assignmentGroup: "Quizzes",
        available: "2024-05-15",
        due: "2024-05-22",
        points: "0",
        open: false,
        questions: 0,
        published: false,
        shuffleAnswers: true,
        timeLimit: "20",
        multipleAttempts: false,
        showCorrectAnswers: true,
        accessCode: "None",
        oneQuestionAtTime: true,
        webcamRequired: false,
        lockQuestionsAfterAnswering: false,
        untilDate: "2024-05-22",
        quizType: "Graded Quiz",
    };

    const addQuiz = async () => {
        try {
            const newQuiz = await client.addQuiz(defaultQuiz)
            setQuizList([ ...quizList, newQuiz])
        } catch (err) {
            console.log(err);
        }
    };



    // Handling the context menu --------------------------------------------------------
    const [contextMenuOpen, setContextMenuOpen] = useState(false);
    // When ellipse is clicked, this will be set to the associated quiz
    const [contextMenuQuiz, setContextMenuQuiz] = useState<Quiz>(defaultQuiz);

    const handleContextMenu = (quiz: Quiz) => {
        setContextMenuOpen(true);
        setContextMenuQuiz(quiz)
    };

    const closeContextMenu = () => {
        setContextMenuOpen(false);
    };
    // ----------------------------------------------------------------------------------

    const deleteQuiz = async () => {
        try {
            await client.deleteQuiz(contextMenuQuiz);
            setQuizList(quizList.filter((quiz: Quiz) => quiz._id !== contextMenuQuiz._id));
        } catch (err) {
            console.log(err);
        }
    };


    const publishQuiz = async (quiz: Quiz) => {
        try {
            quiz.published = !quiz.published

            await client.updateQuiz(quiz);

            setQuizList(
                quizList.map((q: Quiz) => {
                    if (q._id === quiz._id) {
                        return quiz;
                    }
                    return q;
                })
            )

        } catch (err) {
            console.log(err);
        }
    }


    const quizFunctions = { deleteQuiz, publishQuiz: () => publishQuiz(contextMenuQuiz) }

  

    return (
        <>
            <div className="flex-buttons-container" style={{ marginTop: "0px" }}>
                <input placeholder=" Search for Quiz" style={{ marginRight: "auto" }} />

                <div className="btn red-btn" onClick={addQuiz}><FaPlus /> Quiz</div>
                <div className="btn grey-btn"> <FaEllipsisV /> </div>
            </div>

            <hr style={{ marginRight: "15px" }}></hr>

            <ul className="list-group wd-modules" style={{ marginRight: "15px" }}>
                <li className="list-group-item" >
                    <div style={{ marginBottom: "10px" }}>
                        <FaEllipsisV className="me-2" /> Assignment Quizzes
                    </div>

                    <ul className="list-group" >
                        {quizList.map((quiz: Quiz) => (
                            <li className="list-group-item" key={quiz._id}>
                                <span style={{ display: "flex", alignItems: "center" }}>
                                    <span style={{marginRight:"10px"}}>
                                        <FaRocket className="me-2" style={{color:'green'}}/>
                                    </span>

                                    <span style={{ marginRight: "auto" }}>
                                        <Link to={'/Kanbas/Courses/' + courseId + '/Quizzes/QuizDetails/' + quiz._id} onClick={() => {console.log(quiz._id)}}>{quiz.name}</Link>
                                        <br />
                                        <span style={{ fontSize: "13px" }}>
                                            {getQuizAvailablitiy(quiz) } | <span style={{fontWeight:'bold'}}>Due </span>: {quiz.due + ''} | {quiz.points} pts | {quiz.questions} Questions
                                        </span>
                                    </span>
                                    <span className="float-end"> 
                                        {quiz.published ? (
                                            <FaCheckCircle className="text-success" onClick={() => { publishQuiz(quiz) }} />
                                        ) : (
                                                <FaBan className="text-failure" onClick={() => { publishQuiz(quiz) }} />
                                        )}
                                        <FaEllipsisV className="ms-2" onClick={() => handleContextMenu(quiz)} />
                                    </span>
                                </span>
                            </li>
                        ))}
                    </ul>

                </li>
            </ul>

            <div style={{ position: 'fixed', top: "35%", left: "50%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <ContextMenu isOpen={contextMenuOpen} onClose={closeContextMenu} quiz={contextMenuQuiz} quizFunctions={quizFunctions} />
            </div>

            
        </>
    )
}

export default QuizzesList;


// Function to determine quiz availbilty (closed, available, or not available until ___ )
function getQuizAvailablitiy (quiz: Quiz) {
    const quizAvailability = new Date(quiz.available)
    const currentDate = new Date();
    if (currentDate >= quizAvailability ) {
        return (
            <>
                <span style={{ fontWeight: 'bold' }}> Available</span>
            </>
        )
    } else if (currentDate < quizAvailability) {
        return (
            <>
                <span style={{ fontWeight: 'bold' }}>Not available until</span> {quiz.available}
            </>
        ) 
    } else {
        return (
            <>
                Closed
            </>
        )
    }
}
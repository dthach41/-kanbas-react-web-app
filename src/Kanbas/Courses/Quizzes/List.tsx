import "./index.css";
import { FaCheckCircle, FaEllipsisV, FaPlus, FaRocket, } from "react-icons/fa";
import { useParams } from "react-router";
import * as client from "./client";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Quiz } from "./client";


function QuizzesList() {
    const { courseId } = useParams();

    const [quizList, setQuizList] = useState<Quiz[]>([]);

    const fetchQuizzesForCourse = async (courseId?: string) => {
        const quizzes = await client.findQuizzesForCourse(courseId);
        setQuizList(quizzes);
    };

    useEffect(() => { fetchQuizzesForCourse(courseId); }, [courseId]);



    const defaultQuiz: Quiz = {
        _id: "-1",
        courseId: courseId + '',
        name: "New Quiz",
        available: "2024-05-15",
        due: "2024-05-22",
        points: "0",
        open: false,
        questions: []
    }

    const addQuiz = async () => {
        try {
            const newUser = await client.addQuiz(defaultQuiz)
            console.log(newUser)
        } catch (err) {
            console.log(err);
        }
    };

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
                        {quizList.map((quiz) => (
                            <li className="list-group-item">
                                <span style={{ display: "flex", alignItems: "center" }}>
                                    <span style={{marginRight:"10px"}}>
                                        <FaRocket className="me-2" style={{color:'green'}}/>
                                    </span>

                                    <span style={{ marginRight: "auto" }}>
                                        <Link to={'#'}>{quiz.name}</Link>
                                        <br />
                                        <span style={{ fontSize: "13px" }}>
                                            Closed | <span style={{fontWeight:'bold'}}>Due </span>: {quiz.due + ''} | {quiz.points} pts | {quiz.questions.length} Questions
                                        </span>
                                    </span>
                                    <span className="float-end"> <FaCheckCircle className="text-success" /> <FaEllipsisV className="ms-2" /></span>
                                </span>

                            </li>
                        ))}
                    </ul>

                </li>


            </ul>
        </>
    )
}

export default QuizzesList;

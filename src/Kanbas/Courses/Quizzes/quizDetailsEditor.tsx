import { useEffect, useState } from "react";
import "./index.css";
import { useParams } from "react-router";
import * as client from "./client";
import { FaBan, FaCheckCircle, FaEllipsisV, FaPen } from "react-icons/fa";
import { Quiz } from "./client";


export default function QuizDetailsEditor() {
    const { courseId, quizId } = useParams();

    const [quiz, setQuiz] = useState<Quiz>({
        _id: "100",
        courseId: courseId + '',
        name: "New Quiz",
        assignmentGroup: "Quizzes",
        available: "2024-05-15",
        due: "2024-05-22",
        points: "0",
        open: false,
        questions: [],
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
    })

    const fetchQuiz = async () => {
        const quiz = await client.findQuizById(quizId + '');
        setQuiz(quiz);
    };

    useEffect(() => {
        fetchQuiz();
    }, []);



    return (
        <>
            <div className="flex-buttons-container" style={{ marginTop: "0px" }}>
                <h4 style={{ marginRight: "auto" }}>{quiz.name} Editor</h4>

                <div style={{ margin: '7px' }}>
                    <span style={{fontWeight: 'bold'}}> Points: </span> {quiz.points} 
                </div>

                {quiz.published ? (
                    <div style={{margin: '7px'}}>
                        <FaCheckCircle /> Published
                    </div>

                ) : (
                    <div style={{ margin: '7px' }} >
                        <FaBan /> Unpublished
                    </div>

                )}

                <div className="btn modules-button"> <FaEllipsisV /> </div>
            </div>

            <hr style={{ marginRight: "15px" }}></hr>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                Todo Implement
            </div>


        </>
    )
}
import { useEffect, useState } from "react";
import "./index.css";
import { useParams } from "react-router";
import * as client from "./client";
import { FaBan, FaCheckCircle, FaEllipsisV, FaPen } from "react-icons/fa";
import { Quiz } from "./client";
import { Link } from "react-router-dom";


export default function QuizDetails() {
    const { quizId } = useParams();

    //console.log(quizId)

    const [quiz, setQuiz] = useState<Quiz>({
        _id: "100",
        courseId: '',
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
    })

    const fetchQuiz = async () => {
        const quiz = await client.findQuizById(quizId + '');
        setQuiz(quiz);
    };

    useEffect(() => {
        fetchQuiz();
    }, []);

    const publishQuiz = async (quizToUpdate: Quiz) => {
        try {
            const updatedQuiz = { ...quizToUpdate, published: !quizToUpdate.published };
            setQuiz(updatedQuiz);
            await client.updateQuiz(updatedQuiz);

        } catch (err) {
            console.log(err);
        }
    }


    return (
        <>
        <div className="flex-buttons-container" style={{ marginTop: "0px" }}>
            <h4 style={{ marginRight: "auto" }}>{quiz.name} Details</h4>
                 
                {quiz.published ? (
                    <div className="btn green-btn" onClick={() =>  publishQuiz(quiz) }>
                        <FaCheckCircle className="" /> Published
                    </div>
                    
                ) : (
                        <div className="btn grey-btn" onClick={() => publishQuiz(quiz) }>
                        <FaBan className="text-failure"  /> Unpublished
                    </div>
                    
                )}
            <div className="btn modules-button"> Preview </div>
            <Link to={'/Kanbas/Courses/' + quiz.courseId + "/Quizzes/QuizDetailsEditor/" + quizId} className="btn modules-button"> <FaPen/> Edit </Link>
            <div className="btn modules-button"> <FaEllipsisV/> </div>
        </div>

        <hr style={{ marginRight: "15px" }}></hr>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div>
                    <label className="detailLabel">Quiz Name: </label> {quiz.name}
                </div>
                <div>
                    <label className="detailLabel">Quiz Type: </label> {quiz.quizType}
                </div>
                <div>
                    <label className="detailLabel">Points: </label> {quiz.points + ''}
                </div>
                <div>
                    <label className="detailLabel">Assignment Group: </label> {quiz.assignmentGroup}
                </div>
                <div>
                    <label className="detailLabel">Shuffle Answers: </label> {boolToString(quiz.shuffleAnswers)}
                </div>
                <div>
                    <label className="detailLabel">Time Limit </label> {quiz.timeLimit} Minutes
                </div>
                <div>
                    <label className="detailLabel">Multiple Attempts: </label> {boolToString(quiz.multipleAttempts)}
                </div>
                <div>
                    <label className="detailLabel">Show Correct Answers </label> {boolToString(quiz.showCorrectAnswers)}
                </div>
                <div>
                    <label className="detailLabel">Access Code</label> {quiz.accessCode}
                </div>
                <div>
                    <label className="detailLabel">One Question at a Time: </label> {boolToString(quiz.oneQuestionAtTime)}
                </div>
                <div>
                    <label className="detailLabel">Webcam Required: </label> {boolToString(quiz.webcamRequired)}
                </div>
                <div>
                    <label className="detailLabel">Lock Questions After Answering: </label> {boolToString(quiz.lockQuestionsAfterAnswering)}
                </div>
                <div>
                    <label className="detailLabel">Due Date: </label> {quiz.due}
                </div>
                <div>
                    <label className="detailLabel">Available Date: </label> {quiz.available}
                </div>
                <div>
                    <label className="detailLabel">Until Date: </label> {quiz.untilDate}
                </div>
        </div>

    
        </>
    )
}

function boolToString(bool: boolean) {
    if (bool) {
        return (
            <>
            Yes
            </>
        )
    } else {
        return (
            <>
            No
            </>
        )
    }
}
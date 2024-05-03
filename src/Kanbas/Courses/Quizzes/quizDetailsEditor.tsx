import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import { Quiz } from "./client";
import * as client from "./client";
import { FaBan, FaCheckCircle, FaEllipsisV } from "react-icons/fa";
import QuizEditorNav from "./quizEditorNav";
import { Link } from "react-router-dom";


export default function QuizDetailsEditor() {

    const { courseId, quizId } = useParams();

    const [quiz, setQuiz] = useState<Quiz>({
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
    })

    const fetchQuiz = async () => {
        const quiz = await client.findQuizById(quizId + '');
        setQuiz(quiz);
    };

    useEffect(() => {
        fetchQuiz();
    }, []);


    const saveQuiz = async () => {
        await client.updateQuiz(quiz);
    };

    const publishQuiz = async (quizToUpdate: Quiz) => {
        try {
            const updatedQuiz = { ...quizToUpdate, published: true};
            setQuiz(updatedQuiz);
            await client.updateQuiz(updatedQuiz);

        } catch (err) {
            console.log(err);
        }
    }



    return (
        <>
            <div className="flex-buttons-container" style={{ marginTop: "0px" }}>
                <h4 style={{ marginRight: "auto" }}>{quiz.name} Details Editor</h4>

                <div style={{ margin: '7px' }}>
                    <span style={{ fontWeight: 'bold' }}> Points: </span> {quiz.points}
                </div>

                {quiz.published ? (
                    <div style={{ margin: '7px' }}>
                        <FaCheckCircle /> Published
                    </div>

                ) : (
                    <div style={{ margin: '7px' }} >
                        <FaBan /> Not Published
                    </div>

                )}

                <div className="btn modules-button"> <FaEllipsisV /> </div>
            </div>

            <hr style={{ marginRight: "15px" }}></hr>

            <QuizEditorNav />

            <div>
                <div >
                    <label className="quiz-prop" style={{marginTop:'20px'}}> Name: </label>
                    <input className="quiz-prop" value={quiz.name} onChange={(q) => setQuiz({ ...quiz, name: q.target.value })} />
                </div>

                <div >
                    <label className="quiz-prop" style={{marginBottom:'0px'}}> Description: </label>
                    <div>
                        <textarea className="quiz-prop" style={{ width: "75%", height: "100px", marginTop: '7px' }}
                         placeholder={quiz.description ? "" : "No Description"}
                         value={quiz.description}
                         onChange={(q) => setQuiz({ ...quiz, description: q.target.value })} />
                    </div>
                </div>

                <div>
                    <label className="quiz-prop"> Quiz Type: </label>
                    <select className="quiz-prop" onChange={(q) => setQuiz({ ...quiz, quizType: q.target.value })}>
                        <option value={quiz.quizType} selected>{quiz.quizType}</option>
                        {quiz.quizType !== "Graded Quiz" && <option>Graded Quiz</option>}
                        {quiz.quizType !== "Practice Quiz" && <option>Practice Quiz</option>}
                        {quiz.quizType !== "Graded Survey" && <option>Graded Survey</option>}
                        {quiz.quizType !== "Ungraded Survey" && <option>Ungraded Survey</option>}
                    </select>
                </div>


                <div>
                    <label className="quiz-prop"> Total Points: </label>
                    <input type="number" className="quiz-prop" value={quiz.points} onChange={(q) => setQuiz({ ...quiz, points: q.target.value })} />
                </div>


                <div>
                    <label className="quiz-prop"> Assignment Group: </label>
                    <select className="quiz-prop" onChange={(q) => setQuiz({ ...quiz, assignmentGroup: q.target.value })}>
                        <option value={quiz.assignmentGroup} selected>{quiz.assignmentGroup}</option>
                        {quiz.assignmentGroup !== "Quizzes" && <option>Quizzes</option>}
                        {quiz.assignmentGroup !== "Exams" && <option>Exams</option>}
                        {quiz.assignmentGroup !== "Assignments" && <option>Assignments</option>}
                        {quiz.assignmentGroup !== "Project" && <option>Project</option>}
                    </select>
                </div>

    

                <div>
                    <label className="quiz-prop"> Shuffle Answers: </label>
                    <input className="quiz-prop" type="checkbox" checked={quiz.shuffleAnswers} onChange={(q) => setQuiz({ ...quiz, shuffleAnswers: q.target.checked })} />
                </div>


                <div>
                    <label className="quiz-prop"> Time Limit Minutes: </label>
                    <input type="number" className="quiz-prop" value={quiz.timeLimit} onChange={(q) => setQuiz({ ...quiz, timeLimit: q.target.value })} />
                </div>


                <div>
                    <label className="quiz-prop"> Multiple Attemps: </label>
                    <input className="quiz-prop" type="checkbox" checked={quiz.multipleAttempts} onChange={(q) => setQuiz({ ...quiz, multipleAttempts: q.target.checked })} />
                </div>

                <div>
                    <label className="quiz-prop"> Show Correct Answers: </label>
                    <input className="quiz-prop" type="checkbox" checked={quiz.showCorrectAnswers} onChange={(q) => setQuiz({ ...quiz, showCorrectAnswers: q.target.checked })} />
                </div>


                <div>
                    <label className="quiz-prop"> Access Code: </label>
                    <input className="quiz-prop" value={quiz.accessCode} onChange={(q) => setQuiz({ ...quiz, accessCode: q.target.value })} />
                </div>


                <div>
                    <label className="quiz-prop"> One Question at a Time: </label>
                    <input className="quiz-prop" type="checkbox" checked={quiz.oneQuestionAtTime} onChange={(q) => setQuiz({ ...quiz, oneQuestionAtTime: q.target.checked })} />
                </div>


                <div>
                    <label className="quiz-prop"> Webcam Required: </label>
                    <input className="quiz-prop" type="checkbox" checked={quiz.webcamRequired} onChange={(q) => setQuiz({ ...quiz, webcamRequired: q.target.checked })} />
                </div>


                <div>
                    <label className="quiz-prop"> Lock Questions After Answering: </label>
                    <input className="quiz-prop" type="checkbox" checked={quiz.lockQuestionsAfterAnswering} onChange={(q) => setQuiz({ ...quiz, lockQuestionsAfterAnswering: q.target.checked })} />
                </div>


                <div>
                    <label className="quiz-prop"> Due Date: </label>
                    <input type="date" className="quiz-prop" value={quiz.due} onChange={(q) => setQuiz({ ...quiz, due: q.target.value  })} />
                </div>


                <div>
                    <label className="quiz-prop"> Available Date: </label>
                    <input type="date" className="quiz-prop" value={quiz.available} onChange={(q) => setQuiz({ ...quiz, available: q.target.value })} />
                </div>


                <div>
                    <label className="quiz-prop"> Until Date: </label>
                    <input type="date" className="quiz-prop" value={quiz.untilDate} onChange={(q) => setQuiz({ ...quiz, untilDate: q.target.value })} />
                </div>

            
            </div>


            <hr style={{ marginRight: "15px" }}></hr>


            <div className="flex-buttons-container" style={{ marginTop: "0px" }}>
                <Link to={'/Kanbas/Courses/' + quiz.courseId + "/Quizzes/"} className="btn grey-btn"> Cancel </Link>

                <Link to={'/Kanbas/Courses/' + quiz.courseId + "/Quizzes/"} className="btn grey-btn" onClick={() => { saveQuiz(); publishQuiz(quiz); }}> Save & Publish </Link>

                <Link to={'/Kanbas/Courses/' + courseId + '/Quizzes/QuizDetails/' + quiz._id} className="btn red-btn" onClick={saveQuiz}> Save </Link>
            </div>


        </>
    )
}
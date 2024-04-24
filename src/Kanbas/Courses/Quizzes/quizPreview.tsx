import { useParams } from "react-router";
import "./index.css";
import { useEffect, useState } from "react";
import { Question, Quiz } from "./client";
import * as client from "./client";

export default function QuizPreview() {
    
    const { quizId } = useParams();

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

    const [questions, setQuestions] = useState<Question[]>([]);


    const fetchQuestions = async () => {
        try {
            const questions = await client.findQuestionsForQuiz(quizId + '')
            setQuestions(questions)
        } catch (e) {
            console.log(e)
        }

    };


    const fetchQuiz = async () => {
        const quiz = await client.findQuizById(quizId + '');
        setQuiz(quiz);
    };

    useEffect(() => {
        fetchQuiz();
        fetchQuestions();
    }, []);

    const [questionIndex, setQuestionIndex] = useState(0)


    return (
        <>
            <div className="flex-buttons-container" style={{ marginTop: "0px" }}>
                <h4 style={{ marginRight: "auto" }}>{quiz.name} Preview</h4>
            </div>

            <hr style={{ marginRight: "15px" }}></hr>

            {displayQuestion(questions, questionIndex)}

            <div className="flex-buttons-container" style={{ marginTop: "30px", justifyContent: "center" }}>
                <div className="btn grey-btn" onClick={() => { if (questionIndex === 0) {return} else {setQuestionIndex(questionIndex - 1); console.log(questionIndex) }}}>Previous</div>
                <div className="btn grey-btn" onClick={() => { if (questionIndex === questions.length - 1) { return } else { setQuestionIndex(questionIndex + 1); } }}>Next</div>
            </div>


        </>
    )
}

function displayQuestion(questions: Question[], ind: number) {

    let question = questions[ind];
    let answers = question ? question.answers : undefined;

    if (questions.length === 0) {
        return (
            <>
                <h2 style={{ display: "flex", justifyContent: "center", marginBottom: "80px"}}>No questions to preview... </h2>
            </>
        )
    } else {
        return (
            <>
                <div>
                    <ul className="list-group wd-modules" style={{ marginRight: "300px" , marginLeft: "300px"}}>
                        <li className="list-group-item" style={{ display: "flex", justifyContent: "center", backgroundColor:"lightgray"}}>
                            <h5 style={{ marginRight: "auto" }}>Question {ind + 1} </h5> <h5>{question.points} points </h5>
                        </li>

                         <li className="list-group-item">
                            <h6>{question.question}</h6>
                        </li>
                    </ul>
                    
                    <ul className="" style={{ marginRight: "300px", marginLeft: "300px", marginTop:"30px" }}>
                        {answers?.map((answer: any) => (
                            <li className="list-group-item">
                                <input type="radio" 
                                name={"choice" + question._id} 
                                id={answer._id} 
                                value={answer.answer}
                                style={{marginRight: "10px", marginBottom: "15px"}}/>

                                <label htmlFor={answer._id}> {answer.answer} </label>
                            </li>
                        ))}
                    </ul>
                </div>


            </>
        )
    }
    
}

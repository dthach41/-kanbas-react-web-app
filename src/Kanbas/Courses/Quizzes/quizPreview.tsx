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


    // holds information on currently selected answer for each question
    const [selectedAnswers, setSelectedAnswers] = useState<any[]>(Array(questions.length).fill([]));
    


    return (
        <>
            <div className="flex-buttons-container" style={{ marginTop: "0px" }}>
                <h4 style={{ marginRight: "auto" }}>{quiz.name} Preview</h4>
            </div>

            <hr style={{ marginRight: "15px" }}></hr>

            <div>
                <ul className="list-group wd-modules" style={{ marginRight: "15px" }}>
                    <ul className="list-group wd-modules" style={{ marginRight: "300px", marginLeft: "300px" }}>
                        {questions.map((question: Question, index) => (
                            <>
                            {displayQuestion(question, index, selectedAnswers, setSelectedAnswers)}
                            </>
                            
                        ))}
                    </ul>
                </ul>
            </div>

            <div className="btn grey-btn" style={{ display: "flex", justifyContent: "center", marginLeft: "500px", marginRight: "500px", marginBottom: "100px"}}
                onClick={() => alert("Score: " + calculateGrade(questions, selectedAnswers) + " Points")}> 
            Submit </div>




        </>
    )
}

function displayQuestion(question: Question, index: number, selectedAnswers: string[], setSelectedAnswers: (answers: any) => void ) {
    if (question.questionType === "Multiple Choice") {
        return (
            <>{displayMultipleChoice(question, index, selectedAnswers, setSelectedAnswers)}</>
        )
    } else if (question.questionType === "True False") {
        return (
            <>{displayTrueFalse(question, index, selectedAnswers, setSelectedAnswers)}</>
        )
    } else{
        return (
            <>{displayFillInBlank(question, index, selectedAnswers, setSelectedAnswers)}</>
        )
    }
}

function displayMultipleChoice(question: Question, questionIndex: number, selectedAnswers: any[], setSelectedAnswers: (answers: any) => void) {
    return (
        <div>
            <ul className="list-group wd-modules" style={{ borderRadius: "0" }}>
                <li className="list-group-item" style={{ display: "flex", justifyContent: "center", backgroundColor: "lightgray" }}>
                    <h5 style={{ marginRight: "auto" }}>Question {questionIndex + 1} </h5> <h5>{question.points} points </h5>
                </li>

                <li className="list-group-item">
                    <h6>{question.question}</h6>
                </li>
            </ul>

            <ul className="list-group-item" style={{ marginBottom: "50px" }}>
                {question.answers?.map((answer: any, index) => (

                    <li className="list-group-item" style={{ borderColor: "white" }}>
                        <input
                            type="radio"
                            name={"choice" + question._id}
                            id={answer._id}
                            style={{ marginRight: "10px", marginBottom: "15px" }}
                            onClick={() => {
                                let newSelectedAnswers = selectedAnswers
                                newSelectedAnswers[questionIndex] = answer.answer
                                setSelectedAnswers(newSelectedAnswers)
                            }}

                        />

                        <label htmlFor={answer._id}> {answer.answer} </label>
                    </li>
                ))}
            </ul>
        </div>
    )
}


function displayTrueFalse(question: Question, questionIndex: number, selectedAnswers: any[], setSelectedAnswers: (answers: any) => void) {
    return (
        <div>
            <ul className="list-group wd-modules" style={{ borderRadius: "0" }}>
                <li className="list-group-item" style={{ display: "flex", justifyContent: "center", backgroundColor: "lightgray" }}>
                    <h5 style={{ marginRight: "auto" }}>Question {questionIndex + 1} </h5> <h5>{question.points} points </h5>
                </li>

                <li className="list-group-item">
                    <h6>{question.question}</h6>
                </li>
            </ul>

            <ul className="list-group-item" style={{ marginBottom: "50px" }}>
                <div>
                    <input
                        type="radio"
                        name={"choice" + question._id}
                        id={question._id + "t"}
                        style={{ marginRight: "10px", margin: "15px" }}
                        onClick={() => {
                            let newSelectedAnswers = selectedAnswers
                            newSelectedAnswers[questionIndex] = "true"
                            setSelectedAnswers(newSelectedAnswers)
                        }} />

                    <label htmlFor={question._id + "t"}> True </label>
                </div>
 

                <div>
                    <input
                        type="radio"
                        name={"choice" + question._id}
                        id={question._id + "f"}
                        style={{ marginRight: "10px", margin: "15px" }}
                        onClick={() => {
                            let newSelectedAnswers = selectedAnswers
                            newSelectedAnswers[questionIndex] = "false"
                            setSelectedAnswers(newSelectedAnswers)
                        }} />

                    <label htmlFor={question._id + "f"}> False </label>
                </div>
                
            </ul>

        </div>
    )
}


function displayFillInBlank(question: Question, questionIndex: number, selectedAnswers: any[], setSelectedAnswers: (answers: any) => void) {
    const numAnswers = question.answers.length
    let currAnswers = Array(numAnswers).fill('')
    return (
        <div>
            <ul className="list-group wd-modules" style={{ borderRadius: "0" }}>
                <li className="list-group-item" style={{ display: "flex", justifyContent: "center", backgroundColor: "lightgray" }}>
                    <h5 style={{ marginRight: "auto" }}>Question {questionIndex + 1} </h5> <h5>{question.points} points </h5>
                </li>

                <li className="list-group-item">
                    <h6>{question.question}</h6>
                </li>
            </ul>

            <ul className="list-group-item" style={{ marginBottom: "50px" }}>
                {question.answers?.map((answer: any, index) => (

                    
                    <li className="list-group-item" style={{ borderColor: "white" }}>
                        <label htmlFor={answer._id} style={{marginRight: "15px"}}> Answer {index + 1}: </label>
                        <input
                            type="text"
                            name={"choice" + question._id}
                            id={answer._id}
                            style={{ marginRight: "10px", marginBottom: "15px" }}
                            onChange={(e) => {
                                let newSelectedAnswers = selectedAnswers
                                currAnswers[index] = e.target.value
                                newSelectedAnswers[questionIndex] = currAnswers
                                setSelectedAnswers(newSelectedAnswers)
                                console.log(selectedAnswers[questionIndex])
                            }}

                        />
                    </li>
                ))}
            </ul>

        </div>
    )
}
     

function calculateGrade(questions: Question[], selectedAnswers: any[]) {
    let score = 0
    for (let i = 0; i < questions.length; i++) {
        const currQuestion = questions[i]
        const answerChoices = currQuestion.answers
        const actualAnswer = selectedAnswers[i]
        //console.log(actualAnswer)

        if (currQuestion.questionType === "True False" || currQuestion.questionType === "Multiple Choice") {
            // Getting the correct answer
            let correctAns = ""
            for (let j = 0; j < answerChoices.length; j++) {
                if (answerChoices[j].correct) {
                    correctAns = answerChoices[j].answer
                    
                }
            }

        
            if (correctAns + '' === actualAnswer + '') {
                score += currQuestion.points
            }

        } 
        else {
             // This is only for case of fill in the blank where there might be multiple answers we need to check
             // we also know that actualAnswer is going to be a list of strings
            if (actualAnswer === undefined) {
                break
            }
            for (let j = 0; j < answerChoices.length; j ++) {
                if (answerChoices[j].answer !== actualAnswer[j]) {
                    break
                } else if (j === answerChoices.length - 1) {
                    score += currQuestion.points
                }
            }
        }

    }
    console.log("Score:", score)
    return score;
}




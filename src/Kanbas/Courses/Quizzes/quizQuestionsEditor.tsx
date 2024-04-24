import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Quiz, Question } from "./client";
import * as client from "./client";
import { FaBan, FaCheckCircle, FaEllipsisV, FaMinus, FaPlus } from "react-icons/fa";
import QuizEditorNav from "./quizEditorNav";




export default function QuizQuestionsEditor() {

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


    const defaultQuestion = {
        _id: '0',
        quizId: quizId + '',
        points: 0,
        questionType: "Multiple Choice",
        question: ' ',
        answers: []
    }

 
    const tempAnswer = {
        _id: "",
        correct: false,
        answer: "New Answer"
    }


    // Adds a new question for this quiz
    const addQuestion = async () => {
        try {
            const newQuestion = await client.addQuestion(defaultQuestion)
            setQuestions([...questions, newQuestion])

        } catch (err) {
            console.log(err);
        }
    }


    // Deletes a question
    const deleteQuestion = async (quesiton: Question) => {
        try {
            await client.deleteQuestion(quesiton)
            setQuestions(questions.filter((qu: Question) => qu._id !== quesiton._id));
        } catch (err) {
            console.log(err)
        }
    }


    // Handles updating of a given question
    const handleChangeQuestions = async (index: number, newQuestion: Question) => {
        await client.updateQuestion(newQuestion)
        const newQuestions = [...questions];
        newQuestions[index] = newQuestion;
        setQuestions(newQuestions);
    };


    // Adds a question for a quiz
    const addAnswer = async (question: Question, answer: { _id: string, correct: boolean, answer: string }) => {
        try {
            let newAnswer = answer
            if (question._id === '0') {
                return;
            }

            if (newAnswer._id === "") {
                newAnswer = {...newAnswer, _id: question._id + "" + question.answers.length + '' }
                
            }


            const newAnswers = [...question.answers, newAnswer] // adds new answer to question.answers

            const newQuestion = {...question, answers: newAnswers}
            const questionIndex = questions.findIndex(q => q._id === newQuestion._id);

            await client.updateQuestion(newQuestion);

            if (questionIndex !== -1) {
                // Create a new array with the replaced question
                const updatedQuestions = [...questions.slice(0, questionIndex), newQuestion, ...questions.slice(questionIndex + 1)];

                // Update the state with the new questions array
                setQuestions(updatedQuestions);
            } 

        } catch (err) {
            console.log(err);
        }
    }

    


    // Deletes answer from given question
    const deleteAnswer = async (question: Question, answerId: string) => {
        try {
            const answersList = question.answers
            const updatedAnswersList = answersList.filter((a: any) => a._id !== answerId)

            const newQuestion = { ...question, answers: updatedAnswersList }
            const questionIndex = questions.findIndex(q => q._id === newQuestion._id);

            await client.updateQuestion(newQuestion);

            if (questionIndex !== -1) {
                // Create a new array with the replaced question
                const updatedQuestions = [...questions.slice(0, questionIndex), newQuestion, ...questions.slice(questionIndex + 1)];

                // Update the state with the new questions array
                setQuestions(updatedQuestions);
            } 

        } catch (e) {
            console.log(e)
        }
    }



    return (
        <>
            <div className="flex-buttons-container" style={{ marginTop: "0px" }}>
                <h4 style={{ marginRight: "auto" }}>{quiz.name} Questions Editor</h4>

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

            <QuizEditorNav/>

            <div>
                <div className="flex-buttons-container" style={{ marginTop: "20px", justifyContent: 'center'}}>
                    <div className="btn red-btn" onClick={ addQuestion } > <FaPlus/> New Question </div>
                </div>

                {/* List of questions */}
                <div className="flex-questions-container" >
                    <ul className="list-group" style={{ margin: 15 }}>
                        {questions.map((question, index) => (
                            <li className="list-group-item" key={index}>
                                <div className="btn red-btn float-end" onClick={() => { deleteQuestion(question) }}> <FaMinus /> </div>
                                <h5>Question {index + 1} </h5>
                                <div>
                                    <textarea value={question.question === ' ' ? "" : question.question} placeholder={question.question === " " ? "Enter Question" : ""}
                                        style={{ width: "100%", height: "70px", marginTop: '7px' }}
                                        onChange={(e) => { 
                                            const newQuesiton = {...question, question: e.target.value}
                                            handleChangeQuestions(index, newQuesiton);
                                        }}/>
                                </div>

                                <div>
                                    <label className="quiz-prop"> Question Type: </label>
                                    <select className="quiz-prop" 
                                    onChange={(e) => {
                                        const newQuesiton = { ...question, questionType: e.target.value, answers: [] }
                                        handleChangeQuestions(index, newQuesiton);
                                    }}>
                                        <option value={question.questionType} selected>{question.questionType}</option>
                                        {question.questionType !== "Multiple Choice" && <option>Multiple Choice</option>}
                                        {question.questionType !== "True False" && <option>True False</option>}
                                        {question.questionType !== "Fill in Blank" && <option>Fill in Blank</option>}
                                    </select>
                                </div>

                                <div>
                                    <label className="quiz-prop"> Points: </label>
                                    <input type="number" value={question.points} style={{width: "100px"}}
                                    onChange={(e) => {
                                        const newQuesiton = { ...question, points: parseInt(e.target.value) }
                                        handleChangeQuestions(index, newQuesiton);
                                    }} />
                                </div>


                                <h5 style={{marginTop: '15px'}}>Answers:</h5>
                                {displayAnswers({ qu: question, questionIndex: index, deleteAnswer: deleteAnswer, handleChangeQuestions: handleChangeQuestions })}
                                <div className="btn grey-btn float-end" 
                                onClick={() => {
                                    if (question.questionType === "True False" && question.answers.length == 1) {
                                        return
                                    } else {
                                        addAnswer(question, tempAnswer)
                                    }
                                }}>
                                     <FaPlus/> Add Answer </div>
                                

                            </li>
                        )) }
                    </ul>
                </div>

            </div>

        </>
    )
}


// Displays the answers for a given question
function displayAnswers({ qu, questionIndex, deleteAnswer, handleChangeQuestions }:
    { qu: Question, questionIndex: number, deleteAnswer: (question: Question, answerId: string) => void, handleChangeQuestions: (index: number, question: Question) => void }) {

        if (qu.questionType === "Multiple Choice") {
            return (
                <>
                    {displayMultipleChoice({ qu: qu, questionIndex: questionIndex, deleteAnswer: deleteAnswer, handleChangeQuestions: handleChangeQuestions })}
                </>
            )
        } else if (qu.questionType === "True False") {
            return (
                <>
                    {displayTrueFalse({ qu: qu, questionIndex: questionIndex, deleteAnswer: deleteAnswer, handleChangeQuestions: handleChangeQuestions })}
                </>
            )
        } else {
            return (
                <>
                    {displayFillInBlank({ qu: qu, questionIndex: questionIndex, deleteAnswer: deleteAnswer, handleChangeQuestions: handleChangeQuestions })}
                </>
            )
        }

    }



// Displays answers if it were a multiple choice type question
function displayMultipleChoice({ qu, questionIndex, deleteAnswer, handleChangeQuestions }:
    { qu: Question, questionIndex: number, deleteAnswer: (question: Question, answerId: string) => void, handleChangeQuestions: (index: number, question: Question) => void}) {

    let answersList = qu.answers
    let result: any[] = []


    const handleChangeAnswers = async (index: number, newAnswer: any) => {
        console.log(newAnswer.correct)
        const newAnswers = [...answersList];
        newAnswers[index] = newAnswer;
        const newQuestion = {...qu, answers: newAnswers}
        handleChangeQuestions(questionIndex, newQuestion)
    }


    for (let i = 0; i < answersList.length; i++) {
        let answer = answersList[i];

        result.push(
            <li className="list-group-item">
                <div>
                    <label className="quiz-prop" style={{ marginTop: '10px' }}> Answer: </label>
                    <input className="quiz-prop" value={answer.answer}
                     onChange={(e) => {
                        const newAnswer = {...answer, answer: e.target.value}
                        handleChangeAnswers(i, newAnswer)
                    }} />
                </div>

                <div>
                    <label className="quiz-prop"> Correct: </label>
                    <input className="quiz-prop" type="checkbox" checked={answer.correct}
                        onChange={() => {
                            const newAnswer = { ...answer, correct: !answer.correct }
                            handleChangeAnswers(i, newAnswer)
                        }}
                    />
                </div>

                

                <div>
                    <div className="btn red-btn" style={{ marginTop: "10px" }} onClick={() => { deleteAnswer(qu, answer._id) }}>Delete</div>
                </div>
            </li>
        );
    }
    return <div style={{marginBottom: '15px'}}>{result}</div>;
}


// Displays answers if it were a true/false type question
function displayTrueFalse({ qu, questionIndex, deleteAnswer, handleChangeQuestions }:
    { qu: Question, questionIndex: number, deleteAnswer: (question: Question, answerId: string) => void, handleChangeQuestions: (index: number, question: Question) => void }) {

    let answersList = qu.answers
    let result: any[] = []


    const handleChangeAnswers = async (index: number, newAnswer: any) => {
        const newAnswers = [...answersList];
        newAnswers[index] = newAnswer;
        const newQuestion = { ...qu, answers: newAnswers }
        handleChangeQuestions(questionIndex, newQuestion)
    }


    // answersList.length will always be 1 in this case be
    for (let i = 0; i < answersList.length; i++) {
        let answer = answersList[i];

        result.push(
            <li className="list-group-item">
                <div>
                    <label className="quiz-prop"> Answer: </label>
                    <select className="quiz-prop"
                        onChange={(e) => {
                            console.log(e.target.value)
                            const newAnswer = { ...answer, answer: e.target.value }
                            handleChangeAnswers(i, newAnswer)
                        }}>
                        <option value="true" selected={answer.answer === "true" || answer.answer === "New Answer"}>True</option>
                        <option value="false" selected={answer.answer === "false"}>False</option>

                    </select>
                </div>

            </li>
        );
    }

    return <div style={{ marginBottom: '15px' }}>{result}</div>;
}


// Displays answers if it were a fill in the blank type question
function displayFillInBlank({ qu, questionIndex, deleteAnswer, handleChangeQuestions }:
    { qu: Question, questionIndex: number, deleteAnswer: (question: Question, answerId: string) => void, handleChangeQuestions: (index: number, question: Question) => void }) {
    let answersList = qu.answers
    let result: any[] = []


    const handleChangeAnswers = async (index: number, newAnswer: any) => {
        const newAnswers = [...answersList];
        newAnswers[index] = newAnswer;
        const newQuestion = { ...qu, answers: newAnswers }
        handleChangeQuestions(questionIndex, newQuestion)
    }


    for (let i = 0; i < answersList.length; i++) {
        let answer = answersList[i];

        result.push(
            <li className="list-group-item">
                <div>
                    <label className="quiz-prop" style={{ marginTop: '10px' }}> Answer: </label>
                    <input className="quiz-prop" value={answer.answer}
                        onChange={(e) => {
                            const newAnswer = { ...answer, answer: e.target.value, correct: true }
                            handleChangeAnswers(i, newAnswer)
                        }} />
                </div>


                <div>
                    <div className="btn red-btn" style={{ marginTop: "10px" }} onClick={() => { deleteAnswer(qu, answer._id) }}>Delete</div>
                </div>
            </li>
        );
    }
    return <div style={{ marginBottom: '15px' }}>{result}</div>;
}

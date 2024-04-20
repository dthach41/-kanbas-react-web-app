import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Quiz, Question } from "./client";
import * as client from "./client";
import { FaBan, FaCheckCircle, FaEllipsisV, FaPlus } from "react-icons/fa";
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
        fetchQuestions();
        fetchQuiz();
        
    }, []);

    const tempQuestion = {
        _id: '0',
        quizId: quizId + '',
        quizType: "Multiple Choice",
        question: 'New Question',
        answers: []
    }

    const tempAnswer = {
        _id: "",
        correct: true,
        answer: "Temp Question"
    }



    const addQuestion = async (qu: Question) => {
        try {
            const newQuestions = [...questions, qu]
            setQuestions(newQuestions)
            await client.addQuestion(qu)

        } catch (err) {
            console.log(err);
        }
    }

    const addAnswer = async (question: Question, answer: { _id: string, correct: boolean, answer: string }) => {
        try {
            let newAnswer = answer
            if (question._id === '0') {
                return;
            }

            console.log(question._id)
            if (newAnswer._id === "") {
                newAnswer = {...newAnswer, _id: question._id + "" + question.answers.length + '' }
                
            }

            //console.log(newAnswer._id)

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
                    <div className="btn grey-btn" onClick={ () => {addQuestion(tempQuestion)} } > <FaPlus/> New Question </div>
                </div>

                {/* List of questions */}
                <div className="flex-questions-container" >
                    <ul className="list-group" style={{ margin: 15 }}>
                        {questions.map((question) => (
                            <li className="list-group-item" >
                                <h5>Question: {question._id}</h5>
                                <div>
                                    <textarea value={question.question} style={{ width: "100%", height: "70px", marginTop: '7px' }} />
                                </div>
                                <div>
                                    
                                </div>
                                <h5 style={{marginTop: '15px'}}>Answers:</h5>
                                {displayAnswers(question.answers)}
                                <div className="btn grey-btn float-end" onClick={() => {addAnswer(question, tempAnswer)}}> <FaPlus/> Add Answer </div>
                                

                            </li>
                        )) }
                    </ul>
                </div>



            </div>

        </>
    )
}


function displayAnswers(answersList: { _id: string, correct: boolean, answer: string }[]) {
    let result: any[] = []

    // changes answer.delete to true
    const deleteAnswer = (ans: { delete: boolean, correct: boolean, answer: string }) => {
        try {
            ans.delete = true
            console.log(ans.delete)
        } catch(e) {
            console.log(e)
        }
    }

    for (let i = 0; i < answersList.length; i++) {
        let answer = answersList[i];

        result.push(
            <li className="list-group-item">
                <div>Correct: {answer.correct + ''}, Answer: {answer.answer}, id: {answer._id} </div>
                <div className="btn red-btn" style={{ marginTop: "10px" }} onClick={() => {  }}>Delete</div>
            </li>
        );
    }
    return <div style={{marginBottom: '15px'}}>{result}</div>;
}

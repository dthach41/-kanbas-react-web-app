import axios from "axios";

export const API_BASE = process.env.REACT_APP_BASE_API;
export const QUIZZES_API = `${API_BASE}/api/quizzes`;


export interface Question {
    _id: string;
    quizId: string;
    points: number;
    questionType: string;
    question: string;
    answers: {_id: string, correct: boolean; answer: string }[];
}

export interface Quiz {
    _id: string, courseId: string; name: string; available: string;
    due: string, points: string, open: boolean, questions: number,
    published: boolean, assignmentGroup: string, description: string,
    shuffleAnswers: boolean, timeLimit: string, multipleAttempts: boolean,
    showCorrectAnswers: boolean, accessCode: string, oneQuestionAtTime: boolean,
    webcamRequired: boolean, lockQuestionsAfterAnswering: boolean, untilDate: string,
    quizType: string
};

export const findAllQuizzes = async () => {
    const response = await axios.get(`${QUIZZES_API}`);
    return response.data
};

export const findQuizzesForCourse = async (courseId?: string) => {
    const response = await axios.get(`${QUIZZES_API}/${courseId}`);
    return response.data;
};

export const findQuizById = async (quizId: string) => {
    const response = await axios.get(`${QUIZZES_API}/quiz/${quizId}`);
    return response.data;
};

export const addQuiz = async (quiz: any) => {
    const response = await axios.post(`${QUIZZES_API}/addQuiz`, quiz);
    return response.data;
};

export const deleteQuiz = async (quiz: any) => {
    const response = await axios.delete(`${QUIZZES_API}/${quiz._id}`);
    return response.data;
}

export const updateUser = async (user: any) => {
};

export const updateQuiz = async (quiz: Quiz) => {
    const response = await axios.put(`${QUIZZES_API}/${quiz._id}`, quiz);
    return response.data; 
}

export const findQuestionsForQuiz = async (quizId?: string) => {
    const response = await axios.get(`${QUIZZES_API}/quizQuestions/${quizId}`);
    return response.data;
}

export const addQuestion = async (question: Question) => {
    const response = await axios.post(`${QUIZZES_API}/quizQuestions`, question)
    return response.data;
}

export const updateQuestion = async (question: Question) => {
    const response = await axios.put(`${QUIZZES_API}/quizQuestions/${question._id}`, question);
    return response.data;
}

export const deleteQuestion = async (question: any) => {
    const response = await axios.delete(`${QUIZZES_API}/quizQuestions/${question._id}`);
    return response.data;
}
import axios from "axios";

export const API_BASE = process.env.REACT_APP_BASE_API;
export const QUIZZES_API = `${API_BASE}/api/quizzes`;


interface Question {
    question: string;
    answer: string;
}

export interface Quiz {
    _id: string, courseId: string; name: string; available: string;
    due: string, points: string, open: boolean, questions: Question[]
};

export const findAllQuizzes = async () => {
    const response = await axios.get(`${QUIZZES_API}`);
    return response.data
};

export const findQuizzesForCourse = async (courseId?: string) => {
    const response = await axios.get(`${QUIZZES_API}/${courseId}`);
    return response.data;
};

export const addQuiz = async (quiz: any) => {
    const response = await axios.post(`${QUIZZES_API}/addQuiz`, quiz);
    return response.data;
};
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE;
const COURSES_API = `${API_BASE}/api/courses`;

export const findQuizesForCourse = async (courseId?: string) => {
    const response = await axios
        .get(`${COURSES_API}/${courseId}/quizzes`);
    return response.data;
};
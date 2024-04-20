import { createSlice } from "@reduxjs/toolkit";
import { Quiz } from "./client";

const initialState = {
    quizList: [] as Quiz[],
    quiz: {
        _id: "100",
        courseId: '0',
        name: "New Quiz",
        description: "",
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
        quizType: "Graded Quiz",
    },
};


const quizzesSlice = createSlice({
    name: "quizList",
    initialState,
    reducers: {
        addQuiz: (state, action) => {
            state.quizList = [...state.quizList, action.payload];
        },
        setQuizList: (state, action) => {
            state.quizList = action.payload;
        },
    }
});

export const { addQuiz } = quizzesSlice.actions;
export default quizzesSlice.reducer;
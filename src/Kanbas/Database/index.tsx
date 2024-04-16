import courses from "./courses.json";
import modules from "./modules.json";
import coursesTodos from "./coursesTodos.json";
import assignments from "./assignments.json";
import quizzes from "./quizzes.json";

const db = { courses, coursesTodos, modules, assignments, quizzes }

export { courses, coursesTodos, modules, assignments, quizzes };
export default db;
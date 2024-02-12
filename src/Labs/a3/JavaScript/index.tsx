
import VariablesAndConstants
    from "./variables/VariablesAndConstants";
import VariableTypes from "./variables/VariablesTypes";
import BooleanTypes from "./variables/BooleanVariables"
import IfElseExample from "./conditionals/IfElse";
import TernaryOperator from "./conditionals/TernaryOperator";
import AddedNums from "./functions/ES5Functions"
import ArrowFunctionExample from "./functions/ArrowFunctions";
import ImpliedReturnExample from "./functions/ImpliedReturn"
import FunctionParenthesisAndParameters from "./functions/FunctionParenthesisAndParameters";

function JavaScript() {
    console.log('Hello World!');
    return (
        <div>
            <h1>JavaScript</h1>
            <VariablesAndConstants />
            <VariableTypes />
            <BooleanTypes />
            <IfElseExample />
            <TernaryOperator />
            <AddedNums />
            <ArrowFunctionExample />
            <ImpliedReturnExample />
            <FunctionParenthesisAndParameters />
        </div>
    );
}


export default JavaScript
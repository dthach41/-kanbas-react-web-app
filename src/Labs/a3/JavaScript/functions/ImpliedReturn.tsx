
function ImpliedReturnExample() {
    const multiply = (a: number, b: number) => a * b;
    const fourTimesFive = multiply(4, 5);
    console.log(fourTimesFive);

    return (
        <>
            <h2>Implied Return</h2>
            fourTimesFive = {fourTimesFive} <br/>
            multiply(4, 5) = {fourTimesFive}
        </>
    
    );
}

export default ImpliedReturnExample;
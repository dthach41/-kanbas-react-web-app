
import ModuleList from "../Modules/List";
import Status from "./status";

function Home() {
    return (
        <div >
            <h2>Home</h2>
            <div className="d-flex" >
                <div style={{ flexGrow: 1 }}>
                    <ModuleList />
                </div>

                <div >
                    <Status />
                </div>
            </div>
        </div>
    );
}
export default Home;
import { FaBell, FaBullhorn, FaBullseye, FaChartBar, FaCreativeCommons, FaFileImport } from "react-icons/fa";
import "./index.css";

function Status() {

    return (
        <div className="flex-grow-0 me-2 d-none d-lg-block" style={{marginLeft: "25px"}}>
            <div>
                <div style={{width: "250px", marginLeft: "20px"}}>
                    <div className="list-group">
                        <button className="btn status-btn"> <FaFileImport /> Import Existing Content</button>
                        <button className="btn status-btn"> <FaCreativeCommons /> Import From Commons</button>
                        <button className="btn status-btn"> <FaBullseye /> Choose Home Page</button>
                        <button className="btn status-btn"> <FaChartBar /> View Course Stream</button>
                        <button className="btn status-btn"> <FaBullhorn /> New Announcement</button>
                        <button className="btn status-btn"> <FaChartBar /> New Analytics</button>
                        <button className="btn status-btn"> <FaBell /> View Course Notifications</button>
                    </div>
                </div>
            </div>
            
            <div style={{marginTop: "20px", marginLeft: "20px"}}>
                <h3>To Do</h3>
            </div>

            <hr></hr>
            <div>
                {/* To Do List Here */}
            </div>

        </div>
    )

}

export default Status;
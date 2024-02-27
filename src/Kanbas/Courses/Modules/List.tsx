import React, { useState } from "react";
import "./index.css";
import { modules } from "../../Database";
import { FaEllipsisV, FaCheckCircle, FaPlusCircle, FaPlus } from "react-icons/fa";
import { useParams } from "react-router";

function ModuleList() {
    const { courseId } = useParams();
    const modulesList = modules.filter((module) => module.courseId === courseId);
    const [selectedModule, setSelectedModule] = useState(modulesList[0]);
    return (
        <>
            {
                <div className="flex-buttons-container" style={{marginTop: "0px"}}>
                    <div className="btn modules-button">Collapse All</div>
                    <div className="btn modules-button">View Progress</div>
                    <div className="btn modules-button">Publish All <FaCheckCircle /> </div>
                    <div className="btn modules-button-red"><FaPlus /> Module</div>
                    <div className="btn modules-button"><FaEllipsisV /> </div>
                </div>
            }
            
            <hr style={{ marginRight: "15px" }}></hr>
            
            <ul className="list-group wd-modules" style={{marginRight: "15px"}}>
                {modulesList.map((module) => (
                    <li className="list-group-item" onClick={() => setSelectedModule(module)}>
                        <div style={{ marginBottom: "10px" }} >
                            <FaEllipsisV className="me-2" />
                            {module.name}
                            <span className="float-end">
                                <FaCheckCircle className="text-success" />
                                <FaPlusCircle className="ms-2" />
                                <FaEllipsisV className="ms-2" />
                            </span>
                        </div>

                        {selectedModule._id === module._id && (
                            <ul className="list-group">
                                {module.lessons?.map((lesson) => (
                                    <li className="list-group-item">
                                        <FaEllipsisV className="me-2" />
                                        {lesson.name}
                                        <span className="float-end">
                                            <FaCheckCircle className="text-success" />
                                            <FaEllipsisV className="ms-2" />
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </>
    );
}
export default ModuleList;
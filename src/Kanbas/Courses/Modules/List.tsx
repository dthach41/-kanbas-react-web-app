import React, { useState } from "react";
import "./index.css";
import { modules } from "../../Database";
import { FaEllipsisV, FaCheckCircle, FaPlusCircle, FaPlus, FaMinus, FaMinusCircle, FaPen } from "react-icons/fa";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import {
    addModule,
    deleteModule,
    updateModule,
    setModule,
} from "./reducer";
import { KanbasState } from "../../store";

function ModuleList() {
    const { courseId } = useParams();
    const modulesList = modules.filter((module) => module.courseId === courseId);
    const [selectedModule, setSelectedModule] = useState(modulesList[0]);


    // const module = useSelector((state: KanbasState) => { state.modulesReducer.module });

    const tempMod = {
        name: "New Module",
        description: "New Description",
        courseId: courseId,
        _id: 0
    }


    const moduleList = useSelector((state: KanbasState) =>
        state.modulesReducer.modules);

    const module = useSelector((state: KanbasState) =>
        state.modulesReducer.module);
    
    const dispatch = useDispatch();
    

    return (
        <>
            {
                <div className="flex-buttons-container" style={{ marginTop: "0px" }}>
                    <div className="btn modules-button">Collapse All</div>
                    <div className="btn modules-button">View Progress</div>
                    <div className="btn modules-button">Publish All <FaCheckCircle /> </div>
                    <div className="btn modules-button-red"><FaPlus /> Module</div>
                    <div className="btn modules-button"><FaEllipsisV /> </div>
                </div>
            }

            <hr style={{ marginRight: "15px" }}></hr>

            <ul className="list-group wd-modules" style={{ marginRight: "15px" }}>

                {/* Modules Editing Buttons */}
                <div className="flex-buttons-container">
                    <button className="btn add-button" onClick={() => dispatch(addModule({ ...module, courseId: courseId }))}>Add <FaPlus /> </button>
                    <button className="btn add-button" onClick={() => dispatch(updateModule(module))}>Update <FaPen/> </button>

                </div>


                <input value={module.name} className="form-control module-menu-input"
                    onChange={(e) =>
                        dispatch(setModule({ ...module, name: e.target.value }))
                    }
                />
                <textarea value={module.description} className="form-control module-menu-input"
                    onChange={(e) =>
                        dispatch(setModule({ ...module, description: e.target.value }))
                    }
                />

                <hr style={{marginBottom: "25px"}}/>


                {moduleList.filter((module) => module.courseId === courseId).map((module, index) => (
                    <li key={index} className="list-group-item" onClick={() => setSelectedModule(module)}>
                        <div style={{ marginBottom: "10px", display: "flex", alignItems: "flex-start" }} >
                            <FaEllipsisV className="me-2" />
                            {module.description === "" ? (
                                <>
                                {module.name}
                                
                                </>
                            ) : (
                                <>{module.name} <br/> {module.description}</>
                            )}

                            <span className="ms-auto" style={{}}>
                                {/* <FaCheckCircle className="text-success" />
                                <FaPlusCircle className="ms-2" />
                                <FaEllipsisV className="ms-2" /> */}
                                <button className="module_small_btn ms-1" style={{color: 'red'}} onClick={() => dispatch(deleteModule(module._id))}><FaMinusCircle style={{marginBottom:'3px'}}/> </button>
                                <button className="module_small_btn ms-2" onClick={() => dispatch(setModule(module))}> <FaPen style={{ marginBottom: '3px' }} /></button>
                            </span>
                        </div>

                        {selectedModule._id === module._id && (
                            <ul className="list-group">
                                {module.lessons?.map((lesson: { name: string | number | boolean }) => (
                                    <li className="list-group-item">
                                        <FaEllipsisV className="me-2" />
                                        {lesson.name}
                                        <span className="float-end">
                                            {/* <FaCheckCircle className="text-success" />
                                            <FaEllipsisV className="ms-2" /> */}
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
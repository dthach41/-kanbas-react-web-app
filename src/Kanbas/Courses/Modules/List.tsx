import React, { useState } from "react";
import "./index.css";
import { modules } from "../../Database";
import { FaEllipsisV, FaCheckCircle, FaPlusCircle, FaPlus, FaMinus, FaMinusCircle, FaPen } from "react-icons/fa";
import { useParams } from "react-router";

function ModuleList() {
    const { courseId } = useParams();
    const modulesList = modules.filter((module) => module.courseId === courseId);
    const [moduleList, setModuleList] = useState<any[]>(modules);

    const [selectedModule, setSelectedModule] = useState(modulesList[0]);

    const [module, setModule] = useState({
        name: "New Module",
        description: "New Description",
        courseId: courseId,
        _id: 0
    });

    const addModule = (module: any) => {
        const newModule = {
            ...module,
            _id: new Date().getTime().toString()
        };
        const newModuleList = [newModule, ...moduleList];
        setModuleList(newModuleList);
    };


    const deleteModule = (moduleId: string) => {
        const newModuleList = moduleList.filter(
            (module) => module._id !== moduleId);
        setModuleList(newModuleList);
    };

    const updateModule = () => {
        const newModuleList = moduleList.map((m) => {
            if (m._id === module._id) {
                return module;
            } else {
                return m;
            }
        });
        setModuleList(newModuleList);
    };



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
                    <button className="btn add-button" onClick={() => { addModule(module) }}>Add <FaPlus /> </button>
                    <button className="btn add-button" onClick={updateModule}>Update <FaPen/> </button>

                </div>


                <input value={module.name} className="form-control module-menu-input"
                    onChange={(e) => setModule({
                        ...module, name: e.target.value
                    })}
                />
                <textarea value={module.description} className="form-control module-menu-input"
                    onChange={(e) => setModule({
                        ...module, description: e.target.value
                    })}
                />

                <hr style={{marginBottom: "25px"}}/>


                {moduleList.filter((module) => module.courseId === courseId).map((module, index) => (
                    <li key={index} className="list-group-item" onClick={() => setSelectedModule(module)}>
                        <div style={{ marginBottom: "10px" }} >
                            <FaEllipsisV className="me-2" />
                            {module.description === "" ? (
                                // WORKING ON THIS RIGHT HERE ---------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
                                <>{module.name}</>
                            ) : (
                                <>{module.name} <br/> {module.description}</>
                            )}

                            <span className="float-end">
                                <FaCheckCircle className="text-success" />
                                <FaPlusCircle className="ms-2" />
                                <FaEllipsisV className="ms-2" />
                                <button className="module_small_btn ms-1" style={{color: 'red'}} onClick={() => deleteModule(module._id)}><FaMinusCircle /> </button>
                                <button className="module_small_btn ms-2" onClick={(event) => { setModule(module); }}> <FaPen/></button>
                            </span>
                        </div>

                        {selectedModule._id === module._id && (
                            <ul className="list-group">
                                {module.lessons?.map((lesson: { name: string | number | boolean }) => (
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
import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./index.css";
import { FaTachometerAlt, FaRegUserCircle, FaBook, FaRegCalendarAlt, FaNeos, FaInbox, FaClock, FaTv, FaCreativeCommons, FaQuestionCircle } from "react-icons/fa";

function KanbasNavigation() {
    const links = [
        { label: " ", icon: <FaNeos className="fs-2" />, id: "neu"},
        { label: "Account", icon: <FaRegUserCircle className="fs-2 " style={{ color: "grey" }} /> },
        { label: "Dashboard", icon: <FaTachometerAlt className="fs-2" /> },
        { label: "Courses", icon: <FaBook className="fs-2" /> },
        { label: "Calendar", icon: <FaRegCalendarAlt className="fs-2" /> },
        { label: "Inbox", icon: <FaInbox className="fs-2" /> },
        { label: "History", icon: <FaClock className="fs-2" /> },
        { label: "Studio", icon: <FaTv className="fs-2" /> },
        { label: "Commons", icon: <FaCreativeCommons className="fs-2" /> },
        { label: "Help", icon: <FaQuestionCircle className="fs-2" /> }
        
    ];
    const { pathname } = useLocation();
    return (
        <ul className="wd-kanbas-navigation">
            {links.map((link, index) => (
                <li key={index} className={pathname.includes(link.label) ? "wd-active" : ""}>
                    { }
                    <Link to={ link.label === " " ? "https://www.northeastern.edu/" : `/Kanbas/${link.label}` }>
                         {link.icon}
                         <br/>
                        <span className={pathname.includes(link.label) ? "label-active" : "label-default"}>{link.label}</span>
                    </Link>
                </li>
            ))}
        </ul>
    );
}

function DetermineLink(label: string) {
    
}



export default KanbasNavigation;
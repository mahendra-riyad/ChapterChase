import React from "react";
import Menu from "./Menu";
import "../styles.css";

const Layout = ({
    title = "ChapterChase",
    description = "Experience the Magic of Books Online",
    className,
    children
}) => (
    <div>
        <Menu />
        <div className="jumbotron">
            <h2>{title}</h2>
            <p className="lead">{description}</p>
        </div>
        <div className={className}>{children}</div>
    </div>
);

export default Layout;
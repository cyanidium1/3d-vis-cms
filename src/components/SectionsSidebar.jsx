import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectMenu } from "../redux/menuSlice";
import { Button } from "@mui/material";
import MenuOpenIcon from '@mui/icons-material/MenuOpen';

const SectionsSidebar = ({ scrollToSection }) => {
    const [display, setDisplay] = useState(true)
    const menuData = useSelector(selectMenu);
    const { sections } = menuData;

    return (
        <div style={{ position: "fixed", top: "30%", left: 0 }}>
            <Button onClick={() => { setDisplay(!display) }}>
                <MenuOpenIcon />
            </Button>

            {
                display && <ul style={{ width: "200px", backgroundColor: "#f0f0f0", padding: "10px" }}>
                    {sections &&
                        sections.map(({ name }) => (
                            <li key={name} style={{ cursor: "pointer" }} onClick={() => scrollToSection(name)}>
                                {name}
                            </li>
                        ))}
                    <a href="#bottom">В самый низ</a>
                </ul>
            }
        </div>
    );
};

export default SectionsSidebar;

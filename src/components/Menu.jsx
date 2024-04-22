import React, { useRef } from "react";
import { Container } from "@mui/material";
import MenuSection from "./MenuSection";
import { useSelector } from "react-redux";
import { selectMenu } from "../redux/menuSlice";
import SectionsSidebar from "./SectionsSidebar";
import AddSection from './AddSection'

const Menu = () => {
  const menuData = useSelector(selectMenu);
  const { sections } = menuData;

  const sectionRefs = useRef({});

  const scrollToSection = (sectionName) => {
    if (sectionRefs.current[sectionName]) {
      sectionRefs.current[sectionName].scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <>
      <SectionsSidebar scrollToSection={scrollToSection} />
      <Container maxWidth="xl" sx={{ marginBottom: "60px" }}>
        {sections &&
          sections.map(({ name, items }) => (
            <div key={name} ref={(ref) => (sectionRefs.current[name] = ref)}>
              <MenuSection name={name} items={items} />
            </div>
          ))}
        <AddSection />
        <div id='bottom'></div>
      </Container>
    </>
  );
};

export default Menu;

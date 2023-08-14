import React, { createContext, useEffect, useState } from "react";
import { getAllCourses } from "./assignmentDetails";

const CourseContext = createContext();

export function CourseProvider({ children }) {
  const [courses, setCourses] = useState();

  async function getCourses() {
    console.log("started course load");
    const data = await getAllCourses();
    console.log(data);
    setCourses(data);
  }

  useEffect(() => {
    getCourses();
  }, []);

  if (!courses) return <>Loading...</>;

  return (
    <CourseContext.Provider value={{ courses, getCourses }}>
      {children}
    </CourseContext.Provider>
  );
}

export default CourseContext;

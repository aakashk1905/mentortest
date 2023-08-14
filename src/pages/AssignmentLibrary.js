import React, { useContext, useEffect, useState } from "react";
import {
  fetchAssignments,
  getAllCourses,
  getCourses,
} from "../utils/assignmentDetails";
import styles from "../styles/AssignmentLibrary.module.css";
import CreateAss from "../components/assignment/CreateAss";
import { useNavigate } from "react-router";
import CourseContext from "../utils/CoursesContext";

const AssignmentLibrary = () => {
  const [assignments, setAssignments] = useState();
  const [showCreate, setShowCreate] = useState(false);
  const [onlyQues, setOnlyQues] = useState(false);
  const navigate = useNavigate();
  const { courses } = useContext(CourseContext);
  console.log(courses);

  // const courses = getAllCourses();
  // const [courses, setCourses] = useState();
  // useEffect(() => {
  //   // setCourses(getCourses());
  //   setCourses(courses);
  // }, []);

  useEffect(() => {
    console.log("started fetch assignments");
    fetchAssignments().then((subs) => {
      console.log(subs);
      setAssignments(subs);
    });
  }, []);

  return assignments ? (
    <div>
      <div className={styles.top}>
        <select
          onChange={(e) => {
            if (e.target.value === "") {
              navigate("/mentor/assignments");
            } else {
              navigate("/mentor/assignments/" + e.target.value);
            }
          }}
        >
          <option value="">Select Course</option>
          {courses.map((course, ind) => (
            <option key={ind} value={course._id}>
              {course.course_name}
            </option>
          ))}
        </select>
        <div>
          <button
            style={{ marginRight: ".5rem" }}
            onClick={() => {
              setOnlyQues(false);
              setShowCreate(true);
            }}
          >
            Add Assignment
          </button>
          <button
            onClick={() => {
              setOnlyQues(true);
              setShowCreate(true);
            }}
          >
            Add Question
          </button>
        </div>
      </div>
      <div className={styles.stat}>
        <p>Total Assignments</p>
        <h3>1.6k</h3>
      </div>
      <div className={styles.main}>
        <h2>Latest Assignments</h2>
        <table>
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>Course</th>
              <th>Uploaded By</th>
              <th>Uploaded On</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((data, ind) => (
              <tr key={ind} className={styles.submission}>
                <td>{ind + 1}</td>
                <td>{data.course}</td>
                <td>{data.uploadedBy}</td>
                <td>{data.uploadDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <CreateAss
        shown={showCreate}
        onlyQues={onlyQues}
        closeHandler={() => {
          setShowCreate(false);
        }}
      />
    </div>
  ) : (
    "Loading"
  );
};

export default AssignmentLibrary;

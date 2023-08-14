import React, { useContext, useEffect, useState } from "react";
import { fetchAssignments, getCourses } from "../utils/assignmentDetails";
import styles from "../styles/AssignmentLibraryCourse.module.css";
import CreateAss from "../components/assignment/CreateAss";
import { useNavigate, useParams } from "react-router";
import CourseContext from "../utils/CoursesContext";
import AssignmentListItem from "../components/assignment/AssignmentListItem";

const AssignmentLibratyCourse = () => {
  const { course } = useParams();
  const navigate = useNavigate();

  const [assignments, setAssignments] = useState();
  const [showCreate, setShowCreate] = useState(false);

  const [onlyQues, setOnlyQues] = useState(false);
  const { courses } = useContext(CourseContext);

  const [currentPage, setCurrentPage] = useState(1);

  // const courses = useMemo(() => getCourses(), []);
  // const [courses, setCourses] = useState();
  const [currCourse, setCurrCourse] = useState();
  // useEffect(() => {
  //   setCourses(getCourses());
  // }, []);

  useEffect(()=>{
    console.log("First useEffect");
    // if (!courses) return;

    setCurrCourse(courses.find((val) => val._id === course));
    loadAssignments();
  })
  useEffect(() => {
    if (!courses) return;

    setCurrCourse(courses.find((val) => val._id === course));
  }, [course, courses]);

  useEffect(() => {
    loadAssignments();
  }, [currCourse, currentPage]);

  const loadAssignments = () => {
    console.log("Loading assignments");
    fetchAssignments(course,currentPage).then((subs) => {
      setAssignments(subs);
    });
  };

  // console.log(course);

  // return assignments && courses ? (
    return assignments ? (
    <div>
      <div className={styles.top}>
        <aside>
          <h3>{currCourse.course_name}</h3>
          <p>
            Total Assignments - <span>{assignments.length}</span>
          </p>
        </aside>
        <div>
          <select
            value={course}
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
      </div>
      <div className={styles.search}>
        <label>
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.5 11H11.71L11.43 10.73C12.41 9.59 13 8.11 13 6.5C13 2.91 10.09 0 6.5 0C2.91 0 0 2.91 0 6.5C0 10.09 2.91 13 6.5 13C8.11 13 9.59 12.41 10.73 11.43L11 11.71V12.5L16 17.49L17.49 16L12.5 11ZM6.5 11C4.01 11 2 8.99 2 6.5C2 4.01 4.01 2 6.5 2C8.99 2 11 4.01 11 6.5C11 8.99 8.99 11 6.5 11Z"
              fill="#434343"
            />
          </svg>
          <input placeholder="search topics" />
        </label>
      </div>
      <div className={styles.main}>
        <h2>All Assignments</h2>
        <div className={styles.table}>
          <div className={styles.head}>
            <p>Sr. No.</p>
            <p>Topic</p>
            <p>Questions</p>
            <p>Action</p>
          </div>
          {assignments.map((data, ind) => (
            <AssignmentListItem
              data={data}
              number={ind}
              reload={() => {
                setAssignments();
                loadAssignments();
              }}
              course={currCourse.course_name}
              topic={data.topic}
            />
          ))}
        </div>


      </div>
      <CreateAss
        shown={showCreate}
        _course={course}
        onlyQues={onlyQues}
        reload={() => {
          setAssignments();
          loadAssignments();
        }}
        closeHandler={() => {
          setShowCreate(false);
        }}
      />
    </div>
  ) : (
    "Loading"
  );
};

export default AssignmentLibratyCourse;

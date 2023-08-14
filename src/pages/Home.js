import React, { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import styles from "../styles/Home.module.css";
import {
  fetchSubmissions,
  filterStudents,
  getAllCourses,
  getPercentage,
} from "../utils/assignmentDetails";
import CourseContext from "../utils/CoursesContext";

const Home = () => {
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState();
  const [students, setStudents] = useState();

  const { courses } = useContext(CourseContext);

  useEffect(() => {
    fetchSubmissions().then((subs) => {
      setSubmissions(subs);
    });
  }, []);

  useEffect(() => {
    if (!submissions) return;
    // console.log(submissions);

    filterStudents(submissions.data).then((students) => {
      // console.log(students);
      if (students.length > 0) {
        setStudents(students);
      }
    });

    // getStudents(submissions).then((s) => {
    //   setStudents(s);
    // });
  }, [submissions]);

  const getStudents = async (submissions) => {
    let students = filterStudents(submissions.data);
    await students.forEach(async (s, ind) => {
      const p = await getPercentage(s.id);
      students[ind] = { ...students[ind], progress: p };
    });
    return students;
  };

  return students ? (
    <div>
      <div className={styles.filters}>
        <select>
          <option>26 Aug, 2022</option>
          <option>26 Aug, 2022</option>
          <option>26 Aug, 2022</option>
        </select>
        <select
          onChange={(e) => {
            if (e.target.value === "") return;

            navigate(`/mentor/${e.target.value}`);
          }}
        >
          <option value="">Select Course</option>
          {courses.map((course, ind) => (
            <option key={ind} value={course._id}>
              {course.course_name}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.main}>
        <h2>Latest Assignment Submissions</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Course</th>
              <th>Assignment Progress</th>
              <th>Enrolled Date</th>
              <th>Email ID</th>
            </tr>
          </thead>
          <tbody>
            {students.map((data, ind) => (
              <tr
                key={ind}
                className={styles.submission}
                onClick={() => {
                  navigate("/" + data.assignmentId);
                }}
              >
                <td>{data.name}</td>
                <td>{data.subject}</td>
                <td>
                  <div className="progress">
                    <div
                      style={{
                        width: `${50 + data.progress * 50}%`,
                      }}
                    >
                      {data.progress * 100}%
                    </div>
                  </div>
                  <span>{data.progress * 100} / 100</span>
                </td>
                <td>{data.enrollDate ? data.enrollDate : "23 Aug 22"}</td>
                <td>{data.id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ) : (
    "Loading"
  );
};

export default Home;

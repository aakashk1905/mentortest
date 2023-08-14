import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import CompletedViewCard from "../components/CompletedViewCard";
import SubmissionView from "../components/SubmissionView";
import styles from "../styles/Assignment.module.css";
import {
  fetchCourseSubmissions,
  fetchUnrevSubmissions,
} from "../utils/assignmentDetails";
import CourseContext from "../utils/CoursesContext";
import DatePickerButton from "../utils/DatePicker";

const Assignment = () => {
  const { course } = useParams();
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState();
  const [fetchedSubmissions, setFetchSubmissions] = useState();
  const courseId = parseInt(course);
  const { courses } = useContext(CourseContext);
  const courseName = courses[courseId];
  const [date, setDate] = useState("");
  const [dates, setDates] = useState([]);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [unrev, setUnrev] = useState(false);
  // let newAss = useRef(0);
  // unrevAss = useRef(0);
  const [unrevAss, setUnrevAss] = useState(0);
  const [newAss, setNewAss] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);


  // console.log(courses);

  useEffect(() => {
    if (!courses.find((val) => val._id === course)) {
      navigate("/mentor");
    } else {
      if (unrev)
        fetchUnrevSubmissions(course,currentPage).then((subs) => {
          setFetchSubmissions(subs.data);
          if (subs.data !== undefined) setUnrevAss(subs.data.length);
        });
      else
        fetchCourseSubmissions(course,currentPage).then((subs) => {
          setFetchSubmissions(subs.data);
          if (subs.data) setNewAss(subs.data.length);
        });
    }
  }, [courses, navigate, course, unrev, currentPage]);

  useEffect(() => {
    if (!fetchedSubmissions) return;
    let temp = [];
    fetchedSubmissions.forEach((sub) => {
      // console.log(sub.question.updatedAt);
      const d = new Date(sub.question.updatedAt);
      if (!temp.includes(d.toDateString())) temp.push(d.toDateString());
    });
    setDates(temp);
  }, [fetchedSubmissions]);

  useEffect(() => {
    const temp = date
      ? fetchedSubmissions.filter((sub) => {
          return new Date(sub.question.updatedAt).toDateString() === date;
        })
      : fetchedSubmissions;
    // console.log(temp);
    setSubmissions(temp);
  }, [fetchedSubmissions, date]);

  // const fet = {
  //   success: true,
  //   data: [
  //     {
  //       assignment_id: "63070b2e85f6f1e1366b48dd",
  //       topic_name: "Introduction",
  //       subject_id: 1,
  //       course: "UI/UX",
  //       student_name: "Arvind Kumar",
  //       questions: [
  //         {
  //           question: "ABC",
  //           question_no: 1,
  //           instructions:
  //             "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nec condimentum porttitor arcu augue a quam ullamcorper vestibulum volutpat. Nulla sed sed vestibulum, nibh quisque. Sit risus massa ipsum nulla commodo sit. Tortor blandit ut lacus lectus. Fermentum vitae amet tristique morbi praesent tristique. Id purus elementum nisl pretium tellus diam, scelerisque. Egestas tortor et posuere aliquet elit, feugiat cras velit viverra. Posuere neque habitasse elit tristique rutrum pellentesque lectus. Justo porttitor enim, consequat nec luctus. Cursus vulputate a ut convallis. Elementum metus, amet malesuada eget.",
  //           status: "completed",
  //           submissions: [
  //             {
  //               attempt: 1,
  //               filelink: ["http://tutedude.com", "http://tutedude.com"],
  //               filename: ["abc.txt", "def.txt"],
  //               link: [
  //                 "https://assignment-backend-tutedude.herokuapp.com/assignment/view?student_id=44&subject_id=1",
  //               ],
  //               text: "Test text",
  //               linkText: ["assignment live link"],
  //               _id: "633d763f2c3f1e2b0b9ada88",
  //               addDate: "2022-10-05T12:19:11.855Z",
  //               updatedAt: "2022-10-05T14:22:43.727Z",
  //             },
  //             {
  //               attempt: 2,
  //               filelink: ["http://tutedude.com"],
  //               filename: ["abc.txt"],
  //               link: [
  //                 "https://assignment-backend-tutedude.herokuapp.com/assignment/view?student_id=44&subject_id=1",
  //               ],
  //               text: "Test text for attemp 2",
  //               linkText: ["assignment live link"],
  //               _id: "633d763f2c3f1e2b0b9ada88",
  //               addDate: "2022-10-05T12:19:11.855Z",
  //               updatedAt: "2022-10-05T14:22:43.727Z",
  //             },
  //           ],
  //           submission_id: "633d763f2c3f1e2b0b9ada86",
  //         },
  //         {
  //           question: "WAP to print multiples of 6",
  //           question_no: 2,
  //           status: "completed",
  //           submissions: [
  //             {
  //               attempt: 1,
  //               filelink: [],
  //               filename: [],
  //               link: [],
  //               text: "sanj csh dc sdhgdh adhhiemi cno hirewtmo jhitmo n mohit ",
  //               linkText: [],
  //               _id: "63400d37adbf96e5827c341f",
  //               addDate: "2022-10-07T11:27:51.322Z",
  //               updatedAt: "2022-10-07T11:44:19.812Z",
  //             },
  //           ],
  //           feedback: [
  //             {
  //               attempt: 1,
  //               filelink: [],
  //               filename: [],
  //               link: [],
  //               text: "sanj csh dc sdhgdh adhhiemi cno hirewtmo jhitmo n mohit ",
  //               linkText: [],
  //               _id: "63400d37adbf96e5827c341f",
  //               addDate: "2022-10-07T11:27:51.322Z",
  //               updatedAt: "2022-10-07T11:44:19.812Z",
  //             },
  //           ],
  //           submission_id: "63400d37adbf96e5827c341d",
  //         },
  //       ],
  //     },
  //     {
  //       assignment_id: "63070b2e85f6f1e1366b48dd",
  //       topic_name: "Introduction",
  //       subject_id: 1,
  //       course: "UI/UX",
  //       student_name: "Sumit Agarwal",
  //       questions: [
  //         {
  //           question: "This is another question",
  //           question_no: 1,
  //           instructions:
  //             "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nec condimentum porttitor arcu augue a quam ullamcorper vestibulum volutpat. Nulla sed sed vestibulum, nibh quisque. Sit risus massa ipsum nulla commodo sit. Tortor blandit ut lacus lectus. Fermentum vitae amet tristique morbi praesent tristique. Id purus elementum nisl pretium tellus diam, scelerisque. Egestas tortor et posuere aliquet elit, feugiat cras velit viverra. Posuere neque habitasse elit tristique rutrum pellentesque lectus. Justo porttitor enim, consequat nec luctus. Cursus vulputate a ut convallis. Elementum metus, amet malesuada eget.",
  //           status: "submitted",
  //           submissions: [
  //             {
  //               attempt: 1,
  //               filelink: ["http://tutedude.com", "http://tutedude.com"],
  //               filename: ["abc.txt", "def.txt"],
  //               link: [
  //                 "https://assignment-backend-tutedude.herokuapp.com/assignment/view?student_id=44&subject_id=1",
  //               ],
  //               text: "Test text",
  //               linkText: ["assignment live link"],
  //               _id: "633d763f2c3f1e2b0b9ada88",
  //               addDate: "2022-10-05T12:19:11.855Z",
  //               updatedAt: "2022-10-05T14:22:43.727Z",
  //             },
  //             {
  //               attempt: 2,
  //               filelink: ["http://tutedude.com"],
  //               filename: ["abc.txt"],
  //               link: [
  //                 "https://assignment-backend-tutedude.herokuapp.com/assignment/view?student_id=44&subject_id=1",
  //               ],
  //               text: "Test text for attemp 2",
  //               linkText: ["assignment live link"],
  //               _id: "633d763f2c3f1e2b0b9ada88",
  //               addDate: "2022-10-05T12:19:11.855Z",
  //               updatedAt: "2022-10-05T14:22:43.727Z",
  //             },
  //           ],
  //           submission_id: "633d763f2c3f1e2b0b9ada86",
  //         },
  //       ],
  //     },
  //   ],
  // };

  const data = submissions;
  const newAssignment = newAss;
  const unreviewed = unrevAss;

  let count = 0;
  return data ? (
    <div>
      <div className={styles.header}>
        <div className={styles.left}>
          <div>
            <a href="/">Courses</a> &gt; {courses[courseId]}
          </div>
          <div className={styles.data}>
            <select
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
              }}
            >
              <option value={""}>Select date</option>
              {dates.map((date, i) => {
                const d = new Date(date);
                // console.log(date);
                return (
                  <option
                    key={i}
                    value={date}
                  >{`${d.getDate()}-${d.getMonth()}-${d.getFullYear()}`}</option>
                );
              })}
            </select>
            {/* <DatePickerButton
              startDate={{ val: startDate, set: setStartDate }}
              endDate={{ val: endDate, set: setEndDate }}
            /> */}
            <div className={styles.header_info}>
              <div
                className={unrev ? "" : styles.active}
                onClick={() => {
                  setUnrev(false);
                }}
              >
                <span>New Assignment</span>
                <span>{newAssignment ? newAssignment : "-"}</span>
              </div>
              <div
                className={unrev ? styles.active : ""}
                onClick={() => {
                  setUnrev(true);
                }}
              >
                <span>Unreviewed</span>
                <span>{unreviewed ? unreviewed : "-"}</span>
              </div>
            </div>
            {/* {currentPage>=1 &&<button onClick={()=>setCurrentPage(currentPage-1)}>Previous</button>}
              <button onClick={()=>setCurrentPage(currentPage+1)}>Next</button> */}

          </div>
        </div>
        <div className={styles.right}>
          <select
            onChange={(e) => {
              if (e.target.value === "") navigate("/", { relative: false });

              navigate(`/mentor/${encodeURIComponent(e.target.value)}`);
            }}
            value={course}
          >
            <option value="">Select Course</option>
            {courses.map((course, i) => (
              <option key={i} value={course._id}>
                {course.course_name}
              </option>
            ))}
          </select>
          <select>
            <option>Sort By: Latest First</option>
          </select>
        </div>
      </div>
        <div style={{display:"block"}}>
        {currentPage>=1 &&<button onClick={()=>setCurrentPage(currentPage-1)}>Previous</button>}
        <button onClick={()=>setCurrentPage(currentPage+1)}>Next</button>
        </div>
      <div className={styles.submissions}>
        {data.map((ques, i) => {
          return (
            // assignment.questions.map((ques, j) =>
            ques.submissions.map((subm, k) => {
              const d = new Date(subm.updatedAt);
              return subm.review ? (
                !unrev ? (
                  <CompletedViewCard
                    key={i + k}
                    data={{
                      ids: {
                        assignmentId: ques.assignment_id
                          ? ques.assignment_id
                          : 0,
                        subjectId: ques.subject_id,
                        submissionId: ques._id,
                        studentId: ques.student_id,
                        questionNo: ques.question.question_no,
                      },
                      number: ++count,
                      time: `${d.getDate()}-${d.getMonth()}-${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`,
                      review: {
                        date: subm.review.reviewDate,
                        message: subm.review.text,
                        filename: subm.review.filename,
                        filelink: subm.review.filelink,
                        linkText: subm.review.linkText,
                        link: subm.review.link,
                      },
                      userInfo: {
                        profilePic: "",
                        name: ques.student_name
                          ? ques.student_name
                          : ques.student_id,
                        course: courseName,
                      },
                      details: {
                        topicName:
                          ques.assignment_id && ques.assignment_id.topic
                            ? ques.assignment_id.topic
                            : "",
                        question: ques.question.question,
                        text: ques.question.instructions,
                      },
                      solution: {
                        filename: subm.filename,
                        filelink: subm.filelink,
                        linkText: subm.linkText,
                        link: subm.link,
                        text: subm.text,
                      },
                    }}
                  />
                ) : (
                  ""
                )
              ) : (
                <SubmissionView
                  key={i + k}
                  data={{
                    ids: {
                      assignmentId: ques.assignment_id ? ques.assignment_id : 0,
                      subjectId: ques.subject_id,
                      submissionId: ques._id,
                      studentId: ques.student_id,
                      questionNo: ques.question.question_no,
                      listId: subm._id,
                    },
                    number: ++count,
                    time: `${d.getDate()}-${d.getMonth()}-${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`,
                    userInfo: {
                      profilePic: "",
                      name: ques.student_name
                        ? ques.student_name
                        : ques.student_id,
                      course: courseName,
                    },
                    details: {
                      // topicName: assignment.topic_name,
                      topicName: ques.assignment_id
                        ? ques.assignment_id.topic
                        : "",
                      question: ques.question.question,
                      text: ques.question.instructions,
                    },
                    solution: {
                      filename: subm.filename,
                      filelink: subm.filelink,
                      linkText: subm.linkText,
                      link: subm.link,
                      text: subm.text,
                    },
                  }}
                />
              );
            })
            // )
          );
        })}

        {/* {data.questions.map((ques) =>
          ques.submissions.map((subm) => (
            <SubmissionView
              data={{
                number: ++count,
                time: "11:15 AM",
                userInfo: {
                  profilePic: "",
                  name: data.student_name,
                  course: data.course,
                },
                details: {
                  topicName: data.topic_name,
                  question: ques.question,
                  text: ques.instructions,
                },
                solution: {
                  filename: subm.filename,
                  filelink: subm.filelink,
                  linkText: subm.linkText,
                  link: subm.link,
                  text: subm.text,
                },
              }}
            />
          ))
        )} */}
      </div>
    </div>
  ) : (
    "Loading..."
  );
};

export default Assignment;

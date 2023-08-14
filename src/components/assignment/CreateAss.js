import React, { useContext, useMemo, useState } from "react";
import Modal from "../Modal";
import styles from "../../styles/assignment/CreateAss.module.css";
import Cookies from "js-cookie";
import { getCourses } from "../../utils/assignmentDetails";
import CourseContext from "../../utils/CoursesContext";

const CreateQues = ({
  shown,
  closeHandler,
  topic,
  course,
  addQuestion,
  quesNumber,
  loading,
  cancelHandler,
}) => {
  const defaultLink = {
    text: "",
    link: "",
    ind: -1,
  };
  const [questionNo, setQuestionNo] = useState();
  const [question, setQuestion] = useState("");
  const [instruction, setInstruction] = useState("");
  const [files, setFiles] = useState([]);
  const [links, setLinks] = useState([]);
  const [currLink, setCurrLink] = useState(defaultLink);
  const [showLinkModal, setShowLinkModal] = useState(false);

  const clearInputs = () => {
    setQuestionNo();
    setQuestion("");
    setInstruction("");
    setFiles([]);
    setLinks([]);
    setCurrLink(defaultLink);
    setShowLinkModal(false);
  };

  return (
    <>
      <Modal
        shown={shown}
        closeHandler={closeHandler}
        className={styles.create}
        hideClose
      >
        <h3>New Assignment Addition</h3>
        <p>
          {course}, <span>{topic}</span>
        </p>
        <div className={styles.input}>
          <label>Question No.</label>
          <input
            type="number"
            value={questionNo}
            onChange={(e) => {
              setQuestionNo(e.target.value);
            }}
          />
        </div>
        <div className={styles.input}>
          <label>Question</label>
          <textarea
            value={question}
            onChange={(e) => {
              setQuestion(e.target.value);
            }}
          />
        </div>
        <div className={styles.input}>
          <label>Instruction</label>
          <textarea
            value={instruction}
            onChange={(e) => {
              setInstruction(e.target.value);
            }}
          />
        </div>
        <div className={styles.links}>
          {links.map((link, ind) => (
            <div className={styles.link} key={ind}>
              {link.text}
              <div>
                <a href={link.link} target="_blank" rel="noreferrer">
                  Go to link :{" "}
                </a>
                <span>{link.link}</span> |{" "}
                <button
                  onClick={() => {
                    setLinks((currLinks) =>
                      currLinks.filter((c, i) => i !== ind)
                    );
                  }}
                >
                  remove
                </button>{" "}
                |{" "}
                <button
                  onClick={() => {
                    setCurrLink({ ...link, ind: ind });
                    setShowLinkModal(true);
                  }}
                  disabled={loading}
                >
                  change
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.files}>
          {files.map((file, ind) => (
            <div key={ind}>
              {file.name}
              <svg
                width="14"
                height="18"
                viewBox="0 0 14 18"
                fill="#434343"
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => {
                  setFiles((curr) => curr.filter((val, i) => i !== ind));
                }}
              >
                <path d="M1 16C1 17.1 1.9 18 3 18H11C12.1 18 13 17.1 13 16V4H1V16ZM14 1H10.5L9.5 0H4.5L3.5 1H0V3H14V1Z" />
              </svg>
            </div>
          ))}
        </div>
        <div className={styles.actions}>
          <div className={styles.action_btns}>
            <div>
              <label>
                <span>
                  <svg
                    width="11"
                    height="21"
                    viewBox="0 0 11 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.6263 4.99984V15.5415C9.6263 17.5673 7.98547 19.2082 5.95964 19.2082C3.9338 19.2082 2.29297 17.5673 2.29297 15.5415V4.08317C2.29297 2.81817 3.31964 1.7915 4.58464 1.7915C5.84964 1.7915 6.8763 2.81817 6.8763 4.08317V13.7082C6.8763 14.2123 6.4638 14.6248 5.95964 14.6248C5.45547 14.6248 5.04297 14.2123 5.04297 13.7082V4.99984H3.66797V13.7082C3.66797 14.9732 4.69464 15.9998 5.95964 15.9998C7.22464 15.9998 8.2513 14.9732 8.2513 13.7082V4.08317C8.2513 2.05734 6.61047 0.416504 4.58464 0.416504C2.5588 0.416504 0.917969 2.05734 0.917969 4.08317V15.5415C0.917969 18.3282 3.17297 20.5832 5.95964 20.5832C8.7463 20.5832 11.0013 18.3282 11.0013 15.5415V4.99984H9.6263Z"
                      fill="#434343"
                    />
                  </svg>
                  file
                </span>
                <input
                  type="file"
                  onChange={(event) => {
                    setFiles((curr) => [...curr, event.target.files[0]]);
                  }}
                />
              </label>
            </div>
            <div>
              <span
                onClick={() => {
                  setCurrLink(defaultLink);
                  setShowLinkModal(true);
                }}
              >
                <svg
                  width="21"
                  height="10"
                  viewBox="0 0 21 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.4 5C2.4 3.29 3.79 1.9 5.5 1.9H9.5V0H5.5C2.74 0 0.5 2.24 0.5 5C0.5 7.76 2.74 10 5.5 10H9.5V8.1H5.5C3.79 8.1 2.4 6.71 2.4 5ZM6.5 6H14.5V4H6.5V6ZM15.5 0H11.5V1.9H15.5C17.21 1.9 18.6 3.29 18.6 5C18.6 6.71 17.21 8.1 15.5 8.1H11.5V10H15.5C18.26 10 20.5 7.76 20.5 5C20.5 2.24 18.26 0 15.5 0Z"
                    fill="#434343"
                  />
                </svg>
                link
              </span>
            </div>
          </div>
          <div style={{ display: "flex" }}>
            <button
              onClick={() => {
                clearInputs();
                cancelHandler();
              }}
            >
              Cancel
            </button>
            <button
              onClick={() => {
                // console.log({
                //   topic,
                //   course,
                //   question,
                //   instruction,
                //   links,
                //   files,
                // });
                if (questionNo <= 0)
                  return window.alert("Question No must be greater than zero.");
                if (!question) return window.alert("Question cannot be empty.");
                addQuestion(question, instruction, files, links, questionNo);
                clearInputs();
              }}
            >
              Proceed
            </button>
          </div>
        </div>
      </Modal>
      <Modal
        className={styles.link_modal}
        shown={showLinkModal}
        closeHandler={() => {
          setShowLinkModal(false);
        }}
        rounded
        hideClose
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="#434343"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => {
            setShowLinkModal(false);
            setCurrLink(defaultLink);
          }}
        >
          <path d="M1.70703 0.292969L0.292969 1.70703L7.58594 9L0.292969 16.293L1.70703 17.707L9 10.4141L16.293 17.707L17.707 16.293L10.4141 9L17.707 1.70703L16.293 0.292969L9 7.58594L1.70703 0.292969Z" />
        </svg>

        <h5>Insert Link</h5>
        <label>
          <span>url</span>
          <input
            type="text"
            value={currLink.link}
            onChange={(e) => {
              setCurrLink((c) => ({ ...c, link: e.target.value }));
            }}
          />
        </label>
        <label>
          <span>Text</span>
          <input
            type="text"
            value={currLink.text}
            onChange={(e) => {
              setCurrLink((c) => ({ ...c, text: e.target.value }));
            }}
          />
        </label>
        <button
          onClick={() => {
            if (!currLink.text || !currLink.link) {
              window.alert("Link or text not found");
              return;
            }
            if (!currLink.link.includes("http", 0)) {
              window.alert("'http' not found in link");

              return;
            }
            if (currLink.ind !== -1) {
              setLinks((currLinks) => [
                ...currLinks.filter((c, i) => i !== currLink.ind),
                { text: currLink.text, link: currLink.link },
              ]);
            } else {
              setLinks((currLinks) => [
                ...currLinks,
                { text: currLink.text, link: currLink.link },
              ]);
            }
            setCurrLink(defaultLink);
            setShowLinkModal(false);
          }}
        >
          {currLink.ind === -1 ? "Insert" : "Change"}
        </button>
      </Modal>
    </>
  );
};

const CreateIntro = ({
  shown,
  closeHandler,
  proceed,
  onSelect,
  courses,
  courseId,
  topic,
  assignmentNo,
  askAssignment,
}) => {
  return (
    <Modal
      shown={shown}
      closeHandler={closeHandler}
      className={styles.create}
      hideClose
    >
      <h3>New Assignment Addition</h3>
      <div>
        <p>Select the course for Assignment Addtion</p>
        <select onChange={onSelect} value={courseId}>
          <option value={-1}>Select Course</option>
          {courses.map((c, i) => (
            <option key={i} value={c._id}>
              {c.course_name}
            </option>
          ))}
        </select>
      </div>
      {askAssignment ? (
        <input
          placeholder="Enter Assignment Number"
          value={assignmentNo.value}
          onChange={assignmentNo.onChange}
          type="number"
        />
      ) : (
        ""
      )}
      {askAssignment ? (
        ""
      ) : (
        <input
          placeholder="Enter Topic Name"
          value={topic.value}
          onChange={topic.onChange}
        />
      )}
      <button onClick={proceed}>
        {askAssignment ? "Proceed" : "Create Assignment"}
      </button>
    </Modal>
  );
};

const CreateProceed = ({
  shown,
  closeHandler,
  proceed,
  addQuestion,
  topic,
}) => {
  return (
    <Modal shown={shown} closeHandler={closeHandler} hideClose>
      <h5>{topic} - Add More Questions</h5>
      <div className={styles.feedback_cont}>
        <span>Do you want to add more questions in the assignment?</span>
        <div style={{ display: "flex" }}>
          <button
            className={styles.yes}
            onClick={() => {
              addQuestion();
            }}
          >
            Yes
          </button>{" "}
          <button
            onClick={() => {
              proceed();
            }}
          >
            No
          </button>
        </div>
      </div>
    </Modal>
  );
};

const CreateAss = ({ shown, onlyQues, closeHandler, _course, reload }) => {
  // const courses = ["UI/UX"];
  // const courses = useMemo(() => getCourses(), []);
  const { courses } = useContext(CourseContext);
  const [topic, setTopic] = useState("");
  const [course, setCourse] = useState(
    courses.find((val) => val._id === _course)
  );
  const [assignmentNo, setAssignmentNo] = useState();
  const [page, setPage] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log(course);

  const obj2FormData = (obj, formData = new FormData()) => {
    // formData = formData;
    let createFormData;

    createFormData = function (obj, subKeyStr = "") {
      for (let i in obj) {
        let value = obj[i];
        let subKeyStrTrans = subKeyStr ? subKeyStr + "[" + i + "]" : i;

        if (typeof value === "string" || typeof value === "number") {
          formData.append(subKeyStrTrans, value);
        } else if (typeof value === "object") {
          createFormData(value, subKeyStrTrans);
        }
      }
    };

    createFormData(obj);

    return formData;
  };

  const addQuestion = (question, instruction, files, links, questionNo) => {
    const token = Cookies.get("mentor");

    // setLoading(true);
    // fetch(process.env.REACT_APP_API_URL + "/", {
    //   method: "POST",
    //   body: formData,
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data);
    //     setLoading(false);
    //     if (data.success === true) {
    //       setQuestions((prev) => [
    //         ...prev,
    //         { question, instruction, files, links, addedBy: token },
    //       ]);
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    // setLoading(false);

    if (!questionNo || questionNo < 1) {
      window.alert("Please enter a valid question number.");
      return;
    }

    questions.forEach((q) => {
      if (q.questionNo === questionNo) {
        window.alert("Questions Number is already used.");
        return;
      }
    });

    if (!question) {
      window.alert("Question cannot be empty.");
      return;
    }

    setQuestions((prev) => [
      ...prev,
      { question, instruction, files, links, addedBy: token, questionNo },
    ]);
  };

  const submitQuestions = () => {
    const token = Cookies.get("mentor_token");

    const data = {
      subject_id: course._id,
      questions: questions.map((ques, ind) => ({
        question: ques.question,
        instructions: ques.instruction,
        link: ques.links.map((link) => link.link),
        linkText: ques.links.map((link) => link.text),
        file_n: ques.files.length,
        filenames: ques.files.map((file, i) => `${ques.questionNo}_${i + 1}`),
        question_no: ques.questionNo,
        addedBy: token,
      })),
      topic,
      mentor: token,
      assignment_no: assignmentNo,
    };
    console.log(data);

    const formData = new FormData();
    formData.append("request", JSON.stringify(data));
    questions.forEach((ques, ind) => {
      ques.files.forEach((file, i) => {
        formData.append(`${ques.questionNo}_${i + 1}`, file);
      });
    });

    const url = process.env.REACT_APP_API_URL + "/assignment/question";
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then(() => {
        window.alert("Questions created");
        resetState();
        closeHandler();
      })
      .catch((err) => {
        resetState();
        console.log(err);
      });
  };

  const submitEmptyAssignment = () => {
    console.log(course, topic);
    // create assignment and get assignment no.

    // const formData = obj2FormData({ subject_id: course.id, topic });
    const formData = new FormData();
    formData.append(
      "request",
      JSON.stringify({
        subject_id: course._id,
        topic,
        questions: [],
        assignment_no: assignmentNo,
        addedBy: Cookies.get("mentor_token"),
      })
    );

    const url = process.env.REACT_APP_API_URL + "/assignment";
    if (!onlyQues)
      fetch(url, {
        method: "POST",
        body: formData,
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          window.alert("Assignment Created");
          setAssignmentNo(data.data.assignment_no);
          setPage(1);
        })
        .catch((err) => {
          console.log(err);
        });
    else setPage(1);
    // setAssignmentNo(0);
    // setPage(1);
  };

  const resetState = () => {
    setTopic("");
    setPage(0);
    setAssignmentNo();
    setQuestions([]);
  };

  return (
    <>
      <CreateIntro
        shown={shown && page === 0}
        closeHandler={closeHandler}
        courses={courses}
        courseId={course ? course._id : undefined}
        askAssignment={onlyQues}
        proceed={() => {
          if (!course) return alert("Select a course");
          if (topic.length === 0 && !onlyQues)
            return alert("Enter a topic name");
          // setPage(1);
          if (!onlyQues) submitEmptyAssignment();
          else setPage(1);
        }}
        onSelect={(e) => {
          setCourse(courses.find((val) => val._id === e.target.value));
        }}
        topic={{
          value: topic,
          onChange: (e) => {
            setTopic(e.target.value);
          },
        }}
        assignmentNo={{
          value: assignmentNo,
          onChange: (e) => setAssignmentNo(e.target.value),
        }}
      />
      <CreateQues
        topic={topic}
        course={course ? course.course_name : undefined}
        shown={shown && page === 1}
        closeHandler={closeHandler}
        cancelHandler={() => {
          resetState();
          closeHandler();
        }}
        quesNumber={questions.length + 1}
        addQuestion={(question, instruction, files, links, quesNumber) => {
          addQuestion(question, instruction, files, links, quesNumber);
          setPage(2);
        }}
        loading={loading}
      />
      <CreateProceed
        topic={topic}
        shown={shown && page === 2}
        closeHandler={closeHandler}
        proceed={() => {
          submitQuestions();
          closeHandler();
          setPage(0);
          reload();
        }}
        addQuestion={() => {
          setPage(1);
        }}
      />
    </>
  );
};

export default CreateAss;

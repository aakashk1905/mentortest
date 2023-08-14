import React, { useState } from "react";
import styles from "../../styles/AssignmentLibraryCourse.module.css";
import axios from "axios";
import UpdateAssignment from "./UpdateAssignment";

const AssignmentListItem = ({ data, number, reload, course, topic }) => {
  const [open, setOpen] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [currentQues, setCurrentQues] = useState();

  return (
    <div className={styles.itemCont}>
      <div className={styles.item}>
        <p>{number + 1}</p>
        <p>{data.topic}</p>
        <p>{data.questions.length}</p>
        <p className={styles.open}>
          <button
            onClick={() => {
              setOpen((old) => !old);
            }}
          >
            {open ? "close" : "open"}&nbsp;&nbsp;
            {/* <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                transform: `rotate(${open ? "-" : ""}90deg)`,
                transition: ".24s",
              }}
            >
              <path
                d="M8 0L6.59 1.41L12.17 7H0V9H12.17L6.59 14.59L8 16L16 8L8 0Z"
                fill="#434343"
              />
            </svg> */}
          </button>
          <button
            onClick={() => {
              if (
                window.confirm(
                  "Are you sure you want to delete this Assignment?"
                )
              ) {
                axios
                  .delete(process.env.REACT_APP_API_URL + "/assignment", {
                    data: {
                      assignment_id: data._id,
                    },
                  })
                  .then((res) => {
                    window.alert("Deleted Assignment");
                    reload();
                  })
                  .catch((err) => {
                    console.log(err);
                    window.alert("Failed to delete Assignment");
                  });
              }
            }}
          >
            Delete
          </button>
        </p>
      </div>
      {open ? (
        <div className={styles.questions}>
          <h4>Questions</h4>
          <div>
            {data.questions.map((ques, ind) => (
              <p key={ind}>
                <span>
                  {ques.question_no}. {ques.question}
                </span>
                <span>
                  <button
                    onClick={() => {
                      setCurrentQues(ques);
                      setShowUpdate(true);
                    }}
                  >
                    Edit
                  </button>
                </span>
              </p>
            ))}
          </div>
        </div>
      ) : (
        ""
      )}
      {currentQues ? (
        <UpdateAssignment
          shown={showUpdate}
          closeHandler={() => {
            setShowUpdate(false);
          }}
          ques={currentQues}
          course={course}
          topic={topic}
          updateQuestion={(id, question, instruction, links) => {
            const ques = data.questions.find((q) => q._id === id);
            let questions = data.questions.filter((q) => q._id !== id);
            questions.push({
              question,
              instructions: instruction,
              link: links.map((l) => l.link),
              linkText: links.map((l) => l.text),
              question_no: ques.question_no,
              status: ques.status,
              filelink: ques.filelink,
              filename: ques.filename,
              filecloudlinks: ques.filecloudlinks,
              addedBy: ques.addedBy,
              _id: id,
            });
            const assignment = {
              subject_id: course._id,
              assignment_id: data._id,
              "questionSet[]": questions,
            };

            console.log(assignment);

            axios
              .put(process.env.REACT_APP_API_URL + "/assignment", assignment)
              .then((res) => {
                console.log(res);
                setShowUpdate(false);
              })
              .catch((err) => {
                console.log(err);
                setShowUpdate(false);
              });
          }}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default AssignmentListItem;

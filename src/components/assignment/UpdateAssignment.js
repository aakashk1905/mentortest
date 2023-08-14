import React, { useState } from "react";
import Modal from "../Modal";
import styles from "../../styles/assignment/CreateAss.module.css";

const UpdateAssignment = ({
  shown,
  closeHandler,
  ques,
  course,
  topic,
  updateQuestion,
}) => {
  const defaultLink = {
    text: "",
    link: "",
    ind: -1,
  };
  const [question, setQuestion] = useState(ques.question);
  const [instruction, setInstruction] = useState(question.instructions);
  const [files, setFiles] = useState(ques.filename.map((name) => ({ name })));
  const [links, setLinks] = useState(
    ques.link.map((link, i) => ({ link, text: ques.linkText[i] }))
  );
  const [currLink, setCurrLink] = useState(defaultLink);
  const [showLinkModal, setShowLinkModal] = useState(false);

  const clearInputs = () => {
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
        <h3>Update Assignment</h3>
        <p>
          {course}, <span>{topic}</span>
        </p>
        <div className={styles.input}>
          <label>Question No. {ques.question_no}</label>
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
                  // disabled={loading}
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
              {/* <svg
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
              </svg> */}
            </div>
          ))}
        </div>
        <div className={styles.actions}>
          <div className={styles.action_btns}>
            {/* <div>
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
            </div> */}
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
                // cancelHandler();
                closeHandler();
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
                if (!question) return window.alert("Question cannot be empty.");
                updateQuestion(ques._id, question, instruction, links);
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

// const UpdateAssignment = ({ shown, closeHandler, question }) => {
//   console.log(question);
//   return (
//     <div>
//       <Modal shown={shown} closeHandler={closeHandler}>
//         {question.question}
//         <input type="number" defaultValue={question.question_no} />
//         <input type="text" defaultValue={question.question} />
//         <textarea defaultValue={question.instructions} />
//       </Modal>
//     </div>
//   );
// };

export default UpdateAssignment;

import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import styles from "../styles/Modal.module.css";
import Cookies from "js-cookie";

const FeedbackModal = ({ showFeedbackForm, closeHandler, data }) => {
  const [files, setFiles] = useState([]);
  const [links, setLinks] = useState([]);
  const [text, setText] = useState("");
  // const [full, setFull] = useState([]);

  const [loading, setLoading] = useState(false);
  const defaultLink = { text: "", link: "", ind: -1 };
  const [currLink, setCurrLink] = useState({ text: "", link: "", ind: -1 });

  const [showLinkModal, setShowLinkModal] = useState(false);

  const submitHandler = () => {
    if (files.length === 0 && links.length === 0 && text.length === 0) {
      return window.alert("No Feedback given");
    }
    if (window.confirm("Are you sure to submit?")) {
      // console.log({
      //   text: text,
      //   files: files,
      //   links: links,
      // });
      // setLinks([]);
      // setFiles([]);
      // setText("");
      setShowResub(true);
    }
  };

  useEffect(() => {
    if (!showFeedbackForm) setShowLinkModal(false);
  }, [showFeedbackForm]);

  const [showResub, setShowResub] = useState(false);
  const [reSubmit, setReSubmit] = useState(undefined);
  // console.log(data.assignmentId);

  const sendFeedback = (resubmit) => {
    const formData = new FormData();

    const token = Cookies.get("mentor");
    formData.append("token", token);
    formData.append("assignment_id", data.assignmentId);
    formData.append("student_id", data.studentId);
    formData.append("subject_id", data.subjectId);
    formData.append("submission_id", data.submissionId);
    formData.append("question_no", data.questionNo);
    formData.append("question", data.question);
    formData.append("sid", data.submissionId);
    formData.append("list_id", data.listId);

    // console.log({
    //   assignment_id: data.assignmentId,
    //   student_id: data.studentId,
    //   subject_id: data.subjectId,
    //   submission_id: data.submissionId,
    //   question_no: data.questionNo,
    //   question: data.question,
    //   list_id: data.listId,
    // });

    const file_aid = 123,
      link_aid = 456,
      ltd_aid = 789;

    formData.append("aid", file_aid);
    formData.append("link_aid", link_aid);
    formData.append("ltd_aid", ltd_aid);

    formData.append("n", files.length);
    formData.append("link_n", links.length);
    formData.append("ltd_n", links.length);

    files.forEach((file, i) => {
      formData.append(file_aid + "_" + i, file);
      // console.log({ key: file_aid + "_" + i, value: file });
    });

    links.forEach((link, i) => {
      formData.append(link_aid + "_" + i, link.link);
      formData.append(ltd_aid + "_" + i, link.text);
      // console.log({ key: link_aid + "_" + i, value: link.link });
      // console.log({ key: ltd_aid + "_" + i, value: link.text });
    });

    formData.append("text", text);
    formData.append("resubmit", resubmit);

    setLoading(true);
    fetch(process.env.REACT_APP_API_URL + "/mentor/submission/feedback", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setLoading(false);
        if (data.success === true) {
          setReSubmit(resubmit);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (loading)
    return (
      <Modal
        shown={showFeedbackForm}
        closeHandler={() => {
          closeHandler();
        }}
      >
        Loading
      </Modal>
    );

  if (reSubmit === true) {
    return (
      <Modal
        shown={showFeedbackForm}
        hideClose
        closeHandler={closeHandler}
        className={styles.feedback}
      >
        <h5>Feedback for Assignment 1</h5>
        <div className={styles.feedback_cont}>Resubmission is required</div>
      </Modal>
    );
  }

  if (reSubmit === false) {
    return (
      <Modal
        shown={showFeedbackForm}
        hideClose
        closeHandler={closeHandler}
        className={styles.feedback}
      >
        <h5>Feedback for Assignment 1</h5>
        <div className={styles.feedback_cont}>
          Verified, No re-submission Required
        </div>
      </Modal>
    );
  }

  if (showResub)
    return (
      <Modal
        shown={showFeedbackForm}
        hideClose
        closeHandler={closeHandler}
        className={styles.feedback}
      >
        <h5>Feedback for Assignment 1</h5>
        <div className={styles.feedback_cont}>
          <span>Ask Student for Re-submission of this Assignment ?</span>
          <div>
            <button
              className={styles.yes}
              onClick={() => {
                sendFeedback(true);
              }}
            >
              Yes
            </button>{" "}
            <button
              onClick={() => {
                sendFeedback(false);
              }}
            >
              No
            </button>
          </div>
        </div>
      </Modal>
    );

  return (
    <Modal
      shown={showFeedbackForm}
      closeHandler={closeHandler}
      hideClose
      className={styles.feedback}
    >
      <h5>Feedback for Assignment 1</h5>
      <div className={styles.input}>
        <div
          className={`${styles.empty_overlay} ${
            text.length === 0 && files.length === 0 && links.length === 0
              ? styles.show
              : ""
          }`}
        >
          Add files, links or texts as your feedback
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
                >
                  change
                </button>
              </div>
            </div>
          ))}
        </div>
        <textarea
          value={text}
          onChange={(event) => {
            setText(event.target.value);
          }}
        ></textarea>

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
        <button onClick={submitHandler}>Submit</button>
      </div>
      <Modal
        shown={showLinkModal}
        closeHandler={() => {
          setShowLinkModal(false);
        }}
        className={styles.link_modal}
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
    </Modal>
  );
};

export default FeedbackModal;

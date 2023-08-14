import React, { useState } from "react";
import styles from "../styles/SubmissionView.module.css";
import FeedbackModal from "./FeedbackModal";
import Modal from "./Modal";

const SubmissionView = ({ data }) => {
  const [showTextSolution, setShowTextSolution] = useState(false);
  const [currentTextSolution, setCurrentTextSolution] = useState();

  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  // const [currentFeedback, setFeedbackForm] = useState();

  const textSolutionClickHandler = (current) => {
    setCurrentTextSolution(current);
    setShowTextSolution(true);
  };

  const closeHandler = () => {
    setShowTextSolution(false);
  };

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <div className={styles.profile}>
          {data.userInfo.profilePic ? (
            <img src={data.userInfo.profilePic} alt="" />
          ) : (
            <svg
              width="50"
              height="50"
              viewBox="0 0 42 42"
              fill="#434343"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M21.0013 0.166504C9.5013 0.166504 0.167969 9.49984 0.167969 20.9998C0.167969 32.4998 9.5013 41.8332 21.0013 41.8332C32.5013 41.8332 41.8346 32.4998 41.8346 20.9998C41.8346 9.49984 32.5013 0.166504 21.0013 0.166504ZM21.0013 6.4165C24.4596 6.4165 27.2513 9.20817 27.2513 12.6665C27.2513 16.1248 24.4596 18.9165 21.0013 18.9165C17.543 18.9165 14.7513 16.1248 14.7513 12.6665C14.7513 9.20817 17.543 6.4165 21.0013 6.4165ZM21.0013 35.9998C15.793 35.9998 11.1888 33.3332 8.5013 29.2915C8.5638 25.1457 16.8346 22.8748 21.0013 22.8748C25.1471 22.8748 33.4388 25.1457 33.5013 29.2915C30.8138 33.3332 26.2096 35.9998 21.0013 35.9998Z" />
            </svg>
          )}
          <div>
            <span>{data.userInfo.name}</span>
            <span>{data.userInfo.course}</span>
          </div>
        </div>
        <div className={styles.number}>{data.number}</div>
        <div className={styles.time}>{data.time}</div>
      </div>
      <div className={styles.info}>
        <h5>{data.details.topicName}</h5>
        <h6>{data.details.question}</h6>
        <p>{data.details.text}</p>
      </div>
      <div className={styles.solution_cont}>
        <h5>Solution by {data.userInfo.name.split(" ")[0]} :</h5>
        <div className={styles.solution}>
          {data.solution.filename.length > 0 ? (
            <div>
              {data.solution.filename.map((file, ind) => (
                <div
                  key={ind}
                  className={styles.link}
                  onClick={() => {
                    window.open(
                      `https://d1z20pvarkrmrv.cloudfront.net/${data.solution.filelink[ind]}`,
                      "_blank"
                    );
                  }}
                >
                  <span>
                    {ind + 1}. {file}
                  </span>
                  <svg
                    width="14"
                    height="17"
                    viewBox="0 0 14 17"
                    fill="#434343"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M14 6H10V0H4V6H0L7 13L14 6ZM0 15V17H14V15H0Z" />
                  </svg>
                </div>
              ))}
            </div>
          ) : (
            ""
          )}

          {data.solution.linkText.length > 0 ? (
            <div>
              {data.solution.linkText.map((link, ind) => (
                <div
                  key={ind}
                  className={styles.link}
                  onClick={() => {
                    window.open(data.solution.link[ind], "_blank");
                  }}
                >
                  <span>
                    {ind + 1}. {link}
                  </span>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16 16H2V2H9V0H2C0.89 0 0 0.9 0 2V16C0 17.1 0.89 18 2 18H16C17.1 18 18 17.1 18 16V9H16V16ZM11 0V2H14.59L4.76 11.83L6.17 13.24L16 3.41V7H18V0H11Z"
                      fill="#434343"
                    />
                  </svg>
                </div>
              ))}
            </div>
          ) : (
            ""
          )}

          {data.solution.text ? (
            <div>
              <div
                className={styles.link}
                onClick={() => {
                  textSolutionClickHandler(data.solution.text);
                }}
              >
                <span>{data.solution.text.substring(0, 10)}</span>
                <svg
                  width="18"
                  height="16"
                  viewBox="0 0 18 16"
                  fill="#434343"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M16 0H2C0.89 0 0 0.9 0 2V14C0 15.1 0.89 16 2 16H6V14H2V4H16V14H12V16H16C17.1 16 18 15.1 18 14V2C18 0.9 17.11 0 16 0ZM9 6L5 10H8V16H10V10H13L9 6Z" />
                </svg>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className={styles.feedback_cont}>
        <button
          className={styles.feedback_btn}
          onClick={() => {
            setShowFeedbackForm(true);
          }}
        >
          Give Feedback
        </button>
      </div>
      <Modal shown={showTextSolution} closeHandler={closeHandler}>
        {currentTextSolution}
      </Modal>
      <FeedbackModal
        showFeedbackForm={showFeedbackForm}
        closeHandler={() => {
          setShowFeedbackForm(false);
        }}
        data={{ ...data.ids, question: data.details.question }}
      />
    </div>
  );
};

export default SubmissionView;

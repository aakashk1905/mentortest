import React, { useState } from "react";
import styles from "../styles/SubmissionView.module.css";
import FeedbackModal from "./FeedbackModal";
// import Modal from "./Modal";

const CompletedViewCard = ({ data }) => {
  // const [showTextSolution, setShowTextSolution] = useState(false);
  // const [currentTextSolution, _] = useState();

  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  // const [currentFeedback, setFeedbackForm] = useState();

  // const textSolutionClickHandler = (current) => {
  //   setCurrentTextSolution(current);
  //   setShowTextSolution(true);
  // };

  // const closeHandler = () => {
  //   setShowTextSolution(false);
  // };

  return (
    <div className={`${styles.root} ${styles.completed}`}>
      <div className={styles.left}>
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
          <div className={styles.time}>{data.time}</div>
        </div>
        <div className={styles.info}>
          <h5>{data.details.topicName}</h5>
          <h6>{data.details.question}</h6>
          <p>{data.details.text}</p>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.number}>{data.number}</div>
        <div className={styles.solution_cont}>
          <h5>
            Feedback Given <span>{data.review.date}</span>
          </h5>
          <div className={styles.solution}>
            {data.review.message ? (
              <div className={styles.link_cont}>
                <h6>Message</h6>
                <hr />
                <div className={styles.msg}>{data.review.message}</div>
              </div>
            ) : (
              ""
            )}

            {data.review.linkText.length > 0 ? (
              <div>
                <h6>Links</h6>
                <hr />
                <div className={styles.link_cont}>
                  {data.review.linkText.map((link, ind) => (
                    <a
                      key={ind}
                      className={styles.link}
                      href={data.review.link[ind]}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {link}
                    </a>
                  ))}
                </div>
              </div>
            ) : (
              ""
            )}

            {data.review.filename.length > 0 ? (
              <div>
                <h6>Files</h6>
                <hr />
                <div className={styles.link_cont}>
                  {data.review.filename.map((file, ind) => (
                    <div
                      key={ind}
                      className={styles.file}
                      onClick={() => {
                        window.open(
                          `https://d1z20pvarkrmrv.cloudfront.net/${data.review.filelink[ind]}`,
                          "_blank"
                        );
                      }}
                    >
                      <span>{file}</span>
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
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <FeedbackModal
        showFeedbackForm={showFeedbackForm}
        closeHandler={() => {
          setShowFeedbackForm(false);
        }}
        data={{
          assignmentId: 123,
          studentId: 12,
          subjectId: 1,
          questionNo: 1,
          question: "abc",
          submissionId: 4,
        }}
      />
    </div>
  );
};

export default CompletedViewCard;

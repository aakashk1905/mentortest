import axios from "axios";
import Cookies from "js-cookie";
// import courses from "../temp/courses";
// import allAssn from "../temp/allAssignments";

export const fetchSubmissions = async () => {
  const token = Cookies.get("mentor_token");
  // console.log(token);

  try {
    const res = await fetch(
      process.env.REACT_APP_API_URL + `/mentor/submission?mentor=${token}`
    );
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

export const fetchCourseSubmissions = async (
  course = "63cac188c796cfd9126be950",
  pageNumber=1
) => {
  const token = Cookies.get("mentor_token");
  console.log(course);
  try {
    const res = await fetch(
      process.env.REACT_APP_API_URL +
        `/mentor/submission/subject?subject_id=${course}&page=${pageNumber}&mentor=${token}`
    );
    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
    return [];
  }

  /*
  return {
    success: true,
    data: [
      {
        assignment_id: "63070b2e85f6f1e1366b48dd",
        topic_name: "Introduction",
        subject_id: 1,
        course: "UI/UX",
        student_name: "Arvind Kumar",
        updatedAt: "2022-10-05T14:22:43.727Z",
        question: [
          {
            updatedAt: "2022-10-05T14:22:43.727Z",
            question: "ABC",
            question_no: 1,
            instructions:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nec condimentum porttitor arcu augue a quam ullamcorper vestibulum volutpat. Nulla sed sed vestibulum, nibh quisque. Sit risus massa ipsum nulla commodo sit. Tortor blandit ut lacus lectus. Fermentum vitae amet tristique morbi praesent tristique. Id purus elementum nisl pretium tellus diam, scelerisque. Egestas tortor et posuere aliquet elit, feugiat cras velit viverra. Posuere neque habitasse elit tristique rutrum pellentesque lectus. Justo porttitor enim, consequat nec luctus. Cursus vulputate a ut convallis. Elementum metus, amet malesuada eget.",
            status: "completed",
            submissions: [
              {
                attempt: 1,
                filelink: ["http://tutedude.com", "http://tutedude.com"],
                filename: ["abc.txt", "def.txt"],
                link: [
                  "https://assignment-backend-tutedude.herokuapp.com/assignment/view?student_id=44&subject_id=1",
                ],
                text: "Test text",
                linkText: ["assignment live link"],
                _id: "633d763f2c3f1e2b0b9ada88",
                addDate: "2022-10-05T12:19:11.855Z",
                updatedAt: "2022-10-05T14:22:43.727Z",
                review:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pretium interdum porta egestas vitae vel. Nec phasellus orci pretium vulputate mi amet, fringilla. Tellus, diam, quis nunc, morbi ullamcorper ut eros, nunc. Magna eget placerat ut cum elementum.",
                reviewLinkText: [
                  "this is a link attached by mentor, it will open on clicking",
                  "This is another link",
                ],
                reviewLinks: ["https://google.com", "https://tutedude.com"],
                reviewFiles: ["https://google.com", "https://tutedude.com"],
                reviewFileText: ["filename1.ext", "filename2.ext"],
                reviewDate: "14-09-22",
              },
              {
                attempt: 2,
                filelink: ["http://tutedude.com"],
                filename: ["abc.txt"],
                link: [
                  "https://assignment-backend-tutedude.herokuapp.com/assignment/view?student_id=44&subject_id=1",
                ],
                text: "Test text for attemp 2",
                linkText: ["assignment live link"],
                _id: "633d763f2c3f1e2b0b9ada88",
                addDate: "2022-10-05T12:19:11.855Z",
                updatedAt: "2022-10-05T14:22:43.727Z",
              },
            ],
            submission_id: "633d763f2c3f1e2b0b9ada86",
          },
          {
            updatedAt: "2022-10-05T14:22:43.727Z",
            question: "WAP to print multiples of 6",
            question_no: 2,
            status: "completed",
            submissions: [
              {
                attempt: 1,
                filelink: [],
                filename: [],
                link: [],
                text: "sanj csh dc sdhgdh adhhiemi cno hirewtmo jhitmo n mohit ",
                linkText: [],
                _id: "63400d37adbf96e5827c341f",
                addDate: "2022-10-07T11:27:51.322Z",
                updatedAt: "2022-10-07T11:44:19.812Z",
              },
            ],
            feedback: [
              {
                attempt: 1,
                filelink: [],
                filename: [],
                link: [],
                text: "sanj csh dc sdhgdh adhhiemi cno hirewtmo jhitmo n mohit ",
                linkText: [],
                _id: "63400d37adbf96e5827c341f",
                addDate: "2022-10-07T11:27:51.322Z",
                updatedAt: "2022-10-07T11:44:19.812Z",
              },
            ],
            submission_id: "63400d37adbf96e5827c341d",
          },
        ],
      },
      {
        assignment_id: "63070b2e85f6f1e1366b48dd",
        topic_name: "Introduction",
        subject_id: 1,
        course: "UI/UX",
        student_name: "Sumit Agarwal",
        updatedAt: "2022-10-05T14:22:43.727Z",
        question: [
          {
            updatedAt: "2022-10-05T14:22:43.727Z",
            question: "This is another question",
            question_no: 1,
            instructions:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nec condimentum porttitor arcu augue a quam ullamcorper vestibulum volutpat. Nulla sed sed vestibulum, nibh quisque. Sit risus massa ipsum nulla commodo sit. Tortor blandit ut lacus lectus. Fermentum vitae amet tristique morbi praesent tristique. Id purus elementum nisl pretium tellus diam, scelerisque. Egestas tortor et posuere aliquet elit, feugiat cras velit viverra. Posuere neque habitasse elit tristique rutrum pellentesque lectus. Justo porttitor enim, consequat nec luctus. Cursus vulputate a ut convallis. Elementum metus, amet malesuada eget.",
            status: "submitted",
            submissions: [
              {
                attempt: 1,
                filelink: ["http://tutedude.com", "http://tutedude.com"],
                filename: ["abc.txt", "def.txt"],
                link: [
                  "https://assignment-backend-tutedude.herokuapp.com/assignment/view?student_id=44&subject_id=1",
                ],
                text: "Test text",
                linkText: ["assignment live link"],
                _id: "633d763f2c3f1e2b0b9ada88",
                addDate: "2022-10-05T12:19:11.855Z",
                updatedAt: "2022-10-05T14:22:43.727Z",
              },
              {
                attempt: 2,
                filelink: ["http://tutedude.com"],
                filename: ["abc.txt"],
                link: [
                  "https://assignment-backend-tutedude.herokuapp.com/assignment/view?student_id=44&subject_id=1",
                ],
                text: "Test text for attemp 2",
                linkText: ["assignment live link"],
                _id: "633d763f2c3f1e2b0b9ada88",
                addDate: "2022-10-05T12:19:11.855Z",
                updatedAt: "2022-10-05T14:22:43.727Z",
              },
            ],
            submission_id: "633d763f2c3f1e2b0b9ada86",
          },
        ],
      },
    ],
  };
  */
};

export const fetchUnrevSubmissions = async (
  course = "63cac188c796cfd9126be950",
  page=1
) => {
  const token = Cookies.get("mentor_token");

  try {
    const res = await fetch(
      process.env.REACT_APP_API_URL +
        `/mentor/submission/pending/subject?mentor=${token}&page=${page}&subject_id=${course}`
    );
    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
    // return {
    //   success: true,
    //   data: [
    //     {
    //       _id: "63ca86558c04cb08393152f6",
    //       student_id: "test@gmail.com",
    //       assignment_id: {
    //         _id: "63ca7d70c35d683bc1157037",
    //         subject_id: "63cac188c796cfd9126be950",
    //         questions: [
    //           {
    //             question_no: 1,
    //             question: "WAP to check if the number is prime",
    //             addedBy: "63ca7bf9c796cfd9126be94e",
    //             _id: "63ca7d70c35d683bc1157038",
    //             addDate: "2023-01-20T11:39:28.345Z",
    //             updatedAt: "2023-01-20T11:39:28.345Z",
    //           },
    //           {
    //             question_no: 2,
    //             question: "WAP to check if the number is even",
    //             addedBy: "63ca7bf9c796cfd9126be94e",
    //             _id: "63ca7d70c35d683bc1157039",
    //             addDate: "2023-01-20T11:39:28.346Z",
    //             updatedAt: "2023-01-20T11:39:28.346Z",
    //           },
    //         ],
    //         topic: "Topic",
    //         addedBy: "63ca7bf9c796cfd9126be94e",
    //         addDate: "2023-01-20T11:39:28.347Z",
    //         updatedAt: "2023-01-20T11:39:28.347Z",
    //         __v: 0,
    //       },
    //       subject_id: "63cac188c796cfd9126be950",
    //       question: {
    //         question_no: 1,
    //         question: "WAP to check if the number is prime",
    //         _id: "63ca86558c04cb08393152f7",
    //         addDate: "2023-01-20T12:17:25.894Z",
    //         updatedAt: "2023-01-20T12:17:25.894Z",
    //       },
    //       status: "resubmit",
    //       submissions: [
    //         {
    //           attempt: 3,
    //           filelink: [],
    //           filename: [],
    //           filecloudlinks: [],
    //           link: [],
    //           text: "another submission",
    //           linkText: [],
    //           review: {
    //             filelink: [],
    //             filename: [],
    //             filecloudlinks: [],
    //             link: [],
    //             text: "demo statement",
    //             linkText: [],
    //             _id: "63da4caab118d71f3d2ba7b1",
    //           },
    //           reviewDate: "2023-02-01T11:27:38.909Z",
    //           _id: "63ca9918ac7c7e39e7f244c2",
    //           updatedAt: "2023-02-01T11:27:38.910Z",
    //           addDate: "2023-02-01T11:27:38.910Z",
    //         },
    //       ],
    //       __v: 0,
    //       student_name: "test",
    //     },
    //     {
    //       _id: "63d9e27cb118d71f3d2ba713",
    //       student_id: "demo@tutedude.com",
    //       assignment_id: {
    //         _id: "63ca7d70c35d683bc1157037",
    //         subject_id: "63cac188c796cfd9126be950",
    //         questions: [
    //           {
    //             question_no: 1,
    //             question: "WAP to check if the number is prime",
    //             addedBy: "63ca7bf9c796cfd9126be94e",
    //             _id: "63ca7d70c35d683bc1157038",
    //             addDate: "2023-01-20T11:39:28.345Z",
    //             updatedAt: "2023-01-20T11:39:28.345Z",
    //           },
    //           {
    //             question_no: 2,
    //             question: "WAP to check if the number is even",
    //             addedBy: "63ca7bf9c796cfd9126be94e",
    //             _id: "63ca7d70c35d683bc1157039",
    //             addDate: "2023-01-20T11:39:28.346Z",
    //             updatedAt: "2023-01-20T11:39:28.346Z",
    //           },
    //         ],
    //         topic: "Topic",
    //         addedBy: "63ca7bf9c796cfd9126be94e",
    //         addDate: "2023-01-20T11:39:28.347Z",
    //         updatedAt: "2023-01-20T11:39:28.347Z",
    //         __v: 0,
    //       },
    //       subject_id: "63cac188c796cfd9126be950",
    //       question: {
    //         question_no: 1,
    //         question: "WAP to check if the number is prime",
    //         _id: "63d9e27cb118d71f3d2ba714",
    //         addDate: "2023-02-01T03:54:36.278Z",
    //         updatedAt: "2023-02-01T03:54:36.278Z",
    //       },
    //       status: "resubmit",
    //       submissions: [
    //         {
    //           attempt: 1,
    //           filelink: [],
    //           filename: [],
    //           filecloudlinks: [],
    //           link: [],
    //           text: "Text 1",
    //           linkText: [],
    //           review: {
    //             filelink: [],
    //             filename: [],
    //             filecloudlinks: [],
    //             link: [],
    //             text: "Retry",
    //             linkText: [],
    //             _id: "63d9e2cfb118d71f3d2ba731",
    //           },
    //           reviewDate: "2023-02-01T03:55:59.238Z",
    //           _id: "63d9e27cb118d71f3d2ba715",
    //           updatedAt: "2023-02-01T03:55:59.240Z",
    //           addDate: "2023-02-01T03:55:59.240Z",
    //         },
    //       ],
    //       __v: 0,
    //       student_name: "Demo",
    //     },
    //     {
    //       _id: "63dbff12b118d71f3d2ba7fd",
    //       student_id: "test@gmail.com",
    //       assignment_id: {
    //         _id: "63ca7d70c35d683bc1157037",
    //         subject_id: "63cac188c796cfd9126be950",
    //         questions: [
    //           {
    //             question_no: 1,
    //             question: "WAP to check if the number is prime",
    //             addedBy: "63ca7bf9c796cfd9126be94e",
    //             _id: "63ca7d70c35d683bc1157038",
    //             addDate: "2023-01-20T11:39:28.345Z",
    //             updatedAt: "2023-01-20T11:39:28.345Z",
    //           },
    //           {
    //             question_no: 2,
    //             question: "WAP to check if the number is even",
    //             addedBy: "63ca7bf9c796cfd9126be94e",
    //             _id: "63ca7d70c35d683bc1157039",
    //             addDate: "2023-01-20T11:39:28.346Z",
    //             updatedAt: "2023-01-20T11:39:28.346Z",
    //           },
    //         ],
    //         topic: "Topic",
    //         addedBy: "63ca7bf9c796cfd9126be94e",
    //         addDate: "2023-01-20T11:39:28.347Z",
    //         updatedAt: "2023-01-20T11:39:28.347Z",
    //         __v: 0,
    //       },
    //       subject_id: "63cac188c796cfd9126be950",
    //       question: {
    //         question_no: 1,
    //         question: "WAP to check if the number is prime",
    //         _id: "63dbff12b118d71f3d2ba7fe",
    //         addDate: "2023-02-02T18:21:06.568Z",
    //         updatedAt: "2023-02-02T18:21:06.568Z",
    //       },
    //       status: "submitted",
    //       submissions: [
    //         {
    //           attempt: 1,
    //           filelink: [],
    //           filename: [],
    //           filecloudlinks: [],
    //           link: [],
    //           linkText: [],
    //           _id: "63dbff12b118d71f3d2ba7ff",
    //           addDate: "2023-02-02T18:21:06.568Z",
    //           updatedAt: "2023-02-02T18:21:06.568Z",
    //         },
    //       ],
    //       __v: 0,
    //       student_name: "test",
    //     },
    //   ],
    // };
  }
};

export const filterCourses = (submissions) => {
  const courses = [];

  submissions.forEach((sub) => {
    if (!courses.includes(sub.course)) {
      courses.push(sub.course);
    }
  });

  return courses;
};

export const fetchAssignments = async (course, pageNumber) => {
  // return allAssn.data;
  console.log("in ad fA, pageNumber = ",pageNumber);
  const res = await axios.get(
    course
      ? `https://api.tutedude.com/assignment/submission/subject?subject_id=${course}&page=${pageNumber}`
      : "https://api.tutedude.com/assignment/assignment/all"
  );

  if (!res.data.success) return [];

  const data = res.data.data;
  if (course) return data;

  return [
    {
      course: "UI/UX",
      uploadedBy: "",
      uploadDate: "",
    },
    {
      course: "UI/UX",
      uploadedBy: "",
      uploadDate: "",
    },
    {
      course: "UI/UX",
      uploadedBy: "",
      uploadDate: "",
    },
    {
      course: "UI/UX",
      uploadedBy: "",
      uploadDate: "",
    },
    {
      course: "UI/UX",
      uploadedBy: "",
      uploadDate: "",
    },
    {
      course: "UI/UX",
      uploadedBy: "",
      uploadDate: "",
    },
  ];
};

export const getAllCourses = async () => {
  // return courses.data;

  const res = await fetch(process.env.REACT_APP_API_URL + "/course/all");
  const data = (await res.json()).data;
  return data;
};

export const filterStudents = async (submissions) => {
  const studentName = [];
  const studentId = [];
  const students = [];

  // submissions.forEach((sub) => {
  //   if (!studentId.includes(sub.student_id)) {
  //     studentId.push(sub.student_id);
  //     studentName.push(sub.student_name ? sub.student_name : sub.student_id);
  //     students.push({
  //       id: sub.student_id,
  //       name: sub.student_name ? sub.student_name : sub.student_id,
  //       subject: sub.subject ? sub.subject : "UI/UX",
  //     });
  //   }
  // });

  // console.log(submissions);
  for (const sub of submissions) {
    if (!studentId.includes(sub.student_id)) {
      const p = await getPercentage(sub.student_id);
      // console.log(p);
      studentId.push(sub.student_id);
      studentName.push(sub.student_name ? sub.student_name : sub.student_id);
      students.push({
        id: sub.student_id,
        name: sub.student_name ? sub.student_name : sub.student_id,
        subject: sub.subject ? sub.subject : "UI/UX",
        progress: p,
      });
    }
  }

  return students;
};

export const getPercentage = async (studentId) => {
  const token = Cookies.get("mentor_token");
  const endpoint = `/mentor/submission/student?student_id=${studentId}`;
  let completed = 0,
    total = 0;
  try {
    const res = await fetch(process.env.REACT_APP_API_URL + endpoint);
    const data = await res.json();
    data.data.forEach((sub) => {
      total++;
      if (sub.status === "completed") completed++;
    });
    // console.log(completed);
  } catch (err) {
    console.log(err);
    return 0;
  }

  return total === 0 ? 0 : completed / total;
};

export const getCourses = () => {
  return [{ name: "UI/UX", id: "63cac188c796cfd9126be950" }];
};

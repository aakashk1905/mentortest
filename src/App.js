import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "./components/Layout";
import LoginProvider from "./components/LoginProvider";
import Assignment from "./pages/Assignment";
import AssignmentLibrary from "./pages/AssignmentLibrary";
import AssignmentLibratyCourse from "./pages/AssignmentLibratyCourse";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import { CourseProvider } from "./utils/CoursesContext";

function App() {
  return (
    <LoginProvider>
      <CourseProvider>
        <RouterProvider
          router={createBrowserRouter(
            createRoutesFromElements(
              <Route path="" element={<Layout />} errorElement={<ErrorPage />}>
                <Route path="/testmen/">
                  <Route path="/testmen/" element={<Home />} />
                  <Route
                    path="/testmen/assignments"
                    element={<AssignmentLibrary />}
                  />
                  <Route
                    path="/testmen/assignments/:course"
                    element={<AssignmentLibratyCourse />}
                  />
                  <Route path="/testmen/:course" element={<Assignment />} />
                </Route>
              </Route>
            )
          )}
        />
      </CourseProvider>
    </LoginProvider>
  );
}

export default App;

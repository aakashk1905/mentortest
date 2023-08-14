import React from "react";
import { useRouteError } from "react-router";

const ErrorPage = ({ notFound }) => {
  const error = useRouteError();
  return (
    <div>
      <h2>Oops!</h2>
      <p>Sorry, an unexpected error has occurred.</p>
      {notFound ? (
        <p>
          <i>Page Not Found</i>
        </p>
      ) : (
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
      )}
    </div>
  );
};

export default ErrorPage;

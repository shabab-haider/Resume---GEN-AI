import React from "react";

const AppNavbar = () => {
  const pathName = window.location.pathname;
  const isInterviewPage = pathName.startsWith("/interview/");

  return (
    <header className="app-nav">
      <div className="app-nav__brand">Interview AI</div>
      <nav className="app-nav__links">
        <a
          href="/"
          className={`app-nav__link ${pathName === "/" ? "app-nav__link--active" : ""}`}
        >
          Home
        </a>
        {isInterviewPage && (
          <a href={pathName} className="app-nav__link app-nav__link--active">
            Interview
          </a>
        )}
        <a href="/logout" className="app-nav__link">
          Logout
        </a>
      </nav>
    </header>
  );
};

export default AppNavbar;

import React, { createContext, useState } from "react";

export const InterviewContextData = createContext();

const InterviewContext = ({ children }) => {
  const [interviewReport, setInterviewReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [allReports, setAllReports] = useState([]);
  return (
    <InterviewContextData.Provider
      value={{
        interviewReport,
        setInterviewReport,
        loading,
        setLoading,
        allReports,
        setAllReports,
      }}
    >
      {children}
    </InterviewContextData.Provider>
  );
};

export default InterviewContext;

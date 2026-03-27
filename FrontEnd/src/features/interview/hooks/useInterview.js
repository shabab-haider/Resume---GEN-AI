import { useContext, useEffect } from "react";
import {
  downloadReport,
  genrateInterviewReport,
  getAllReports,
  getInterviewReportById,
} from "../services/interview.api";
import { InterviewContextData } from "../Interview.context";
import { useParams } from "react-router";

export function useInterview() {
  const context = useContext(InterviewContextData);
  const { id } = useParams();

  const {
    interviewReport,
    setInterviewReport,
    loading,
    setLoading,
    allReports,
    setAllReports,
  } = context;

  const genrateReport = async ({
    resumeFile,
    selfDescription,
    jobDescription,
  }) => {
    setLoading(true);
    let data = null;
    try {
      data = await genrateInterviewReport({
        resumeFile,
        selfDescription,
        jobDescription,
      });
      setInterviewReport(data.interviewReport);
    } catch (err) {
      console.log("error: ", err.message);
    } finally {
      setLoading(false);
    }
    return data.interviewReport;
  };

  const getReportById = async (id) => {
    let data = null;
    setLoading(true);
    try {
      data = await getInterviewReportById(id);
      setInterviewReport(data.interviewReport);
    } catch (err) {
      console.log("error: ", err.message);
    } finally {
      setLoading(false);
    }
    return data.interviewReport;
  };

  const getReports = async () => {
    let data = null;
    setLoading(true);
    try {
      data = await getAllReports();
      setAllReports(data.interviewReports);
    } catch (err) {
      console.log("error: ", err.message);
    } finally {
      setLoading(false);
    }
    return data.interviewReports;
  };

  const handleDownloadResume = async (id) => {
    setLoading(true);

    try {
      
      const blob = await downloadReport(id);
     
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Resume_${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.log("error: ", err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    handleDownloadResume,
    interviewReport,
    loading,
    allReports,
    genrateReport,
    getReportById,
    getReports,
  };
}

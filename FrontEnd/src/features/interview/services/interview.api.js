import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/api/interview`,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const genrateInterviewReport = async ({
  resumeFile,
  selfDescription,
  jobDescription,
}) => {
  try {
    const formData = new FormData();
    formData.append("selfDescription", selfDescription);
    formData.append("jobDescription", jobDescription);
    formData.append("resume", resumeFile);

    const response = await api.post("/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (err) {
    console.log("error: ", err.message);
  }
};

export const getInterviewReportById = async (id) => {
  try {
    const response = await api.get(`/report/${id}`);
    return response.data;
  } catch (err) {
    console.log("error: ", err.message);
  }
};
export const getAllReports = async () => {
  try {
    const response = await api.get("/allReports");
    return response.data;
  } catch (err) {
    console.log("error: ", err.message);
  }
};

export const downloadReport = async (id) => {
  try {
    
    const response = await api.get(`/generateResumePdf/${id}`, {
      responseType: "blob",
    });
    
    return response.data;
  } catch (err) {
    console.log("error: ", err.message);
  }
};

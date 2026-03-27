const pdfParse = require("pdf-parse");
const {
  generateInterviewReport,
  generateResumeHtml,
  htmlToPdf,
} = require("../services/ai.service");
const interviewReportModel = require("../models/interviewReport.model");

/**
 * @name interviewReportGenrator
 * @description Generates an interview report by analyzing the user's resume, self description, and job description. Parses the uploaded PDF file, sends the data to AI for analysis, and stores the generated report in the database.
 * @returns {Object} JSON response with generated interview report
 */
async function interviewReportGenrator(req, res) {
  try {
    const user = req.user;
    if (!req.file) {
      return res.status(400).json({
        error: "No file uploaded. Ensure the form field name is 'resume'.",
      });
    }
    const data = await pdfParse(req.file.buffer);
    const resume = data.text;
    const { selfDescription, jobDescription } = req.body;

    const interviewReportByAI = await generateInterviewReport(
      resume,
      selfDescription,
      jobDescription,
    );
    const interviewReport = await interviewReportModel.create({
      resume,
      selfDescription,
      jobDescription,
      ...interviewReportByAI,
      user: user.id,
    });
    res.status(201).json({
      message: "interview report genrated successfully",
      interviewReport,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

/**
 * @name interviewReportGetById
 * @description Find a specific report based on provided id and loggedIn user
 * @returns {Object} JSON response with interview report fetched based on provided id and loggedIn user
 */

async function interviewReportGetById(req, res) {
  try {
    const { reportId } = req.params;
    const { id } = req.user;
    if (!reportId) {
      res.status(404).json({ message: "report not found" });
    }
    const interviewReport = await interviewReportModel.find({
      _id: reportId,
      user: id,
    });
    if (!interviewReport) {
      res.status(404).json({ message: "report not found" });
    }
    res.status(200).json({
      message: "report found successfully",
      interviewReport,
    });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

/**
 * @name getAllReports
 * @description Find a specific report based on provided id and loggedIn user
 * @returns {Object} JSON response with interview report fetched based on provided id and loggedIn user
 */

async function getAllReports(req, res) {
  try {
    const interviewReports = await interviewReportModel
      .find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .select(
        "-resume -selfDescription -jobDescription -__v -updatedAt  -user -preparationPlan -skillGaps -behavioralQuestions -technicalQuestions",
      );
    res
      .status(200)
      .json({ message: "reports fetcehd sucessfully", interviewReports });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

/**
 * @name generateResumePdf
 * @description Generate resume PDF based on provided reportId and loggedIn user. Fetch the interview report based on provided reportId and loggedIn user, then genrate resume PDF with the help of AI and send the PDF as response.
 * @returns {Object} PDF file as response
 */

async function generateResumePdf(req, res) {
  console.log("generateResumePdf called");
  const { reportId } = req.params;
  try {
    const interviewReport = await interviewReportModel.findOne({
      _id: reportId,
    });
    if (!interviewReport) {
      res.status(404).json({
        message: "report not found",
      });
    }

    const { resume, selfDescription, jobDescription } = interviewReport;
    console.log({ resume, selfDescription, jobDescription });
    const htmlResume = await generateResumeHtml({
      resume,
      selfDescription,
      jobDescription,
    });
    console.log("Generated HTML resume:", htmlResume);
    const pdfBuffer = await htmlToPdf(htmlResume);
    console.log(pdfBuffer);
    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=resume_${reportId}.pdf`,
    });
    res.send(pdfBuffer);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

module.exports = {
  interviewReportGenrator,
  interviewReportGetById,
  getAllReports,
  generateResumePdf,
};

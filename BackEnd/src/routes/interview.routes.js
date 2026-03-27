const { Router } = require("express");
const { authUser } = require("../middlewares/auth.middleware");
const upload = require("../middlewares/file.middleware");
const interviewController = require("../Controllers/interview.controller");
const interviewRouter = Router();

/**
 * @route /api/interview
 * @description Accept resume file, self description, job description and genrate interview report with the help of AI. Also store tis report in database
 * @access Private - Requires authenticated user
 */
interviewRouter.post(
  "/",
  authUser,
  upload.single("resume"),
  interviewController.interviewReportGenrator,
);

/**
 * @route GET /api/interview/report/:reportId
 * @description get interview report by Id
 * @access Private - Required authenticated user
 */

interviewRouter.get(
  "/report/:reportId",
  authUser,
  interviewController.interviewReportGetById,
);

/**
 * @route GET /api/interview/allReports
 * @description get all interview reports of a loggedIn user.
 * @access Private - Required authenticated user
 */

interviewRouter.get(
  "/allReports",
  authUser,
  interviewController.getAllReports,
);

/**
 * @route GET /api/interview/generateResumePdf/:reportId
 * @description Generate resume PDF based on provided reportId and loggedIn user. Fetch the interview report based on provided reportId and loggedIn user, then genrate resume PDF with the help of AI and send the PDF as response.
 * @access Private - Required authenticated user
 */
interviewRouter.get(
  "/generateResumePdf/:reportId",
  authUser,
  interviewController.generateResumePdf,
);

module.exports = interviewRouter;

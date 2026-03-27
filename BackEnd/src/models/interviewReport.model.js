const mongoose = require("mongoose");

const technicalQuestionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    intention: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
  },
  {
    _id: false,
  },
);
const behavioralQuestionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    intention: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
  },
  {
    _id: false,
  },
);

const skillGapSchema = new mongoose.Schema(
  {
    skill: {
      type: String,
      required: true,
    },
    severity: {
      type: String,
      required: true,
      enum: ["low", "medium", "high"],
    },
  },
  {
    _id: false,
  },
);
const preparationPlanSchema = new mongoose.Schema(
  {
    day: {
      type: String,
      required: true,
    },
    focus: {
      type: String,
      required: true,
    },
    tasks: [
      {
        type: String,
        required: true,
      },
    ],
  },
  {
    _id: false,
  },
);

const interviewReportSchema = new mongoose.Schema(
  {
    jobDescription: {
      type: String,
      required: [true, "job description is required"],
    },
    resume: {
      type: String,
    },
    selfDescription: {
      type: String,
    },
    technicalQuestions: [technicalQuestionSchema],
    behavioralQuestions: [behavioralQuestionSchema],
    skillGaps: [skillGapSchema],
    preparationPlan: [preparationPlanSchema],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    matchScore: {
      type: Number,
      min: 0,
      max: 100,
    },
    title: {
      type: String,
      required: [true, "Job title is required"],
    },
  },
  {
    timestamps: true,
  },
);

const interviewReportModel = new mongoose.model(
  "interviewReports",
  interviewReportSchema,
);
module.exports = interviewReportModel;

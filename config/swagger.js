import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Ski Tracker API",
      version: "1.0.0",
      description: "API for tracking ski and snowboard days",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Local server",
      },
    ],
    components: {
      schemas: {
        SkiDay: {
          type: "object",
          required: [
            "date",
            "location",
            "runs",
            "topSpeed",
            "verticalFeet",
            "activityType",
          ],
          properties: {
            _id: {
              type: "string",
              description: "Auto-generated MongoDB ID",
              example: "6712c92d4b8a9f1ab42a1234",
            },
            date: {
              type: "string",
              format: "date",
              example: "2025-02-15",
            },
            location: {
              type: "string",
              example: "Jackson Hole, WY",
            },
            runs: {
              type: "number",
              example: 12,
            },
            topSpeed: {
              type: "number",
              example: 45.3,
            },
            verticalFeet: {
              type: "number",
              example: 12500,
            },
            activityType: {
              type: "string",
              enum: ["Skiing", "Snowboarding", "Other"],
              example: "Skiing",
            },
            notes: {
              type: "string",
              example: "Great snow and clear skies!",
            },
          },
        },
      },
    },
  },
  apis: ["./routes/*.js"], // 👈 make sure this path points to your route files
};

const swaggerSpec = swaggerJSDoc(options);

export function swaggerDocs(app) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log("📘 Swagger docs available at http://localhost:3000/api-docs");
}

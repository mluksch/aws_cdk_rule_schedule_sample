import { ScheduledHandler } from "aws-lambda";

export const handler: ScheduledHandler = async (event, ctx) => {
  console.log("ScheduledHandler", event);
};
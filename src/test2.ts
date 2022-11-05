import { APIGatewayProxyHandler } from "aws-lambda";
import * as _ from "lodash";

const CHOICES = ["Schere", "Stein", "Papier"];

export const handler: APIGatewayProxyHandler = async (ev, ctx) => {
  return {
    statusCode: 200,
    body: _.shuffle(CHOICES)[0],
  };
};

export const generateBody = () => {
  return _.shuffle(CHOICES)[0];
};

console.log(generateBody());

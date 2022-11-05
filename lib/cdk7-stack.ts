import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { Schedule } from "aws-cdk-lib/aws-events";
import * as Esbuild from "esbuild";
import * as path from "path";
import { Architecture, Code, Runtime } from "aws-cdk-lib/aws-lambda";
import { LambdaIntegration } from "aws-cdk-lib/aws-apigateway";
import __ = require("lodash/fp/__");

export class Cdk7Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, env: string) {
    super(scope, id);

    Esbuild.buildSync({
      sourcemap: true,
      bundle: true,
      outdir: path.join(__dirname, "../dist"),
      entryPoints: [path.join(__dirname, "../src/test.ts")],
      target: "node16",
      platform: "node",
    });

    const testHandler = new cdk.aws_lambda.Function(this, "test-handler", {
      functionName: "test-handler",
      runtime: cdk.aws_lambda.Runtime.NODEJS_16_X,
      code: cdk.aws_lambda.Code.fromAsset(path.join(__dirname, "../dist")),
      handler: "test.handler",
      architecture: Architecture.X86_64,
    });

    const rule = new cdk.aws_events.Rule(this, "test-rule", {
      targets: [new cdk.aws_events_targets.LambdaFunction(testHandler)],
      schedule: Schedule.cron({
        day: "*",
        hour: "5",
        minute: "5",
        year: "*",
        month: "*",
      }),
    });

    Esbuild.buildSync({
      sourcemap: true,
      bundle: true,
      target: "node16",
      platform: "node",
      outdir: path.join(__dirname, "../dist"),
      entryPoints: [path.join(__dirname, "../src/test2.ts")],
    });

    const gameLambda = new cdk.aws_lambda.Function(this, "game-lambda", {
      functionName: "game-lambda",
      code: Code.fromAsset(path.join(__dirname, "../dist")),
      handler: "test2.handler",
      runtime: Runtime.NODEJS_16_X,
      architecture: Architecture.X86_64,
    });

    const restApi = new cdk.aws_apigateway.RestApi(this, "test-api", {
      restApiName: "test-api",
      deployOptions: {
        stageName: env,
      },
    });
    restApi.root
      .addResource("health")
      .addMethod("get", new LambdaIntegration(gameLambda));
    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'Cdk7Queue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}

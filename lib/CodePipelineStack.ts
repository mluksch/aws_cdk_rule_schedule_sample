import { Stack } from "aws-cdk-lib";
import { Construct } from "constructs";
import {
  CodeBuildStep,
  CodePipeline,
  CodePipelineSource,
} from "aws-cdk-lib/pipelines";
import { AppStage } from "./AppStage";

export class CodePipelineStack extends Stack {
  constructor(parent: Construct, id: string) {
    super(parent, id);
    const pipeline = new CodePipeline(this, "rule-schedule-pipeline", {
      pipelineName: "rule-schedule-pipeline",
      crossAccountKeys: false,
      selfMutation: true,
      synth: new CodeBuildStep("rule-schedule", {
        primaryOutputDirectory: "cdk.out",
        commands: ["yarn install", "yarn run build", "npx cdk synth"],
        input: CodePipelineSource.gitHub(
          "mluksch/aws_cdk_rule_schedule_sample",
          "master"
        ),
      }),
    });

    // create a codepipeline for deploying a lambda
    const staging = pipeline.addStage(
      new AppStage(this, "staging", {
        stageName: "staging",
      })
    );
    // staging.addPost(new ManualApprovalStep("Deploy Production"));
    // const production = pipeline.addStage(new AppStage(this, "production"));
  }
}

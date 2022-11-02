import { Stack } from "aws-cdk-lib";
import { Construct } from "constructs";
import {
  CodeBuildStep,
  CodePipeline,
  CodePipelineSource,
  ManualApprovalStep,
  ShellStep,
} from "aws-cdk-lib/pipelines";
import { AppStage } from "./AppStage";

export class CodePipelineStack extends Stack {
  constructor(parent: Construct, id: string) {
    super(parent, id);
    const pipeline = new CodePipeline(this, "rule-schedule-pipeline", {
      pipelineName: "rule-schedule-pipeline",
      synth: new CodeBuildStep("rule-schedule", {
        commands: ["yarn install", "yarn run build", "npx cdk synth"],
        input: CodePipelineSource.gitHub(
          "mluksch/aws_cdk_rule_schedule_sample",
          "master"
        ),
      }),
    });

    const staging = pipeline.addStage(
      new AppStage(this, "scheduler-test-staging", "staging")
    );
    staging.addPost(new ManualApprovalStep("Deploy Production"));
    const production = pipeline.addStage(
      new AppStage(this, "scheduler-test-production", "production")
    );
  }
}

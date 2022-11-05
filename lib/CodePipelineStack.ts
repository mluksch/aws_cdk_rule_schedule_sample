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
        commands: [
          "yarn install",
          "yarn run build",
          "yarn run test",
          "npx cdk synth",
        ],
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
    /*
    const topic = new Topic(this, "finshed", {
      topicName: "deploy-finished",
    });

    topic.addSubscription(
      new EmailSubscription(
        SecretValue.secretsManager("deployment-mail-adress").unsafeUnwrap()
      )
    );
    const notify = new ShellStep("notify", {
      env: {
        TOPIC: topic.topicArn,
      },
      commands: [
        "echo $TOPIC",
        'aws sns publish --subject "Deployment finished" --message "Deployment finished" --topic-arn "$TOPIC"',
      ],
    });

    topic.grantPublish(role);
    staging.addPost(notify); */
  }
}

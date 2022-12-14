import { Stage, StageProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { Cdk7Stack } from "./cdk7-stack";

export class AppStage extends Stage {
  constructor(
    parent: Construct,
    env: "staging" | "production",
    props: StageProps
  ) {
    super(parent, env, props);
    const stack = new Cdk7Stack(this, `schedule-test-stack`, env);
  }
}

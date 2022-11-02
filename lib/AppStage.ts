import { Stage } from "aws-cdk-lib";
import { Construct } from "constructs";
import { Cdk7Stack } from "./cdk7-stack";

export class AppStage extends Stage {
  constructor(parent: Construct, env: "staging" | "production") {
    super(parent, `stage-${env}`);
    new Cdk7Stack(this, `stack-${env}`, {
      env,
    });
  }
}

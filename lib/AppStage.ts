import { Stage } from "aws-cdk-lib";
import { Construct } from "constructs";
import { Cdk7Stack } from "./cdk7-stack";

export class AppStage extends Stage {
  constructor(parent: Construct, id: string, env: "staging" | "production") {
    super(parent, id);
    new Cdk7Stack(this, `${id}-${env}`, {
      env,
    });
  }
}

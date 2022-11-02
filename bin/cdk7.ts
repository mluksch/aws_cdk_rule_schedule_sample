#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { CodePipelineStack } from "../lib/CodePipelineStack";

const app = new cdk.App();
new CodePipelineStack(app, "schedule-test-pipeline");

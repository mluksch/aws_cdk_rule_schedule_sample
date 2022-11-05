# AWS CDK Sample for how to set up Cronjobs (Rule with a Schedule)

- ``new cdk.aws_events.Rule(...)``
- ``Schedule.cron(...)``
- ``new cdk.aws_events_targets.LambdaFunction(testHandler)``

# CI-Pipeline using AWS-Codepipeline + CDK
## (1) CodePipeline vs (2) Pipelines in CDK
### (1) CodePipelines are good for Monorepos
- Video: https://www.youtube.com/watch?v=EVDw0sdxaec
- Tutorial: https://github.com/aws/aws-cdk/blob/v1-main/packages/@aws-cdk/pipelines/ORIGINAL_API.md
- AWS-Codepipelines with CDK are only useful for Monorepos (i.e. each Repo must define their on Codepipeline within the repo) because you need to declare your own Stage-class where all the Stacks are instantiated.

### (2) Pipelines are good for having the CI-Repo separated from the Code-Repo
- Video: https://www.udemy.com/course/create-continuous-delivery-pipelines-on-aws-using-cdk
- You can have a separate Repo for the CI-Pipeline here from the Repo where all the code is stored 
# AWS CDK Sample for how to set up Cronjobs (Rule with a Schedule)

- ``new cdk.aws_events.Rule(...)``
- ``Schedule.cron(...)``
- ``new cdk.aws_events_targets.LambdaFunction(testHandler)``

# CI-Pipeline using AWS-Codepipeline + CDK

- Tutorial: https://github.com/aws/aws-cdk/blob/v1-main/packages/@aws-cdk/pipelines/ORIGINAL_API.md
- AWS-Codepipelines with CDK are only useful for Monorepos (i.e. each Repo must define their on Codepipeline within the repo) because you need to declare your own Stage-class where all the Stacks are instantiated.
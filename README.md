# AWS CDK Sample for how to set up Cronjobs (Rule with a Schedule)

- ``new cdk.aws_events.Rule(...)``
- ``Schedule.cron(...)``
- ``new cdk.aws_events_targets.LambdaFunction(testHandler)``
import * as cdk from 'aws-cdk-lib';
import { StackProps } from 'aws-cdk-lib';
import { Dashboard, GraphWidget, Metric } from 'aws-cdk-lib/aws-cloudwatch';
import { Construct } from 'constructs';

export interface MonitoringStackProps extends StackProps {
    stageName?: string;
    dashboardName?: string;
}

export class MonitoringStack extends cdk.Stack {

    protected readonly lambdaDashboard: Dashboard;

    protected readonly invocations = new Metric({
        namespace: "AWS/Lambda",
        metricName: "Invocations",
        statistic: "sum"
    });

    protected readonly duration = new Metric({
        namespace: "AWS/Lambda",
        metricName: "Duration",
        statistic: "min"
    });

    protected readonly errors = new Metric({
        namespace: "AWS/Lambda",
        metricName: "Errors",
        statistic: "sum"
    });

    protected readonly throttles = new Metric({
        namespace: "AWS/Lambda",
        metricName: "Throttles",
        statistic: "sum"
    });

    protected readonly provisionedConcurrencySpillovers = new Metric({
        namespace: "AWS/Lambda",
        metricName: "ProvisionedConcurrencySpilloverInvocations",
        statistic: "sum"
    });

    protected readonly concurrentExecutions = new Metric({
        namespace: "AWS/Lambda",
        metricName: "ConcurrentExecutions",
        statistic: "sum"
    });

    protected readonly provisionedConcurrentExecutions = new Metric({
        namespace: "AWS/Lambda",
        metricName: "ProvisionedConcurrentExecutions",
        statistic: "sum"
    });

    protected readonly provisionedConcurrencyUtilization = new Metric({
        namespace: "AWS/Lambda",
        metricName: "ProvisionedConcurrencyUtilization",
        statistic: "sum"
    });

    constructor(scope: Construct, id: string, props: MonitoringStackProps) {
        super(scope, id);

        this.lambdaDashboard = new Dashboard(this, (props?.dashboardName || ""), {
            dashboardName: (props?.stageName || "") + (props?.dashboardName || "ProdDashboard")
        });
    }

    // adds one row to dashboard for each lambda function
    public addLambda(functionName: string, displayName: string) {

        const dimensionsMap = {
            "FunctionName": functionName
        };

        this.lambdaDashboard.addWidgets(
            new GraphWidget({
                title: displayName + " Invocations",
                left: [
                    this.invocations.with({
                        dimensionsMap: dimensionsMap,
                    }),

                ]
            }),

            new GraphWidget({
                title: displayName + " Duration",
                left: [
                    this.duration.with({
                        dimensionsMap: dimensionsMap,
                    }),
                    this.duration.with({
                        dimensionsMap: dimensionsMap,
                        statistic: "avg"
                    }),
                    this.duration.with({
                        dimensionsMap: dimensionsMap,
                        statistic: "max"
                    }),
                ]
            }),

            new GraphWidget({
                title: displayName + " Errors",
                left: [
                    this.errors.with({
                        dimensionsMap: dimensionsMap,
                    }),
                    this.throttles.with({
                        dimensionsMap: dimensionsMap,
                    }),
                    this.provisionedConcurrencySpillovers.with({
                        dimensionsMap: dimensionsMap,
                    })
                ]
            }),

            new GraphWidget({
                title: displayName + " ConcurrentExecutions",
                right: [
                    this.concurrentExecutions.with({
                        dimensionsMap: dimensionsMap,
                    }),
                    this.provisionedConcurrentExecutions.with({
                        dimensionsMap: dimensionsMap,
                    }),
                    this.provisionedConcurrencyUtilization.with({
                        dimensionsMap: dimensionsMap,
                    })
                ]
            }),
        );
    }
}
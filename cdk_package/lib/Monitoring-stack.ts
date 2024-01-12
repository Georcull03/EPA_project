import * as cdk from 'aws-cdk-lib';
import { StackProps } from 'aws-cdk-lib';
import { Dashboard, GraphWidget, Metric } from 'aws-cdk-lib/aws-cloudwatch';
import { Construct } from 'constructs';

export interface MonitoringStackProps extends StackProps {
    stageName?: string;
    dashboardName?: string;
}

export class MonitoringStack extends cdk.Stack {

    protected readonly Dashboard: Dashboard;

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

    protected readonly apiGateway5XXErrors = new Metric({
        namespace: "AWS/ApiGateway",
        metricName: "5XXError",
        statistic: "sum"
    });

    protected readonly apiGateway4XXErrors = new Metric({
        namespace: "AWS/ApiGateway",
        metricName: "4XXError",
        statistic: "sum"
    });

    // Metrics for DynamoDB
    protected readonly dynamoDBReadCapacity = new Metric({
        namespace: "AWS/DynamoDB",
        metricName: "ConsumedReadCapacityUnits",
        statistic: "sum"
    });

    protected readonly dynamoDBWriteCapacity = new Metric({
        namespace: "AWS/DynamoDB",
        metricName: "ConsumedWriteCapacityUnits",
        statistic: "sum"
    });

    constructor(scope: Construct, id: string, props: MonitoringStackProps) {
        super(scope, id);

        this.Dashboard = new Dashboard(this, (props?.dashboardName || ""), {
            dashboardName: (props?.stageName || "") + (props?.dashboardName || "ProdDashboard")
        });
    }

    // adds one row to dashboard for each lambda function
    public addLambda(functionName: string, displayName: string) {

        const dimensionsMap = {
            "FunctionName": functionName
        };

        this.Dashboard.addWidgets(
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
    public addApi(restApiName: string, displayName: string) {

        const dimensionsMap = {
            "FunctionName": restApiName
        };

        new GraphWidget({
            title: displayName + " API Gateway 5XX Errors",
            left: [
                this.apiGateway5XXErrors.with({
                    dimensionsMap: dimensionsMap,
                }),
            ]
        });

        new GraphWidget({
            title: displayName + " API Gateway 4XX Errors",
            left: [
                this.apiGateway4XXErrors.with({
                    dimensionsMap: dimensionsMap,
                }),
            ]
        });
    };

    public addDyanmoDB(tableName: string, displayName: string) {

        const dimensionsMap = {
            "FunctionName": tableName
        };

        new GraphWidget({
            title: displayName + " DynamoDB Read Capacity",
            left: [
                this.dynamoDBReadCapacity.with({
                    dimensionsMap: dimensionsMap,
                }),
            ]
        });

        new GraphWidget({
            title: displayName + " DynamoDB Write Capacity",
            left: [
                this.dynamoDBWriteCapacity.with({
                    dimensionsMap: dimensionsMap,
                }),
            ]
        });
};
}
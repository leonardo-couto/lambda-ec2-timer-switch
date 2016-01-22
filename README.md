# AWS EC2 timer switch
Automatically stop and start Amazon EC2 instances using [AWS Lambda](https://aws.amazon.com/lambda/).

The official way to schedule start and stop times for EC2 instances is using AWS Data Pipeline, as described [here](https://aws.amazon.com/premiumsupport/knowledge-center/stop-start-ec2-instances/).
This is an alternative way using AWS Lambda.

## Prerequisites

Node.js and npm.

## HOWTO

* **Create an IAM Role (Optional)**
* **Build the zip archives**

  Fork and clone this project.

  Change the INSTANCE_ID in both **lambda-ec2-starter/index.js** and **lambda-ec2-stopper/index.js** files to your EC2 machine instance id.

  Run **npm install** in both **lambda-ec2-starter** and **lambda-ec2-stopper** folder.

  Zip the content of **lambda-ec2-starter** folder to a **starter.zip** file and the content of **lambda-ec2-stopper** to **stopper.zip**.

* **Create a new Lambda function**
* **Append an event source**

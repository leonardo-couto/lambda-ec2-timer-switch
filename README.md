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

  Change the INSTANCE_ID in both `lambda-ec2-starter/index.js` and `lambda-ec2-stopper/index.js` files to your EC2 machine instance id.

  Run `npm install` in both `lambda-ec2-starter` and `lambda-ec2-stopper` folders.

  Zip the content of `lambda-ec2-starter` folder to a **starter.zip** file and the content of `lambda-ec2-stopper` to **stopper.zip**.

* **Create a new Lambda function**

  Open the AWS Lambda console at https://console.aws.amazon.com/lambda/
  
  If a welcome page appears, choose Get Started Now. If the Lambda: Function list page appears, choose Create a Lambda function.
  
  Choose Skip at the bottom the Select blueprint pane.
  
  Choose a name (e.g. ec2-starter) and a description.
  
  For Runtime, choose Node.js.
  
  In Code entry type choose Upload a .ZIP file.
  
  Upload your starter.zip file.
  
  For Role, choose the Lambda execution role you created earlier, LambdaEC2SwitcherRole.
  
  Choose Next and then Create function.
  
  Repeat all the steps above to create a new Lambda function for your stopper.zip file.
  
* **Append an event source**

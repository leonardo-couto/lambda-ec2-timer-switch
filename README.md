# AWS EC2 timer switch
Automatically stop and start Amazon EC2 instances using [AWS Lambda](https://aws.amazon.com/lambda/).

The official way to schedule start and stop times for EC2 instances is using AWS Data Pipeline, as described [here](https://aws.amazon.com/premiumsupport/knowledge-center/stop-start-ec2-instances/).
This is an alternative way using AWS Lambda.

## Prerequisites

Node.js, Npm and Grunt.

## HOWTO

### Create an IAM User (Optional)

  More info about creating IAM users:

  http://docs.aws.amazon.com/general/latest/gr/aws-access-keys-best-practices.html
  
  http://docs.aws.amazon.com/IAM/latest/UserGuide/id_users.html
  
  If you are creating a new user, you need to have at least the following permissions:
  
  ```javascript
  {
      "Version": "2012-10-17",
      "Statement": [
          {
              "Effect": "Allow",
              "Action": [
                  "ec2:Describe*",
                  "ec2:Start*",
                  "ec2:RunInstances",
                  "ec2:Stop*",
                  "iam:CreateRole",
                  "iam:ListRoles",
                  "iam:PassRole",
                  "iam:PutRolePolicy",
                  "lambda:AddPermission",
                  "lambda:CreateFunction",
                  "lambda:GetFunction",
                  "lambda:GetPolicy",
                  "lambda:ListFunctions",
                  "lambda:UpdateFunctionCode"
              ],
              "Resource": "*"
          }
      ]
  }
  ```

### Build the zip archives

  1 - Clone this project.

  2 - In the project root directory run `npm install`.

  3 - Run `grunt build --id=INSTANCE_ID`. Where INSTANCE_ID is the id of your EC2 machine.
  
  This will create a `starter.zip` file and `stopper.zip` in the `target` folder.

  To avoid typing your instance id in the grunt build param you can put it on `config.json` file.
  
  INSTANCE_ID may be a comma separated list of ids to schedule start/shutdown of multiple machines from the same account.
  
### Create an execution role and policy

  1 - Open the IAM console: https://console.aws.amazon.com/iam/.
  
  2 - In the Details area, choose Policies.
  
  3 - Choose Create Policy.
  
  4 - Select Create Your Own Policy.
  
  5 - Choose a name (e.g. `LambdaEC2SwitcherPolicy`) and a description.
  
  6 - Paste the JSON below in the Policy Document text area and then click on Create Policy.
  
  ```javascript
  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Effect": "Allow",
        "Action": [
          "ec2:Describe*",
          "ec2:Start*",
          "ec2:RunInstances",
          "ec2:Stop*",
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ],
        "Resource": ["*"]
      }
    ]
  }
  ```
  
  7 - In the Details area, choose Roles.
  
  8 - Choose Create New Role.
  
  9 - Use `LambdaEC2SwitcherRole` or some similar name to Role Name.
  
  10 - Select AWS Lambda.
  
  11 - Check the `LambdaEC2SwitcherPolicy` box in the policies list (use the filter to find it).
  
  12 - Choose Next Step and then Create Role.

### Create a new Lambda function

  1 - Open the AWS Lambda console at https://console.aws.amazon.com/lambda/.
  
  2 - If a welcome page appears, choose Get Started Now. Else, choose Create a Lambda function.
  
  3 - Choose Skip at the bottom of the Select blueprint pane.
  
  4 - Choose a name (e.g. ec2-starter) and a description.
  
  5 - For Runtime, choose Node.js.
  
  6 - In Code entry type choose Upload a .ZIP file.
  
  7 - Upload your starter.zip file.
  
  8 - For Role, choose the Lambda execution role you created earlier (e.g. `LambdaEC2SwitcherRole`).
  
  9 - Choose Next and then Create function.
  
  10 - Repeat from step 1 to create a new Lambda function for your stopper.zip file.
  
### Append an event source

  1 - Open your Lambda function (`ec2-starter`) at https://console.aws.amazon.com/lambda/.
  
  2 - Choose the Event sources tab.
  
  3 - Click to Add event source.
  
  4 - Choose CloudWatch Events - Schedule for Event source type.
  
  5 - Choose Rule name and description.
  
  6 - Use a cron expression for the Schedule expression, e.g., `cron(0 10 ? * MON-FRI *)` to start your machine every week day at 10am (UTC).
  
  7 - Pick the enable now radio button and Submit.
  
  8 - Repeat from step 1 for the `ec2-stopper` function and choose a shutdown time.

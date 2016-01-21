var AWS = require('aws-sdk');

var ec2 = new AWS.EC2();

exports.handler = function(event, context) {

  var params = {
    InstanceIds: ['INSTANCE_ID'],
    AdditionalInfo: 'Automatic startup (Lambda)',
    DryRun: false
  };

  ec2.startInstances(params, function(err, data) {
    if (err) console.log(err, err.stack);
    else console.log(JSON.stringify(data));
    context.done();
  });

};

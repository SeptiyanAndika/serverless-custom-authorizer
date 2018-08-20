'use strict';

const _generatePolicy = (principalId, effect, resource,customErrorMessage=null) => {
  const authResponse = {};
  authResponse.principalId = principalId;
  if (effect && resource) {
    const policyDocument = {};
    policyDocument.Version = '2012-10-17';
    policyDocument.Statement = [];
    policyDocument.Statement.push({
      Action : 'execute-api:Invoke',
      Effect: effect,
      Resource:resource,
    })
    authResponse.policyDocument = policyDocument;
  }
  if(effect.toLowerCase()=='deny'&& customErrorMessage!=null){
    authResponse.context = {
      "customErrorMessage": customErrorMessage ,
    };
  }

  return authResponse;
};

module.exports.private = async (event, context, callback) => {
   const response = {
      statusCode: 200,
      headers: {
        /* Required for CORS support to work */
        'Access-Control-Allow-Origin': '*',
        /* Required for cookies, authorization headers with HTTPS */
        'Access-Control-Allow-Credentials': true,
    },
      body: JSON.stringify({
        message: 'Private API',
      })
   };
   return response
};

module.exports.public = async (event, context, callback) => {
  const response = {
     statusCode: 200,
     headers: {
       /* Required for CORS support to work */
       'Access-Control-Allow-Origin': '*',
       /* Required for cookies, authorization headers with HTTPS */
       'Access-Control-Allow-Credentials': true,
   },
     body: JSON.stringify({
       message: 'Public API',
     })
  };
  return response
};

module.exports.auth =  async (event) => {
  var token = event.authorizationToken;
  switch (token.toLowerCase()) {
      case 'allow':
          return  _generatePolicy('user123', 'allow', event.methodArn)
      case 'deny':
          return _generatePolicy('user123', 'deny', event.methodArn, "Custom Deny Message");
      case 'unauthorized':
          throw new Error("Unauthorized");   // Return a 401 Unauthorized response
      default:
          throw new Error("Unauthorized"); 
  }
};
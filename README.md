# Serverless Custom Authorizer
Example of a serverless service that uses API Gateway custom authorizer to authorize your endpoints, and can custom deny message.

## Usage

* `serverless install --url https://github.com/SeptiyanAndika/serverless-custom-authorizer`
* `cd serverless-custom-authorizer`
* `serverless deploy`
* Notice the displayed endpoint after deployment
* `curl --header "Authorization: allow" <private endpoint>` - Should work! Authorized!

* `curl --header "Authorization: deny" <private endpoint>` - Should not work 
    ```json
    {
        "success":false,
        "message":"Custom Deny Message"
    }
    ```
* `curl --header "Authorization: unauthorized" <private endpoint>` - Should not work
* `curl --header "Authorization: blabla" <private endpoint>` - Should not work
* `curl <private endpoint>` - Should not work
    ```json
    {
        "success":false,
        "message":"Unauthorized"
    }
    ```

* `curl <public endpoint>` - Should work

aws configure set aws_access_key_id "access_key_id"
aws configure set aws_secret_access_key "secret_access_key"
aws configure set region "us-east-1"

TABLE_NAME="POC_QUERY_TABLE"

aws dynamodb create-table \
--endpoint-url=http://dynamo-db-local:8000 \
--table-name $TABLE_NAME \
--attribute-definitions \
AttributeName=partitionKey,AttributeType=S  \
AttributeName=sortKey,AttributeType=S  \
--key-schema \
AttributeName=partitionKey,KeyType=HASH  \
AttributeName=sortKey,KeyType=RANGE  \
--provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5;

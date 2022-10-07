# projects.database.dynamodb

The purpose of this repository is to test the validity of using DynamoDB as a datastore for large datasets that need to be queried against.

## Docker Commands

Start the DynamoDB container

```
docker-compose -f ./docker/docker-compose.yml up -d
```

Stop the DynamoDB container

```
docker-compose -f ./docker/docker-compose.yml down
```

## AWS CLI Commands

List out the items in a table. Best to use this if the table count is small.

```
aws dynamodb scan \
 --endpoint-url=http://localhost:8000 \
 --table-name POC_QUERY_TABLE

```

Check the count of a table

```
aws dynamodb scan \
 --endpoint-url=http://localhost:8000 \
 --table-name POC_QUERY_TABLE \
 --select "COUNT"
```

Single Items from a file

```
aws dynamodb put-item \
 --endpoint-url=http://dynamo-db-local:8000 \
 --table-name $TABLE_NAME \
 --item file:///init-scripts/data_single.json
```

Collection of items from a file

```
aws dynamodb batch-write-item \
 --endpoint-url=http://localhost:8000 \
 --item file:///init-scripts/data_collection.json
```

# Used for running the script from the terminal for testing
# RAW_DATA=`cat ./data_single_inject_vars.json`

aws configure set aws_access_key_id "access_key_id"
aws configure set aws_secret_access_key "secret_access_key"
aws configure set region "us-east-1"

# Reading in the base data that will have variables replaced
RAW_DATA=`cat /init-scripts/data_single_inject_vars.json`

# Currently the maximum batch size for writing to DDB
BATCH_SIZE=2

# Init the batch-write-items object that will be concatenated to
COLLECTION_DATA=""

# Hard coded categories for the moment
CATEGORY_1="FAST_FOOD"
CATEGORY_2="SHOPPING"

# Sets the beginning of the JSON structure and required batch-write-items table name
TABLE_NAME="POC_QUERY_TABLE"
INIT_DATA='{"'$TABLE_NAME'": ['

for (( PRIMARY_KEY=1; PRIMARY_KEY<=$BATCH_SIZE; PRIMARY_KEY++ ))
do
  COLLECTION_DATA="$INIT_DATA"
  for (( SECONDARY_KEY=1; SECONDARY_KEY<=$BATCH_SIZE; SECONDARY_KEY++ ))
  do
    # Replaces all instances of variable in RAW_DATA with the number incremented through loop 
    RAW_DATA_REPLACED=`echo "${RAW_DATA//PRIMARY_KEY/$PRIMARY_KEY}"`
    RAW_DATA_REPLACED=`echo "${RAW_DATA_REPLACED//SECONDARY_KEY/$SECONDARY_KEY}"`
    
    if [ $SECONDARY_KEY -eq $(( $SECONDARY_KEY % 2 )) ]
    then
      RAW_DATA_REPLACED=`echo "${RAW_DATA_REPLACED//CATEGORY_VAR/$CATEGORY_1}"`
    else
      RAW_DATA_REPLACED=`echo "${RAW_DATA_REPLACED//CATEGORY_VAR/$CATEGORY_2}"`
    fi
    
    COLLECTION_DATA="$COLLECTION_DATA$RAW_DATA_REPLACED"
    if [ $SECONDARY_KEY -ne $BATCH_SIZE ]
    then
      COLLECTION_DATA="$COLLECTION_DATA,"
    fi
  done

  # Finishes off the JSON object structure/syntax wise
  COLLECTION_DATA="$COLLECTION_DATA ] }"
  
  # Writes to a temp JSON file
  echo $COLLECTION_DATA >> "./temp_file.json"
  
  # Calls the batch write with the temp JSON file
  aws dynamodb batch-write-item \
   --endpoint-url=http://dynamo-db-local:8000 \
   --request-items file://temp_file.json
  
  # Deletes the temp JSON
  rm -rf ./temp_file.json
  
  # Clears the batch write items object
  COLLECTION_DATA=""
done

Notes:
 - I createad a route integration suite of tests which tests that the legacy endpoints and the new endpoints adhere to the same contract
 - I sperated request handling, validation, data creation and save (in that order)
 - Introducing type safety revealed at least one vulnerability: the domain model and the data in the json file do not have the same schema
 - If there were ambiguities I did not correct the business logic in order to stick to the same contract - the reason I did this was because in production if another service would have been dependent on the answers of those services it could lead to integration problems (either web apps or other micro services). As a result I would add TODO comments and handling this part would be it's own task/effort
 - I chose to have 2 data types: the one described in the README which is the domain of the app and the one that is present in the JSON files in order to have compatibility with external systems
 - In terms of validation I assumed that anything can come as undefined from an external service, however based on the validation ruels maybe it would have been better to not allow all fields to be null and only validate business logic
 - I kept the same error handler for compatibility purposes
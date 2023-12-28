# Object Schema Mapper

This is a simple tool designed to map any object to a specific schema.

## Usage

The package exports two functions: `toViewModel()` and `toDataModel()`.

### `toViewModel(data, map)`

Transforms the input data object to match the specified schema.

### `toDataModel(data, map)`

Converts the input data object back to its original structure based on the provided schema.

Both functions accept two parameters:

1. **data**: The object to parse to the schema.

2. **map**: The schema, which is an array of objects with the following properties:

   - **name**: Name of the attribute (for documentation).

   - **dataPath**: The source object property (could be nested, e.g., `User.name`).

   - **viewPath**: The property in the output object to assign the data to.

   - **viewContent**: (Optional) A function that takes in the source data and returns the view content. Data path may be omitted if no input is needed.

### Example

```javascript
const data = {
  User: {
    name: "John Doe",
    age: 30,
  },
  // ... other properties
};

const schemaMap = [
  { name: "UserName", dataPath: "User.name", viewPath: "username" },
  { name: "UserAge", dataPath: "User.age", viewPath: "age" },
  // ... other schema mappings
];

const viewModel = toViewModel(data, schemaMap);
console.log(viewModel);

const dataModel = toDataModel(viewModel, schemaMap);
console.log(dataModel);
```

# JSON Mapify

JSON Mapify is a lightweight npm package that simplifies the process of mapping JavaScript objects to specific schemas. Whether you need to transform data into a view model or revert it back to its original structure, this package provides two essential functions: `toViewModel()` and `toDataModel()`.

## Installation

Install the package using npm:

```bash
npm install json-mapify
```

## Usage

### `toViewModel(data, map)`

Transforms the input data object to match the specified schema.

### `toDataModel(data, map)` 

Converts the input data object back to its original structure based on the provided schema.

Both functions accept two parameters:

1. **data**: The object to parse to the schema.

2. **map**: The schema, represented as an array of objects, with the following properties:

    - **name**: Name of the attribute (for documentation).
        
    - **dataPath**: The source object property (supports nested paths, e.g., `User.name`).
        
    - **viewPath**: The property in the output object to assign the data to.
        
    - **viewContent**: (Optional) A function that takes in the source data and returns the view content. Data path may be omitted if no input is needed.
        
## Example

Consider the following data object:

```js
const data = {
  User: {
    name: 'John Doe',
    age: 30,
  },
  // ... other properties
};
```

And a schema map with a custom `viewContent` function:

```js 
const schemaMap = [
  {
    name: 'UserName',
    viewPath: 'username',
    viewContent: (user) => `Hello, ${user.name}!`,
  },
  {
    name: 'UserAge',
    dataPath: 'User.age',
    viewPath: 'age' 
  },
  // ... other schema mappings
];
```

Using the `toViewModel()` function:

```js
const viewModel = toViewModel(data, schemaMap);
console.log(viewModel); 
```

The resulting `viewModel` will be:

```js
{
  username: 'Hello, John Doe!',
  age: 30,
  // ... other mapped properties
}
```

And using the `toDataModel()` function:

```js
const dataModel = toDataModel(viewModel, schemaMap);
console.log(dataModel);
```

The resulting `dataModel` will be the original data object.
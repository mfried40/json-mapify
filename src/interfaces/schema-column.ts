interface MinimalColumnSchema {
    name: string,
    validator?: any | [ any ],
}

// Data only with custom data content
interface ColumnWithDataOnly extends MinimalColumnSchema {
    dataPath: string,
    dataContent: Function,
}

// View only with custom view content
interface ColumnWithViewOnly extends MinimalColumnSchema {
    viewPath: string,
    viewContent: Function,
}

// Data and view without any custom content
interface ColumnWithPathsOnly extends MinimalColumnSchema {
    dataPath: string,
    viewPath: string,
}

// Data and view with custom view content
interface ColumnWithPathsAndViewContent extends MinimalColumnSchema {
    dataPath: string,
    viewPath: string,
    viewContent: Function,
}

// Data and view with custom data content
interface ColumnWithPathsAndDataContent extends MinimalColumnSchema {
    dataPath: string,
    viewPath: string,
    dataContent: Function,
}

// Data and view with both custom data content and custom view content
interface ColumnWithPathsAndBothContents extends MinimalColumnSchema {
    dataPath: string,
    viewPath: string,
    dataContent: Function,
    viewContent: Function,
}

export type ColumnSchemaWithDataPath =
    | ColumnWithDataOnly
    | ColumnWithPathsOnly
    | ColumnWithPathsAndViewContent
    | ColumnWithPathsAndDataContent
    | ColumnWithPathsAndBothContents;

export type ColumnSchemaWithViewPath =
    | ColumnWithViewOnly
    | ColumnWithPathsOnly
    | ColumnWithPathsAndViewContent
    | ColumnWithPathsAndDataContent
    | ColumnWithPathsAndBothContents;

export type ColumnSchemaWithDataContent =
    | ColumnWithDataOnly
    | ColumnWithPathsAndDataContent
    | ColumnWithPathsAndBothContents;

export type ColumnSchemaWithViewContent =
    | ColumnWithViewOnly
    | ColumnWithPathsAndViewContent
    | ColumnWithPathsAndBothContents;

export type ColumnSchema = 
    | ColumnWithDataOnly 
    | ColumnWithViewOnly 
    | ColumnWithPathsOnly 
    | ColumnWithPathsAndViewContent 
    | ColumnWithPathsAndDataContent 
    | ColumnWithPathsAndBothContents;

export default ColumnSchema;

export function isColumnSchemaWithDataPath(column: ColumnSchema): column is ColumnSchemaWithDataPath {
    return (column as ColumnSchemaWithDataPath).dataPath !== undefined;
}

export function isColumnSchemaWithViewPath(column: ColumnSchema): column is ColumnSchemaWithViewPath {
    return (column as ColumnSchemaWithViewPath).viewPath !== undefined;
}

export function isColumnWithViewContent(column: ColumnSchema): column is ColumnSchemaWithViewContent {
    return (column as ColumnWithViewOnly).viewContent !== undefined;
}

export function isColumnWithDataContent(column: ColumnSchema): column is ColumnSchemaWithDataContent {
    return (column as ColumnSchemaWithDataContent).dataContent !== undefined;
}
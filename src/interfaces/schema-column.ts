export default interface SchemaColumn {
    name: string,
    dataPath?: string,
    viewPath: string,
    viewContent?: Function,
    validator?: Function,
}
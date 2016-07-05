export const ADD_QUERY = 'ADD_QUERY'
export const ADD_TABLE = 'ADD_TABLE'

export function addQuery(title, sql) {
  return { type: ADD_QUERY, title, sql }
}

export function addTable(dbId, tableName) {
  return { type: ADD_TABLE, dbId, tableName }
}

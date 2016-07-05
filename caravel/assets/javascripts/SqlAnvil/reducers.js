import { combineReducers } from 'redux'
import { ADD_QUERY, ADD_TABLE } from './actions'

const initialState = {
  queries: [],
  tables: []
}

function sqlAnvilReducer(state = initialState, action) {
  switch (action.type) {

    case ADD_QUERY:
      var newQuery = {
        title: action.title,
        sql: action.sql
      };
      var queries = [...state.queries, newQuery];
      return Object.assign({}, state, { queries });

    case ADD_TABLE:
      var newTable = {
        dbId: action.dbId,
        tableName: action.tableName
      };
      var tables = [...state.tables, newTable];
      return Object.assign({}, state, { tables });

    default:
      return state
  }
}

export default sqlAnvilReducer

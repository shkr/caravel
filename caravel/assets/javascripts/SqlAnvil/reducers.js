import {
  ADD_QUERY_EDITOR,
  ADD_TABLE, REMOVE_TABLE,
  HIDE_TABLE_POPUP,
  REMOVE_QUERY_EDITOR,
  SHOW_TABLE_POPUP,
  START_QUERY
} from './actions';
import shortid from 'shortid';

const initialState = {
  queryEditors: [{
    id: shortid.generate(),
    title: "Query 1",
    sql: "SELECT *\nFROM\nWHERE"
  }],
  queries: [],
  tables: []
};

function sqlAnvilReducer(state = initialState, action) {
  var arr = [];  // Generic array for use across switch
  switch (action.type) {

    case ADD_QUERY_EDITOR:
      var newQuery = {
        id: action.id,
        title: action.title,
        sql: action.sql
      };
      var queryEditors = [...state.queryEditors, newQuery];
      return Object.assign({}, state, { queryEditors });

    case REMOVE_QUERY_EDITOR:
      state.queryEditors.forEach((qe) => {
        if (qe.id !== action.id) {
          arr.push(qe);
        }
      });
      return Object.assign({}, state, { queryEditors: arr });

    case ADD_TABLE:
      var newTable = {
        id: action.id,
        dbId: action.dbId,
        name: action.name,
        columns: action.columns,
        showPopup: action.showPopup
      };
      arr = [...state.tables, newTable];
      return Object.assign({}, state, { tables: arr });

    case HIDE_TABLE_POPUP:
      state.tables.forEach((tbl) => {
        if (tbl.id === action.id) {
          arr.push(Object.assign({}, tbl, { showPopup: false }));
        } else {
          arr.push(tbl);
        }
      });
      return Object.assign({}, state, { tables: arr });

    case SHOW_TABLE_POPUP:
      state.tables.forEach((tbl) => {
        if (tbl.id === action.id) {
          arr.push(Object.assign({}, tbl, { showPopup: true }));
        } else {
          arr.push(tbl);
        }
      });
      return Object.assign({}, state, { tables: arr });

    case REMOVE_TABLE:
      state.tables.forEach((tbl) => {
        if (tbl.id !== action.id) {
          arr.push(tbl);
        }
      });
      return Object.assign({}, state, { tables: arr });

    case START_QUERY:
      var newQuery = {
        id: action.id,
        sqlEditorId: action.sqlEditorId,
        sql: action.sql,
        startDttm: action.startDttm
      }
      arr = [...state.queries, newQuery];
      return Object.assign({}, state, { quries: arr });

    default:
      return state;
  }
}

export default sqlAnvilReducer;

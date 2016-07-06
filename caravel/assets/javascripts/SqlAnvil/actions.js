export const ADD_QUERY_EDITOR = 'ADD_QUERY_EDITOR';
export const REMOVE_QUERY_EDITOR = 'REMOVE_QUERY_EDITOR';
export const ADD_TABLE = 'ADD_TABLE';
export const REMOVE_TABLE = 'REMOVE_TABLE';
export const HIDE_TABLE_POPUP = 'HIDE_TABLE_POPUP';
export const SHOW_TABLE_POPUP = 'SHOW_TABLE_POPUP';
export const START_QUERY = 'START_QUERY';
export const END_QUERY = 'END_QUERY';

export function addQueryEditor(id, title, sql) {
  return { type: ADD_QUERY_EDITOR, id, title, sql };
}

export function removeQueryEditor(id) {
  return { type: REMOVE_QUERY_EDITOR, id };
}

export function addTable(id, dbId, name, columns = [], showPopup = true) {
  return {
    type: ADD_TABLE,
    id, dbId, name, showPopup, columns
  };
}

export function hideTablePopup(id) {
  return { type: HIDE_TABLE_POPUP, id };
}

export function showTablePopup(id) {
  return { type: SHOW_TABLE_POPUP, id };
}

export function removeTable(id) {
  return { type: REMOVE_TABLE, id };
}

export function startQuery(id, sqlEditorId, sql, startDttm) {
  return { type: START_QUERY, id, sqlEditorId, sql, startDttm };
}

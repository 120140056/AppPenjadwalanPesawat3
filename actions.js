export const ADD_ROW = "ADD_ROW";
export const UPDATE_ROW = "UPDATE_ROW";
export const DELETE_ROW = "DELETE_ROW";

export function addRow(row) {
  return {
    type: ADD_ROW,
    row,
  };
}

export function updateRow(row) {
  return {
    type: UPDATE_ROW,
    row,
  };
}

export function deleteRow(row) {
  return {
    type: DELETE_ROW,
    row,
  };
}
import { actions } from "./actions";
import { assignValueInObject } from "shared/helper/Service";
import { initialState } from "./state";

export const globalReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_DATA:
      return { ...state, tableData: action.payload.data, totalItem: action.payload.count };
    case actions.GET_TABLE_COLUMNS:
      return { ...state, columnId: action.payload.id, columnOrder: action.payload.orders, columnValue: action.payload.value, validationMessage: assignValueInObject(action.payload.value, undefined) };
    case actions.SORT_TABLE:
      return { ...state, sortColumn: action.payload.value, sortDirection: action.payload.direction };
    case actions.CHANGE_COLUMN:
      return { ...state, columnOrder: action.payload.value };
    case actions.CLOSE_COLUMN_MODAL:
      return { ...state, isColumnModalOpen: false };
    case actions.CLOSE_COLUMN_MODAL_WITH_DATA:
      return { ...state, isColumnModalOpen: false, columnOrder: action.payload.data };
    case actions.OPEN_COLUMN_MODAL:
      return { ...state, refresh: false, isColumnModalOpen: true };
    case actions.CHANGE_CURRENT_PAGE:
      return { ...state, pageNumber: action.payload.page };
    case actions.CHANGE_PAGE_LIMIT:
      return { ...state, limit: action.payload.limit };
    case actions.REFRESH:
      return { ...state, refresh: true };
    case actions.PATCH_FORM:
      return { ...state, formData: state.tableData.find(x => x.id == action.payload.id) };
    case actions.EDIT_DATA_SUCCESS:
      return {
        ...state, refresh: true, tableData: state.tableData.map(data => {
          return data.id === action.payload.id ? Object.assign({}, data, action.payload.value) : data;
        }),
      }
    default:
      throw new Error();
  }
};

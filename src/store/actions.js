export const actions = {
  GET_DATA: 'getData',
  GET_TABLE_COLUMNS: 'getTableColumns',
  SORT_TABLE: 'sortTable',
  CHANGE_COLUMN: 'changeColumn',
  CLOSE_COLUMN_MODAL: 'closeColumnModal',
  CLOSE_COLUMN_MODAL_WITH_DATA: 'closeColumnModalWithData',
  OPEN_COLUMN_MODAL: 'openColumnModal',
  CHANGE_CURRENT_PAGE: 'changeCurrentPage',
  CHANGE_PAGE_LIMIT: 'changePageLimit',
  REFRESH: 'refresh',
  EDIT_DATA: 'editData',
  EDIT_DATA_SUCCESS: 'editDataSuccess',
  EDIT_DATA_FAILURE: 'editDataFailure',
  PATCH_FORM: 'patchForm',
  SET_USER_DATA: 'setUserData'
};


export const getData = (data, count) => ({
  type: actions.GET_DATA,
  payload: {
    data: data,
    count: count
  }
});

export const getTableColumn = (id, orders, value) => ({
  type: actions.GET_TABLE_COLUMNS,
  payload: {
    id: id,
    orders: orders,
    value: value
  }
});

export const sortTable = (value, direction) => ({
  type: actions.SORT_TABLE,
  payload: {
    value: value,
    direction: direction,
  }
})

export const changeColumn = (value, direction) => ({
  type: actions.SORT_TABLE,
  payload: {
    value: value,
    direction: direction,
  }
});

export const patchForm = (id) => ({
  type: actions.PATCH_FORM,
  payload: {
    id: id,
  }
})

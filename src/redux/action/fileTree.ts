import * as type from '../constants/actionType';

export const insertItem = (payload: Tree.TreeItem) => ({
    type: type.INSERT_ITEM,
    payload
});

export const updateItem = (payload: Tree.TreeItem) => ({
    type: type.UPDATE_ITEM,
    payload
});

export const deleteItem = (payload: Tree.TreeItem) => ({
    type: type.DELETE_ITEM,
    payload
});

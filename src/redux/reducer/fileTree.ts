import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import { FOLDER } from '@/const';
import * as type from '../constants/actionType';
import createReducer from './creator';
import { deleteTreeItem, insertTreeItem, updateTreeItem } from '@/util';

type Action = {
    type: string,
    payload: Tree.TreeItem,
}
export const rootId = uuidv4();
const defaultState: Tree.TreeItem = {
    id: rootId,
    pId: '',
    title: '',
    selected: true,
    opened: true,
    type: FOLDER,
    date: Date.now(),
    children: [],
    content: '',
}

const fileTree = createReducer(defaultState, {
    [type.INSERT_ITEM]: (state: Tree.TreeItem, action: Action) => {
        insertTreeItem(state, action.payload, { selected: false });
        return _.cloneDeep(state);
    },
    [type.UPDATE_ITEM]: (state: Tree.TreeItem, action: Action) => {
        updateTreeItem(state, action.payload, { selected: false });
        return _.cloneDeep(state);
    },
    [type.DELETE_ITEM]: (state: Tree.TreeItem, action: Action) => {
        deleteTreeItem(state, action.payload);
        return _.cloneDeep(state);
    },
});

export default fileTree;

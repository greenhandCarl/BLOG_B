/**
 * @description 操作树结构的方法
 */

import { FOLDER } from "@/const";

// 扁平结构转嵌套结构
export const sharpen = <D extends ({ [PK in T1]: string } & { [CK in T2]: string } & { children?: D })[], T1 extends string, T2 extends string> (data: D, parantKey: T1, currentKey: T2, topParentId: string) => {
    const empty: Record<string, D> = {};
    const result = data.reduce((prev, current) => {
        const parentId = current[parantKey] as string
        if (parentId in prev) {
            const arr = prev[parentId] as D
            arr.push(current)
        } else {
            prev[parentId] = [current] as D
        }
        return prev
    }, empty)

    for (const key in result) {
        result[key].forEach(item => {
            const parentId = item[currentKey] as string
            const parent = result[parentId] as D
            if (parent) {
                item.children = parent
            }
            delete item[parantKey]
        })
    }
    return result[topParentId]
};

export const insertTreeItem = (tree: Tree.TreeItem, insertItem: Tree.TreeItem, resetProps?: Record<string, string | number | boolean>) => {
    const { pId } = insertItem;
    if (tree.id === pId) {
        if (resetProps) {
            tree.children = tree.children.map(item => ({
                ...item,
                ...resetProps,
            }))
        }
        tree.children.push(insertItem);
        return true;
    } else {
        const nextLevel = tree.children;
        if (nextLevel.length) {
            for (let i = 0; i < nextLevel.length; i++) {
                const item = nextLevel[i];
                const res = insertTreeItem(item, insertItem, resetProps);
                if (res) return true;
            }
        }
        return false;
    }
};

export const deleteTreeItem = (tree: Tree.TreeItem, deleteItem: Tree.TreeItem) => {
    const { pId, id } = deleteItem;
    if (tree.id === pId) {
        const index = tree.children.findIndex(item => item.id === id);
        tree.children.splice(index, 1);
        return true;
    } else {
        const nextLevel = tree.children;
        if (nextLevel.length) {
            for (let i = 0; i < nextLevel.length; i++) {
                const item = nextLevel[i];
                const res = deleteTreeItem(item, deleteItem);
                if (res) return true;
            }
        }
        return false;
    }
};

export const updateTreeItem = (tree: Tree.TreeItem, updateItem: Tree.TreeItem, resetProps?: Record<string, string | number | boolean>) => {
    const { pId, id } = updateItem;
    if (tree.id === pId) {
        if (resetProps) {
            tree.children = tree.children.map(item => ({
                ...item,
                ...resetProps,
            }))
        }
        const index = tree.children.findIndex(item => item.id === id);
        if (index < 0) return false;
        tree.children.splice(index, 1, updateItem);
        return true;
    } else {
        const nextLevel = tree.children;
        if (nextLevel.length) {
            for (let i = 0; i < nextLevel.length; i++) {
                const item = nextLevel[i];
                const res = updateTreeItem(item, updateItem, resetProps);
                if (res) return true;
            }
        }
        return false;
    }
};

export const getSelectedItem = (tree: Tree.TreeItem): Tree.TreeItem => {
    if (tree.children.length) {
        for (let i = 0; i < tree.children.length; i++) {
            const child = tree.children[i];
            if (child.selected) {
                const next = getSelectedItem(child)
                if (next) return next
                return child;
            }
        }
    }
    return tree;
};

export const getOpenedFolder = (tree: Tree.TreeItem): Tree.TreeItem => {
    if (tree.children.length) {
        for (let i = 0; i < tree.children.length; i++) {
            const child = tree.children[i];
            if (child.opened && child.type === FOLDER) {
                const next = getOpenedFolder(child)
                if (next) return next
                return child;
            }
        }
    }
    return tree;
};
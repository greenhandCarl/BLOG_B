declare namespace Tree {
    type TreeItem = {
        id: string,
        pId: string,
        title: string,
        date: number,
        selected: boolean, // 是否被选中。
        opened: boolean, // 是否被打开。当类型是文件夹时有意义表示是否进入文件夹内，当类型是文件时默认和选中状态一致但无其他意义。
        type: string,
        children: TreeItem[],
        content: string,
    };
}
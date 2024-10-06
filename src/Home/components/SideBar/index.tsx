import { FC, useState } from 'react'
// import { FC, useMemo, useState } from 'react'
// import { FolderOpenOutlined, AppstoreAddOutlined, PlusOutlined } from '@ant-design/icons';
// import { Button, Dropdown, Menu, MenuProps, Tooltip } from 'antd'
// import classNames from 'classnames';
import { FolderOpenOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Menu, MenuProps } from 'antd'
import style from './index.scss'
import { insertItem } from '@/redux/action/fileTree';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { v4 as uuidv4 } from 'uuid';
import { FILE, FOLDER } from '@/const';
import { getOpenedFolder } from '@/util';

type MenuItem = Required<MenuProps>['items'][number];
type Props = {
    folder: Tree.TreeItem,
    newFile(pId: string): void,
    newFolder(pId: string): void,
};
interface LevelKeysProps {
    key?: string;
    children?: LevelKeysProps[];
}

const items: MenuItem[] = [
    {
        key: '2',
        icon: <FolderOpenOutlined />,
        label: 'Navigation Two',
        children: [
            { key: '21', label: 'Option 1' },
            { key: '22', label: 'Option 2' },
            {
                key: '23',
                label: 'Submenu',
                children: [
                    { key: '231', label: 'Option 1' },
                    { key: '232', label: 'Option 2' },
                    { key: '233', label: 'Option 3' },
                ],
            },
            {
                key: '24',
                label: 'Submenu 2',
                children: [
                    { key: '241', label: 'Option 1' },
                    { key: '242', label: 'Option 2' },
                    { key: '243', label: 'Option 3' },
                ],
            },
        ],
    },
];

const getLevelKeys = (items1: LevelKeysProps[]) => {
    const key: Record<string, number> = {};
    const func = (items2: LevelKeysProps[], level = 1) => {
        items2.forEach((item) => {
            if (item.key) {
                key[item.key] = level;
            }
            if (item.children) {
                func(item.children, level + 1);
            }
        });
    };
    func(items1);
    return key;
};

const levelKeys = getLevelKeys(items as LevelKeysProps[]);

const SideBar: FC<Props> = () => {
    // const { folder, newFile, newFolder } = props;
    // const [folderActived, setFolderActived] = useState<boolean>(false);
    // const [showTooltip, setShowTooltip] = useState<boolean>(false);
    const [stateOpenKeys, setStateOpenKeys] = useState(['2']);

    // const onFolderClick = () => {
    //     setFolderActived(true)
    // };

    const onOpenChange: MenuProps['onOpenChange'] = (openKeys) => {
        const currentOpenKey = openKeys.find((key) => stateOpenKeys.indexOf(key) === -1);
        // open
        if (currentOpenKey !== undefined) {
            const repeatIndex = openKeys
                .filter((key) => key !== currentOpenKey)
                .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);

            setStateOpenKeys(
                openKeys
                    // remove repeat key
                    .filter((_, index) => index !== repeatIndex)
                    // remove current level all child
                    .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey]),
            );
        } else {
            // close
            setStateOpenKeys(openKeys);
        }
    };

    // const items = useMemo(() => [
    //     { key: '0', label: <div onClick={() => newFile(folder.id)}>Markdown</div> },
    //     { key: '1', label: <div onClick={() => newFolder(folder.id)}>New Folder</div> }
    // ], [folder, newFile, newFolder]);

    return (
        <div className={style.sideBar}>
            <img
                className={style.avatar}
                src='https://note.youdao.com/yws/api/image/normal/1614217569014?userId=511252519%40qq.com'
            />
            <Button
                className={style.newButton}
                type='default'
            >
                <PlusOutlined />
                <span>New</span>
            </Button>
            <Menu
                mode="inline"
                openKeys={stateOpenKeys}
                onOpenChange={onOpenChange}
                style={{ width: 208 }}
                items={items}
            />
            {/* <Tooltip
                placement="left"
                title='新建'
                open={showTooltip}
                onOpenChange={setShowTooltip}
            >
                <Dropdown
                    menu={{ items }}
                    placement="bottomLeft"
                    arrow={{ pointAtCenter: true }}
                    trigger={['click']}
                    onOpenChange={(open: boolean) => setShowTooltip(!open)}
                >
                    <AppstoreAddOutlined className={style.add} />
                </Dropdown>
            </Tooltip>
            <Tooltip placement="left" title='我的文件夹'>
                <FolderOpenOutlined
                    onClick={onFolderClick}
                    className={classNames(style.folder, { [style.active]: folderActived })}
                />
            </Tooltip> */}
        </div>
    )
}

const mapStateToProps = (state: { fileTree: Tree.TreeItem }) => {
    const folder = getOpenedFolder(state.fileTree);
    return ({
        folder,
    })
};

const mapDispatchToProps = (dispath: Dispatch) => ({
    newFile: (pId: string) => {
        dispath(insertItem({
            title: 'Untitled Markdown',
            selected: true,
            opened: true,
            children: [],
            id: uuidv4(),
            pId,
            type: FILE,
            date: Date.now(),
            content: '',
        }));
    },
    newFolder: (pId: string) => {
        dispath(insertItem({
            title: 'Untitled',
            selected: true,
            opened: false,
            children: [],
            id: uuidv4(),
            pId,
            type: FOLDER,
            date: Date.now(),
            content: '',
        }));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
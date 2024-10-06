import { Dropdown, Input, Modal } from 'antd';
import dayjs from 'dayjs';
import style from './index.scss'
import { ArrowLeftOutlined, EllipsisOutlined, FileMarkdownFilled, FolderOpenFilled, OrderedListOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { v4 as uuidv4 } from 'uuid';
import { ChangeEvent, KeyboardEvent, FC, useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { deleteItem, insertItem, updateItem } from '@/redux/action/fileTree';
import { Dispatch } from 'redux';
import { FILE, FOLDER } from '@/const';
import { getOpenedFolder } from '@/util';

const { Search } = Input;

type Props = {
    folder: Tree.TreeItem,
    updateItem(item: Tree.TreeItem): void,
    deleteItem(item: Tree.TreeItem): void,
    newFile(pId: string): void,
}
enum TitleStatus {
    default,
    edit,
}
type MenuItem = Tree.TreeItem & {
    titleStatus: TitleStatus,
};

const Menus: FC<Props> = props => {
    const { folder, updateItem, deleteItem, newFile } = props;
    const [menus, setMenus] = useState<MenuItem[]>(folder.children.map(item => ({ ...item, titleStatus: TitleStatus.default })));
    const [isDeteleModalOpen, setIsDeteleModalOpen] = useState<boolean>(false);
    const [willDeleteItem, setWillDeleteItem] = useState<Tree.TreeItem | null>(null);

    useEffect(() => {
        if (folder && folder.children) {
            setMenus(folder.children.map(item => ({ ...item, titleStatus: TitleStatus.default })))
        }
    }, [folder])

    const onSearch = () => {
        console.log('onSearch')
    }

    const onSelect = useCallback((item: Tree.TreeItem) => {
        updateItem(item)
    }, [folder])

    const onTitleClick = useCallback((e: TEvent.ME, item: Tree.TreeItem) => {
        e.stopPropagation && e.stopPropagation();
        if (item.type === FOLDER) {
            updateItem({ ...item, opened: true });
        }
    }, [folder])

    const onBack = useCallback(() => {
        updateItem({ ...folder, opened: false });
    }, [folder])

    const onChangeTitle = (e: TEvent.ME, item: Tree.TreeItem) => {
        e.stopPropagation && e.stopPropagation();
        setMenus(prev => prev.map(i => {
            if (i.id === item.id) {
                return {
                    ...i,
                    titleStatus: TitleStatus.edit
                }
            }
            return i;
        }))
    };

    const onDelete = (item : Tree.TreeItem) => {
        setWillDeleteItem(item);
        setIsDeteleModalOpen(true);
    };

    const onDeleteOk = useCallback(() => {
        if (willDeleteItem) deleteItem(willDeleteItem);
        setIsDeteleModalOpen(false);
    }, [willDeleteItem])

    const onDeleteCancel = useCallback(() => {
        setIsDeteleModalOpen(false);
    }, [])

    const onTitleChange = (e: ChangeEvent<HTMLInputElement>, item: Tree.TreeItem) => {
        e.stopPropagation && e.stopPropagation();
        setMenus(prev => prev.map(i => {
            if (i.id === item.id) {
                return {
                    ...i,
                    title: e.target.value,
                }
            }
            return i;
        }))
    };

    const onTitleBlur = (e: ChangeEvent<HTMLInputElement>, item: Tree.TreeItem) => {
        e.stopPropagation && e.stopPropagation();
        setMenus(prev => prev.map(i => {
            if (i.id === item.id) {
                return {
                    ...i,
                    titleStatus: TitleStatus.default
                }
            }
            return i;
        }))
        updateItem({ ...item, title: e.target.value });
    };

    const onTitleKeyUp = useCallback((e: KeyboardEvent<HTMLInputElement>, item: Tree.TreeItem) => {
        if (e.keyCode === 13 || e.code.toLowerCase() === 'enter') {
            const newItem = menus.find(i => i.id === item.id)
            if (newItem) updateItem(newItem);
        }
    }, [menus])

    const onNewClick = useCallback(() => {
        newFile(folder.id);
    }, [folder, newFile])

    return <div className={style.menusContainer}>
        <div className={style.searchBox}>
            <Search
                placeholder="搜索笔记"
                allowClear 
                onSearch={onSearch}
                style={{ width: 180 }}
            />
            <OrderedListOutlined className={style.operate} />
        </div>  
        <ul className={style.list}>
            {!!folder.title && <li className={style.backTitle}>
                <ArrowLeftOutlined className={style.backArrow} onClick={onBack} />
                <div className={style.folderTitle}>{folder.title}</div>
            </li>}
            {menus.length === 0 && <li className={style.empty}>
                <img className={style.emptyIcon} src={require('/static/menus/empty_note.png')} alt="empty" />
                <div className={style.emptyText}>没有找到文件</div>
                <div className={style.newBtn} onClick={onNewClick}>新建笔记</div>
            </li>}
            {menus.map((item, index) => <li
                key={index}
                onClick={() => onSelect(item)}
                className={classNames(style.item, { [style.selected]: item.selected })}
            >
                {item.titleStatus !== TitleStatus.edit && <Dropdown
                    destroyPopupOnHide
                    menu={{ items: [
                        { key: '0', label: <div onClick={(e: TEvent.ME) => onChangeTitle(e, item)}>重命名</div> },
                        { key: '1', label: <div onClick={() => onDelete(item)}>删除</div> }
                    ]}}
                    placement="bottomLeft"
                    arrow={{ pointAtCenter: true }}
                    trigger={['click']}
                >
                    <EllipsisOutlined className={style.more} />
                </Dropdown>}
                <div className={style.title}>
                    {item.type === FOLDER ? <FolderOpenFilled className={style.folderIcon} /> : <FileMarkdownFilled className={style.fileIcon} />}
                    {item.titleStatus === TitleStatus.default
                        ? <span
                            className={style.titleText}
                            onClick={(e: TEvent.ME) => onTitleClick(e, item)}
                        >
                            {item.title}
                        </span>
                        : <Input
                            autoFocus
                            value={item.title}
                            className={style.titleInput}
                            onChange={(e) => onTitleChange(e, item)}
                            onBlur={(e) => onTitleBlur(e, item)}
                            onClick={e => e.stopPropagation && e.stopPropagation()}
                            onKeyUp={(e) => onTitleKeyUp(e, item)}
                        />}
                </div>
                <div className={style.date}>{dayjs(item.date).format('YYYY.MM.DD')}</div>
            </li>)}
        </ul>
        <Modal
            title="确认删除"
            open={isDeteleModalOpen}
            onOk={onDeleteOk}
            onCancel={onDeleteCancel}
        >
            <p>删除内容将进入回收站，1年后自动彻底删除。</p>
        </Modal>
    </div>
}

const mapStateToProps = (state: { fileTree: Tree.TreeItem }) => {
    const folder = getOpenedFolder(state.fileTree);
    return ({ folder })
};
const mapDispatchToProps = (dispath: Dispatch) => ({
    updateItem: (item: Tree.TreeItem) => {
        dispath(updateItem({
            ...item,
            selected: true,
        }));
    },
    deleteItem: (item: Tree.TreeItem) => {
        dispath(deleteItem(item));
    },
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
});



export default connect(mapStateToProps, mapDispatchToProps)(Menus);
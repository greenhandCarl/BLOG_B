import { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';
import style from './index.scss'
import { Button } from 'antd';
import classNames from 'classnames';
import Markdown from 'markdown-to-jsx'
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { getSelectedItem } from '@/util';
import { FILE } from '@/const';
import { FolderOpenOutlined } from '@ant-design/icons';
import { updateItem } from '@/redux/action/fileTree';
import EditableBriefText from '@/components/EditableBriefText';

type Props = {
    file: Tree.TreeItem,
    updateItem(item: Tree.TreeItem): void,
}

const Content: FC<Props> = props => {
    const { file, updateItem } = props;
    const [isPreview, setIsPreview] = useState<boolean>(true);
    const [value, setValue] = useState<string>(file.content);
    const [currentFile, setCurrentFile] = useState<Tree.TreeItem | null>(file);
    const [isSaving, setIsSaving] = useState<boolean>(false);

    useEffect(() => {
        if (file) {
            setCurrentFile(file)
            setValue(file.content)
        }
    }, [file]);

    const onTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.target.value);
    };

    const onPreview = () => {
        setIsPreview(true);
    };

    const onEdit = () => {
        setIsPreview(false);
    };

    const onSave = useCallback(() => {
        if (currentFile) {
            setIsSaving(true)
            updateItem({ ...currentFile, content: value });
            setTimeout(() => setIsSaving(false), 500)
        }
    }, [currentFile, value]);

    return <div className={style.homeContent}>
        <div className={style.title}>
            <div className={style.titleLeft}>
                {currentFile?.title && <EditableBriefText
                    value={currentFile.title}
                />}
            </div>
            {currentFile?.type === FILE && <div className={style.titleRight}>
                {isSaving ? <Button type='default' className={style.save}>正在保存...</Button> : <Button type='default' className={style.save} onClick={onSave}>保存</Button>}
                {isPreview ? <Button type="primary" onClick={onEdit}>编辑</Button> : <Button type="primary" onClick={onPreview}>预览</Button>}
            </div>}
        </div>
        {
            currentFile?.type === FILE
                ?   <div className={style.content}>
                    <div className={classNames({ [style.preview]: true, [style.showPreview]: isPreview })}>
                        <Markdown>{value}</Markdown>
                    </div>
                    <textarea
                        value={value}
                        onChange={onTextAreaChange}
                        className={classNames({ [style.editArea]: true, [style.showEdit]: !isPreview })}
                    />
                </div>
                : <div className={style.folderEmpty}>
                    <FolderOpenOutlined className={style.folderIcon} />
                </div>
        }
    </div>
}
const mapStateToProps = (state: { fileTree: Tree.TreeItem }) => {
    const file = getSelectedItem(state.fileTree);
    return ({ file })
};
const mapDispatchToProps = (dispath: Dispatch) => ({
    updateItem: (item: Tree.TreeItem) => {
        dispath(updateItem(item));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Content);
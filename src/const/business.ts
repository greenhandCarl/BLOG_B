import { NotificationOutlined } from '@ant-design/icons';
import { createElement } from 'react'

export const sideMenus = [
    {
        key: 'sub0',
        icon: createElement(NotificationOutlined),
        label: '文章',
        parentKey: '0'
    },
    {
        key: 'sub00',
        icon: createElement(NotificationOutlined),
        label: '文章列表',
        parentKey: 'sub0'
    },
    {
        key: 'sub1',
        icon: createElement(NotificationOutlined),
        label: '操作',
        parentKey: '0'
    },
    {
        key: 'sub01',
        icon: createElement(NotificationOutlined),
        label: '其他操作',
        parentKey: 'sub1',
    }
];
import Home from './Home'
import NotFound from './NotFound'

const routes = [
    {
        path: '/*',
        element: Home,
        children: [
            {
                path: 'operate/add',
                element: NotFound
            }
        ]
    },
    {
        path: '*',
        element: NotFound,
    }
]

export const breadcrumbNameMap: Record<string, string> = {
    '/operate/add': 'Application List',
    '/apps/1': 'Application1',
    '/apps/2': 'Application2',
    '/apps/1/detail': 'Detail',
    '/apps/2/detail': 'Detail',
}

export default routes
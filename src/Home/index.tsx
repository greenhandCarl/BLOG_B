import { Component } from 'react'
import style from './index.scss'
import SideBar from './components/SideBar'
import Content from './components/Content'
import Menus from './components/Menus'


type Props = object;
type State = {
    breadcrumbPathList: BreadcrumbPath[]
    folderActived: boolean,
};

export default class Home extends Component<Props, State> {
    public constructor (props: Props) {
        super(props);
        this.state = {
            breadcrumbPathList: [],
            folderActived: false,
        }
    }

    public render () {

        return (
            <div className={style.homeContainer}>
                <SideBar />
                <Menus />
                <Content />
            </div>
        )
    }
}

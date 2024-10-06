import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './redux/reducer'
import App from './app';
import './index.scss'

const container = document.getElementById('root');

const store = createStore(reducer);

if (container) {
    const root = createRoot(container);
    root.render(<Provider store={store}>
        <App />
    </Provider>);
}
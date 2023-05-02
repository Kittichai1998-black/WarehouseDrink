import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Root from './routes/root'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';


ReactDOM.render(
  <BrowserRouter>
    <Root />
  </BrowserRouter>,
  document.getElementById('root'),
);

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';


//provider 리액트와 리덕스 연결
import { Provider } from "react-redux";
//원래는 creatStore만 해서 store를 생성하면 된다.
//하지만 그냥 store는 객체밖에 못받기 때문에
//store가 promise와 function도 받게 하기위해서
//미들웨어를 추가해주는 작업이다.
import { applyMiddleware, createStore } from 'redux';
import promiseMiddleware from "redux-promise";
import ReduxThunk from 'redux-thunk';
import Reducer from './_reducers'
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
const theme = createMuiTheme({
  palette: {
    type:'dark',
    primary: {
      main: '#34FACB'
    }
  },
});

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore); 


ReactDOM.render(
  //store
  <Provider 
    store={createStoreWithMiddleware( 
      Reducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__()
    )}
  > 
   <ThemeProvider theme={theme}>
      <App />
   </ThemeProvider>

  </Provider>,
  document.getElementById('root')
);



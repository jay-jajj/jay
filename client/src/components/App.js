import React from 'react';
import {Route, Switch, HashRouter} from "react-router-dom";

//view들
import LandingPage from "./views/LandingPage/LandingPage";
import LoginPage from "./views/LoginPage/LoginPage";
import RegisterPage from "./views/RegisterPage/RegisterPage";
import WritePage from "./views/WritePage/WritePage";
import CategoryPage from "./views/CategoryPage/CategoryPage";
import NotFoundPage from "./views/NotFoundPage/NotFoundPage";




function App() {
  return (
    <HashRouter>
      {/* switch는 path가없는 라우트를 다른 라우터경우가 아닌경우에 실행시켜줌  */}
      <Switch>
        <Route exact path="/" component={LandingPage}/>
        <Route exact path="/login" component={LoginPage}/>
        <Route exact path="/register" component={RegisterPage}/>
        <Route exact path="/write" component={WritePage}/>
        <Route path="/category" component={CategoryPage}/>
        <Route component={NotFoundPage}/>
      </Switch>
    </HashRouter>
  );
}

export default App;

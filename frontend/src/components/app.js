import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch, Route } from 'react-router-dom';

import MainPage from './main/main_page';
import MainGrid from './main_grid';
import Annotations from './annotations/annotations';
import AnnotationTest from './annotations/annotation_test';
import PrimarySearchAppBar from './Appbar';
import Books from './books/books';


import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';
import DashBoard from './dashboard/dashboard';


const App = () => (
  <React.Fragment>
    <PrimarySearchAppBar />
    <MainGrid>
        <Switch>
          <AuthRoute exact path="/" component={MainPage} />
          <AuthRoute exact path="/login" component={LoginFormContainer} />
          <AuthRoute exact path="/signup" component={SignupFormContainer} />

          <Route exact path="/dashboard" component={DashBoard} />
          <Route exact path="/books" component={Books} />
          <ProtectedRoute exact path="/annotations/bookID/:bookID" component={Annotations} />
          <Route path="/annotations/temp" component={AnnotationTest}/>
        </Switch>
    </MainGrid>
  </React.Fragment>
);

export default App;
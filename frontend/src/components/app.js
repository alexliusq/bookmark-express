import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch, Route } from 'react-router-dom';

import MainPage from './main/main_page';
import MainGridBox from './main_presentation';
import Annotations from './annotations/annotations';
import AnnotationTest from './annotations/annotation_test';
import PrimarySearchAppBar from './Appbar';

import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';



const App = () => (
  <React.Fragment>
    <PrimarySearchAppBar />
    <MainGridBox>
        <Switch>
          <AuthRoute exact path="/" component={MainPage} />
          <AuthRoute exact path="/login" component={LoginFormContainer} />
          <AuthRoute exact path="/signup" component={SignupFormContainer} />

          <ProtectedRoute path="/annotations/bookID/:bookID" component={Annotations} />
          <Route path="/annotations/temp" component={AnnotationTest}/>
        </Switch>
    </MainGridBox>
  </React.Fragment>
);

export default App;
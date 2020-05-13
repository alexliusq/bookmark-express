import React from 'react';
// import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch, Route } from 'react-router-dom';

import MainPage from './main/main_page';
import Annotations from './annotations/annotations';
import AnnotationTest from './annotations/annotation_test';

const App = () => (
    <Switch>
      <Route exact path="/" component={MainPage} />
      <Route path="/annotations/bookID/:bookID" component={Annotations} />
      <Route path="/annotations/temp" component={AnnotationTest}/>
    </Switch>
);

export default App;
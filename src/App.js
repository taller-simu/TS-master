import React,{Component} from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import Start from "./start";
import Graficos from "./graficos";
import Header from './header';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Divider} from 'semantic-ui-react';
import Simular from "./simular";

class App extends Component {
  render(){
  return (
    <div>
      <HashRouter >
      
        
        <div>     
            <Header />
            <Divider />
        <Switch>
            <Route exact path="/" component={Start} />
            <Route path="/simular" component={Simular} />
            <Route path="/graficos" component={Graficos} />
                     
        </Switch>
        </div>  
        
      </HashRouter>
    </div>
  );
  }
}

export default App;

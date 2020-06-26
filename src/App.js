import React,{Component} from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import Start from "./start";
import Graficos from "./graficos";
import Header from './header';
class App extends Component {
  render(){
  return (
    
      <HashRouter >
        <Switch>
          <div>
          <Header />
          <Route exact path="/" component={Start} />
          <Route exact path="/graficos" component={Graficos} />
          </div>

          
          
          
        </Switch>
      </HashRouter>
    
  );
  }
}

export default App;

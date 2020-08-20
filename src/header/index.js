import React from 'react';
import {NavLink} from "react-router-dom";
import {Grid} from 'semantic-ui-react';



function Header() {
    
    return(
    
        <Grid columns={2} className="grid-head">
            <Grid.Row>
                    <Grid.Column>
                        <div className="title">
                            Simulador de Covid
                            </div>
                        </Grid.Column>
                        <Grid.Column>
                            <Grid columns={3}>
                                <Grid.Row className="heads">   
                                                            
                                    <Grid.Column >
                                        <div className="g">
                                        <NavLink exact activeClassName="main-nav-active" className="l" to="/">Inicio</NavLink>
                                        </div>
                                        </Grid.Column>
                                    <Grid.Column>
                                        <div className="g">
                                        <NavLink activeClassName="main-nav-active" className="l" to="/Simular">Simular</NavLink>
                                        </div>
                                        </Grid.Column>                                            
                                    <Grid.Column>
                                            <div className="g">
                                            <NavLink activeClassName="main-nav-active" className="l" to="/Graficos">Gráficos</NavLink>
                                            </div>
                                    </Grid.Column>   
                                                      
                                </Grid.Row>
                            </Grid>
                    </Grid.Column>
            
            </Grid.Row>
        </Grid>
    );
    
}

export default Header;

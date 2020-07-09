import React from 'react';
import {Link} from "react-router-dom";
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
                                    <Grid.Column><Link to="/">Home</Link></Grid.Column>
                                    <Grid.Column><Link to="/Simular">Simular</Link></Grid.Column>                                            
                                    <Grid.Column><Link to="/Graficos">Graficos</Link></Grid.Column>                      
                                </Grid.Row>
                            </Grid>
                    </Grid.Column>
            
            </Grid.Row>
        </Grid>
    );
    
}

export default Header;

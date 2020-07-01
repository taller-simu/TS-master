import React from 'react';
import { Grid, GridColumn, Divider, Button } from 'semantic-ui-react';


const Simular = () =>{
    const procesar =()=>{


    };

    
    return(
        
        <div>
              <form action="" id="form" class="formulario">
            <div class="formularioDiv">
                <div class="titulo" align="center">
                    <h1>Insertar los datos historicos para la simulación</h1>
                
                
                    Introduzca datos de infectados, contagiados y recuperados de 30 dias
                    </div>
                    <Divider/>
                

                <Grid columns={3} divided>
                    <GridColumn>
                <div className="Infectados" align="center" >
                    <h3 class="titulo_demanda">Datos Historicos de Infectados</h3>
                    
                    <input type="number"  class="" name="" id="" placeholder="infectados "  required/><br/>
                    
                    <input type="number" class="" name="" id="" placeholder="infectados"  required/> <br/>
                    
                    <input type="number" class="" name="" id="" placeholder="infectados" required/><br/>
                    
                    <input type="number" class="" name="" id="" placeholder="infectados" required/><br/>
                    
                    <input type="number" class="" name="" id="" placeholder="infectados" required/><br/>
                    
                    <input type="number" class="" name="" id="" placeholder="infectados" required/> <br/>

                    <input type="number"  class="" name="" id="" placeholder="infectados "  required/><br/>
                    
                    <input type="number" class="" name="" id="" placeholder="infectados"  required/> <br/>
                    
                    <input type="number" class="" name="" id="" placeholder="infectados" required/><br/>
                    
                    <input type="number" class="" name="" id="" placeholder="infectados" required/><br/>
                    
                    <input type="number" class="" name="" id="" placeholder="infectados" required/><br/>
                    
                    <input type="number" class="" name="" id="" placeholder="infectados" required/> <br/>

                    <input type="number" class="" name="" id="" placeholder="infectados "  required/><br/>
                    
                    <input type="number" class="" name="" id="" placeholder="infectados"  required/> <br/>
                    
                    <input type="number" class="" name="" id="" placeholder="infectados" required/><br/>
                    
                    <input type="number" class="" name="" id="" placeholder="infectados" required/><br/>
                    
                    <input type="number" class="" name="" id="" placeholder="infectados" required/><br/>
                    
                    <input type="number" class="" name="" id="" placeholder="infectados" required/> <br/>
                    <input type="number"  class="" name="" id="" placeholder="infectados "  required/><br/>
                    
                    <input type="number" class="" name="" id="" placeholder="infectados"  required/> <br/>
                    
                                        
                </div>
                </GridColumn>
                <GridColumn>
                <div className="recuperados" align="center" >
                    <h3 class="">Datos historicos de Recuperados</h3>
                    <input type="number" class="" name="" id="" placeholder="recuperados"/><br/>
                    
                    <input type="number" class="" name="" id="" placeholder="recuperados"/><br/>
                    
                    <input type="number" class="" name="" id="" placeholder="recuperados"/><br/>
                    
                    <input type="number" class="" name="" id="" placeholder="recuperados"/><br/>
                    
                    <input type="number" class="" name="" id="" placeholder="recuperados"/><br/>
                    <input type="number" class="" name="" id="" placeholder="recuperados"/><br/>
                    
                    <input type="number" class="" name="" id="" placeholder="recuperados"/><br/>
                    
                    <input type="number" class="" name="" id="" placeholder="recuperados"/><br/>
                    
                    <input type="number" class="" name="" id="" placeholder="recuperados"/><br/>
                    
                    <input type="number" class="" name="" id="" placeholder="recuperados"/><br/>
                    <input type="number" class="" name="" id="" placeholder="recuperados"/><br/>
                    
                    <input type="number" class="" name="" id="" placeholder="recuperados"/><br/>
                    
                    <input type="number" class="" name="" id="" placeholder="recuperados"/><br/>
                    
                    <input type="number" class="" name="" id="" placeholder="recuperados"/><br/>
                    
                    <input type="number" class="" name="" id="" placeholder="recuperados"/><br/>
                    <input type="number" class="" name="" id="" placeholder="recuperados"/><br/>
                    
                    <input type="number" class="" name="" id="" placeholder="recuperados"/><br/>
                    
                    <input type="number" class="" name="" id="" placeholder="recuperados"/><br/>
                    
                    <input type="number" class="" name="" id="" placeholder="recuperados"/><br/>
                    
                    <input type="number" class="" name="" id="" placeholder="recuperados"/><br/>
                    
                </div>
                </GridColumn>
                <GridColumn>
                <div className="Compras" align="center">
                    <h3 class="titulo_compras">Datos Historicos de Fallecidos</h3>
                    <input type="number" class="" name="" id="" placeholder="fallecidos"/><br/>
                    
                    <input type="number" class="" name="" id="" placeholder="fallecidos"/><br/>
                    
                    <input type="number" class="" name="" id="" placeholder="fallecidos"/><br/>
                    
                    <input type="number" class="" name="" id="" placeholder="fallecidos"/><br/>
                    
                    <input type="number" class="" name="" id="" placeholder="fallecidos"/><br/>
                    <input type="number" class="" name="" id="" placeholder="fallecidos"/><br/>
                    
                    <input type="number" class="" name="" id="" placeholder="fallecidos"/><br/>
                    
                    <input type="number" class="" name="" id="" placeholder="fallecidos"/><br/>
                    
                    <input type="number" class="" name="" id="" placeholder="fallecidos"/><br/>
                    
                    <input type="number" class="" name="" id="" placeholder="fallecidos"/><br/>
                    <input type="number" class="" name="" id="" placeholder="fallecidos"/><br/>
                    
                    <input type="number" class="" name="" id="" placeholder="fallecidos"/><br/>
                    
                    <input type="number" class="" name="" id="" placeholder="fallecidos"/><br/>
                    
                    <input type="number" class="" name="" id="" placeholder="fallecidos"/><br/>
                    
                    <input type="number" class="" name="" id="" placeholder="fallecidos"/><br/>
                    <input type="number" class="" name="" id="" placeholder="fallecidos"/><br/>
                    
                    <input type="number" class="" name="" id="" placeholder="fallecidos"/><br/>
                    <input type="number" class="" name="" id="" placeholder="fallecidos"/><br/>
                    <input type="number" class="" name="" id="" placeholder="fallecidos"/><br/>
                    
                    <input type="number" class="" name="" id="" placeholder="fallecidos"/><br/>
                    
                </div>
                </GridColumn>
                
                
                </Grid>
                <Divider/>
            </div>

        </form>
        <div align="center">
        <Button onClick={procesar()}>Iniciar Simulacion</Button>
        </div>
        </div>
        
    );
    };
    export default Simular;


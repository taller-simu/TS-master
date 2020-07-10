import React, { Component } from 'react';
import { Grid, GridColumn, Divider, Button } from 'semantic-ui-react';

export default class Simular extends Component{
    constructor(props) {
        super(props);
        this.state = {
            i1:0,i2:0,i3:0,i4:0,i5:0,i6:0,i7:0,i8:0,i9:0,i10:0,i11:0,i12:0,i13:0,i14:0,i15:0,i16:0,i17:0,i18:0,i19:0,i20:0,
            r1:0,r2:0,r3:0,r4:0,r5:0,r6:0,r7:0,r8:0,r9:0,r10:0,r11:0,r12:0,r13:0,r14:0,r15:0,r16:0,r17:0,r18:0,r19:0,r20:0,
            f1:0,f2:0,f3:0,f4:0,f5:0,f6:0,f7:0,f8:0,f9:0,f10:0,f11:0,f12:0,f13:0,f14:0,f15:0,f16:0,f17:0,f18:0,f19:0,f20:0
            ,
            tasaInfectados:0,
            items: []
        };  
        
    }
    

    handleState=(event)=>{
        this.setState({
            [event.target.name]: parseInt(event.target.value)
        })
    }
    
    sacartInfectados=async()=>{
        let suma=(this.state.i2/this.state.i1)+(this.state.i4/this.state.i3)+(this.state.i6/this.state.i5)+(this.state.i8/this.state.i7)+(this.state.i10/this.state.i9)+(this.state.i12/this.state.i11)+(this.state.i14/this.state.i13)+(this.state.i6/this.state.i15)+(this.state.i18/this.state.i17)+(this.state.i20/this.state.i19);
        let tasai=suma/17;
        this.setState({
            
            tasaInfectados:tasai
        })
        console.log(this.state.tasaInfectados)
        
    }
    render(){
        return(
        
            <div>
                  <form action="" id="form" class="formulario">
                <div className="formularioDiv">
                    <div className="titulo" align="center">
                        <h1>Insertar los datos historicos para la simulación</h1>
                    
                    
                        Introduzca datos de infectados, contagiados y recuperados de 30 dias
                        </div>
                        <Divider/>
                    
    
                    <Grid columns={3} divided>
                        <GridColumn>
                    <div className="Infectados" align="center" >
                        <h3 className="">Datos Historicos de Infectados</h3>
                        
                        <input type="number" class="" name="i1" id="" placeholder="infectados" onChange={(e)=>this.handleState(e)} required/><br/>                        
                        <input type="number" class="" name="i2" id="" placeholder="infectados" onChange={(e)=>this.handleState(e)} required/> <br/>                        
                        <input type="number" class="" name="i3" id="" placeholder="infectados" onChange={(e)=>this.handleState(e)} required/><br/>                        
                        <input type="number" class="" name="i4" id="" placeholder="infectados" onChange={(e)=>this.handleState(e)} required/><br/>                       
                        <input type="number" class="" name="i5" id="" placeholder="infectados" onChange={(e)=>this.handleState(e)} required/><br/>                        
                        <input type="number" class="" name="i6" id="" placeholder="infectados" onChange={(e)=>this.handleState(e)} required/> <br/>    
                        <input type="number" class="" name="i7" id="" placeholder="infectados" onChange={(e)=>this.handleState(e)} required/><br/>                        
                        <input type="number" class="" name="i8" id="" placeholder="infectados" onChange={(e)=>this.handleState(e)} required/> <br/>                        
                        <input type="number" class="" name="i9" id="" placeholder="infectados" onChange={(e)=>this.handleState(e)} required/><br/>                        
                        <input type="number" class="" name="i10" id="" placeholder="infectados" onChange={(e)=>this.handleState(e)} required/><br/>                        
                        <input type="number" class="" name="i11" id="" placeholder="infectados" onChange={(e)=>this.handleState(e)} required/><br/>                        
                        <input type="number" class="" name="i12" id="" placeholder="infectados" onChange={(e)=>this.handleState(e)} required/> <br/>    
                        <input type="number" class="" name="i13" id="" placeholder="infectados" onChange={(e)=>this.handleState(e)} required/><br/>                        
                        <input type="number" class="" name="i14" id="" placeholder="infectados" onChange={(e)=>this.handleState(e)} required/> <br/>                        
                        <input type="number" class="" name="i15" id="" placeholder="infectados" onChange={(e)=>this.handleState(e)} required/><br/>                        
                        <input type="number" class="" name="i16" id="" placeholder="infectados" onChange={(e)=>this.handleState(e)} required/><br/>                        
                        <input type="number" class="" name="i17" id="" placeholder="infectados" onChange={(e)=>this.handleState(e)} required/><br/>                        
                        <input type="number" class="" name="i18" id="" placeholder="infectados" onChange={(e)=>this.handleState(e)} required/> <br/>
                        <input type="number" class="" name="i19" id="" placeholder="infectados" onChange={(e)=>this.handleState(e)} required/><br/>                        
                        <input type="number" class="" name="i20" id="" placeholder="infectados" onChange={(e)=>this.handleState(e)} required/> <br/>
                        
                                            
                    </div>
                    </GridColumn>
                    <GridColumn>
                    <div className="recuperados" align="center" >
                        <h3 className="">Datos historicos de Recuperados</h3>
                        <input type="number" class="" name="r1" id="" placeholder="recuperados" onChange={(e)=>this.handleState(e)} required/><br/>                        
                        <input type="number" class="" name="r2" id="" placeholder="recuperados" onChange={(e)=>this.handleState(e)} required/><br/>                        
                        <input type="number" class="" name="r3" id="" placeholder="recuperados" onChange={(e)=>this.handleState(e)} required/><br/>                        
                        <input type="number" class="" name="r4" id="" placeholder="recuperados" onChange={(e)=>this.handleState(e)} required/><br/>                        
                        <input type="number" class="" name="r5" id="" placeholder="recuperados" onChange={(e)=>this.handleState(e)} required/><br/>
                        <input type="number" class="" name="r6" id="" placeholder="recuperados" onChange={(e)=>this.handleState(e)} required/><br/>                        
                        <input type="number" class="" name="r7" id="" placeholder="recuperados" onChange={(e)=>this.handleState(e)} required/><br/>                        
                        <input type="number" class="" name="r8" id="" placeholder="recuperados" onChange={(e)=>this.handleState(e)} required/><br/>                        
                        <input type="number" class="" name="r9" id="" placeholder="recuperados" onChange={(e)=>this.handleState(e)} required/><br/>                        
                        <input type="number" class="" name="r10" id="" placeholder="recuperados" onChange={(e)=>this.handleState(e)} required/><br/>
                        <input type="number" class="" name="r11" id="" placeholder="recuperados" onChange={(e)=>this.handleState(e)} required/><br/>                        
                        <input type="number" class="" name="r12" id="" placeholder="recuperados" onChange={(e)=>this.handleState(e)} required/><br/>                        
                        <input type="number" class="" name="r13" id="" placeholder="recuperados" onChange={(e)=>this.handleState(e)} required/><br/>                        
                        <input type="number" class="" name="r14" id="" placeholder="recuperados" onChange={(e)=>this.handleState(e)} required/><br/>                       
                        <input type="number" class="" name="r15" id="" placeholder="recuperados" onChange={(e)=>this.handleState(e)} required/><br/>
                        <input type="number" class="" name="r16" id="" placeholder="recuperados" onChange={(e)=>this.handleState(e)} required/><br/>                        
                        <input type="number" class="" name="r17" id="" placeholder="recuperados" onChange={(e)=>this.handleState(e)} required/><br/>                        
                        <input type="number" class="" name="r18" id="" placeholder="recuperados" onChange={(e)=>this.handleState(e)} required/><br/>                        
                        <input type="number" class="" name="r19" id="" placeholder="recuperados" onChange={(e)=>this.handleState(e)} required/><br/>                        
                        <input type="number" class="" name="r20" id="" placeholder="recuperados" onChange={(e)=>this.handleState(e)} required/><br/>
                        
                    </div>
                    </GridColumn>
                    <GridColumn>
                    <div className="fallecidos" align="center">
                        <h3 className="">Datos Historicos de Fallecidos</h3>
                        <input type="number" class="" name="f1" id="" placeholder="fallecidos" onChange={(e)=>this.handleState(e)} required/><br/>                        
                        <input type="number" class="" name="f2" id="" placeholder="fallecidos" onChange={(e)=>this.handleState(e)} required/><br/>                        
                        <input type="number" class="" name="f3" id="" placeholder="fallecidos" onChange={(e)=>this.handleState(e)} required/><br/>                        
                        <input type="number" class="" name="f4" id="" placeholder="fallecidos" onChange={(e)=>this.handleState(e)} required/><br/>                        
                        <input type="number" class="" name="f5" id="" placeholder="fallecidos" onChange={(e)=>this.handleState(e)} required/><br/>
                        <input type="number" class="" name="f6" id="" placeholder="fallecidos" onChange={(e)=>this.handleState(e)} required/><br/>                        
                        <input type="number" class="" name="f7" id="" placeholder="fallecidos" onChange={(e)=>this.handleState(e)} required/><br/>                        
                        <input type="number" class="" name="f8" id="" placeholder="fallecidos" onChange={(e)=>this.handleState(e)} required/><br/>                        
                        <input type="number" class="" name="f9" id="" placeholder="fallecidos" onChange={(e)=>this.handleState(e)} required/><br/>                        
                        <input type="number" class="" name="f10" id="" placeholder="fallecidos" onChange={(e)=>this.handleState(e)} required/><br/>
                        <input type="number" class="" name="f11" id="" placeholder="fallecidos" onChange={(e)=>this.handleState(e)} required/><br/>                        
                        <input type="number" class="" name="f12" id="" placeholder="fallecidos" onChange={(e)=>this.handleState(e)} required/><br/>                        
                        <input type="number" class="" name="f13" id="" placeholder="fallecidos" onChange={(e)=>this.handleState(e)} required/><br/>                        
                        <input type="number" class="" name="f14" id="" placeholder="fallecidos" onChange={(e)=>this.handleState(e)} required/><br/>                        
                        <input type="number" class="" name="f15" id="" placeholder="fallecidos" onChange={(e)=>this.handleState(e)} required/><br/>
                        <input type="number" class="" name="f16" id="" placeholder="fallecidos" onChange={(e)=>this.handleState(e)} required/><br/>                        
                        <input type="number" class="" name="f17" id="" placeholder="fallecidos" onChange={(e)=>this.handleState(e)} required/><br/>
                        <input type="number" class="" name="f18" id="" placeholder="fallecidos" onChange={(e)=>this.handleState(e)} required/><br/>
                        <input type="number" class="" name="f19" id="" placeholder="fallecidos" onChange={(e)=>this.handleState(e)} required/><br/>                        
                        <input type="number" class="" name="f20" id="" placeholder="fallecidos" onChange={(e)=>this.handleState(e)} required/><br/>
                        
                    </div>
                    </GridColumn>
                    
                    
                    </Grid>
                    <Divider/>
                </div>
    
            </form>
            <div align="center">
            <Button onClick={()=>this.sacartInfectados()}>iniciar</Button>
            </div>
            
            </div>
    /*
    return(
        
        <div>
                <form action="" id="form" class="formulario">
                <div className="formularioDiv">
                    <div className="titulo" align="center">
                        <h1>Insertar los datos historicos para la simulación</h1>            
                        Introduzca datos de infectados, contagiados y recuperados de 20 dias
                    </div>
                        <Divider/>
                    

                    <Grid columns={3} divided>
                        <GridColumn>
                        <div className="Infectados" align="center" >
                            <h3 className="titulo_demanda">Datos Historicos de Infectados</h3>                    
                            <Form id="i1" ph="infectados" n="i1"  onChange={this.handleState} name={this.n}/>                     
                            <Form id="i2" ph="infectados" n="i2"/>                    
                            <Form id="i3" ph="infectados" n="i3"/>                     
                            <Form id="i4" ph="infectados" n="i4"/>                    
                            <Form id="i5" ph="infectados" n="i5"/>                     
                            <Form id="i6" ph="infectados" n="i6"/>
                            <Form id="i7" ph="infectados" n="i7"/>                     
                            <Form id="i8" ph="infectados" n="i8"/>                   
                            <Form id="i9" ph="infectados" n="i9"/>                     
                            <Form id="i10" ph="infectados" n="i10"/>                    
                            <Form id="i11" ph="infectados" n="i11"/>                     
                            <Form id="i12" ph="infectados" n="i12"/>
                            <Form id="i13" ph="infectados" n="i13"/>                     
                            <Form id="i14" ph="infectados" n="i14"/>                    
                            <Form id="i15" ph="infectados" n="i15"/>                     
                            <Form id="i16" ph="infectados" n="i16"/>                    
                            <Form id="i17" ph="infectados" n="i17"/>                     
                            <Form id="i18" ph="infectados" n="i18"/>
                            <Form id="i19" ph="infectados" n="i19"/>                     
                            <Form id="i20" ph="infectados" n="i20"/>                                        
                        </div>
                    </GridColumn>
                    <GridColumn>
                        <div className="recuperados" align="center" >
                            <h3 className="">Datos historicos de Recuperados</h3>
                            <Form id="r1" ph="Recuperados" n="r1"/>                     
                            <Form id="r2" ph="Recuperados" n="r2"/>                    
                            <Form id="r3" ph="Recuperados" n="r3"/>                     
                            <Form id="r4" ph="Recuperados" n="r4"/>                    
                            <Form id="r5" ph="Recuperados" n="r5"/>                     
                            <Form id="r6" ph="Recuperados" n="r6"/>                    
                            <Form id="r7" ph="Recuperados" n="r7"/>                     
                            <Form id="r8" ph="Recuperados" n="r8"/>
                            <Form id="r9" ph="Recuperados" n="r9"/>                     
                            <Form id="r10" ph="Recuperados" n="r10"/>
                            <Form id="r11" ph="Recuperados" n="r11"/>                     
                            <Form id="r12" ph="Recuperados" n="r12"/>
                            <Form id="r13" ph="Recuperados" n="r13"/>                     
                            <Form id="r14" ph="Recuperados" n="r14"/>
                            <Form id="r15" ph="Recuperados" n="r15"/>                     
                            <Form id="r16" ph="Recuperados" n="r16"/>
                            <Form id="r17" ph="Recuperados" n="r17"/>                     
                            <Form id="r18" ph="Recuperados" n="r18"/>
                            <Form id="r19" ph="Recuperados" n="r19"/>                     
                            <Form id="r20" ph="Recuperados" n="r20"/>                   
                        </div>
                    </GridColumn>
                    <GridColumn>
                        <div className="Fallecidos" align="center">
                            <h3 className="">Datos Historicos de Fallecidos</h3>
                            <Form id="f1" ph="Fallecidos" n="f1"/>                     
                            <Form id="f2" ph="Fallecidos" n="f2"/>                     
                            <Form id="f3" ph="Fallecidos" n="f3"/>                     
                            <Form id="f4" ph="Fallecidos" n="f4"/>  
                            <Form id="f5" ph="Fallecidos" n="f5"/>                     
                            <Form id="f6" ph="Fallecidos" n="f6"/>  
                            <Form id="f7" ph="Fallecidos" n="f7"/>                     
                            <Form id="f8" ph="Fallecidos" n="f8"/>  
                            <Form id="f9" ph="Fallecidos" n="f9"/>                     
                            <Form id="f10" ph="Fallecidos" n="f10"/>  
                            <Form id="f11" ph="Fallecidos" n="f11"/>                     
                            <Form id="f12" ph="Fallecidos" n="f12"/>  
                            <Form id="f13" ph="Fallecidos" n="f13"/>                     
                            <Form id="f14" ph="Fallecidos" n="f14"/>  
                            <Form id="f15" ph="Fallecidos" n="f15"/>                     
                            <Form id="f16" ph="Fallecidos" n="f16"/>  
                            <Form id="f17" ph="Fallecidos" n="f17"/>                     
                            <Form id="f18" ph="Fallecidos" n="f18"/>  
                            <Form id="f19" ph="Fallecidos" n="f19"/>                     
                            <Form id="f20" ph="Fallecidos" n="f20"/>                         
                        </div>
                    </GridColumn>              
                    
                    </Grid>
                    <Divider/>
                </div>

            </form>
                <div align="center">
                    <Button onClick={()=>console.log(this.state.i1)}></Button>
                </div>
        </div>
        
    );*/
        );
        
    }
    
}



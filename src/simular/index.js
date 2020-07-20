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
            
            fechaRegistro:0,
            poblacion:0,
            dias:0,            
            municipio:''
            
        };  
        
    }
    

    handleState = (event) => {
        this.setState({
            [event.target.name]: (event.target.value)
        })
    }
    
    simular = () => {
       
            let suma = (this.state.i2 / this.state.i1) + (this.state.i3 / this.state.i2) +
                (this.state.i4 / this.state.i3) + (this.state.i5 / this.state.i4) + (this.state.i6 / this.state.i5) +
                (this.state.i7 / this.state.i6) + (this.state.i8 / this.state.i7) + (this.state.i9 / this.state.i8) +
                (this.state.i10 / this.state.i9) + (this.state.i11 / this.state.i10) + (this.state.i12 / this.state.i11) +
                (this.state.i13 / this.state.i12) + (this.state.i14 / this.state.i13) + (this.state.i15 / this.state.i14) +
                (this.state.i16 / this.state.i15) + (this.state.i17 / this.state.i16) + (this.state.i18 / this.state.i17) +
                (this.state.i19 / this.state.i18) + (this.state.i20 / this.state.i19);

            let tasai = (suma / 19) + 1;

            let tmortalidad = ((this.state.r1 / this.state.i1) + (this.state.r2 / this.state.i2) + (this.state.r3 / this.state.i3) +
                (this.state.r4 / this.state.i4) + (this.state.r5 / this.state.i5) + (this.state.r6 / this.state.i6) + (this.state.r7 / this.state.i7) +
                (this.state.r8 / this.state.i8) + (this.state.r9 / this.state.i9) + (this.state.r10 / this.state.i10) + (this.state.r11 / this.state.i11) +
                (this.state.r12 / this.state.i12) + (this.state.r13 / this.state.i13) + (this.state.r14 / this.state.i14) + (this.state.r15 / this.state.i15) +
                (this.state.r16 / this.state.i16) + (this.state.r17 / this.state.i17) + (this.state.r18 / this.state.i18) + (this.state.r19 / this.state.i19) +
                (this.state.r20 / this.state.i20)) / 20;

            let trecuperacion = 1 - tmortalidad;
            let pis = this.state.poblacion - this.state.i20;
            
            this.enviarDatos(tmortalidad,tasai,trecuperacion,pis);
            
        }

        enviarDatos=async(tm,ti,tr,pis)=>{
            
            try {
                  const res =  await fetch('http://localhost:8000/enviardatos', {
                method: 'POST',
                headers: {                    
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    
                    infectadosinicial:this.state.i20,
                    fallecidosini:this.state.f20,
                    recuperadosini:this.state.r20,
                    probabilidadContagio:0.17,
                    
                    tasaInteraccion:ti,
                    TasaRecuperacion:tr,
                    TasaMortalidad:tm,

                    fechaRegistro:this.state.fechaRegistro,
                    poblacionInicialSusc:pis,
                    dias:this.state.dias,                    
                    municipio:this.state.municipio
                })
                })
                return res;
            } catch (err) {
                return err;
            }
        }
          
          
    
    render(){
        
        return(
        
            <div>
                  <form id="form" className="formulario">
                <div className="formularioDiv">
                    <div className="titulo" align="center">
                        <h1>Insertar los datos historicos para la simulación</h1>
                                            
                        Introduzca datos de infectados, contagiados y recuperados de 20 dias
                        </div>

                        <Divider/>
                        
                    <Grid columns={3} divided>
                        <GridColumn>
                    <div className="Infectados" align="center" >
                        <h2 className="">Datos Historicos de Infectados</h2>
                        
                        <input type="number" name="i1" placeholder="infectados" onChange={(e)=>this.handleState(e)} required/><br/>                        
                        <input type="number" name="i2" placeholder="infectados" onChange={(e)=>this.handleState(e)} required/> <br/>                        
                        <input type="number" name="i3" placeholder="infectados" onChange={(e)=>this.handleState(e)} required/><br/>                        
                        <input type="number" name="i4" placeholder="infectados" onChange={(e)=>this.handleState(e)} required/><br/>                       
                        <input type="number" name="i5" placeholder="infectados" onChange={(e)=>this.handleState(e)} required/><br/>                        
                        <input type="number" name="i6" placeholder="infectados" onChange={(e)=>this.handleState(e)} required/> <br/>    
                        <input type="number" name="i7" placeholder="infectados" onChange={(e)=>this.handleState(e)} required/><br/>                        
                        <input type="number" name="i8" placeholder="infectados" onChange={(e)=>this.handleState(e)} required/> <br/>                        
                        <input type="number" name="i9" placeholder="infectados" onChange={(e)=>this.handleState(e)} required/><br/>                        
                        <input type="number" name="i10" placeholder="infectados" onChange={(e)=>this.handleState(e)} required/><br/>                        
                        <input type="number" name="i11" placeholder="infectados" onChange={(e)=>this.handleState(e)} required/><br/>                        
                        <input type="number" name="i12" placeholder="infectados" onChange={(e)=>this.handleState(e)} required/> <br/>    
                        <input type="number" name="i13" placeholder="infectados" onChange={(e)=>this.handleState(e)} required/><br/>                        
                        <input type="number" name="i14" placeholder="infectados" onChange={(e)=>this.handleState(e)} required/> <br/>                        
                        <input type="number" name="i15" placeholder="infectados" onChange={(e)=>this.handleState(e)} required/><br/>                        
                        <input type="number" name="i16" placeholder="infectados" onChange={(e)=>this.handleState(e)} required/><br/>                        
                        <input type="number" name="i17" placeholder="infectados" onChange={(e)=>this.handleState(e)} required/><br/>                        
                        <input type="number" name="i18" placeholder="infectados" onChange={(e)=>this.handleState(e)} required/> <br/>
                        <input type="number" name="i19" placeholder="infectados" onChange={(e)=>this.handleState(e)} required/><br/>                        
                        <input type="number" name="i20" placeholder="infectados" onChange={(e)=>this.handleState(e)} required/> <br/>
                        
                                            
                    </div>
                    </GridColumn>

                    <GridColumn>
                    <div className="Recuperados" align="center" >
                        <h2 className="">Datos historicos de Recuperados</h2>
                        <input type="number" name="r1" placeholder="recuperados" onChange={(e)=>this.handleState(e)} required/><br/>                        
                        <input type="number" name="r2" placeholder="recuperados" onChange={(e)=>this.handleState(e)} required/><br/>                        
                        <input type="number" name="r3" placeholder="recuperados" onChange={(e)=>this.handleState(e)} required/><br/>                        
                        <input type="number" name="r4" placeholder="recuperados" onChange={(e)=>this.handleState(e)} required/><br/>                        
                        <input type="number" name="r5" placeholder="recuperados" onChange={(e)=>this.handleState(e)} required/><br/>
                        <input type="number" name="r6" placeholder="recuperados" onChange={(e)=>this.handleState(e)} required/><br/>                        
                        <input type="number" name="r7" placeholder="recuperados" onChange={(e)=>this.handleState(e)} required/><br/>                        
                        <input type="number" name="r8" placeholder="recuperados" onChange={(e)=>this.handleState(e)} required/><br/>                        
                        <input type="number" name="r9" placeholder="recuperados" onChange={(e)=>this.handleState(e)} required/><br/>                        
                        <input type="number" name="r10" placeholder="recuperados" onChange={(e)=>this.handleState(e)} required/><br/>
                        <input type="number" name="r11" placeholder="recuperados" onChange={(e)=>this.handleState(e)} required/><br/>                        
                        <input type="number" name="r12" placeholder="recuperados" onChange={(e)=>this.handleState(e)} required/><br/>                        
                        <input type="number" name="r13" placeholder="recuperados" onChange={(e)=>this.handleState(e)} required/><br/>                        
                        <input type="number" name="r14" placeholder="recuperados" onChange={(e)=>this.handleState(e)} required/><br/>                       
                        <input type="number" name="r15" placeholder="recuperados" onChange={(e)=>this.handleState(e)} required/><br/>
                        <input type="number" name="r16" placeholder="recuperados" onChange={(e)=>this.handleState(e)} required/><br/>                        
                        <input type="number" name="r17" placeholder="recuperados" onChange={(e)=>this.handleState(e)} required/><br/>                        
                        <input type="number" name="r18" placeholder="recuperados" onChange={(e)=>this.handleState(e)} required/><br/>                        
                        <input type="number" name="r19" placeholder="recuperados" onChange={(e)=>this.handleState(e)} required/><br/>                        
                        <input type="number" name="r20" placeholder="recuperados" onChange={(e)=>this.handleState(e)} required/><br/>
                        
                    </div>
                    </GridColumn>

                    <GridColumn>
                    <div className="Fallecidos" align="center">
                        <h2 className="">Datos Historicos de Fallecidos</h2>
                        <input type="number" name="f1" placeholder="fallecidos" onChange={(e)=>this.handleState(e)} required/><br/>                        
                        <input type="number" name="f2" placeholder="fallecidos" onChange={(e)=>this.handleState(e)} required/><br/>                        
                        <input type="number" name="f3" placeholder="fallecidos" onChange={(e)=>this.handleState(e)} required/><br/>                        
                        <input type="number" name="f4" placeholder="fallecidos" onChange={(e)=>this.handleState(e)} required/><br/>                        
                        <input type="number" name="f5" placeholder="fallecidos" onChange={(e)=>this.handleState(e)} required/><br/>
                        <input type="number" name="f6" placeholder="fallecidos" onChange={(e)=>this.handleState(e)} required/><br/>                        
                        <input type="number" name="f7" placeholder="fallecidos" onChange={(e)=>this.handleState(e)} required/><br/>                        
                        <input type="number" name="f8" placeholder="fallecidos" onChange={(e)=>this.handleState(e)} required/><br/>                        
                        <input type="number" name="f9" placeholder="fallecidos" onChange={(e)=>this.handleState(e)} required/><br/>                        
                        <input type="number" name="f10" placeholder="fallecidos" onChange={(e)=>this.handleState(e)} required/><br/>
                        <input type="number" name="f11" placeholder="fallecidos" onChange={(e)=>this.handleState(e)} required/><br/>                        
                        <input type="number" name="f12" placeholder="fallecidos" onChange={(e)=>this.handleState(e)} required/><br/>                        
                        <input type="number" name="f13" placeholder="fallecidos" onChange={(e)=>this.handleState(e)} required/><br/>                        
                        <input type="number" name="f14" placeholder="fallecidos" onChange={(e)=>this.handleState(e)} required/><br/>                        
                        <input type="number" name="f15" placeholder="fallecidos" onChange={(e)=>this.handleState(e)} required/><br/>
                        <input type="number" name="f16" placeholder="fallecidos" onChange={(e)=>this.handleState(e)} required/><br/>                        
                        <input type="number" name="f17" placeholder="fallecidos" onChange={(e)=>this.handleState(e)} required/><br/>
                        <input type="number" name="f18" placeholder="fallecidos" onChange={(e)=>this.handleState(e)} required/><br/>
                        <input type="number" name="f19" placeholder="fallecidos" onChange={(e)=>this.handleState(e)} required/><br/>                        
                        <input type="number" name="f20" placeholder="fallecidos" onChange={(e)=>this.handleState(e)} required/><br/>
                        
                    </div>
                    </GridColumn>
                    
                    
                    </Grid>

                    <Divider/>

                </div>
    
            </form>
            <div className="form" align="center">
                <label style={{fontSize:18}}>Introduzca los dias a simular: </label>
                <input type="number"  name="dias" placeholder="dias" onChange={(e)=>this.handleState(e)} required/><br/> 

                <label style={{fontSize:18}}>Introduzca Nombre de Municipio: </label>
                <input type="text"  name="municipio" placeholder="municipio" onChange={(e)=>this.handleState(e)} required/><br/>  

                <label style={{fontSize:18}}>Introduzca la poblacion total del Municipio: </label> 
                <input type="number"  name="poblacion" placeholder="poblacion" onChange={(e)=>this.handleState(e)} required/><br/>

                <label style={{fontSize:18}}>Introduzca la fecha del ultimo dato: </label> 
                <input type="date"  name="fechaRegistro" placeholder="fecha" onChange={(e)=>this.handleState(e)} required/><br/>
                
                <Button class="ui primary button" style={{margin:"25px",backgroundColor:"red",color:"black"}} onClick={()=>this.simular()}>iniciar</Button>
            </div>
            
            </div>

        );
        
    }
    
}



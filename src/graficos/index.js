import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

class Graficos extends Component{
    constructor(props) {
        super(props);
        
        this.state = {
            
            tasaRecuperacion:0,
            tasaMortalidad:0,
            tasaInteraccion:0,
            probabilidadContagio:0,
            dias:0,
            susceptiblesini:0,
            infectadosinicial:0,
            recuperadosini:0,
            fallecidosini:0,
            
            chartData:{
                labels:[],
                datasets:[
                {
                    label:'Infectados',
                    data:[],
                    borderColor:"yellow",
                    fill:false,
                    pointBorderWidth:5,
                    pointHoverRatios:3
                    
                },
                {
                    label:'Recuperados',
                    data:[],
                    borderColor:"green",
                    fill:false,
                    pointBorderWidth:5,
                    pointHoverRatios:3
                },
                {
                    label:'Fallecidos',
                    data:[],
                    borderColor:"red",
                    fill:false,
                    pointBorderWidth:5,
                    pointHoverRatios:3
                }
            ]
            }
        };  
        
    }
    
    componentDidMount=async()=>{
        await this.fetchData(); 
        await this.infectados();
        
    }
    
    infectados=()=>{
        let susceptibles = this.state.susceptiblesini;
        let infectados = this.state.infectadosinicial;
        let recuperados = this.state.recuperadosini;
        let fallecidos = this.state.fallecidosini;
        let proContagio = this.state.probabilidadContagio;
        let tRecuperacion = this.state.tasaRecuperacion;
        let recuperaciones,contagios,fallecimientos;
        let mortalidad=this.state.tasaMortalidad;
        this.state.chartData.datasets[0].data.push(infectados);
        this.state.chartData.datasets[1].data.push(recuperados);
        this.state.chartData.datasets[2].data.push(fallecidos);

        for(let i=1 ; i<=this.state.dias ; i++){
           contagios = (infectados * this.state.tasaInteraccion * susceptibles) / (susceptibles+infectados+recuperados) * proContagio;
           recuperaciones = infectados * tRecuperacion / 14;
           fallecimientos = infectados * mortalidad / 14
           susceptibles = susceptibles - contagios;
           infectados = infectados + contagios - recuperaciones - fallecimientos;
           recuperados = recuperados + recuperaciones;
           fallecidos = fallecidos + fallecimientos;
           
           this.state.chartData.datasets[0].data.push(parseInt(infectados));
           this.state.chartData.datasets[1].data.push(parseInt(recuperados));
           this.state.chartData.datasets[2].data.push(parseInt(fallecidos));
           this.state.chartData.labels.push('dia '+i);
           
        }
        
        
        
    }
    fetchData = async ()=>{
        let res = await fetch('http://localhost:8000/ultimoRegistro', {method: 'GET'})
        let data = await res.json()
        
        data.map(
            (it)=>(
                this.setState({
                tasaRecuperacion:it.TasaRecuperacion,
                tasaMortalidad:it.TasaMortalidad,
                tasaInteraccion:it.tasaInteraccion,
                probabilidadContagio:it.probabilidadContagio,
                dias:it.dias,
                susceptiblesini:it.poblacionInicialSusc,
                infectadosinicial:it.infectadosinicial,
                recuperadosini:it.recuperadosini,
                fallecidosini:it.fallecidosini

                })
            )

            
        )
        
    }
    render(){
        
        return(
            <div>
                
                <div>
                    <Line 
                    data={this.state.chartData}
                    options={{
                        responsive:true
                    }}
                    
                    />
                </div>
            </div>
        );
    }
}

export default Graficos;
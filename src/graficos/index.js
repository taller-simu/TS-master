import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import { Checkbox, Divider, Button} from 'semantic-ui-react';


class Graficos extends Component{
    constructor(props) {
        super(props);
         
        
        
        this.toggleChange1=this.toggleChange1.bind(this);
        this.toggleChange2=this.toggleChange2.bind(this);
        this.toggleChange3=this.toggleChange3.bind(this);
        this.state = {    
            tasaRecuperacion:0,
            tasaMortalidad:0,
            tasaInteraccion:0,
            tmIterable:0,
            trIterable:0,
            tiIterable:0,

            probabilidadContagio:0,
            dias:0,
            municipio:'',

            susceptiblesini:0,
            infectadosinicial:0,
            recuperadosini:0,
            fallecidosini:0,
            
            isChecked1: false,
            isChecked2: false,
            isChecked3: false,
            
            //Object for chart
            chartData:{
                labels:[],
                datasets:[
                {
                    label:'Infectados',
                    fontSize:"",
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
        this.infectados();
        
        
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
                fallecidosini:it.fallecidosini,
                municipio:it.municipio,
                
                trIterable:it.TasaRecuperacion,
                tmIterable:it.TasaMortalidad,
                tiIterable:it.tasaInteraccion
                })
            )

            
        )
        
    }
    infectados=()=>{
        let susceptibles = this.state.susceptiblesini;
        let infectados = this.state.infectadosinicial;
        let recuperados = this.state.recuperadosini;
        let fallecidos = this.state.fallecidosini;
        let proContagio = this.state.probabilidadContagio;
        let tRecuperacion = this.state.tasaRecuperacion;
        let recuperaciones,contagios,fallecimientos;
        let mortalidad = this.state.tasaMortalidad;
        let tinteraccion=this.state.tasaInteraccion;        

        for(let i=1 ; i<=this.state.dias ; i++){
           contagios = (infectados * tinteraccion * susceptibles) / (susceptibles+infectados+recuperados) * proContagio;
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
   
    toggleChange1 = () => {
        this.setState({
            isChecked1:!this.state.isChecked1
        })
        
        
    }
    
    isDisabled = () => {
        if(this.state.isChecked1){
            return(false);
        }else{
            return true;
        }
    }

    iterationNewData=()=>{
        
    }
  
    toggleChange2 = () => {
        if(!this.state.isChecked2){

            let thischart=this.state.chartData.datasets[0];
            let thischart1=this.state.chartData.datasets[1];
            let thischart2=this.state.chartData.datasets[2];
            let initialState=this.state.chartData;
            let newdata=[];
            let newdata1=[];
            let newdata2=[];
            let susceptibles = this.state.susceptiblesini;
            let infectados = this.state.infectadosinicial;
            let recuperados = this.state.recuperadosini;
            let fallecidos = this.state.fallecidosini;
            let proContagio = this.state.probabilidadContagio;
            let tRecuperacion = this.state.tasaRecuperacion;
            let recuperaciones,contagios,fallecimientos;
            let mortalidad = this.state.tasaMortalidad;
            let tinteraccion=this.state.tasaInteraccion-0.4;
            
            if(this.isChecked3===true){
                tinteraccion=tinteraccion+0.2;
            }
            
            for(let i=0;i<this.state.chartData.labels.length;i++){
                contagios = (infectados * tinteraccion * susceptibles) / (susceptibles + infectados + recuperados) * proContagio;
                recuperaciones = infectados * tRecuperacion / 14;
                fallecimientos = infectados * mortalidad / 14
                susceptibles = susceptibles - contagios;
                infectados = infectados + contagios - recuperaciones - fallecimientos;
                recuperados = recuperados + recuperaciones;
                fallecidos = fallecidos + fallecimientos;
                newdata.push(parseInt(infectados));
                newdata1.push(parseInt(recuperados));
                newdata2.push(parseInt(fallecidos));
            }
            let newDataSet={
                ...thischart
            }
            let newDataSet1={
                ...thischart1
            }
            let newDataSet2={
                ...thischart2
            }
            newDataSet.data=newdata;
            newDataSet1.data=newdata1;
            newDataSet2.data=newdata2;

            let newState={
                ...initialState,datasets:[newDataSet,newDataSet1,newDataSet2]
            }
            
            this.setState({                
                isChecked2: !this.state.isChecked2,
                tiIterable: tinteraccion,
                isChecked3:false
                
            })
            
            this.setState({
                chartData:newState              
            })
            
        }
        else{
            let thischart=this.state.chartData.datasets[0];
            let thischart1=this.state.chartData.datasets[1];
            let thischart2=this.state.chartData.datasets[2];
            let initialState=this.state.chartData;
            let newdata=[];
            let newdata1=[];
            let newdata2=[];
            let susceptibles = this.state.susceptiblesini;
            let infectados = this.state.infectadosinicial;
            let recuperados = this.state.recuperadosini;
            let fallecidos = this.state.fallecidosini;
            let proContagio = this.state.probabilidadContagio;
            let tRecuperacion = this.state.tasaRecuperacion;
            let recuperaciones,contagios,fallecimientos;
            let mortalidad = this.state.tasaMortalidad;
            let tinteraccion=this.state.tiIterable+0.4;

            for(let i=0;i<this.state.chartData.labels.length;i++){
                contagios = (infectados * tinteraccion * susceptibles) / (susceptibles+infectados+recuperados) * proContagio;
                recuperaciones = infectados * tRecuperacion / 14;
                fallecimientos = infectados * mortalidad / 14
                susceptibles = susceptibles - contagios;
                infectados = infectados + contagios - recuperaciones - fallecimientos;
                recuperados = recuperados + recuperaciones;
                fallecidos = fallecidos + fallecimientos;
                newdata.push(parseInt(infectados));
                newdata1.push(parseInt(recuperados));
                newdata2.push(parseInt(fallecidos));
            }
            let newDataSet={
                ...thischart
            }
            let newDataSet1={
                ...thischart1
            }
            let newDataSet2={
                ...thischart2
            }
            newDataSet.data=newdata;
            newDataSet1.data=newdata1;
            newDataSet2.data=newdata2;

            let newState={
                ...initialState,datasets:[newDataSet,newDataSet1,newDataSet2]
            }
            
            this.setState({
                isChecked2: !this.state.isChecked2,
                tiIterable: tinteraccion
                                 
            })
            
            this.setState({
                chartData:newState
            })
        }
        
    }
    toggleChange3 = () => {
        if(!this.state.isChecked3){
            let thischart=this.state.chartData.datasets[0];
            let thischart1=this.state.chartData.datasets[1];
            let thischart2=this.state.chartData.datasets[2];
            let initialState=this.state.chartData;
            let newdata=[];
            let newdata1=[];
            let newdata2=[];
            let susceptibles = this.state.susceptiblesini;
            let infectados = this.state.infectadosinicial;
            let recuperados = this.state.recuperadosini;
            let fallecidos = this.state.fallecidosini;
            let proContagio = this.state.probabilidadContagio;
            let tRecuperacion = this.state.tasaRecuperacion;
            let recuperaciones,contagios,fallecimientos;
            let mortalidad = this.state.tasaMortalidad;
            let tinteraccion=this.state.tasaInteraccion-0.2;
            if(this.isChecked3===true){
                tinteraccion=tinteraccion+0.4;
            }

            for(let i=0;i<this.state.chartData.labels.length;i++){
                contagios = (infectados * tinteraccion * susceptibles) / (susceptibles + infectados + recuperados) * proContagio;
                recuperaciones = infectados * tRecuperacion / 14;
                fallecimientos = infectados * mortalidad / 14
                susceptibles = susceptibles - contagios;
                infectados = infectados + contagios - recuperaciones - fallecimientos;
                recuperados = recuperados + recuperaciones;
                fallecidos = fallecidos + fallecimientos;
                newdata.push(parseInt(infectados));
                newdata1.push(parseInt(recuperados));
                newdata2.push(parseInt(fallecidos));
            }
            let newDataSet={
                ...thischart
            }
            let newDataSet1={
                ...thischart1
            }
            let newDataSet2={
                ...thischart2
            }
            newDataSet.data=newdata;
            newDataSet1.data=newdata1;
            newDataSet2.data=newdata2;

            let newState={
                ...initialState,datasets:[newDataSet,newDataSet1,newDataSet2]
            }
            
            this.setState({                
                isChecked3: !this.state.isChecked3,
                tiIterable: tinteraccion,
                isChecked2:false
            })
            this.setState({
                chartData:newState              
            })
                       
        }
            else{
                let thischart=this.state.chartData.datasets[0];
                let thischart1=this.state.chartData.datasets[1];
                let thischart2=this.state.chartData.datasets[2];
                let initialState=this.state.chartData;
                let newdata=[];
                let newdata1=[];
                let newdata2=[];
                let susceptibles = this.state.susceptiblesini;
                let infectados = this.state.infectadosinicial;
                let recuperados = this.state.recuperadosini;
                let fallecidos = this.state.fallecidosini;
                let proContagio = this.state.probabilidadContagio;
                let tRecuperacion = this.state.tasaRecuperacion;
                let recuperaciones,contagios,fallecimientos;
                let mortalidad = this.state.tasaMortalidad;
                let tinteraccion=this.state.tiIterable+0.2;

                for(let i=0;i<this.state.chartData.labels.length;i++){
                    contagios = (infectados * tinteraccion * susceptibles) / (susceptibles+infectados+recuperados) * proContagio;
                    recuperaciones = infectados * tRecuperacion / 14;
                    fallecimientos = infectados * mortalidad / 14
                    susceptibles = susceptibles - contagios;
                    infectados = infectados + contagios - recuperaciones - fallecimientos;
                    recuperados = recuperados + recuperaciones;
                    fallecidos = fallecidos + fallecimientos;
                    newdata.push(parseInt(infectados));
                    newdata1.push(parseInt(recuperados));
                    newdata2.push(parseInt(fallecidos));
                }
                let newDataSet={
                    ...thischart
                }
                let newDataSet1={
                    ...thischart1
                }
                let newDataSet2={
                    ...thischart2
                }
                newDataSet.data=newdata;
                newDataSet1.data=newdata1;
                newDataSet2.data=newdata2;

                let newState={
                    ...initialState,datasets:[newDataSet,newDataSet1,newDataSet2]
                }
                this.setState({
                    isChecked3: !this.state.isChecked3,
                    tiIterable: tinteraccion,
                                      
                })
                this.setState({
                    chartData:newState
            })
        }
        
    }
    
    render(){
        
        return(
            <div>
                
                <div className="chart-container" >
                
                    <Line 
                        data={this.state.chartData}
                        options={
                            {
                            responsive:true,
                            
                            title: {
                                display: true,
                                text: 'DATOS DEL MUNICIPIO DE '+this.state.municipio,
                                fontSize:50,
                                position:'top'
                            },
                            legend: {
                                display: true,
                                position:'bottom',                                
                                labels: {
                                    padding:20,
                                    fontSize:20
                                }
                            },
                            scales: {                                
                                yAxes: [                                    
                                    {
                                        scaleLabel: {
                                            display: true,
                                            labelString: 'POBLACION',
                                            fontSize:25,
                                            padding:1
                                        },
                                    ticks: {
                                        fontSize:17,
                                                                            
                                        }
                                    }
                                ],
                                xAxes: [
                                    {
                                        
                                    ticks: {
                                        fontSize:17
                                            }
                                        }
                                    ]
                                 }
                             }
                         }
                    
                    />
                </div>
                <Divider/>
                <div className="checkbox" align="center">

                    <label style={{marginLeft:"200px", fontSize:"25px"}}>Cuarentena:</label>
                    <div className="ui fitted toggle checkbox" style={{marginLeft:"20px"}}>
                        <input type="checkbox" readOnly="hidden" tabIndex="1"  checked={this.state.isChecked1} onChange={this.toggleChange1} />
                        <label></label>
                    </div><br/>
                    
                    <label style={{marginLeft:"270px", fontSize:"18px"}}>Rigida:</label>
                    <div className="ui fitted toggle checkbox" style={{marginLeft:"20px"}}>                        
                        <input type="checkbox" readOnly="hidden" tabIndex="2"  checked={this.state.isChecked2} onChange={this.toggleChange2} disabled={this.isDisabled()}/>
                        <label></label>
                    </div><br/>

                    <label style={{marginLeft:"294px", fontSize:"18px"}}>Dinamica:</label>
                    <div className="ui fitted toggle checkbox" style={{marginLeft:"20px"}}>                        
                        <input type="checkbox" readOnly="hidden" tabIndex="3"  checked={this.state.isChecked3} onChange={this.toggleChange3} disabled={this.isDisabled()}/>
                        <label></label>
                    </div><br/>

                </div>
            </div>
        );
    }
}

export default Graficos;
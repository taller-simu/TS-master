import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import { Divider, Grid, GridColumn } from 'semantic-ui-react';
import Footer from '../footer';

class Graficos extends Component{
    constructor(props) {
        super(props);
        
        this.state = {    
            tasaRecuperacion:0,
            tasaMortalidad:0,
            tasaInteraccion:0,
            tmIterable:0,
            trIterable:0,
            tiIterable:0,
            
            valT:0,
            val:0,
            valAu:0,

            probabilidadContagio:0,
            dias:0,
            fechaActual:0,
            fechaInicio:0,
            fechaFin:0,
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
                    borderColor:'rgb(214, 224, 18)',
                    fill:false,
                    pointBorderWidth:8,
                    pointHoverRatios:4,
                    borderWidth:6.5
                    
                },
                {
                    label:'Recuperados',
                    data:[],
                    borderColor:"green",
                    fill:false,
                    pointBorderWidth:8,
                    pointHoverRatios:4,
                    borderWidth:6.5
                },
                {
                    label:'Fallecidos',
                    data:[],
                    borderColor:"red",
                    fill:false,
                    pointBorderWidth:8,
                    pointHoverRatios:4,
                    borderWidth:6.5         
                    
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
                fechaActual:it.fechaActual,
                fechaInicio:it.fechaInicio,
                fechaFin:it.fechaFin,
                
                susceptiblesini:it.poblacionInicialSusc,
                infectadosinicial:it.infectadosinicial,
                recuperadosini:it.recuperadosini,
                fallecidosini:it.fallecidosini,
                municipio:it.municipio,
                
                trIterable:it.TasaRecuperacion,
                tmIterable:it.TasaMortalidad,
                tiIterable:it.tasaInteraccion,
                

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
           if((this.state.dias-this.countDays())<=i){
           this.state.chartData.datasets[0].data.push(parseInt(infectados));
           this.state.chartData.datasets[1].data.push(parseInt(recuperados));
           this.state.chartData.datasets[2].data.push(parseInt(fallecidos));
           this.state.chartData.labels.push(this.calcFecha(i));
           }
        }  
    }
    countDays=()=>{
        let fechaI=new Date(this.state.fechaInicio).getTime();
        let fechaF=new Date(this.state.fechaFin).getTime();
        let diff=(fechaF-fechaI)/(1000*60*60*24);
        
        return diff;
        
    }

    calcFecha = (i) => {
        let date=new Date(this.state.fechaActual);
        date.setDate(date.getDate()+i);
        let res = date.toLocaleDateString('es-MX', {
            day : 'numeric',
            month : 'short',
            year : 'numeric'
        }).split(' ').join(' ');
        return res;
        /*let options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          };
          return date.toLocaleDateString('es-MX', options);*/
                /*date.setDate(date.getDate()+i);
                let res=date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
                return res;*/
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

    forIteration=(susceptibles,infectados,recuperados,fallecidos,proContagio,tRecuperacion,recuperaciones,contagios,fallecimientos,mortalidad,tinteraccion)=>{
            let obj=[[],[],[]]
            for(let i=0;i<this.state.dias;i++){
                contagios = (infectados * tinteraccion * susceptibles) / (susceptibles + infectados + recuperados) * proContagio;
                recuperaciones = infectados * tRecuperacion / 14;
                fallecimientos = infectados * mortalidad / 14
                susceptibles = susceptibles - contagios;
                infectados = infectados + contagios - recuperaciones - fallecimientos;
                recuperados = recuperados + recuperaciones;
                fallecidos = fallecidos + fallecimientos;
                if((this.state.dias-this.countDays())<=i+1){
                obj[0].push(parseInt(infectados));
                obj[1].push(parseInt(recuperados));
                obj[2].push(parseInt(fallecidos));
                }
            }
            return obj;
    }
  
    toggleChange2 = () => {
        let hist=this.state.tiIterable;
        let valor=this.state.valT;

        if(!this.state.isChecked2){

            let thischart=this.state.chartData.datasets[0];
            let thischart1=this.state.chartData.datasets[1];
            let thischart2=this.state.chartData.datasets[2];
            let initialState=this.state.chartData;
            
            let susceptibles = this.state.susceptiblesini;
            let infectados = this.state.infectadosinicial;
            let recuperados = this.state.recuperadosini;
            let fallecidos = this.state.fallecidosini;
            let proContagio = this.state.probabilidadContagio;
            let tRecuperacion = this.state.tasaRecuperacion;
            let recuperaciones,contagios,fallecimientos;
            let mortalidad = this.state.tasaMortalidad;
            hist=hist+valor;
            valor=0.4;
            let tinteraccion=hist-valor;
            let obj=[this.forIteration(susceptibles,infectados,recuperados,fallecidos,
                proContagio,tRecuperacion,recuperaciones,contagios,fallecimientos,mortalidad,tinteraccion)];
            let newdata=[...obj[0][0]];
            let newdata1=[...obj[0][1]];
            let newdata2=[...obj[0][2]];   
            
            
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
                isChecked3:false,
                valT:valor
                
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
            
            let susceptibles = this.state.susceptiblesini;
            let infectados = this.state.infectadosinicial;
            let recuperados = this.state.recuperadosini;
            let fallecidos = this.state.fallecidosini;
            let proContagio = this.state.probabilidadContagio;
            let tRecuperacion = this.state.tasaRecuperacion;
            let recuperaciones,contagios,fallecimientos;
            let mortalidad = this.state.tasaMortalidad;
            hist=hist+valor;
            valor=0
            let tinteraccion=hist+valor;
            let obj=[this.forIteration(susceptibles,infectados,recuperados,fallecidos,
                proContagio,tRecuperacion,recuperaciones,contagios,fallecimientos,mortalidad,tinteraccion)]
            let newdata=[...obj[0][0]];
            let newdata1=[...obj[0][1]];
            let newdata2=[...obj[0][2]];   
            
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
                valT:valor
                                 
            })
            
            this.setState({
                chartData:newState
            })
        }
        
    }
    toggleChange3 = () => {
        let hist=this.state.tiIterable;
        let valor=this.state.valT;
        if(!this.state.isChecked3){
            let thischart=this.state.chartData.datasets[0];
            let thischart1=this.state.chartData.datasets[1];
            let thischart2=this.state.chartData.datasets[2];
            let initialState=this.state.chartData;
            
            let susceptibles = this.state.susceptiblesini;
            let infectados = this.state.infectadosinicial;
            let recuperados = this.state.recuperadosini;
            let fallecidos = this.state.fallecidosini;
            let proContagio = this.state.probabilidadContagio;
            let tRecuperacion = this.state.tasaRecuperacion;
            let recuperaciones,contagios,fallecimientos;
            let mortalidad = this.state.tasaMortalidad;
            hist=hist+valor;
            valor=0.2;
            let tinteraccion=hist-valor;
            let obj=[this.forIteration(susceptibles,infectados,recuperados,fallecidos,
                proContagio,tRecuperacion,recuperaciones,contagios,fallecimientos,mortalidad,tinteraccion)]
            let newdata=[...obj[0][0]];
            let newdata1=[...obj[0][1]];
            let newdata2=[...obj[0][2]];   
            
            
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
                isChecked2:false,
                valT:valor
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
                
                let susceptibles = this.state.susceptiblesini;
                let infectados = this.state.infectadosinicial;
                let recuperados = this.state.recuperadosini;
                let fallecidos = this.state.fallecidosini;
                let proContagio = this.state.probabilidadContagio;
                let tRecuperacion = this.state.tasaRecuperacion;
                let recuperaciones,contagios,fallecimientos;
                let mortalidad = this.state.tasaMortalidad;
                hist=hist+valor;
                valor=0;
                let tinteraccion=hist+valor;
                let obj=[this.forIteration(susceptibles,infectados,recuperados,fallecidos,
                    proContagio,tRecuperacion,recuperaciones,contagios,fallecimientos,mortalidad,tinteraccion)]
                let newdata=[...obj[0][0]];
                let newdata1=[...obj[0][1]];
                let newdata2=[...obj[0][2]];   
                
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
                    valT:valor
                                      
                })
                this.setState({
                    chartData:newState
            })
        }
        
    }
    automedication=(value)=>{
        let histM=this.state.tmIterable;
        let histR=this.state.trIterable;
        let val=this.state.valAu;
        if(value==="todos"){
            
                let thischart=this.state.chartData.datasets[0];
                let thischart1=this.state.chartData.datasets[1];
                let thischart2=this.state.chartData.datasets[2];
                let initialState=this.state.chartData;
                
                let susceptibles = this.state.susceptiblesini;
                let infectados = this.state.infectadosinicial;
                let recuperados = this.state.recuperadosini;
                let fallecidos = this.state.fallecidosini;
                let proContagio = this.state.probabilidadContagio;
                histM=histM+val;
                histR=histR-val;
                val=0.07;
                let tRecuperacion = histR+val;
                let recuperaciones,contagios,fallecimientos;
                let mortalidad = histM-val;
                let tinteraccion=this.state.tiIterable;
                
                let obj=[this.forIteration(susceptibles,infectados,recuperados,fallecidos,
                    proContagio,tRecuperacion,recuperaciones,contagios,fallecimientos,mortalidad,tinteraccion)]
                let newdata=[...obj[0][0]];
                let newdata1=[...obj[0][1]];
                let newdata2=[...obj[0][2]];   
                
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
                    tmIterable:mortalidad,
                    valAu:val,
                    trIterable: tRecuperacion                 
                })
                this.setState({
                    chartData:newState              
                })
                           
            
        }
        if(value==="muchos"){
            
            let thischart=this.state.chartData.datasets[0];
            let thischart1=this.state.chartData.datasets[1];
            let thischart2=this.state.chartData.datasets[2];
            let initialState=this.state.chartData;
            
            let susceptibles = this.state.susceptiblesini;
            let infectados = this.state.infectadosinicial;
            let recuperados = this.state.recuperadosini;
            let fallecidos = this.state.fallecidosini;
            let proContagio = this.state.probabilidadContagio;
            
            histM=histM+val;
                histR=histR-val;
                val=0.04;
                let tRecuperacion = histR+val;
                let recuperaciones,contagios,fallecimientos;
                let mortalidad = histM-val;
            let tinteraccion=this.state.tiIterable;
            
            let obj=[this.forIteration(susceptibles,infectados,recuperados,fallecidos,
                proContagio,tRecuperacion,recuperaciones,contagios,fallecimientos,mortalidad,tinteraccion)]
            let newdata=[...obj[0][0]];
            let newdata1=[...obj[0][1]];
            let newdata2=[...obj[0][2]];   
            
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
                tmIterable:mortalidad,
                valAu:val,
                trIterable: tRecuperacion                 
            })
            this.setState({
                chartData:newState              
            })
                       
        
        }
        if(value==="algunos"){
            
            let thischart=this.state.chartData.datasets[0];
            let thischart1=this.state.chartData.datasets[1];
            let thischart2=this.state.chartData.datasets[2];
            let initialState=this.state.chartData;
            
            let susceptibles = this.state.susceptiblesini;
            let infectados = this.state.infectadosinicial;
            let recuperados = this.state.recuperadosini;
            let fallecidos = this.state.fallecidosini;
            let proContagio = this.state.probabilidadContagio;
            histM=histM+val;
                histR=histR-val;
                val=0.02;
                let tRecuperacion = histR+val;
                let recuperaciones,contagios,fallecimientos;
                let mortalidad = histM-val;
            let tinteraccion=this.state.tiIterable;
            
            let obj=[this.forIteration(susceptibles,infectados,recuperados,fallecidos,
                proContagio,tRecuperacion,recuperaciones,contagios,fallecimientos,mortalidad,tinteraccion)]
            let newdata=[...obj[0][0]];
            let newdata1=[...obj[0][1]];
            let newdata2=[...obj[0][2]];   
            
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
                tmIterable:mortalidad,
                valAu:val,
                trIterable: tRecuperacion                 
            })
            this.setState({
                chartData:newState              
            })
                       
        
        }
        if(value==="pocos"){
            
            let thischart=this.state.chartData.datasets[0];
            let thischart1=this.state.chartData.datasets[1];
            let thischart2=this.state.chartData.datasets[2];
            let initialState=this.state.chartData;
            
            let susceptibles = this.state.susceptiblesini;
            let infectados = this.state.infectadosinicial;
            let recuperados = this.state.recuperadosini;
            let fallecidos = this.state.fallecidosini;
            let proContagio = this.state.probabilidadContagio;
            histM=histM+val;
                histR=histR-val;
                val=0.02;
                let tRecuperacion = histR+val;
                let recuperaciones,contagios,fallecimientos;
                let mortalidad = histM-val;
            let tinteraccion=this.state.tiIterable;
            
            let obj=[this.forIteration(susceptibles,infectados,recuperados,fallecidos,
                proContagio,tRecuperacion,recuperaciones,contagios,fallecimientos,mortalidad,tinteraccion)]
            let newdata=[...obj[0][0]];
            let newdata1=[...obj[0][1]];
            let newdata2=[...obj[0][2]];   
            
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
                tmIterable:mortalidad,
                valAu:val,
                trIterable: tRecuperacion                 
            })
            this.setState({
                chartData:newState              
            })
                       
        
        }
        if(value==="ninguno"){
            
            let thischart=this.state.chartData.datasets[0];
            let thischart1=this.state.chartData.datasets[1];
            let thischart2=this.state.chartData.datasets[2];
            let initialState=this.state.chartData;
            
            let susceptibles = this.state.susceptiblesini;
            let infectados = this.state.infectadosinicial;
            let recuperados = this.state.recuperadosini;
            let fallecidos = this.state.fallecidosini;
            let proContagio = this.state.probabilidadContagio;
            histM=histM+val;
            histR=histR-val;
            val=0.001;
            let tRecuperacion = histR+val;
            let recuperaciones,contagios,fallecimientos;
            let mortalidad = histM-val;
            let tinteraccion=this.state.tiIterable;
            
            let obj=[this.forIteration(susceptibles,infectados,recuperados,fallecidos,
                proContagio,tRecuperacion,recuperaciones,contagios,fallecimientos,mortalidad,tinteraccion)]
            let newdata=[...obj[0][0]];
            let newdata1=[...obj[0][1]];
            let newdata2=[...obj[0][2]];   
            
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
                tmIterable:mortalidad,
                valAu:val,
                trIterable: tRecuperacion              
            })
            this.setState({
                chartData:newState              
            })
                       
        
        }
        if(value==="0"){
            
            let thischart=this.state.chartData.datasets[0];
            let thischart1=this.state.chartData.datasets[1];
            let thischart2=this.state.chartData.datasets[2];
            let initialState=this.state.chartData;
            
            let susceptibles = this.state.susceptiblesini;
            let infectados = this.state.infectadosinicial;
            let recuperados = this.state.recuperadosini;
            let fallecidos = this.state.fallecidosini;
            let proContagio = this.state.probabilidadContagio;
            histM=histM+val;
            histR=histR-val;
            val=0;
            let tRecuperacion = histR+val;
            let recuperaciones,contagios,fallecimientos;
            let mortalidad = histM-val;
            let tinteraccion=this.state.tiIterable;
            
            let obj=[this.forIteration(susceptibles,infectados,recuperados,fallecidos,
                proContagio,tRecuperacion,recuperaciones,contagios,fallecimientos,mortalidad,tinteraccion)]
            let newdata=[...obj[0][0]];
            let newdata1=[...obj[0][1]];
            let newdata2=[...obj[0][2]];   
            
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
                tmIterable:mortalidad,
                valAu:val,
                trIterable: tRecuperacion                 
            })
            this.setState({
                chartData:newState              
            })
                       
        
        }
    }
    socialDistancing=(value)=>{
        
        let tSocial=this.state.tiIterable;
        let valor=this.state.val;
        if(value==="todos"){
            
            let thischart=this.state.chartData.datasets[0];
            let thischart1=this.state.chartData.datasets[1];
            let thischart2=this.state.chartData.datasets[2];
            let initialState=this.state.chartData;
            
            let susceptibles = this.state.susceptiblesini;
            let infectados = this.state.infectadosinicial;
            let recuperados = this.state.recuperadosini;
            let fallecidos = this.state.fallecidosini;
            let proContagio = this.state.probabilidadContagio;
            let tRecuperacion = this.state.tasaRecuperacion;
            let recuperaciones,contagios,fallecimientos;
            let mortalidad = this.state.tasaMortalidad;
            
            tSocial=tSocial+valor;
            valor=0.5;
            let tinteraccion=tSocial-valor;
            
            let obj=[this.forIteration(susceptibles,infectados,recuperados,fallecidos,
                proContagio,tRecuperacion,recuperaciones,contagios,fallecimientos,mortalidad,tinteraccion)]
            let newdata=[...obj[0][0]];
            let newdata1=[...obj[0][1]];
            let newdata2=[...obj[0][2]];   
            
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
                tiIterable:tinteraccion,
                val:valor
                         
            })
            this.setState({
                chartData:newState              
            })
                       
        
    }
    if(value==="muchos"){
        
        let thischart=this.state.chartData.datasets[0];
        let thischart1=this.state.chartData.datasets[1];
        let thischart2=this.state.chartData.datasets[2];
        let initialState=this.state.chartData;
        
        let susceptibles = this.state.susceptiblesini;
        let infectados = this.state.infectadosinicial;
        let recuperados = this.state.recuperadosini;
        let fallecidos = this.state.fallecidosini;
        let proContagio = this.state.probabilidadContagio;
        let tRecuperacion = this.state.tasaRecuperacion;
        let recuperaciones,contagios,fallecimientos;
        let mortalidad = this.state.tasaMortalidad;
       
        tSocial=tSocial+valor;
        valor=0.4;
        let tinteraccion=tSocial-valor;
        
        let obj=[this.forIteration(susceptibles,infectados,recuperados,fallecidos,
            proContagio,tRecuperacion,recuperaciones,contagios,fallecimientos,mortalidad,tinteraccion)]
        let newdata=[...obj[0][0]];
        let newdata1=[...obj[0][1]];
        let newdata2=[...obj[0][2]];   
        
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
            tiIterable:tinteraccion,
            val:valor           
        })
        this.setState({
            chartData:newState              
        })
                   
    
    }
    if(value==="algunos"){
        
        let thischart=this.state.chartData.datasets[0];
        let thischart1=this.state.chartData.datasets[1];
        let thischart2=this.state.chartData.datasets[2];
        let initialState=this.state.chartData;
        
        let susceptibles = this.state.susceptiblesini;
        let infectados = this.state.infectadosinicial;
        let recuperados = this.state.recuperadosini;
        let fallecidos = this.state.fallecidosini;
        let proContagio = this.state.probabilidadContagio;
        let tRecuperacion = this.state.tasaRecuperacion+0.01;
        let recuperaciones,contagios,fallecimientos;
        let mortalidad = this.state.tasaMortalidad-0.01;
        tSocial=tSocial+valor;
        valor=0.3;
        let tinteraccion=tSocial-valor;
        
        let obj=[this.forIteration(susceptibles,infectados,recuperados,fallecidos,
            proContagio,tRecuperacion,recuperaciones,contagios,fallecimientos,mortalidad,tinteraccion)]
        let newdata=[...obj[0][0]];
        let newdata1=[...obj[0][1]];
        let newdata2=[...obj[0][2]];   
        
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
            tiIterable:tinteraccion,
            val:valor               
        })
        this.setState({
            chartData:newState              
        })                  
    
    }
    if(value==="pocos"){
        
        let thischart=this.state.chartData.datasets[0];
        let thischart1=this.state.chartData.datasets[1];
        let thischart2=this.state.chartData.datasets[2];
        let initialState=this.state.chartData;
        
        let susceptibles = this.state.susceptiblesini;
        let infectados = this.state.infectadosinicial;
        let recuperados = this.state.recuperadosini;
        let fallecidos = this.state.fallecidosini;
        let proContagio = this.state.probabilidadContagio;
        let tRecuperacion = this.state.tasaRecuperacion+0.008;
        let recuperaciones,contagios,fallecimientos;
        let mortalidad = this.state.tasaMortalidad-0.008;
        tSocial=tSocial+valor;
        valor=0.2;
        let tinteraccion=tSocial-valor;
        
        let obj=[this.forIteration(susceptibles,infectados,recuperados,fallecidos,
            proContagio,tRecuperacion,recuperaciones,contagios,fallecimientos,mortalidad,tinteraccion)]
        let newdata=[...obj[0][0]];
        let newdata1=[...obj[0][1]];
        let newdata2=[...obj[0][2]];   
        
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
            tiIterable:tinteraccion,
            val:valor               
        })
        this.setState({
            chartData:newState              
        })
                   
    
    }
    if(value==="ninguno"){
        
        let thischart=this.state.chartData.datasets[0];
        let thischart1=this.state.chartData.datasets[1];
        let thischart2=this.state.chartData.datasets[2];
        let initialState=this.state.chartData;
        
        let susceptibles = this.state.susceptiblesini;
        let infectados = this.state.infectadosinicial;
        let recuperados = this.state.recuperadosini;
        let fallecidos = this.state.fallecidosini;
        let proContagio = this.state.probabilidadContagio;
        let tRecuperacion = this.state.tasaRecuperacion+0.001;
        let recuperaciones,contagios,fallecimientos;
        let mortalidad = this.state.tasaMortalidad-0.001;
        tSocial=tSocial+valor;
        valor=0.01;
        let tinteraccion=tSocial-valor;
        
        let obj=[this.forIteration(susceptibles,infectados,recuperados,fallecidos,
            proContagio,tRecuperacion,recuperaciones,contagios,fallecimientos,mortalidad,tinteraccion)]
        let newdata=[...obj[0][0]];
        let newdata1=[...obj[0][1]];
        let newdata2=[...obj[0][2]];   
        
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
            tiIterable:tinteraccion,
            val:valor              
        })
        this.setState({
            chartData:newState              
        })
                   
    
    }
    if(value==="0"){
        
        let thischart=this.state.chartData.datasets[0];
        let thischart1=this.state.chartData.datasets[1];
        let thischart2=this.state.chartData.datasets[2];
        let initialState=this.state.chartData;
        
        let susceptibles = this.state.susceptiblesini;
        let infectados = this.state.infectadosinicial;
        let recuperados = this.state.recuperadosini;
        let fallecidos = this.state.fallecidosini;
        let proContagio = this.state.probabilidadContagio;
        let tRecuperacion = this.state.tasaRecuperacion;
        let recuperaciones,contagios,fallecimientos;
        let mortalidad = this.state.tasaMortalidad;
        tSocial=tSocial+valor
        valor=0;
        let tinteraccion=tSocial+valor;

        let obj=[this.forIteration(susceptibles,infectados,recuperados,fallecidos,
            proContagio,tRecuperacion,recuperaciones,contagios,fallecimientos,mortalidad,tinteraccion)]
        let newdata=[...obj[0][0]];
        let newdata1=[...obj[0][1]];
        let newdata2=[...obj[0][2]];   
        
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
            tiIterable:tinteraccion    ,
            val:valor          
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
                                        fontSize:15
                                            }
                                        }
                                    ]
                                 }
                             }
                         }
                    
                    />
                </div>
                <Divider/>
                <Grid columns={4} divided>
                <GridColumn>
                        <div className="checkbox" align="center">
                        <label style={{fontSize:"25px"}}>Cuarentena:</label>
                            <div className="ui fitted toggle checkbox" style={{marginLeft:"20px"}}>
                                <input type="checkbox" checked={this.state.isChecked1} onChange={this.toggleChange1} />
                            <label></label>
                            </div><br/>
                    
                    <label style={{fontSize:"18px"}}>Rigida:</label>
                    <div className="ui fitted toggle checkbox" style={{marginLeft:"20px"}}>                        
                        <input type="checkbox" checked={this.state.isChecked2} onChange={this.toggleChange2} disabled={this.isDisabled()}/>
                        <label></label>
                    </div><br/>

                    <label style={{fontSize:"18px"}}>Dinamica:</label>
                    <div className="ui fitted toggle checkbox" style={{marginLeft:"20px"}}>                        
                        <input type="checkbox" checked={this.state.isChecked3} onChange={this.toggleChange3} disabled={this.isDisabled()}/>
                        <label></label>
                    </div><br/>                 
                        </div>
                    
                </GridColumn>
                
                    <GridColumn>
                    
                        <div align="center">

                        <label style={{fontSize:"18px",textAlign:"center"}} >En su localidad respetan el DISTANCIAMIENTO SOCIAL:</label><br/>
                        </div>
                        <div align="center" style={{marginTop:"10px"}}>

                        <select id="cho"  onChange={()=>this.socialDistancing(document.getElementById("cho").value)} >
                            <option value="0" selected>Seleccione una Opcion..</option>
                            <option value="todos">todos</option>
                            <option value="muchos">muchos</option>
                            <option value="algunos">algunos</option>
                            <option value="pocos">pocos</option>
                            <option value="ninguno">ninguno</option>
                        </select>
                    </div>
                    </GridColumn>

                    <GridColumn>
                    <div align="center">

                        <label style={{fontSize:"18px",textAlign:"center"}} >Indique la cantidad de personas que se automedican:</label><br/>
                    </div>
                        <div align="center" style={{marginTop:"10px"}}>

                        <select id="select" onChange={()=>this.automedication(document.getElementById("select").value)} >
                            <option value="0" selected>Seleccione una Opcion..</option>
                            <option value="todos">todos</option>
                            <option value="muchos">muchos</option>
                            <option value="algunos">algunos</option>
                            <option value="pocos">pocos</option>
                            <option value="ninguno">ninguno</option>
                        </select>
                        </div>
                    </GridColumn>
                    <GridColumn>
                        
                    </GridColumn>
                </Grid>
                <Footer/>
            </div>
        );
    }
}

export default Graficos;
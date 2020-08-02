import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import { Divider, Grid, GridColumn,Input,Radio } from 'semantic-ui-react';
import Footer from '../footer';
import axios from 'axios';
import Modals from '../Components/modals';

import {Modal,Button} from 'react-bootstrap';


class Graficos extends Component{
    constructor(props) {
        super(props);
        this.toggle= this.toggle.bind(this);
        this.state = { 
            show:false,
            show1:false,
            tasaRecuperacion:0,
            tasaMortalidad:0,
            tasaInteraccion:0,
            tmIterable:0,
            trIterable:0,
            tiIterable:0,
            
            valT:0,
            val:0,
            valAu:0,
            valMor:0,
            probabilidadContagio:0,
            
            fechaActual:0,
            fechaInicio:0,
            fechaFin:0,
            municipio:'',
            fechaiNu:0,
            fechafNu:0,
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
        this.infectados(this.state.fechaInicio,this.state.fechaFin);
        
        
    }
    fetchData = async ()=>{
        await axios('https://taller-simu.herokuapp.com/ultimoregistro', {method: 'GET'})
        
        .then(res => {
           const data =  res.data;
         
        data.map(
            (it)=>(
                this.setState({
                tasaRecuperacion:it.TasaRecuperacion,
                tasaMortalidad:it.TasaMortalidad,
                tasaInteraccion:it.tasaInteraccion,
                probabilidadContagio:it.probabilidadContagio,

                
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
        })
        
    }    
    
    infectados=(fechaI,fechaF)=>{
        if(fechaI>this.state.fechaActual && fechaF>fechaI){
            
        let susceptibles = this.state.susceptiblesini;
        let infectados = this.state.infectadosinicial;
        let recuperados = this.state.recuperadosini;
        let fallecidos = this.state.fallecidosini;
        let proContagio = this.state.probabilidadContagio;
        let tRecuperacion = this.state.tasaRecuperacion;
        let recuperaciones,contagios,fallecimientos;
        let mortalidad = this.state.tasaMortalidad;
        let tinteraccion=this.state.tasaInteraccion;        
        let days=this.totalDays(fechaI,fechaF);
        let diasMostrar=this.countDays(fechaI,fechaF);
        let thischart=this.state.chartData.datasets[0];
        let thischart1=this.state.chartData.datasets[1];
        let thischart2=this.state.chartData.datasets[2];
        let initialState=this.state.chartData;
        let newData1=[];
        let newData2=[];
        let newData3=[];
        let labels=[];
            for(let i=1 ; i<=days ; i++){
                contagios = (infectados * tinteraccion * susceptibles) / (susceptibles+infectados+recuperados) * proContagio;
                recuperaciones = infectados * tRecuperacion / 14;
                fallecimientos = infectados * mortalidad / 14
                susceptibles = susceptibles - contagios;
                infectados = infectados + contagios - recuperaciones - fallecimientos;
                recuperados = recuperados + recuperaciones;
                fallecidos = fallecidos + fallecimientos;
                
                if((days-diasMostrar)<=i){
                newData1.push(parseInt(infectados));
                newData2.push(parseInt(recuperados));
                newData3.push(parseInt(fallecidos));
                labels.push(this.calcFecha(i));           
            }
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
        initialState.labels=labels;
        newDataSet.data=newData1;
        newDataSet1.data=newData2;
        newDataSet2.data=newData3;
        
        let newState={
            ...initialState,datasets:[newDataSet,newDataSet1,newDataSet2]
        }           
        
        this.setState({
            chartData:newState              
        })
    }else{
        this.setState({show1:true})
    }    
        
    }
    totalDays=(fechaI,fechaF)=>{
        
        let fechaini=new Date(this.state.fechaActual).getTime();
        let fechaf=new Date(fechaF).getTime();
        let diasTotales = (fechaf - fechaini)/(1000*60*60*24)+1;
        
        return diasTotales;

    }

    countDays=(fechaini,fechafin)=>{
        let fechaI=new Date(fechaini).getTime();
        let fechaF=new Date(fechafin).getTime();
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

    forIteration=(susceptibles,infectados,recuperados,fallecidos,proContagio,tRecuperacion,recuperaciones,contagios,fallecimientos,mortalidad,tinteraccion,fini,ffin)=>{
            let obj=[[],[],[]]
            let totalDays=this.totalDays(fini,ffin);
            let days=this.countDays(fini,ffin);
            for(let i=1;i<=totalDays;i++){
                contagios = (infectados * tinteraccion * susceptibles) / (susceptibles + infectados + recuperados) * proContagio;
                recuperaciones = infectados * tRecuperacion / 14;
                fallecimientos = infectados * mortalidad / 14
                susceptibles = susceptibles - contagios;
                infectados = infectados + contagios - recuperaciones - fallecimientos;
                recuperados = recuperados + recuperaciones;
                fallecidos = fallecidos + fallecimientos;
                if((totalDays-days)<=i){
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
            let fini,ffin;
            if(this.state.fechaiNu!==0){
                fini=this.state.fechaiNu;
                ffin=this.state.fechafNu;
            }else{
                fini=this.state.fechaInicio;
                ffin=this.state.fechaFin;
            }
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
                proContagio,tRecuperacion,recuperaciones,contagios,fallecimientos,mortalidad,tinteraccion,fini,ffin)];
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
            let fini,ffin;
            if(this.state.fechaiNu!==0){
                fini=this.state.fechaiNu;
                ffin=this.state.fechafNu;
            }else{
                fini=this.state.fechaInicio;
                ffin=this.state.fechaFin;
            }
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
                proContagio,tRecuperacion,recuperaciones,contagios,fallecimientos,mortalidad,tinteraccion,fini,ffin)]
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
            let fini,ffin;
            if(this.state.fechaiNu!==0){
                fini=this.state.fechaiNu;
                ffin=this.state.fechafNu;
            }else{
                fini=this.state.fechaInicio;
                ffin=this.state.fechaFin;
            }
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
                proContagio,tRecuperacion,recuperaciones,contagios,fallecimientos,mortalidad,tinteraccion,fini,ffin)]
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
                let fini,ffin;
            if(this.state.fechaiNu!==0){
                fini=this.state.fechaiNu;
                ffin=this.state.fechafNu;
            }else{
                fini=this.state.fechaInicio;
                ffin=this.state.fechaFin;
            }
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
                    proContagio,tRecuperacion,recuperaciones,contagios,fallecimientos,mortalidad,tinteraccion,fini,ffin)]
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
        let fini,ffin;
            if(this.state.fechaiNu!==0){
                fini=this.state.fechaiNu;
                ffin=this.state.fechafNu;
            }else{
                fini=this.state.fechaInicio;
                ffin=this.state.fechaFin;
            }
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
                val=0.01;
                let tRecuperacion = histR+val;
                let recuperaciones,contagios,fallecimientos;
                let mortalidad = histM-val;
                let tinteraccion=this.state.tiIterable;
                
                let obj=[this.forIteration(susceptibles,infectados,recuperados,fallecidos,
                    proContagio,tRecuperacion,recuperaciones,contagios,fallecimientos,mortalidad,tinteraccion,fini,ffin)]
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
                val=0.005;
                let tRecuperacion = histR+val;
                let recuperaciones,contagios,fallecimientos;
                let mortalidad = histM-val;
            let tinteraccion=this.state.tiIterable;
            
            let obj=[this.forIteration(susceptibles,infectados,recuperados,fallecidos,
                proContagio,tRecuperacion,recuperaciones,contagios,fallecimientos,mortalidad,tinteraccion,fini,ffin)]
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
                val=0.004;
                let tRecuperacion = histR+val;
                let recuperaciones,contagios,fallecimientos;
                let mortalidad = histM-val;
            let tinteraccion=this.state.tiIterable;
            
            let obj=[this.forIteration(susceptibles,infectados,recuperados,fallecidos,
                proContagio,tRecuperacion,recuperaciones,contagios,fallecimientos,mortalidad,tinteraccion,fini,ffin)]
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
                val=0.003;
                let tRecuperacion = histR+val;
                let recuperaciones,contagios,fallecimientos;
                let mortalidad = histM-val;
            let tinteraccion=this.state.tiIterable;
            
            let obj=[this.forIteration(susceptibles,infectados,recuperados,fallecidos,
                proContagio,tRecuperacion,recuperaciones,contagios,fallecimientos,mortalidad,tinteraccion,fini,ffin)]
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
                proContagio,tRecuperacion,recuperaciones,contagios,fallecimientos,mortalidad,tinteraccion,fini,ffin)]
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
            let fini,ffin;
            if(this.state.fechaiNu!==0){
                fini=this.state.fechaiNu;
                ffin=this.state.fechafNu;
            }else{
                fini=this.state.fechaInicio;
                ffin=this.state.fechaFin;
            }
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
                proContagio,tRecuperacion,recuperaciones,contagios,fallecimientos,mortalidad,tinteraccion,fini,ffin)]
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
        let fini,ffin;
            if(this.state.fechaiNu!==0){
                fini=this.state.fechaiNu;
                ffin=this.state.fechafNu;
            }else{
                fini=this.state.fechaInicio;
                ffin=this.state.fechaFin;
            }
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
                proContagio,tRecuperacion,recuperaciones,contagios,fallecimientos,mortalidad,tinteraccion,fini,ffin)]
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
            proContagio,tRecuperacion,recuperaciones,contagios,fallecimientos,mortalidad,tinteraccion,fini,ffin)]
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
            proContagio,tRecuperacion,recuperaciones,contagios,fallecimientos,mortalidad,tinteraccion,fini,ffin)]
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
            proContagio,tRecuperacion,recuperaciones,contagios,fallecimientos,mortalidad,tinteraccion,fini,ffin)]
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
            proContagio,tRecuperacion,recuperaciones,contagios,fallecimientos,mortalidad,tinteraccion,fini,ffin)]
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
            proContagio,tRecuperacion,recuperaciones,contagios,fallecimientos,mortalidad,tinteraccion,fini,ffin)]
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
    }
    handleState = (event) => {
        this.setState({
            [event.target.name]: (event.target.value)
        })
    }
    Mods=(props)=> {
        const fechaI=new Date(this.state.fechaActual);
        const fechaA=(fechaI.getDate()+1)+"-"+(fechaI.getMonth()+1)+"-"+fechaI.getFullYear();
        
        return (
          <Modal
            {...props}
            size="me"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Puede cambiar fecha desde el {fechaA}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <label style={{fontSize:20}}>Introduzca la fecha de inicio de la nueva simulacion: </label> 
                <Input type="date"  name="fechaiNu" placeholder="fecha" onChange={(e)=>this.handleState(e)} required/><br/>
                <label style={{fontSize:20}}>Introduzca la fecha fin de la nueva simulacion: </label> 
                <Input type="date"  name="fechafNu" placeholder="fecha" onChange={(e)=>this.handleState(e)} required/><br/>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={()=>{
                  this.toggle();
                  this.vaciarChart();
                  this.infectados(this.state.fechaiNu,this.state.fechafNu);
                  
              }}>Cambiar</Button>
            </Modal.Footer>
          </Modal>
        );
    }
    vaciarChart=()=>{
        let thischart=this.state.chartData.datasets[0];
        let thischart1=this.state.chartData.datasets[1];
        let thischart2=this.state.chartData.datasets[2];        
        var initialState=this.state.chartData;        
        
        let newDataSet={
            ...thischart
        }
        let newDataSet1={
            ...thischart1
        }
        let newDataSet2={
            ...thischart2
        }
        initialState.labels=[];
        
        newDataSet.data=[];
        newDataSet1.data=[];
        newDataSet2.data=[];
            
        let newState={
            ...initialState,datasets:[newDataSet,newDataSet1,newDataSet2]
        } 
           
        this.setState({
            chartData:newState              
        })        
    }  
      
    toggle=()=>{        
        this.setState({ show: !this.state.show }); 
    }

    hospitalQuality=(value)=>{
        let histM=this.state.tmIterable;
        let histR=this.state.trIterable;
        let val=this.state.valMor;
        let fini,ffin;
        if(this.state.fechaiNu!==0){
            fini=this.state.fechaiNu;
            ffin=this.state.fechafNu;
        }else{
            fini=this.state.fechaInicio;
            ffin=this.state.fechaFin;
        }         
        if(value==="excelente"){  
             
            let thischart=this.state.chartData.datasets[0];
                let thischart1=this.state.chartData.datasets[1];
                let thischart2=this.state.chartData.datasets[2];
                let initialState=this.state.chartData;
                
                let susceptibles = this.state.susceptiblesini;
                let infectados = this.state.infectadosinicial;
                let recuperados = this.state.recuperadosini;
                let fallecidos = this.state.fallecidosini;
                let proContagio = this.state.probabilidadContagio;
                let recuperaciones,contagios,fallecimientos;
                histM=histM+val;
                histR=histR-val;
                val=0.01;
                let tRecuperacion = histR+val;
                let mortalidad = histM-val;
                let tinteraccion=this.state.tiIterable;
                
                let obj=[this.forIteration(susceptibles,infectados,recuperados,fallecidos,
                    proContagio,tRecuperacion,recuperaciones,contagios,fallecimientos,mortalidad,tinteraccion,fini,ffin)]
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
                    valMor:val,
                    trIterable: tRecuperacion                 
                })
                this.setState({
                    chartData:newState              
                })
    }
    if(value==="buena"){
        
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
                val=0.008;
                let tRecuperacion = histR+val;
                let recuperaciones,contagios,fallecimientos;
                let mortalidad = histM-val;
                let tinteraccion=this.state.tiIterable;
                
                let obj=[this.forIteration(susceptibles,infectados,recuperados,fallecidos,
                    proContagio,tRecuperacion,recuperaciones,contagios,fallecimientos,mortalidad,tinteraccion,fini,ffin)]
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
                    valMor:val,
                    trIterable: tRecuperacion                 
                })
                this.setState({
                    chartData:newState              
                })
                   
    
    }
    if(value==="regular"){      
        
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
        val=0.005;
        let tRecuperacion = histR+val;
        let recuperaciones,contagios,fallecimientos;
        let mortalidad = histM-val;
        let tinteraccion=this.state.tiIterable;
        
        let obj=[this.forIteration(susceptibles,infectados,recuperados,fallecidos,
            proContagio,tRecuperacion,recuperaciones,contagios,fallecimientos,mortalidad,tinteraccion,fini,ffin)]
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
            valMor:val,
            trIterable: tRecuperacion                 
        })
        this.setState({
            chartData:newState              
        })
    }
    if(value==="mala"){
       
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
            proContagio,tRecuperacion,recuperaciones,contagios,fallecimientos,mortalidad,tinteraccion,fini,ffin)]
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
            valMor:val,
            trIterable: tRecuperacion                 
        })
        this.setState({
            chartData:newState              
        })
    }
    if(value==="pesima"){
     
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
        val=0.00001;
        let tRecuperacion = histR+val;
        let recuperaciones,contagios,fallecimientos;
        let mortalidad = histM-val;
        let tinteraccion=this.state.tiIterable;
        
        let obj=[this.forIteration(susceptibles,infectados,recuperados,fallecidos,
            proContagio,tRecuperacion,recuperaciones,contagios,fallecimientos,mortalidad,tinteraccion,fini,ffin)]
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
            valMor:val,
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
        val=0.0000;
        let tRecuperacion = histR+val;
        let recuperaciones,contagios,fallecimientos;
        let mortalidad = histM-val;
        let tinteraccion=this.state.tiIterable;
        
        let obj=[this.forIteration(susceptibles,infectados,recuperados,fallecidos,
            proContagio,tRecuperacion,recuperaciones,contagios,fallecimientos,mortalidad,tinteraccion,fini,ffin)]
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
            valMor:val,
            trIterable: tRecuperacion                 
        })
        this.setState({
            chartData:newState              
        })
                   
    
        }
    }
    render(){
        const fechaI=new Date(this.state.fechaActual);
        const fechaA=(fechaI.getDate()+1)+"-"+(fechaI.getMonth()+1)+"-"+fechaI.getFullYear();
        let showModal=()=>this.setState({show:false,show1:false})
        return(
            <div>
                
                <div className="chart-container" >                
                    <Line 
                            data={this.state.chartData}
                            width={700}
                            height={700}
                            options={
                                {
                                responsive:true,
                                maintainAspectRatio:false,
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
                                            fontSize:17                                                                            
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
                
                <Button onClick={this.toggle} style={{marginLeft:"40px"}}>Cambiar Fechas</Button>
                <this.Mods
                    show={this.state.show}
                    onHide={showModal}
                    
                />
                <Modals
                show={this.state.show1}
                onHide={showModal}
                msg="LAS FECHAS TIENE QUE SER MAYORES A: "
                f={fechaA}
                
                />
                
                <Grid columns={4} divided doubling celled >
                <GridColumn >
                    <Grid.Row >

                        <div className="checkbox" >
                            <label className="" style={{fontSize:"25px",}}>Cuarentena:</label>                           
                            <Radio toggle type="checkbox"  style={{position:"absolute",marginTop:"10px"}} checked={this.state.isChecked1} onChange={this.toggleChange1}/>
                            
                        </div>
                    </Grid.Row>
                    <Grid.Row>
                            <label className="" style={{fontSize:"20px"}}>Rígida:</label>                    
                            <Radio toggle type="checkbox"  style={{position:"relative",marginTop:"5px"}} checked={this.state.isChecked2} onChange={this.toggleChange2} disabled={this.isDisabled()}/>
                            
                    </Grid.Row>
                    <Grid.Row>

                            <label className="" style={{fontSize:"20px"}}>Dinamica:</label>                    
                            <Radio toggle type="checkbox" style={{position:"relative",marginTop:"5px"}} checked={this.state.isChecked3} onChange={this.toggleChange3} disabled={this.isDisabled()}/>
                                           
                    </Grid.Row>
                    
                </GridColumn>
                
                    <GridColumn>
                    
                        <div align="center">

                        <label className="" style={{fontSize:"18px",textAlign:"center"}} >En su localidad respetan el DISTANCIAMIENTO SOCIAL:</label><br/>
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

                        <label className="" style={{fontSize:"18px",textAlign:"center"}} >Indique la cantidad de personas que se automedican:</label><br/>
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
                    <div align="center">

                        <label className="" style={{fontSize:"18px",textAlign:"center"}} >Cual es la calidad de los hospitales en su ciudad:</label><br/>
                        </div>
                        <div align="center" style={{marginTop:"10px"}}>

                        <select id="hq" onChange={()=>this.hospitalQuality(document.getElementById("hq").value)} >
                            <option value="0" selected>Seleccione una Opcion..</option>
                            <option value="excelente">excelente</option>
                            <option value="buena">buena</option>
                            <option value="regular">regular</option>
                            <option value="mala">mala</option>
                            <option value="pesimo">pesimo</option>
                        </select>
                    </div>
                    </GridColumn>
                </Grid>
                
                <Footer/>
                
                
            </div>
        );
    }
}

export default Graficos;
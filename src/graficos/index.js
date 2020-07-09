import React from 'react';


class Graficos{
    constructor(props) {
        super(props);
        this.state = {
            items: []
        };  
        
    }
    componentDidMount=async()=>{
        await this.fetchData()        
    }
    
    fetchData = async ()=>{
        let res = await fetch('http://localhost:8000/ultimoRegistro', {method: 'GET'})
        let data = await res.json()
        this.setState({
            items:data
        })
        console.log(this.state.items);
    }
    render(){
    return(
        <div>
            <h1>pantalla de graficos</h1>
            
        </div>
    );
    }
}

export default Graficos;
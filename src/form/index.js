import React,{Component} from "react";

/*
export default function Form(props){ 
    const [datos, setDatos] = useState(
        {
            i1:0,i2:0,i3:0,i4:0,i5:0,i6:0,i7:0,i8:0,i9:0,i10:0,i11:0,i12:0,i13:0,i14:0,i15:0,i16:0,i17:0,i18:0,i19:0,i20:0,
            r1:0,r2:0,r3:0,r4:0,r5:0,r6:0,r7:0,r8:0,r9:0,r10:0,r11:0,r12:0,r13:0,r14:0,r15:0,r16:0,r17:0,r18:0,r19:0,r20:0,
            f1:0,f2:0,f3:0,f4:0,f5:0,f6:0,f7:0,f8:0,f9:0,f10:0,f11:0,f12:0,f13:0,f14:0,f15:0,f16:0,f17:0,f18:0,f19:0,f20:0
        }
    );
    const handle=(event)=>{
        setDatos({
            [event.target.name]: parseInt(event.target.value)
        })
    }
    function suma(){
    return 2+2;
}
    
        return(
            <div className="">                
               <input type="number"  
                id={props.id} 
                placeholder={props.ph} 
                name={props.n} 
                onChange={handle} 
                required/>
                
                <br/>                      
             </div>
        );
    
}*/


export default class Form extends Component{
    constructor(props) {
        super(props);
        this.state = {
            i1:0,i2:0,i3:0,i4:0,i5:0,i6:0,i7:0,i8:0,i9:0,i10:0,i11:0,i12:0,i13:0,i14:0,i15:0,i16:0,i17:0,i18:0,i19:0,i20:0,
            r1:0,r2:0,r3:0,r4:0,r5:0,r6:0,r7:0,r8:0,r9:0,r10:0,r11:0,r12:0,r13:0,r14:0,r15:0,r16:0,r17:0,r18:0,r19:0,r20:0,
            f1:0,f2:0,f3:0,f4:0,f5:0,f6:0,f7:0,f8:0,f9:0,f10:0,f11:0,f12:0,f13:0,f14:0,f15:0,f16:0,f17:0,f18:0,f19:0,f20:0
        };
        
      }
      
      handle=(event)=>{
        this.setState({
            [event.target.name]: parseInt(event.target.value)
        })
    }
   
    

      render() {
        
        return (
            <div className="">                
            <input type="number"  
             id={this.props.id} 
             placeholder={this.props.ph} 
             name={this.props.n} 
             onChange={e=>this.handle(e)} 
             required/>
             
             <br/>                      
          </div>
        );
      }
      
}
 

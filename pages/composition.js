import Component from 'react';
import axios from 'axios';

export default class Composition extends React.Component{
    constructor(props) {
        super(props)
        this.state={
            composition:[],
            addcol:[1],
            newcomposition:[],
            itemsdetails:[]
           
            // itemlist:[]

        }
    }
    

    componentDidMount(){
        axios.get('http://localhost:5000/getcomposition')
    .then((response) => {
        console.log(response)
        

        this.setState({
            composition:response.data.data
        })
        console.log("composition",this.state.composition)
    })
    .catch( error => console.log(error))

    axios.get('http://localhost:5000/getitems')
    .then((response) =>{
        console.log(response)
            let data=[]
            let data2=response.data.data
            console.log(data2)
        data2.map((key,value) => {
            data.push(key.name)

        })
        console.log(data)
        this.setState({
            itemsdetails:data
        })
    })
    .catch(err => console.log(err))

    }

    optionselect=(row,props)=>{
        console.log(row)
        console.log(props)
        let sel=document.querySelector('select').value
        let selected=document.getElementById(props).value
        // console.log("loiooo",sel)
        console.log("loiooo",selected)

        // make api call to baackend using name as key and select attribute value to update
    }

    placeorder=(props,key) =>{
        console.log(props.target.value)
        console.log(key)
        this.setState({
            updateorder:props.target.value
        })

    }

    update=(row,selectid) =>{
        // let value=document.getElementsByName('modify')
        let value=this.state.updateorder;
        // let selected=document.querySelector('select').value
        let selected=document.getElementById(selectid).value

        
        console.log("Vslue",value)
        console.log("Vslue",selected)
        console.log("Vslue",row)
        // console.log("state",this.state.updateorder)
        let data={
            'id':row.id,
            'value':value,
            'attribute':selected
        }

        return axios.post('http://localhost:5000/updatecomposition',{data})
        .then((response) => {
                console.log(response)
                if(response.data.status == 200) {
                    window.location.reload()
                }
        })
        .catch(err => console.log(err) )


    }

    delete=(props) =>{
        console.log("props",props)

        let data={
            'id':props.id
        }

         axios.post('http://localhost:5000/deletecomposition',{data})
        .then((response) => {
                console.log(response)
                if(response.data.status == 200) {
                    window.location.reload()
                }
        })
        .catch(err => console.log(err) )
console.log(this.state.itemsdetails)
    }


    createComposition=(input,val)=>{
        let name=document.getElementById('comp_name').value
        let composition=this.state.newcomposition
        let weight=document.getElementById('weight').value
        let type=document.getElementById('type').value
        // composition_name composition composition_weight composition_weight_type

    

        


        console.log(name)
        console.log(composition)
        console.log(weight)
        console.log(type)

        let data={
            composition_name:name, 
            composition:JSON.stringify(composition), 
            composition_weight:weight,
             composition_weight_type:type
        }


        axios.post('http://localhost:5000/composition',{data})
        .then((response) => {
           
            console.log(response)
            if(response.data.status==200){
                window.location.reload()
            }

        })
        .catch( error => console.log(error))

    }
    addcol=()=>{


    this.state.addcol.push('b');
    let col=this.state.addcol;
    this.setState({
        addcol:col
    })

    }

    additem=(props)=>{
        console.log(props.target.value)
        let item=props.target.value
        this.setState({
            item:item
        })

    }

    addvalue=(props)=>{
        console.log(props.target.value)
        console.log(this.state.item)
        console.log(this.state.itemsdetails)
        let check=false;
        this.state.itemsdetails.map((key,value)=>{
            
            if(this.state.item.trim().toString().toLowerCase() == key.trim().toString().toLowerCase()){
                console.log(key)
                this.setState({
                    itemvalue:props.target.value
            })
            }
        })
        // let data={}
        // data[this.state.item]=props.target.value
      
       
        // this.state.newcomposition.push(data)
        // console.log( this.state.newcomposition)
    }
    addcomp=()=>{
        if(this.state.item  && this.state.itemvalue)
               { 
                   let data ={}
                data[this.state.item]=this.state.itemvalue

        this.state.newcomposition.push(data)
        this.setState({
            item:'',
            itemvalue:''
        })
        console.log(this.state.newcomposition)


    }
else{
    alert ("Item is Not in Stock / Item Not valid")
}
    }
    render(){
        return (
            <div>
            <h2>Composition</h2>
            {
                this.state.composition.map((key,value)=>{
                    // console.log("key;;;;;;;;;",key)
                    let selectrow=key;
                    return <fieldset>
                    <label>ID</label>
                    <input id=""value={key.id}/>
                    <label>Name</label>
                    <input value={key.composition_name}/>
                    <label>Composition</label><input value={key.composition}/>
                    <label>Composition Weight</label> <input value={key.composition_weight}/>
                    <label>Composition Weight Type</label><input value={key.composition_weight_type}/>
                    <input name="modify"  onChange={(event) => this.placeorder(event)} />
                    <select id={value} onClick={ (e) => {this.optionselect(selectrow,value)}} >
                     <option id="name" value="name">Name</option>
                     <option id="Composition" value="Composition">Composition</option>
                     <option id="Composition Weight" value="Composition_Weight">Composition Weight</option>
                     <option id="Composition Weight Type" value="Composition_Weight_Type">Composition Weight Type</option>
             </select>
             <button onClick={(e) =>this.update(selectrow,value)}>update</button>
             <button onClick={(e) =>this.delete(selectrow)}>Delete</button>

                    </fieldset>
                })

               
                     
}

                <div>
                <h2>Create New Composition</h2>
                
                    <fieldset>
                    <label>Name</label>
                    <input id="comp_name"/>
                    <label>Composition Weight</label> 
                    <input id="weight"/>
                    <label>Composition Weight Type</label>
                    <input  id="type"/>
                    
                    {this.state.addcol.map((key,value)=>{
                        console.log(key)
                        console.log(value)
                        return<div id="comp_input">
                        <label>Make Composition</label><br></br>
                        <input   placeholder ="Composition Item" onChange={(event) => this.additem(event)}/>
                        <input  placeholder ="Composition Percentage" onChange={(event) => this.addvalue(event)}/>
                        
                        </div>
                    })}
                    { this.state.item == '' && this.state.itemvalue == '' ? 
                        <button onClick={() => this.addcol()}>Add Row</button> 
                        :
                        <button onClick={() => this.addcomp()}>Add Composition</button> 
                    }
                    <button onClick={() => this.createComposition()}>Create Composition</button>
                    </fieldset>

                </div>
            </div>
        )

    }



}
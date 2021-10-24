import  Component  from 'react';
import axios  from 'axios';

export default class Sales extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            sales:[]
        }
    }

    componentDidMount(){
        axios.get('http://localhost:5000/sales')
        .then(response => {
            console.log(response)
            this.setState({
                sales:response.data.data
            })
        })
        .catch(error => console.log(error))

        axios.get('http://localhost:5000/getcomposition')
        .then((response) => {
            console.log(response)
            
    
            this.setState({
                composition:response.data.data
            })
            console.log("composition",this.state.composition)
        })
        .catch( error => console.log(error))
    

    }

    addsales=()=>{    
        let name=document.getElementById('sale_name').value
        let unit=document.getElementById('sale_unit').value
        let qty=document.getElementById('sale_qty').value
        let total=document.getElementById('sale_total').value
        // composition_name composition composition_weight composition_weight_type
        let comp_id=this.state.comp_id

        console.log(name)
        console.log(unit)
        console.log(qty)
        console.log(total)

        let data={
            name:name, 
            unit:unit, 
            qty:qty,
            total:total,
            comp_id:comp_id
        }


        axios.post('http://localhost:5000/addsales',{data})
        .then((response) => {
           
            console.log(response)
            if(response.data.status==200){
                window.location.reload()
            }
            else{
                alert(response.data.Message.message)
            }

        })
        .catch( error => console.log(error))

    }

    compselect=(row,e) =>{
        console.log(row)
        console.log(e)
        // let sel=document.querySelector('').value
        let selected=document.getElementById('select').value
        // console.log("sellllll",sel)

        console.log("selllpppppl",selected)

        // console.log("loiooo",parseInt(sel)+1)
        // let id=parseInt(sel)+1

       


        this.setState({
            comp_id:selected
        })

    }


    render(){
        return (
            <div>
            <h1>Sales Data</h1>
            {
                this.state.sales.map((key,value) =>{
                    return <div>
                    <fieldset>
                        <label>Name</label>
                        <input value={key.item_name}/>
                        <label>Cost Per Unit</label>
                        <input value={key.cost_per_unit}/>
                        <label>Item Sold</label>
                        <input value={key.item_qty}/>
                        <label> Total Sale Cost</label>
                        <input value={key.total_item_cost}/>
                        </fieldset>

                    </div>
                })
            }


            <div>
            <h2>ADD SOLD Products</h2>
            
                <fieldset>
                <label>Name</label>
                <input id="sale_name"/>
                <label>Cost Per Unit</label> 
                <input id="sale_unit"/>
                <label>Item Sold</label>
                <input  id="sale_qty"/>
                <label>Total Sale Cost</label>
                <input  id="sale_total"/>

                <select onClick={ (e) => {this.compselect()}} id="select">
                { this.state.composition && this.state.composition.length !=0  ? this.state.composition.map((key,value) => {
                   
                    // console.log("valueee",value)
     return  <option value={key.id}>{key.composition_name}</option>
                   
                  }):null
                }

               </select>


                <button onClick={() => this.addsales()}>ADD SOLD ITEM</button>
                </fieldset>

            </div>
            </div>
        )

    }
    
}
import { Component } from "react";
import axios from 'axios';
export default class ListData extends React.Component{

    constructor(props) {
        super(props);

        const {data}=props;
        console.log(data)
        this.state={
            itemsdetails:[],
            updateorder:'',
            deleteorder:'',
            cart:[],
            tempcart:'',
            pagetype:props.type,
            option:'',
            composition:[],
            selectcount:[],
            
            // pagetype:'order'

}
        
    }

    componentDidMount() {
        
        // if(this.state.pagetype =='master'){
         axios.get('http://localhost:5000/getitems')
        .then((response) =>{
            console.log(response)
                let data=[]
                let data2=response.data.data
                console.log(data2)
            data2.map((key,value) => {
                data.push(key)

            })
            console.log(data)
            this.setState({
                itemsdetails:response.data.data
            })



            

        })
        .catch(err => console.log(err))
    // }


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
            'name':row.name,
            'value':value,
            'attribute':selected
        }

        return axios.post('http://localhost:5000/update',{data})
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
            'name':props
        }

        return axios.post('http://localhost:5000/deleteitems',{data})
        .then((response) => {
                console.log(response)
                if(response.data.status == 200) {
                    window.location.reload()
                }
        })
        .catch(err => console.log(err) )

// let itemsdetails=this.state.itemsdetails.filter((key) => {
//     console.log(key)
//             if(key.name!=props)
//             {
//                 return key
//             }

// })
  
// this.setState({
//     itemsdetails:itemsdetails

// })
console.log(this.state.itemsdetails)
    }

    additem=(props) => {
        console.log(props)
        let name=document.getElementById('add_name').value
        let price=document.getElementById('add_price').value
        let qty=document.getElementById('qty').value
        let type=document.getElementById('type').value
        console.log( "name",name)
        console.log("price",price )
        console.log("qty",qty )
        console.log( "type",type )

        
        let data={
            'name':name,
            'price':price,
            'qty':qty,
            'type':type
        }


        return axios.post('http://localhost:5000/add',{data})
        .then((response) => {
            console.log("response",response)
            if(response.data.status==200){
                console.log("inside 200")
                window.location.reload()
            }
            else{
                alert(response.data.Message.message)
            }
    
           
        })
        .catch((error)=>{
                console.log(error)
        })
    





       let temp =this.state.itemsdetails
       temp.push(newdata)

        this.setState( {
            itemsdetails:temp
        })

    }
    
    addcart=(props,type,row) => {
        // // console.log(props.target.value)
        // console.log(type)
        // console.log(row)

        

        if(type=='input' )
        {
            row['buyqty']=props.target.value
            console.log(row)
            // const tempordercart=[]
            let row2=row
            // this.state.tempcart.push(row2)
           
            
        this.setState({
            tempcart:row
        })

        console.log("tempcart",this.state.tempcart)


        }
        else{
            
            console.log(this.state.tempcart)

           let data=this.state.tempcart
                

            
                data['composition_id']=this.state.comp_id;

                this.state.cart.push(data)

                let updatedcart=this.state.cart

                this.setState({
                    cart:updatedcart
                })
    

        //  axios.post('http://localhost:5000/createorder',{data})
        // .then((response) =>{

        //     alert(response.data.Message)
        //     console.log(response)

        // })
        // .catch( error => console.log(error))

          
            console.log("cart value",this.state.cart)
        }

    }
    orderitem=()=>{
        let data =JSON.stringify(this.state.cart)
        
          axios.post('http://localhost:5000/createorder',{data})
        .then((response) =>{

            alert(response.data.Message)
            console.log(response)

            window.location.reload()

        })
        .catch( error => console.log(error))


    }

    compselect=(row,e) =>{
        console.log(row)
        console.log(e)
        // let sel=document.querySelector('').value
        let selected=document.getElementById(e).value
        // console.log("sellllll",sel)

        console.log("selllpppppl",selected)

        // console.log("loiooo",parseInt(sel)+1)
        // let id=parseInt(sel)+1

       


        this.setState({
            comp_id:selected
        })

    }
    sele=()=>{

        // let element=document.getElementById('selectoption')
        // console.log("sellllll",element)

        // var selectedValue = element.options[element.selectedIndex].value;
        // console.log("selectedValue",)

        // onClick={ (e) => {this.compselect(selectrow,e)}}

    }






    render(){
        return (<div>
        
        <h1>Items List  </h1>
        { this.state.pagetype =='order'   ? 
            <fieldset><div><li><a href='/masteritems'>Master Items</a></li></div> <li><a href='/composition'> Composition</a></li><li><a href='/sales'> Sales</a></li><li><a href='/report'> Report</a></li></fieldset>
            :
            <fieldset><div><li><a href='/orderplace'>ORDER</a></li></div><li><a href='/composition'> Composition</a></li> <li><a href='/sales'> Sales</a></li><li><a href='/report'> Report</a></li></fieldset> 
           

        
        }
        <div> {
            // this.state.itemsdetails.forEach(element => {
                this.state.itemsdetails.map((key,value) => {

                    let name=key.name;
                    let selectrow=key;
                    return  <div>
                    
                  <fieldset>
                  <label>{key.name}</label> <br/>
                  <label>Price</label> <input value={key.price}/>
                  <label>Quantity</label><input value={key.qty}/>
                  <label>Quantity_Type</label><input value={key.qty_waight_type}/>
                  </fieldset>
                   

                    
                  
                    
                    {  this.state.pagetype =='order'   ? 
                    <div>

                    <select onClick={ (e) => {this.compselect(selectrow,value)}} id={value}>
                    
                    
                     {this.state.composition.map((key,value) => {
                        
                        // console.log("valueee",value)
         return  <option value={key.id}>{key.composition_name}</option>
                       
                      })}

                    </select>
                   
                    

                    <input placeholder="weight" onChange={(event) => this.addcart(event,'input',selectrow)} />
                     <button onClick={(event) => this.addcart('','',selectrow)}>Add to Cart</button>
                    </div>

                     :<div>
                     <input name="modify"  onChange={(event) => this.placeorder(event)} />
                     <select id={value} onClick={ (e) => {this.optionselect(selectrow,value)}} >
                     <option id="name" value="name">Name</option>
                     <option id="price" value="price">Price</option>
                     <option id="quantity" value="quantity">Quantity</option>
                     <option id="Quantity_Type" value="Quantity_Type">Quantity_Type</option>
             </select>
                     <button onClick={(e) =>this.update(selectrow,value)}>update</button>
                     <button onClick={(event) => this.delete(name)} >Delete</button>
                     </div>
                      }
                    
                    
                    
                    </div>
                  
    
                    console.log("key",key.name)
                    console.log("value",value)
                })
                
            }</div>

           {  this.state.pagetype =='master'   ? <div>
            <h2>Add Items</h2>
            <label>Name</label>
            <input id="add_name"/>
            <label>Quantity</label>
            <input id ="qty" />
            <label>Price</label>
            <input  id ="add_price"/>
            <label>Quantity Weight Type</label>
            <input id="type"  />
            <button onClick={ (event) => this.additem(event)} >Add Item</button>


            </div>
             : 
            <div>
            
            </div>
        }

        {this.state.cart.length != 0 ?<h2>Added to Cart </h2>:null}
        { this.state.cart.length == 0 ?console.log("state empty........") :  this.state.cart.map((key,value) =>{
            console.log(key)
           return <div>
           
           <ul>
           <li>
           <label>{key.name}</label> <input value={key.qty}/>
           <label>Buy Quantity</label><input value={key.buyqty}/>
           <label>Quantity_Type</label><input value={key.qty_waight_type}/>
           
           
           </li>
           </ul>
           

               
           
           </div>
           
        })
       
        
        }
        { this.state.cart.length == 0 ? null :<button onClick={ (event) => this.orderitem(event)}>Place Order</button>}
        


        </div>)
    }
    

}
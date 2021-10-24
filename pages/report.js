import React from 'react';
import axios from 'axios'


export default class Report extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            composition: [],
            report: [],
            order: [],
            reportbuy: [],
            buycreate: [],
            reportsale: [],
            totalrawqty: [],
            totalbuyqty: [],
            datatorender: [],
            show: false,


        }
    }



    componentDidMount() {
        axios.get('http://localhost:5000/getcomposition')
            .then((response) => {
                console.log(response)


                this.setState({
                    composition: response.data.data
                })
                console.log("composition", this.state.composition)
            })
            .catch(error => console.log(error))




        axios.get('http://localhost:5000/getorder')
            .then((response) => {
                console.log(response)


                this.setState({
                    order: response.data.data
                })
                console.log("order", this.state.order)
            })
            .catch(error => console.log(error))




        axios.get('http://localhost:5000/report')
            .then((response) => {
                console.log(response)


                this.setState({
                    report: response.data.data
                })
                console.log("report", this.state.report)
            })
            .catch(error => console.log(error.response))

    }

    twoclick = () => {
        let dataelement = this.state.order
        let data = {}
        let arr = []
        let finalbuy = []

        dataelement.forEach(element => {
            // console.log("foreach element ",JSON.parse(element.items))
            data = {}
            let temp = JSON.parse(element.items)
            temp.forEach(element => {
                console.log(element)
                //   console.log("name",element.name)
                //   console.log("qty",element.buyqty)


                data = {
                    "name": element.name,
                    "value": parseInt(element.buyqty),
                    "comp_id": element.composition_id,
                    "price": element.price,
                    "qty": element.qty


                }

                arr.push(data)


            });
            console.log("rrrrrrr", arr)
            finalbuy.push(arr)
            arr = []
            data = {}
            console.log("qqqqqqqqqqqqqqq")


        });

        console.log("========>", finalbuy)

        this.setState({
            totalbuyrawqty: finalbuy
        })

    }

    click = () => {


        // this.twoclick()
        // this.thirdcall()



        let element = []
        element = this.state.report
        let dataforraw = {}
        let datapush = []
        let count = null;

        element.forEach(element => {

            console.log("Total element ", element)
            console.log("foreach element ", JSON.parse(element.composition))

            let qty = element.item_qty

            let temp = JSON.parse(element.composition)


            temp.map((key, value) => {
                // console.log("name",key)
                // console.log("Qty",qty)
                console.log(value)

                if (count != null && count == value) {
                    console.log(value, count)
                    this.state.totalrawqty.push([datapush])
                    console.log(typeof (element))
                    element['total'] = datapush
                    datapush = []

                    console.log("this.state.totalrawqty", this.state.totalrawqty)
                }

                count = 0;



                dataforraw = {
                    "name": Object.keys(key).pop(),
                    "value": Object.values(key).pop() * qty
                }

                // dataforraw['name']=Object.keys(key).pop()
                // dataforraw['value']=Object.values(key).pop()*qty
                console.log(">>>>>>>>>>>>>>", dataforraw)


                datapush.push(dataforraw)


                // console.log("this.state.totalrawqty",this.state.totalrawqty)
                console.log(">>>>>>>>>>>>>>", datapush)


                // console.log("Only Key",Object.keys(key).pop())
                // console.log("Only Values",Object.values(key).pop()*qty) 
                //       console.log("entrie",Object.entries(key))

            })

            element['total'] = datapush


        });
        // this.state.totalrawqty.push([datapush])
        console.log("ooooooooooooooo", element)




        this.setState({
            show: true
        })


    }

    getCompositionObject(compositionId) {
        console.log('compositionid::', compositionId)
        let compositionObj = [];
        let totalBuyRawQty = this.state.totalbuyrawqty;
        for (var i = 0; i < totalBuyRawQty.length; i++) {
            // console.log('totalBuyRawQty with i index::',totalBuyRawQty[i])
            if (typeof (totalBuyRawQty[i]) !== 'undefined' && totalBuyRawQty[i].length > 0) {
                for (var j = 0; j < totalBuyRawQty[i].length; j++) {
                    if (typeof (totalBuyRawQty[i][j]) !== 'undefined' && typeof (totalBuyRawQty[i][j].comp_id) !== 'undefined' &&
                        totalBuyRawQty[i][j].comp_id == compositionId) {
                        return totalBuyRawQty[i]
                    }
                }
            }
        }
        // this.state.totalbuyrawqty.map(function(compData,index){
        //     if(typeof(compData) !== 'undefined' && compData.length > 0){
        //         compData.map(function(data,innerIndex){
        //             // console.log('compositionId::',compositionId)
        //             // console.log('data::',data.comp_id)
        //             if(typeof(data) !== 'undefined' && typeof(data.comp_id) !== 'undefined' && 
        //             data.comp_id == compositionId){
        //                console.log('coming here to return data::',compData)
        //                 return compData 
        //             }else{
        //                 console.log('composition id did not match')
        //             }
        //         })
        //     }
        // })
        return compositionObj;
    }


    thirdcall = () => {

        let obj1 = {}
        let dat1 = []
        // console.log('this.state.totalbuyrawqty::',this.state.totalbuyrawqty)
        let report = this.state.report
        console.log('report.length::', report.length)
        report.map((key5, value) => {
            // console.log("2>>>>>>",key5)
            // console.log("outer map",value)
            //report[value]["total"]
            report[value]["totalbuyqty"] = this.getCompositionObject(key5.id);
            // console.log('data::',data)
            // this.state.totalbuyrawqty.map((twokey,value2)=>{
            //     console.log("Mid map",value2)
            //     twokey.map((key1,value3)=>{
            //         console.log("inner map",value3)

            //         if(key1.comp_id==key5.id){
            //             console.log(key1)
            //             dat1.push(key1)

            //         }   console.log('datatatatatta',dat1)

            //         console.log('datatatatatta below inner map',dat1)

            //     })
            //     console.log(key5)
            //     console.log('datatatatatta abbove key5',dat1)
            //     key5['rawbuyqty']=dat1;
            //     dat1=[]
            // })

        })

        this.setState({ "report": report })
        console.log("rrrrrrrrrrrrrrrrrrrrrrpt", report)
        // this.state.totalbuyrawqty.map((twokey,value)=>{

        //     console.log("above id",twokey)
        //     let get=Object.values(twokey);


        //     console.log("above id222",...get)
        //     // get.forEach(ele=>{
        //     //     console.log(ele)
        //     // })

        //     // twokey.forEach(ele=>{

        //     //     if(ele.comp_id==key.id){
        //     //         return   <div>
        //     //         <label>{ele.name}</label>
        //     //         <input  value= {ele.value} />
        //     //         </div>
        //     //     }

        //     // })


        // })

        console.log("statve value", this.state.report)
    }


    delta() {

        let total = this.state.report
        let total_item = []
        let delta;

        // item_sale=[]

        total.map((key, value) => {
            if (key.total) {
                for (let index = 0; index < key.total.length; index++) {
                    if (key.total[index] && key.totalbuyqty[index]) {
                        const element = key.total[index]
                        // .value;
                        // const element1=key.totalbuyqty[index].value;

                        for (let index1 = 0; index1 < key.totalbuyqty.length; index1++) {
                            const element1 = key.totalbuyqty[index1];
                            if (element.name == element1.name) {
                                delta = element1.value - element.value;
                                key.totalbuyqty[index1]["delta"] = delta

                            }

                        }




                        // console.log("key",key.total[index].name,element)
                        // console.log("element 1",key.totalbuyqty[index].name,element1)
                        // delta=element1 - element  ;
                        // key.totalbuyqty[index]["delta"]=delta
                        // console.log("delta",delta)
                    }


                }

                // console.log("key",key)
                // total_item=key.total
                // total_item.forEach(element =>{
                //     item_sale.push
                // })

                //  console.log("total key",total_item)


            }

        })

        console.log("state::", total)

        this.setState({
            report: total
        })

    }

    render() {
        return (<div>
            <h1>Report</h1>

            {
                this.state.show ?
                    this.state.report.map((key, value) => {

                        return (
                            <fieldset>
                                <label>Name</label>
                                <input value={key.item_name} />
                                <label>Quantity Per Unit</label>
                                <input value={key.composition_weight} />
                                <label>Weight Type </label>
                                <input value={key.composition_weight_type} />
                                <label>Cost Per Unit</label>
                                <input value={key.cost_per_unit} />
                                <label>Quantity Sold</label>
                                <input value={key.item_qty} />
                                {key.total.map((key, value) => {

                                    return <div>
                                        <label>{key.name}</label>
                                        <input value={key.value} />
                                    </div>

                                })}
                                <label>Order Purchased</label><br />
                                {key.totalbuyqty.map((key, value) => {

                                    return <div>

                                        <label>{key.name}</label>
                                        <input value={key.value} />
                                        <label>Delta</label>
                                        <input value={key.delta} />
                                    </div>

                                })}

                                {


                                }
                                {
                                    // this.state.totalbuyrawqty.map((twokey,value)=>{

                                    //     console.log("above id",twokey)
                                    //     let get=Object.values(twokey);
                                    //     twokey.map((key1,value1)=>{
                                    //         if(value1==0)
                                    //         {
                                    //             console.log(value,value1)
                                    //             console.log(key1)
                                    //         }

                                    //     })

                                    //     // for(let obj of get){
                                    //     //     console.log("for offff",obj)
                                    //     //     break;
                                    //     // }

                                    //     // console.log("above id222",...get)






                                    //     // get.forEach(ele=>{
                                    //     //     console.log(ele)
                                    //     // })

                                    //     // twokey.forEach(ele=>{

                                    //     //     if(ele.comp_id==key.id){
                                    //     //         return   <div>
                                    //     //         <label>{ele.name}</label>
                                    //     //         <input  value= {ele.value} />
                                    //     //         </div>
                                    //     //     }

                                    //     // })


                                    // })
                                }


                                <label></label>
                                <input />

                            </fieldset>

                        )

                    })


                    //            {

                    // composition: "[{"bread":"60"},{"sugar":"20"},{"butter":"20"}]"
                    // composition_weight: 1000
                    // composition_weight_type: "gram"
                    // cost_per_unit: 100
                    // id: 5
                    // item_name: "Cake"
                    // item_qty: 10
                    // total: Array(3)
                    // 0: {name: "bread", value: 600}
                    // 1: {name: "sugar", value: 200}
                    // 2: {name: "butter", value: 200}
                    // length: 3
                    // __proto__: Array(0)
                    // total_item_cost: 1000
                    //            }
                    :
                    null
            }

            {
            }
            <button onClick={() => { this.twoclick() }}>Sub 1 </button>
            <button onClick={() => { this.thirdcall() }}>Call 2 </button>
            <button onClick={() => { this.click() }}>Add 3</button>
            <button onClick={() => { this.delta() }}>Calculate Delta</button>



            {



            }

        </div>
        )
    }

}



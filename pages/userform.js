import { Component } from 'react';
import { Head } from 'next/head';
import Link from 'next/Link';
import axios from 'axios';
// import '../bootstrap.css'




class Login extends Component {

    constructor(props) {
        super(props)

        this.handleemail = this.handleemail.bind(this)
        console.log(props)
        console.log(props)
        this.state = {
            userdetails: [],
            type: props.type
        }
    }

    // static async getInitialProps(context){
    //     const {data}=props
    //     console.log(data)
    // }

    componentDidMount() {



    }



    handleemail = (props) => {
        console.log(props.target.value)
        this.setState({
            email: props.target.value
        })

    }
    handlepass = (props) => {
        console.log(props.target.value)
        this.setState({
            password: props.target.value
        })


    }

    ValidateEmail = (email) => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            return (true)
        }
        return (false)
    }

    formSubmit = (props) => {
        props.preventDefault()
        let email = this.state.email
        let password = this.state.password
        let check = this.ValidateEmail(email)

        if (email && password && check) {
            let data = {
                'email': email,
                'password': password
            }
            let url;
            if (this.state.type == 'Register') {
                url = 'http://localhost:5000/register'

            }
            if (this.state.type == 'Login Page') {
                url = 'http://localhost:5000/login'
            }

            console.log(url)
            return axios.post(url, { data })
                .then((response) => {

                    if (this.state.type == 'Register') {
                        if (response.data.status == 200) {
                            console.log(response)
                            window.location.href = '/login'
                        }
                        else {
                            console.log(response)
                            alert(response.data.Message)
                        }
                    }
                    // console.log("outside ",response)
                    if (this.state.type == 'Login Page') {
                        console.log(response)
                        if (response.data.status == 200) {
                            window.location.href = '/masteritems'
                        }
                        else {
                            alert(response.data.Message)
                        }
                    }


                })
                .catch((error) => {
                    console.log(error)
                })

            // return axios({

            //     method:'POST',
            //     url:'http://127.0.0.1:3000/api/registeruser',
            //     data:data
            // })
            // .then((response )=>{

            //             console.log("Resposnse",response)
            // })
            // .catch(error => console.log(error.response))
        }
        else {

            alert("Enter Email/Password Correctly")
        }
    }

    render() {

        return <div>
            <form>
                <h1>{this.state.type}</h1>
                <fieldset>
                    <div>
                        <label>Email</label>
                    </div>
                    <input type='email' placeholder="Email" name="email" value={this.state.email || ''} required onChange={this.handleemail} />
                </fieldset>


                <fieldset>
                    <div>
                        <label>Password</label>
                    </div>
                    <input type="password" placeholder="Password" name="pass" required value={this.state.password || ''} onChange={this.handlepass} />
                </fieldset>

                <fieldset>
                    <button onClick={this.formSubmit}>
                        Submit
   </button>
                </fieldset>

            </form>


        </div>

    }

}

export default Login
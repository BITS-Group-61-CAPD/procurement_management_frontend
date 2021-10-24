import { Component } from 'react';
import { Head } from 'next/head';
import Link from 'next/Link';
// import '../bootstrap.css'

var cors = require('cors')
const express = require('express')
const next = require('next')


const route = require('../routes/api')

// const dev=process.env.NODE_ENV!=='production'
const app = next()
const handle = app.getRequestHandler()

app.prepare()
    .then(() => {
        const server = express()
        server.use(cors())
        server.use(express.json())
        server.use('/api', console.log("hello api enter here ......................"))


        server.get('*', (req, res) => {
            return handle(req, res)
        })


        server.listen(3000, (err) => {
            if (err) throw err
            console.log('> Ready on http://localhost:' + 3000)
        })

    })
    .catch(err => console.log(err))





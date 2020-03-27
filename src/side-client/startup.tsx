import React from "react"
import { hydrate,render  } from "react-dom"
import { BrowserRouter } from "react-router-dom"
import AppMain from '../app'
import { loadableReady } from '@loadable/component'


loadableReady(() => {
    hydrate(<BrowserRouter><AppMain /></BrowserRouter>, document.getElementById('root'))
});
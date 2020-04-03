import React from "react"
import { render  } from "react-dom"
import { BrowserRouter } from "react-router-dom"
import AppMain from './app'


render(<BrowserRouter><AppMain /></BrowserRouter>, document.getElementById('root'));
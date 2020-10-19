import React from "react"
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Home from './Home'
import World from './World'
import Politics from './Politics'
import Technology from './Technology'
import Sports from './Sports'
import Business from './Business'
import CardsBig from './components/CardsBig'
import Favorite from "./components/Favorite"
import SearchResults from "./components/SearchResults"


class App extends React.Component{
    render(){
        return(
            <Router>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route path='/world' component={World} />
                    <Route path='/politics' component={Politics} />
                    <Route path='/business' component={Business} />
                    <Route path='/technology' component={Technology} />
                    <Route path='/sports' component={Sports} />
                    <Route path='/carddetails' component={CardsBig} />
                    <Route path='/favorite' component={Favorite} />
                    <Route path='/search' render = { props => (<SearchResults {...props} key={window.location.search}/>)}/>
                </Switch>
            </Router>
        )
    }
}

export default App;
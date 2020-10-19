import React from 'react';
import{Badge} from 'react-bootstrap'

class SectionBadge extends React.Component{
    constructor(props){
    super(props)

    }

render(){
    let color,fontc;
    if(this.props.namesec.toUpperCase() === "world".toUpperCase()){
        color = "#7c56fb"
        fontc = "white"
    }
    else if(this.props.namesec.toUpperCase() === "Politics".toUpperCase()){
        color = "#459488"
        fontc = "white"
    }
    else if(this.props.namesec.toUpperCase() === "Business".toUpperCase()){
        color = "#4a98e9"
        fontc = "white"
    }
    else if(this.props.namesec.toUpperCase() === "Technology".toUpperCase()){
        color = "#ceda49"
        fontc = "black"
    }
    else if(this.props.namesec.toUpperCase() === "Sport".toUpperCase() || this.props.namesec.toUpperCase() === "Sports".toUpperCase()){
        color = "#f5c150"
        fontc = "black"
    }
    else if(this.props.namesec.toUpperCase() === "Guardian".toUpperCase()){
        color = "#152949"
    }
    else if(this.props.namesec.toUpperCase() === "Nytimes".toUpperCase()){
        color = "#dddddd"
        fontc = "black"
    }
    else {
        color = "#6e757c"
        fontc = "white"
    }
    const style = {
        backgroundColor: color,
        color: fontc
    }
    // console.log(style)
    return(
  
    <Badge variant="secondary" style ={style}>{this.props.namesec.toUpperCase()}</Badge>

    );
}
}

export default SectionBadge;
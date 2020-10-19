import React from "react"
import {Link, withRouter} from 'react-router-dom'
import ModalC from './ModalC'
import { MdShare } from 'react-icons/md'
import SectionBadge from './SectionBadge'

class Cards extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            modal: false,
          };
        // this.handleClose = this.handleClose.bind(this)
        // this.handleShow = this.handleShow.bind(this)
        // console.log(this.props.history)
    }
        
      modalOpen(event) {
        event.preventDefault();
        this.setState({ modal: true });
      }
    
      modalClose(event) {
          event.preventDefault();
        this.setState({
          modal: false
        });
      }
    gotodetails=(idp)=>{
         this.props.history.push(`/carddetails?id=${idp}`)
     }
    render(){
       
        return (
            <>
            <ModalC show={this.state.modal} handleClose={e => this.modalClose(e)} url = {this.props.url}>
                <h3>{this.props.title}</h3>
            </ModalC>
            <Link to={`/carddetails?id=${encodeURIComponent(this.props.id)}`} style={{ textDecoration: 'none' }}>
            {/* <div className="card" onClick = {()=>this.gotodetails(encodeURIComponent(this.props.id))}> */}
            <div className="card">
                <div className = "row">
                    <div className = "col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3">
                        <img className="card-img-top" src= {this.props.imgurl}  />
                    </div>
                    <div className=" col-12 col-sm-12 col-md-9 col-lg-9 col-xl-9">
                        <h3 className="card-title"><i><b>{this.props.title + ' '}</b></i><MdShare style={{fontSize:'20px'}} className="fa" onClick={e => this.modalOpen(e)}/></h3>
                        <div style={{marginBottom:"2%"}}>
                            <p id = "truncateThis">{this.props.descr}</p>
                        </div>
                        <div className="row justify-content-between">
                            <div className="col-6">
                            <h4><i>{this.props.date}</i></h4>
                            </div>
                            <div className="col-6" style={{textAlign: 'right'}}><SectionBadge namesec= {this.props.section}/>
                            
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </Link>
            </>
        )
    }
}

export default Cards

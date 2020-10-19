import React from 'react';
import {Link} from 'react-router-dom'
import ModalC from './ModalC'
import { MdShare,MdDelete } from 'react-icons/md'
import SectionBadge from './SectionBadge';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class CardSmall extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            modal: false,
        };
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
    render(){
        const removeFavorite=(event)=>{
            event.preventDefault();
            localStorage.removeItem('card'+this.props.id)
            const toaststring = 'Removing '+ this.props.title
            toast(toaststring); 
            this.props.delete(this.props.id);
        }
        return(
            <>
            <ModalC show={this.state.modal} handleClose={e => this.modalClose(e)} url = {this.props.url} >
                <div >
                <div><h1 style={{margin:'0'}}>{this.props.source}</h1></div>
                <div><h3>{this.props.title}</h3></div>
                </div>
            </ModalC>
            <li style={{listStyleType:'none',marginBottom: '2em'}} className="col-12 col-sm-6 col-md-4 col-lg-3">
                <Link to = {`/carddetails?id=${this.props.id}`} style={{textDecoration:'none'}}>
                <div className = "card" style={{padding:'7% 5%', margin:'auto'}}>
                    <h4 className="card-title"><b><i>{this.props.title}</i></b><MdShare style={{fontSize:'1.5em'}} className="fa" onClick={e => this.modalOpen(e)}/>
                    {this.props.source && <MdDelete onClick={removeFavorite} style={{fontSize:'1.5em'}}/>}
                    </h4>
                    <img src={this.props.img} className="card-img-top" />
                <div className="card-body" style = {{padding:'0px',display:'inline-block',justifyContent: 'space-between'}}>
                    <div className="card-text" style = {{float:'left'}}>{this.props.date}</div>
                    <div  style = {{float:'right',display:'inline-block'}}>
                        {this.props.section && <div style={{float:'left'}}><SectionBadge namesec = {this.props.section}/></div>}
                    {this.props.source && <div style = {{marginLeft:'0.2em',float:'right'}}><SectionBadge namesec = {this.props.source} /></div>}
                    </div>
                </div>
                </div>
                </Link>
            </li>
            </>
        )
    }
}

export default CardSmall
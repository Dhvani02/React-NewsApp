import React from "react"
import {EmailShareButton,FacebookShareButton,TwitterShareButton,FacebookIcon,TwitterIcon,EmailIcon} from "react-share";

const ModalC = ({ handleClose, show, children, url }) => {
  const showHideClassName = show ? "modal d-block" : "modal d-none";
const hashtags = ["CSCI_571_NewsApp"]
  return (
<div className={showHideClassName} tabIndex="-1" role="dialog">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        {children}
        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleClose}>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-footer">
      <div>
        <h3>Share Via</h3>
        </div>
          <div className="row">
          <div className="col-4">
      <FacebookShareButton url = {url} hashtag = "#CSCI_571_NewsApp">
        <FacebookIcon size={50} round />
      </FacebookShareButton>
      </div>
      <div className="col-4">
      <TwitterShareButton url = {url} hashtags = {hashtags}>
        <TwitterIcon size={50} round />
      </TwitterShareButton>
      </div>
      <div className="col-4">
      <EmailShareButton url = {url} subject = "#CSCI_571_NewsApp">
        <EmailIcon size={50} round />
      </EmailShareButton>
      </div>
      </div>
    
        </div>
    </div>
  </div>
</div>
  );
};

export default ModalC;

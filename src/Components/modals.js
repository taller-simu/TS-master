import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const Modals=(props)=>{
    
    return (
      <Modal
        {...props}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        
        <Modal.Body>
          <h2>{props.msg}<b>{props.f}</b></h2>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  
}
export default Modals;

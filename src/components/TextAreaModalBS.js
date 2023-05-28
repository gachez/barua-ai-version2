"use client"
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

export default function TextAreaModalBS(props) {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Modal show={true} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.type === "tune" ? 'Fine tune your message' : 'Add your unique offer'} </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
              {
                props.type
                ?
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>{props.type === 'tune'?'Fine tune':'Offer name'}</Form.Label>   
                <Form.Control
                    type="text"
                    placeholder={props.type === 'tune'?'e.g Graphic design':'Write your offer here...'}
                    autoFocus
                />
                </Form.Group>
                :
                null
              }
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Example textarea</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

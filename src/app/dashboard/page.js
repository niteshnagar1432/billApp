'use client'
import React, { useEffect, useState } from 'react'
import ParentDashbord from '../components/ParentDashbord'
import MyComponent from '../components/Models'
import { Button, Form, Modal } from 'react-bootstrap';
import MyAPI, { CError, Item } from '../components/MyAPI';
import BillList from '../components/BillList';

function page() {
  const [showAddBankModal, setShowAddBankModal] = useState(false);
  const [showCheckBalanceModal, setShowCheckBalanceModal] = useState(false);
  const [showAddBalanceModal, setShowAddBalanceModal] = useState(false);
  const [showAddBillModal, setShowAddBillModal] = useState(false);
  const [bankName, setBankName] = useState('');

  const openAddBankModal = () => setShowAddBankModal(true);
  const openCheckBalanceModal = () => setShowCheckBalanceModal(true);
  const openAddBalanceModal = () => setShowAddBalanceModal(true);
  const openAddBillModal = () => setShowAddBillModal(true);

  const handleCloseModal = () => {
    setShowAddBankModal(false);
    setShowCheckBalanceModal(false);
    setShowAddBalanceModal(false);
    setShowAddBillModal(false);
  };

  const [bill, setBills] = useState(null);
  let token = Item.getItem('token');
  useEffect(() => {
    MyAPI.get('/bill/bills', token)
      .then((res) => {
        let { status, data, message } = res.data;
        if (status === true) {
          setBills(data);
        } else {
          CError(message || res.error || res.message);
        }
      }).catch(err => {
        CError.error(err.message);
      });
  }, [token])

  const handleAddBank = () => {
    alert(bankName);
  }

  return (
    <ParentDashbord>
      <div>DashBoard</div>
      <div>
        <Button variant="primary" onClick={openAddBankModal}>
          Add Bank
        </Button>{' '}
        <Button variant="success" onClick={openCheckBalanceModal}>
          Check Balance
        </Button>{' '}
        <Button variant="info" onClick={openAddBalanceModal}>
          Add Balance
        </Button>{' '}
        <Button variant="warning" onClick={openAddBillModal}>
          Add Bill
        </Button>

        {/* Add Bank Modal */}
        <Modal show={showAddBankModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add Bank</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="bankName">
              <Form.Label>Enter Bank Name:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Bank Name"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="button" onClick={handleAddBank}>
              Add Bank
            </Button>
          </Modal.Body>
        </Modal>

        {/* Check Balance Modal */}
        <Modal show={showCheckBalanceModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Check Balance</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="bankName">
              <Form.Label>Enter Bank Name:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Bank Name"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="button" onClick={handleAddBank}>
              Add Bank
            </Button>
          </Modal.Body>
        </Modal>

        {/* Add Balance Modal */}
        <Modal show={showAddBalanceModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add Balance</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="bankName">
              <Form.Label>Enter Bank Name:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Bank Name"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="button" onClick={handleAddBank}>
              Add Bank
            </Button>
          </Modal.Body>
        </Modal>

        {/* Add Bill Modal */}
        <Modal show={showAddBillModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add Bill</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="bankName">
              <Form.Label>Enter Bank Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Bank Name"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="button" onClick={handleAddBank}>
              Add Bank
            </Button>
          </Modal.Body>
        </Modal>
      </div>
      {bill && bill.length > 0 ? <BillList bills={bill} /> : <h1>No Bills</h1>}

    </ParentDashbord>
  )
}

export default page
'use client'
import React, { useEffect, useState } from 'react'
import ParentDashbord from '../components/ParentDashbord.js'
import { Button, Form, Modal } from 'react-bootstrap';
import MyAPI, { CError, Item } from '../components/MyAPI.jsx';
import BillList from '../components/BillList.js';
import { useRouter } from 'next/navigation.js';

function page() {
  const navigater = useRouter();
  const [showAddBankModal, setShowAddBankModal] = useState(false);
  const [showCheckBalanceModal, setShowCheckBalanceModal] = useState(false);
  const [showAddBalanceModal, setShowAddBalanceModal] = useState(false);
  const [showAddBillModal, setShowAddBillModal] = useState(false);
  const [bankName, setBankName] = useState('');

  const openAddBankModal = () => setShowAddBankModal(true);
  const openCheckBalanceModal = () => setShowCheckBalanceModal(true);
  const openAddBalanceModal = () => setShowAddBalanceModal(true);
  const openAddBillModal = () => setShowAddBillModal(true);

  const [token, setToken] = useState('');
  const [bill, setBills] = useState(null);
  const [bankList, setBankList] = useState(null);
  const [selectedBank,setSelectedBank] = useState('');
  const [balance,setBalance] = useState('');
  const [checkedBalance,setCheckBalance] = useState(null);
  const [billDetails,setBillDetails] = useState('');
  const [billAmount,setBillAmount] = useState('');

  const handleCloseModal = () => {
    setShowAddBankModal(false);
    setShowCheckBalanceModal(false);
    setShowAddBalanceModal(false);
    setShowAddBillModal(false);
    setSelectedBank('');
    setCheckBalance(null);
  };
  

  useEffect(() => {
    let tokenn = Item.getItem('token');
    if (tokenn) {
      setToken(tokenn);
      MyAPI.get('/user/bank', tokenn)
        .then((res) => {
          let { status, banks, message } = res.data || res;
          if (status === true) {
            setBankList(banks);
          } else {
            CError.error(res.error || message);
          }
        }).catch(err => {
          CError.error(err.message);
        });
    } else {
      navigater.push('/');
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      MyAPI.get('/bill/bills', token)
        .then((res) => {
          let { status, data, message } = res.data || res;
          if (status === true) {
            setBills(data);
          } else {
            CError(message || res.error || res.message);
          }
        }).catch(err => {
          CError.error(err.message);
        });
    }
  }, [token])

  const handleAddBank = () => {
    if (token) {
      MyAPI.post('/bank/add', { name: bankName }, token)
        .then((res) => {
          let { status, message } = res.data || res;
          if (status === true) {
            setBankName('');
            CError.success(message);
            handleCloseModal();
          } else {
            CError.error(message || res.error || res.message);
          }
        }).catch(err => {
          CError.error(err.message);
        });
    }
  }

  const handleAddBalance = ()=>{
    MyAPI.post('/bank/add/balance',{bankId:selectedBank,amount:balance},token)
    .then((res)=>{
      let {status,message} = res.data || res;
      if(status === true){
        setSelectedBank('');
        setBalance('');
        handleCloseModal();
        CError.success(message);
      }else{
        CError.error(message || res.error || res.message);
      }
    }).catch(err=>{
      CError.error(err.message);
    });
  };

  const handleCheckBalance = ()=>{
      MyAPI.post('/bank/check/balance',{bankId:selectedBank},token)
      .then((res)=>{
        let {status,message,availableBalance,bankName} = res.data || res;
        if(status === true){
          setCheckBalance({availableBalance,bankName});
        }else{
          CError.error(message || res.error || res.message);
        }
      }).catch(err=>{
        CError.error(err.message);
      });
  };

  const handleAddBill = ()=>{
    MyAPI.post('/bill/create',{bankId:selectedBank,amount:billAmount,details:billDetails},token)
    .then((res)=>{
      let {status,message} = res.data || res;
      if(status === true){
        setSelectedBank('');
        setBillAmount('');
        setBillDetails('');
        handleCloseModal();
        CError.success(message);
      }else{
        CError.error(message || res.error || res.message);
      }
    }).catch(err=>{
        CError.error(err.message);
      });
  };

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
            {!checkedBalance &&(
            <Form.Group className="mb-3" controlId="bankSelect">
              <Form.Label>Select Bank:</Form.Label>
              <Form.Control
                as="select"
              value={selectedBank}
              onChange={(e) => setSelectedBank(e.target.value)}
              >
                <option value="" disabled>Select a bank</option>
                {bankList && bankList.length > 0 ? bankList.map((bank, index) => (
                  <option key={index} value={bank.bankId}>
                    {bank.bankName}
                  </option>
                )) : (
                  <option value="" disabled>No banks available</option>
                )}
              </Form.Control>
            </Form.Group>
            ) }
            {checkedBalance && (
              <>
                <center> <h3>{checkedBalance.bankName}</h3> </center>
              <br />
              <center> <h5> INR {checkedBalance.availableBalance}</h5> </center>
              </>
            )}
            <Button variant="primary" type="button" onClick={handleCheckBalance}>
              Check Balance
            </Button>
          </Modal.Body>
        </Modal>

        {/* Add Balance Modal */}
        <Modal show={showAddBalanceModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add Balance</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form.Group className="mb-3" controlId="bankSelect">
              <Form.Label>Select Bank:</Form.Label>
              <Form.Control
                as="select"
              value={selectedBank}
              onChange={(e) => setSelectedBank(e.target.value)}
              >
                <option value="" disabled>Select a bank</option>
                {bankList && bankList.length > 0 ? bankList.map((bank, index) => (
                  <option key={index} value={bank.bankId}>
                    {bank.bankName}
                  </option>
                )) : (
                  <option value="" disabled>No banks available</option>
                )}
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="bankName">
              <Form.Label>Enter Amount:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Amount"
                value={balance}
                onChange={(e) => setBalance(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="button" onClick={handleAddBalance}>
              Add Amount
            </Button>
          </Modal.Body>
        </Modal>

        {/* Add Bill Modal */}
        <Modal show={showAddBillModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add Bill</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form.Group className="mb-3" controlId="bankSelect">
              <Form.Label>Select Bank:</Form.Label>
              <Form.Control
                as="select"
              value={selectedBank}
              onChange={(e) => setSelectedBank(e.target.value)}
              >
                <option value="" disabled>Select a bank</option>
                {bankList && bankList.length > 0 ? bankList.map((bank, index) => (
                  <option key={index} value={bank.bankId}>
                    {bank.bankName}
                  </option>
                )) : (
                  <option value="" disabled>No banks available</option>
                )}
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="billAmount">
              <Form.Label>Enter Bill Amount</Form.Label>
              <Form.Control
                type="text"
                placeholder="Bill Amount"
                value={billAmount}
                onChange={(e) => setBillAmount(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="bankDetails">
              <Form.Label>Enter Bank Details:</Form.Label>
              <Form.Control
                as="textarea"
                rows={3} // You can adjust the number of rows as needed
                placeholder="Bank Details"
                value={billDetails}
                onChange={(e) => setBillDetails(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="button" onClick={handleAddBill}>
              Add Bill
            </Button>
          </Modal.Body>
        </Modal>
      </div>
      {bill && bill.length > 0 ? <BillList bills={bill} /> : <h1>No Bills</h1>}

    </ParentDashbord>
  )
}

export default page
import React from 'react';
import { Card, CardDeck } from 'react-bootstrap';

const BillList = ({ bills }) => {
  return (
    <>
      {bills.map((bill) => (
        <Card className='mt-3' key={bill._id}>
          <Card.Body>
            <Card.Subtitle className="mb-2 text-muted">
              Current Balance: {bill.currentBalance}
            </Card.Subtitle>
            <Card.Text>Details: {bill.details}</Card.Text>
            <Card.Text>Amount: {bill.amount}</Card.Text>
            <Card.Text>Remain Balance: {bill.remainBalance}</Card.Text>
            <Card.Text>Created At: {new Date(bill.createdAt).toLocaleString()}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </>
  );
};

export default BillList;

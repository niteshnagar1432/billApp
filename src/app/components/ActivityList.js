'use client'
import React from 'react';
import { Card } from 'react-bootstrap';
import Moment from 'react-moment';

const TransactionCard = ({ transaction }) => {
  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>{transaction.bankId.name}</Card.Title>
        <Card.Text>
          <strong>Amount:</strong> ₹{transaction.amount}
        </Card.Text>
        <Card.Text>
          <strong>Message:</strong> {transaction.message}
        </Card.Text>
        <Card.Text>
          <strong>Date:</strong>{' '}
          <Moment format="DD MMM, hh:mm A" locale="en">
            {transaction.createdAt}
          </Moment>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

const ActivityList = ({ transactions }) => {
  return (
    <div>
      {transactions.map((transaction) => (
        <TransactionCard key={transaction._id} transaction={transaction} />
      ))}
    </div>
  );
};

export default ActivityList;

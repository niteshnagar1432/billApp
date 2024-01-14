'use client'
import React, { useState } from 'react';
import { Container, Row, Col, Card, Tab, Tabs } from 'react-bootstrap';
import { LoginForm, SignupForm } from './components/LoginForm';

const page = () => {
  const [activeTab, setActiveTab] = useState('login');

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  return (
    <Container fluid className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card>
            <Tabs
              id="controlled-tab-example"
              activeKey={activeTab}
              onSelect={handleTabChange}
              className="mb-3"
            >
              <Tab eventKey="login" title="Login">
                <LoginForm />
              </Tab>
              <Tab eventKey="signup" title="Signup">
                <SignupForm />
              </Tab>
            </Tabs>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default page;

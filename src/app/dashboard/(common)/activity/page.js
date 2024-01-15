'use client'
import ActivityList from '@/app/components/ActivityList.js';
import React, { useEffect, useState } from 'react'
import MyAPI, { CError, Item } from '@/app/components/MyAPI.jsx';
import ParentDashbord from '@/app/components/ParentDashbord.js'
import { useRouter } from 'next/navigation';
import { Button, Col, Form, Row } from 'react-bootstrap';

function page() {
    let navigater = useRouter()
    const [token, setToken] = useState('');
    const [ActivitiesListt, setActivitiesList] = useState(null);
    const [bankList, setBankList] = useState(null);
    const [selectedBank,setSelectedBank] = useState('');


    useEffect(() => {
        let tokenn = Item.getItem('token');
        if (tokenn) {
            setToken(tokenn);
            MyAPI.get('/activity/all', tokenn)
                .then((res) => {
                    let { status, activities, message } = res.data || res;
                    if (status === true) {
                        setActivitiesList(activities);
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
          MyAPI.get('/user/bank', token)
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
        }
      }, [token]);

      const handleSearch = ()=>{
        MyAPI.get(`/activity/bank/${selectedBank}`,token)
        .then((res)=>{
            let {status,message,activities} = res.data || res;
            if(status === true){
                setActivitiesList(activities);
                setSelectedBank('');
            }else{
                CError.warn(message);
            }
        }).catch(err=>{
            CError.error(err.message);
        });
      };

    return (
        <ParentDashbord>
            <Row className="mb-3">
                <Col md={3} className='mb-sm-3'>
                    <Form.Control value={selectedBank} onChange={(e)=>setSelectedBank(e.target.value)} as="select" defaultValue="Select Bank">
                        <option>Select Bank</option>
                        {bankList && bankList.length>0 ? bankList.map((bank,index)=>(
                        <option key={index} value={bank.bankId} >{bank.bankName}</option>
                        )) :<option>Bank Not Found.</option>}                        
                    </Form.Control>
                </Col>
                {/* <Col md={3}>
                    <Form.Control type="date" placeholder="Start Date" />
                </Col>
                <Col md={3}>
                    <Form.Control type="date" placeholder="End Date" />
                </Col> */}
                <Col md={3} className='ms-3 mb-sm-3'>
                    <Button variant="primary" onClick={handleSearch}>
                        Search
                    </Button>
                </Col>
            </Row>
            {ActivitiesListt && ActivitiesListt.length > 0 ?
                <ActivityList transactions={ActivitiesListt} />
                : <h5>Activity Not Found.</h5>}
            <Col md={4}>&nbsp;</Col>
        </ParentDashbord>
    )
}

export default page
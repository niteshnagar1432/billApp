'use client'
import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Image, Row } from 'react-bootstrap'
import './parent.css';
import { RiMenuUnfoldLine } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";
import { FaRegCalendarAlt } from "react-icons/fa";
import { SiGoogleclassroom } from "react-icons/si";
import { BsChatDots, BsToggleOn, BsToggleOff } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { IoWalletSharp } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { TfiWallet } from "react-icons/tfi";
import { SlOptions } from "react-icons/sl";
import { HiMenuAlt1 } from "react-icons/hi";
import { MdMenuOpen } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { useRouter } from 'next/navigation';
import MyAPI, { CError, Item } from './MyAPI';
import Moment from 'react-moment';
// const Logo = require('../../images/logo.b08faae67f6c650cfef4.png');
// const Logo = require('/images/logo.b08faae67f6c650cfef4.png');
// const "/images/A 1.png" = require('/images/A 1.png');
// const NotificationIcon = require('/notification-icon.png');

function ParentDashbord({children}) {

    let navigater = useRouter()
    let [token,setToken] = useState('');
    const [ActivitiesList,setActivitiesList] = useState(null);

    useEffect(() => {
        let tokenn = Item.getItem('token');
        if (tokenn) {
          setToken(tokenn);
          MyAPI.get('/activity/all', token)
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

    let options = [
        {
            id: 1,
            name: 'Dashboard',
            url: '/dashboard',
            icon: <RxDashboard />,
            isActive: true
        },
        {
            id: 2,
            name: 'Activity',
            url: '/dashboard/activity',
            icon: <FaRegCalendarAlt />,
            isActive: false
        },
        {
            id: 3,
            name: 'Classes',
            url: '/classes',
            icon: <SiGoogleclassroom />,
            isActive: false
        }
    ]
    const [leftSideBarOptions, setLeftSideBarOptions] = useState(options);
    const [leftSideBarOpen, setLeftSideBarOpen] = useState(true);
    const [rightSidebarOpen, setRightSidebarOpen] = useState(true);
    const [darkTheme, setDarkTheme] = useState(false);
    const [settingOpen, setSettingOpen] = useState(false);
    const [notificationOpen, setNotificationOpen] = useState(false);
    const [currentTheme, setCurrentTheme] = useState({
        backGroundColor: '#FFD32B',
        color: '#212529'
    });

    useEffect(() => {
        const handleWindowResize = () => {
            const width = window.innerWidth;
            if (width <= 768) {
                setLeftSideBarOpen(false);
            } else {
                setLeftSideBarOpen(true);
            }
        };
        handleWindowResize();
        window.addEventListener('resize', handleWindowResize);
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    const handleLeftSideBar = () => {
        setLeftSideBarOpen(!leftSideBarOpen);
    };

    const handleNavigationChange = (id) => {
        const updatedOptions = leftSideBarOptions.map((option, index) => {
            if (option.id === id + 1) {
                return { ...option, isActive: true };
            } else {
                return { ...option, isActive: false };
            }
        });
        setLeftSideBarOptions(updatedOptions);
        navigater.push(leftSideBarOptions[id].url);
    };

    useEffect(() => {
        console.table(leftSideBarOptions);
    }, [leftSideBarOptions]);


    const toggleRightSidebar = () => {
        setRightSidebarOpen(!rightSidebarOpen);
    };

    const toggleDarkTheme = () => {
        setDarkTheme(!darkTheme)
        if (darkTheme === false) {
            setCurrentTheme({
                backGroundColor: '#343541',
                color: '#ffffff'
            });
        } else {
            setCurrentTheme({
                backGroundColor: '#FFD32B',
                color: '#212529'
            });
        }
    }

    const handleSettingIconClick = () => {
        setSettingOpen(!settingOpen);
        setNotificationOpen(false);
    }
    const handleNotificationIconClick = () => {
        setNotificationOpen(!notificationOpen);
        setSettingOpen(false);
    }

    return (
        <Container fluid>
            <Row md={12}>
                {/* left side-bar */}
                <Col md={leftSideBarOpen ? 2 : 1} className={leftSideBarOpen ? "p-0 m-0 left-side-bar" : "p-0 m-0 left-side-bar left-side-bar-close"} style={{ height: '100vh', background: currentTheme.backGroundColor, color: currentTheme.color }}>
                    <Col style={{ height: '10vh' }} className='nav-bar-logo-area'>
                        <span className='p-0 m-0 d-flex align-items-center justify-content-center'>
                            <div className="logo-img"><Image src={"/images/logo.b08faae67f6c650cfef4.png"} style={{ width: '100%', objectFit: 'contain' }} ></Image></div>
                            {leftSideBarOpen ? <span className='text-bold'>Daily Bill</span> : null}
                        </span>
                        <div onClick={handleLeftSideBar} style={{ backgroundColor: currentTheme.backGroundColor }} className="left-navigation-handler">
                            {!leftSideBarOpen ? <HiMenuAlt1 /> : <IoMdClose />}
                        </div>
                    </Col>
                    <Col className={leftSideBarOpen ? "mt-3" : "mobile-left-sideBar-hide"} style={{ height: '60%', overflowY: 'auto' }}>
                        {leftSideBarOptions.map((item, index) => (
                            <div key={index} onClick={() => handleNavigationChange(index)} className={
                                leftSideBarOpen ? (item.isActive === true ? "menu-item pt-2 pb-3 mb-1 active-location" : "menu-item pt-2 pb-3 mb-1")
                                    : (item.isActive === true ? "menu-item pt-2 pb-3 mb-1 active-location ps-5" : "menu-item pt-2 pb-3 mb-1 ps-5")
                            }>

                                <span style={{ color: currentTheme.color }}>
                                    {item.icon}
                                </span>
                                <div className="line" style={{ backgroundColor: currentTheme.color }}></div>
                                {leftSideBarOpen ? <span className="name">{item.name}</span> : null}
                            </div>
                        ))}
                    </Col>
                    <Col md={12} className={leftSideBarOpen ? "ps-3" : "mobile-left-sideBar-hide"} style={{ fontWeight: '700' }}>Other</Col>
                    <Col className={leftSideBarOpen ? null : "mobile-left-sideBar-hide"}>
                        <div className={leftSideBarOpen ? "menu-item pt-2 pb-3 mb-1" : "menu-item pt-2 pb-3 mb-1 ps-5"}>
                            <BsChatDots />
                            <div className="line"></div>
                            {leftSideBarOpen ? <span className="name">Chat</span> : null}
                        </div>
                        <div className={leftSideBarOpen ? "menu-item pt-2 pb-3 mb-1" : "menu-item pt-2 pb-3 mb-1 ps-5"}>
                            <FaUsers />
                            <div className="line"></div>
                            {leftSideBarOpen ? <span className="name">Referral</span> : null}
                        </div>
                        <div className={leftSideBarOpen ? "menu-item pt-2 pb-3 mb-1" : "menu-item pt-2 pb-3 mb-1 ps-5"}>
                            <IoWalletSharp />
                            <div className="line"></div>
                            {leftSideBarOpen ? <span className="name">Wallet</span> : null}
                        </div>
                    </Col>
                </Col>
                {/* middle container  */}
                <Col md={
                    leftSideBarOpen ?
                        (rightSidebarOpen ? 7 : 10) :
                        (rightSidebarOpen ? 8 : 11)
                } className='main-page-layout-area' style={{ overflowY: 'auto', height: '100vh' }}>
                    <Col className='center-welcome-area d-flex align-items-center justify-content-end' style={{ width: '100%', height: '10vh' }}>
                        <span onClick={() => setRightSidebarOpen(!rightSidebarOpen)} style={{ color: currentTheme.backGroundColor, fontSize: '32px', cursor: 'pointer', height: 'fit-content' }}>
                            {rightSidebarOpen ? <RiMenuUnfoldLine /> : <MdMenuOpen />}
                        </span>
                    </Col>
                        {children}
                </Col>
                {/* right side-bar  */}
                {
                    rightSidebarOpen ? (
                        <Col md={3} className='right-sideBar' style={{ height: '100vh', background: currentTheme.backGroundColor, color: currentTheme.color, overflowY: 'auto' }}>
                            <Col style={{ width: '100%', height: '10vh' }} className='mb-5 right-sidebar d-flex align-items-center justify-content-around'>
                                <div className="notification-icon" onClick={handleNotificationIconClick}>
                                    <div className="new-notification-symbol"></div>
                                    <IoMdNotificationsOutline />
                                </div>
                                <div onClick={handleSettingIconClick}>
                                    <IoSettingsOutline />
                                </div>
                                <TfiWallet />
                                <div className="profile-action d-flex align-items-center justify-content-center" style={{ width: '40px' }}>
                                    <Image src={"/images/A 1.png"} style={{ width: '100%', height: '100%', objectFit: 'contain' }} ></Image>
                                </div>
                            </Col>
                            {/* active notification tab */}
                            <Col className={notificationOpen ? "active_notificationTab active" : "active_notificationTab"}>
                                <Row className='mt-3'>
                                    <Col md={3} className='d-flex align-items-center justify-content-end'>
                                        <div className="profile-action-upcoming " style={{ width: '50px' }}>
                                            <Image src={"/images/notification-icon.png"} style={{ width: '100%', height: '100%', objectFit: 'contain' }} ></Image>
                                        </div>
                                    </Col>
                                    <Col md={9} className='ps-2'>
                                        <Col style={{ fontWeight: 700 }}>Submisson NLP Programming</Col>
                                        <Col style={{ opacity: '.8' }}>04 Jan, 09:20 AM</Col>
                                    </Col>
                                </Row>
                                <hr />
                                <Row className='mt-3'>
                                    <Col md={3} className='d-flex align-items-center justify-content-end'>
                                        <div className="profile-action-upcoming " style={{ width: '50px' }}>
                                            <Image src={"/images/notification-icon.png"} style={{ width: '100%', height: '100%', objectFit: 'contain' }} ></Image>
                                        </div>
                                    </Col>
                                    <Col md={9} className='ps-2'>
                                        <Col style={{ fontWeight: 700 }}>Outcome administration</Col>
                                        <Col style={{ opacity: '.8' }}>04 Jan, 09:20 AM</Col>
                                    </Col>
                                </Row> <hr />
                                <Row className='mt-3'>
                                    <Col md={3} className='d-flex align-items-center justify-content-end'>
                                        <div className="profile-action-upcoming " style={{ width: '50px' }}>
                                            <Image src={"/images/notification-icon.png"} style={{ width: '100%', height: '100%', objectFit: 'contain' }} ></Image>
                                        </div>
                                    </Col>
                                    <Col md={9} className='ps-2'>
                                        <Col style={{ fontWeight: 700 }}>Teacher Panel Discussion</Col>
                                        <Col style={{ opacity: '.8' }}>04 Jan, 09:20 AM</Col>
                                    </Col>
                                </Row>
                                <hr />
                                <Row className='mt-3'>
                                    <Col md={3} className='d-flex align-items-center justify-content-end'>
                                        <div className="profile-action-upcoming " style={{ width: '50px' }}>
                                            <Image src={"/images/notification-icon.png"} style={{ width: '100%', height: '100%', objectFit: 'contain' }} ></Image>
                                        </div>
                                    </Col>
                                    <Col md={9} className='ps-2'>
                                        <Col style={{ fontWeight: 700 }}>Submisson Data Structure</Col>
                                        <Col style={{ opacity: '.8' }}>04 Jan, 09:20 AM</Col>
                                    </Col>
                                </Row>
                            </Col>
                            {/* active setting tab */}
                            <Col className={settingOpen ? "active_settingTab p-3 m-0 active" : "active_settingTab p-3 m-0"}>
                                <Row className='align-items-center'>
                                    <Col md={8} className='text-light'>
                                        Right Side Bar
                                    </Col>
                                    <Col md={4}>
                                        <Button variant='outline-light' onClick={toggleRightSidebar}>
                                            {rightSidebarOpen ? <BsToggleOn /> : <BsToggleOff />}
                                        </Button>
                                    </Col>
                                </Row>
                                <hr />
                                <Row className='align-items-center'>
                                    <Col md={8} className='text-light'>
                                        Dark Theme
                                    </Col>
                                    <Col md={4}>
                                        <Button variant='outline-light' onClick={toggleDarkTheme}>
                                            {darkTheme ? <BsToggleOn /> : <BsToggleOff />}
                                        </Button>
                                    </Col>
                                </Row>
                                <hr />
                            </Col>
                            {/* up coming  */}
                            <Col className='d-flex align-items-center justify-content-between ps-2 pe-2'>
                                <span className="heading"><b>Upcoming</b></span>
                                <SlOptions />
                            </Col>
                            <Col>
                                <Row className='mt-3'>
                                    <Col md={3} className='d-flex align-items-center justify-content-end'>
                                        <div className="profile-action-upcoming " style={{ width: '50px' }}>
                                            <Image src={"/images/A 1.png"} style={{ width: '100%', height: '100%', objectFit: 'contain' }} ></Image>
                                        </div>
                                    </Col>
                                    <Col md={9} className='ps-2'>
                                        <Col style={{ fontWeight: 700 }}>Meeting with Mr Lurah</Col>
                                        <Col style={{ opacity: '.8' }}>09:20 AM  <span style={{ color: "red", fontWeight: 700 }}>Due Soon</span> </Col>
                                    </Col>
                                </Row>
                                <Row className='mt-3'>
                                    <Col md={3} className='d-flex align-items-center justify-content-end'>
                                        <div className="profile-action-upcoming " style={{ width: '50px' }}>
                                            <Image src={"/images/A 1.png"} style={{ width: '100%', height: '100%', objectFit: 'contain' }} ></Image>
                                        </div>
                                    </Col>
                                    <Col md={9} className='ps-2'>
                                        <Col style={{ fontWeight: 700 }}>Meeting with Mr Lurah</Col>
                                        <Col style={{ opacity: '.8' }}>09:20 AM  <span style={{ color: "red", fontWeight: 700 }}>Due Soon</span> </Col>
                                    </Col>
                                </Row>
                                {/* Recent Activity  */}
                                <Col className='mt-4 d-flex align-items-center justify-content-between ps-2 pe-2'>
                                    <span className="heading"><b>Recent Activity</b></span>
                                    <SlOptions />
                                </Col>
                                {ActivitiesList && ActivitiesList.length >0 ? ActivitiesList.map((Activity,index)=>(
                                     <Row className='mt-3' key={index}>
                                     <Col md={3} className='d-flex align-items-center justify-content-end'>
                                         <div className="profile-action-upcoming " style={{ width: '50px' }}>
                                             <Image src={"/images/notification-icon.png"} style={{ width: '100%', height: '100%', objectFit: 'contain' }} ></Image>
                                         </div>
                                     </Col>
                                     <Col md={9} className='ps-2'>
                                         <Col style={{ fontWeight: 700 }}>{Activity.message}</Col>
                                         <Col style={{ opacity: '.8' }}>
                                         <Moment format="DD MMM, hh:mm A" locale="en">
                                            {Activity.createdAt}
                                        </Moment>
                                         </Col>
                                     </Col>
                                 </Row>
                                )):(<h6>No Activity found.</h6>)}
                               
                                <Col className='mt-4 d-flex align-items-center justify-content-between ps-2 pe-2'>
                                    <span className="heading"><b>Latest Message</b></span>
                                    <SlOptions />
                                </Col>
                                {/* lates messages  */}
                                <Row className='d-flex align-items-center justify-content-center pt-3'>
                                    <Col md={4} style={{ width: '90px', height: 'auto' }}>
                                        <img
                                            src={"/images/A 1.png"}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                padding: '2px',
                                                backgroundColor: '#E7DCBD',
                                                borderRadius: '50%',
                                                objectFit: 'contain',
                                                cursor: 'pointer'
                                            }}
                                            alt=""
                                        />
                                    </Col>
                                    <Col md={4} style={{ width: '90px', height: 'auto' }}>
                                        <img
                                            src={"data:image/jpeg;base64,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"} // Your base64 image data
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                padding: '2px',
                                                backgroundColor: '#E7DCBD',
                                                borderRadius: '50%',
                                                objectFit: 'contain',
                                                cursor: 'pointer'
                                            }}
                                            alt=""
                                        />
                                    </Col>
                                    <Col md={4} style={{ width: '90px', height: 'auto' }}>
                                        <img
                                            src={"/images/A 1.png"}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                padding: '2px',
                                                backgroundColor: '#E7DCBD',
                                                borderRadius: '50%',
                                                objectFit: 'contain',
                                                cursor: 'pointer'
                                            }}
                                            alt=""
                                        />
                                    </Col>
                                </Row>
                            </Col>
                        </Col>
                    ) : null
                }
            </Row>
        </Container>
    )
}

export default ParentDashbord
import React, { Component } from 'react'
import logo from '../img/logo.png'

import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { LinkContainer } from 'react-router-bootstrap'



export default class MainNavbar extends Component {
    render() {
        return (
            <Navbar bg="light" expand="lg">
                <Container fluid>
                    <Navbar.Brand href="#">
                        <img src={logo} alt="Logo" height="20px" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}

                        >
                            <LinkContainer to="/">
                                <Nav.Link>Home</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/create">
                                <Nav.Link>Create Product</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/createcat">
                                <Nav.Link>Create Category / Sub Category</Nav.Link>
                            </LinkContainer>

                        </Nav>

                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    }
} 
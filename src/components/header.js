import React, { useState } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';

const Header = (props) => {
    const { categories } = props;
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const selectTypeNews = (type, props) => {
        props.setCategorySelected(type);
        //this.props.teste(type);
        (document.querySelectorAll('.news')).forEach(element => {
            element.style.cssText = 'display: none !important';
        });
        (document.querySelectorAll('.' + type)).forEach(element => {
            element.style.cssText = 'display: flex !important';
        });
    };
    return (
        <div>
            <Navbar color="primary" dark expand="md">
                <NavbarBrand onClick={selectTypeNews.bind(this, 'news', props)} className="add-pointer">Compasso Times</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem className="add-pointer">
                            <NavLink onClick={selectTypeNews.bind(this, 'science', props)}>Science News</NavLink>
                        </NavItem>
                        <NavItem className="add-pointer">
                            <NavLink onClick={selectTypeNews.bind(this, 'technology', props)}>Technology News</NavLink>
                        </NavItem>

                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                Other News
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem onClick={selectTypeNews.bind(this, 'news', props)}>
                                    All News
                                </DropdownItem>
                                {
                                    categories.map((category, i) => (
                                        <DropdownItem key={i} onClick={selectTypeNews.bind(this, category, props)} className="first-letter-uppercase ">
                                            {category}
                                        </DropdownItem>
                                    ))
                                }
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
}

export default Header;
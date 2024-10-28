import React, { useContext, useState } from "react";
import { FaBars, FaSearch } from "react-icons/fa";
import styled from 'styled-components';
import { AuthContext } from "../contexts/AuthProvider";
import useSidebar from "../hooks/useSidebar";
import logoImage from "../Images/logo-large.png";
import {
  Icons,
  Logo,
  LogoImage,
  MenuIcon,
  MobileIcon,
  Nav,
  NavLinks,
  SearchBar,
  Sidebar,
} from "../StyledComponents/styledComponents";
import { formatText } from "../utils/utils";
import CartDropdown from "./CartDropdown";
import ProfileDropdown from "./ProfileDropdown";
const SearchContainer = styled.div`
  position: relative;
  width: 300px;
  margin: 0 auto;
`;


const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
  max-height: 400px;
  overflow-y: auto;
  z-index: 10;
`;

const DropdownItem = styled.div`
  padding: 10px;
  cursor: pointer;
  border-bottom: 1px solid #f1f1f1;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #f9f9f9;
  }

  h3 {
    margin: 0;
    font-size: 16px;
    font-weight: 500;
  }

  p {
    margin: 5px 0 0;
    font-size: 14px;
    color: #888;
  }
`;
const Navbar = () => {
  const { isSidebarOpen, toggleSidebar, sidebarRef } = useSidebar();
  const { product } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter products by title
  const filteredProducts = product.products
      ? product.products.filter((prod) =>
            prod.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : [];

 
       




  return (
    <Nav>
      <Logo>
        <LogoImage src={logoImage} alt={formatText("Shopease Logo")} />
      </Logo>


{/* original code */}

      {/* <SearchBar>
        <FaSearch />
        <input type="text" placeholder="Search for products..."   
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}/>
      </SearchBar> */}

{/* modified version */}

      <SearchBar>
        <FaSearch />
        <input
          type="text"
          placeholder="Search for products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </SearchBar>

      {searchQuery && filteredProducts.length > 0 && (
        <DropdownMenu>
          {filteredProducts.map((prod) => (
            <DropdownItem key={prod.id}>
              <h3>{prod.title}</h3>
              <p>Price: ${prod.price}</p>
            </DropdownItem>
          ))}
        </DropdownMenu>
      )}

      <MobileIcon />

      <NavLinks>
        <a href="/">Home</a>
        <a href="/shop">Shop</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
      </NavLinks>

      <Icons>
        <CartDropdown className="cart-dropdown" />
        <ProfileDropdown className="profile-dropdown" />
        <MenuIcon onClick={toggleSidebar}>
          <FaBars />
        </MenuIcon>
      </Icons>

      <Sidebar ref={sidebarRef} isOpen={isSidebarOpen}>
        <a href="/" onClick={toggleSidebar}>
          Home
        </a>
        <a href="/shop" onClick={toggleSidebar}>
          Shop
        </a>
        <a href="/about" onClick={toggleSidebar}>
          About
        </a>
        <a href="/contact" onClick={toggleSidebar}>
          Contact
        </a>
      </Sidebar>
    </Nav>
  );
};

export default Navbar;

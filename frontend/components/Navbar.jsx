import React from 'react';
import styled, { createGlobalStyle, keyframes, css } from 'styled-components';
import { FaShieldAlt, FaBolt, FaUserLock, FaCode } from 'react-icons/fa';
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();
    const handleClick =()=>{
        navigate("/login");
    }
  return (
   
    <Nav>
          <Logo>
            <FaShieldAlt /> SecureAuth
          </Logo>
          <NavButtons>
            <Button onClick={()=>{navigate("/home")}}>Dashboard</Button>
            <Button primary onClick={handleClick}>Get Started</Button>
            </NavButtons>
        </Nav>
   
   
  )
}
const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;

  ${props => props.primary ? css`
    background: linear-gradient(45deg, #6366f1, #ec4899);
    color: white;
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4);
    }
  ` : css`
    background: transparent;
    color: #1e293b;
    border: 1px solid #6366f1;
    &:hover {
      background: rgba(99, 102, 241, 0.1);
    }
  `}
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  background: linear-gradient(45deg, #6366f1, #ec4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const NavButtons = styled.div`
  display: flex;
  gap: 1rem;
`;



export default Navbar

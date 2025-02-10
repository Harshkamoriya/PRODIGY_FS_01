import React from 'react';
import styled, { createGlobalStyle, keyframes, css } from 'styled-components';
import { FaShieldAlt, FaBolt, FaUserLock, FaCode } from 'react-icons/fa';
import { motion } from 'framer-motion';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Inter', sans-serif;
  }

  body {
    background: #f8fafc;
    color: #1e293b;
  }
`;

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const Container = styled.div`
  min-height: 100vh;
  padding: 2rem;
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

const Hero = styled.div`
min-height: 100vh;


display: flex;
align-items: center;
justify-content: center;
padding: 6rem 2rem;
text-align: center;
margin-top: 500px;
padding-top: 50px;



`;

const HeroContent = styled.div`
  max-width: 800px;

`;

const Title = styled(motion.h1)`
  font-size: 4rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  background: linear-gradient(45deg, #6366f1, #ec4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: #475569;
  margin-bottom: 2rem;
  line-height: 1.7;
`;

const Features = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 4rem;
`;

const FeatureCard = styled(motion.div)`
  background: #ffffff;
  padding: 2rem;
  border-radius: 1rem;
  border: 1px solid rgba(99, 102, 241, 0.2);
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-5px);
    border-color: #6366f1;
    box-shadow: 0 4px 20px rgba(99, 102, 241, 0.2);
  }
`;

const FeatureIcon = styled.div`
  font-size: 2rem;
  color: #6366f1;
  margin-bottom: 1rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: #1e293b;
`;

const FeatureDescription = styled.p`
  color: #475569;
  line-height: 1.6;
`;

function Home() {
  return (
    <>
      <GlobalStyle />
      <Container>
      


      

        <Hero>
          <HeroContent>
            <Title
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Secure Authentication Made Simple
            </Title>
            <Subtitle>
              Enterprise-grade JWT authentication system that scales with your application.
              Built with security best practices and modern web standards.
            </Subtitle>
            <NavButtons style={{ justifyContent: 'center' }}>
              <Button>Learn More</Button>
              <Button primary>Start Free Trial</Button>
            </NavButtons>

            <Features>
              <FeatureCard>
                <FeatureIcon><FaShieldAlt /></FeatureIcon>
                <FeatureTitle>Bank-Grade Security</FeatureTitle>
                <FeatureDescription>
                  Industry-standard encryption and security practices to keep your data safe
                </FeatureDescription>
              </FeatureCard>

              <FeatureCard>
                <FeatureIcon><FaBolt /></FeatureIcon>
                <FeatureTitle>Lightning Fast</FeatureTitle>
                <FeatureDescription>
                  Optimized performance with minimal latency for seamless user experience
                </FeatureDescription>
              </FeatureCard>
              <FeatureCard
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <FeatureIcon><FaUserLock /></FeatureIcon>
                <FeatureTitle>Easy Integration</FeatureTitle>
                <FeatureDescription>
                  Simple API and comprehensive documentation for quick implementation
                </FeatureDescription>
              </FeatureCard>

              <FeatureCard
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <FeatureIcon><FaCode /></FeatureIcon>
                <FeatureTitle>Developer Friendly</FeatureTitle>
                <FeatureDescription>
                  Built by developers, for developers, with modern tooling support
                </FeatureDescription>
              </FeatureCard>
            </Features>
          </HeroContent>
        </Hero>
      </Container>
    </>
  );
}

export default Home;

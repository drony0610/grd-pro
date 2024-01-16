import styled from "styled-components";

import { Radar } from "../../../assets/radar";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 500px;
  width: 100%;
  padding: 30px;
  min-height: 600px;
`;

const Logo = styled.div`
  border-radius: 12px;
  background: #ebf4ff;
  padding: 12px;
  margin-bottom: 24px;
`;

const Button = styled.div`
  padding: 8px 22px;
  font-size: 1rem;
  min-width: 240px;
  color: #fff;
  text-align: center;
  background: linear-gradient(256deg, #457cff, #5977fe);
  border-radius: 4px;
  width: 100%;
  margin-top: 16px;
  display: flex;
  align-items: center;
  height: 48px;
  min-width: 240px;
  justify-content: center;
  cursor: pointer;
`;

const Title = styled.div`
  margin-bottom: 8px;
  font-size: 1.25rem;
  font-weight: bold;
  text-align: center;
`;

const SubTitle = styled.div`
  color: #7a7a7a;
  font-weight: 300;
  margin-bottom: 24px;
  text-align: center;
`;

const Step3 = ({ setFormStep }) => {
  return (
    <Container>
      <Logo>
        <Radar />
      </Logo>
      <Title>Scan For Data Leaks</Title>
      <SubTitle>
        GuardPRO scans a wide range of threats. We will check to see if you
        personal information was leaked online.
      </SubTitle>
      <Button
        onClick={() => {
          setFormStep((p) => p + 1);
        }}
      >
        Scan Now
      </Button>
    </Container>
  );
};

export default Step3;

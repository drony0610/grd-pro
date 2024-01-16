import styled from "styled-components";
import { Step6_1, Step6_2 } from "./icons";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 500px;
  width: 100%;
  padding: 30px;
  min-height: 600px;
`;

const Title = styled.div`
  margin-bottom: 8px;
  font-size: 1.25rem;
  font-weight: bold;
  text-align: center;
  color: #fff;
`;

const SubTitle = styled.div`
  color: #7a7a7a;
  font-weight: 600;
  margin-bottom: 24px;
  text-align: center;
  width: 100%;
  color: #fff;
  opacity: 0.8;
`;

const Button = styled.div`
  padding: 8px 22px;
  font-size: 1rem;
  min-width: 240px;
  color: #457cff;
  text-align: center;
  background: #fff;
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

const Image1 = styled.div`
  margin: auto;
  width: 100%;
  max-height: 60%;
  & svg {
    width: 100%;
    height: 100%;
  }
`;

const Image2 = styled.div`
  margin: auto;
  width: 100%;
  max-height: 60%;
  & svg {
    height: 100%;
    width: 100%;
  }
`;

const Step6 = ({ leaksData, setFormStep }) => {
  return (
    <Container>
      {leaksData ? (
        <>
          <Title>
            Let's help you fix your {leaksData.length} leak, and keep your
            identity save.
          </Title>
          <SubTitle>
            With GuardPRO you get immediate data leak allerts so you can act
            fast to protect your identity and $1M identity theft insurance
            coverage
          </SubTitle>
          <Image1>
            <Step6_2 />
          </Image1>
          <Button
            onClick={() => {
              setFormStep((p) => p + 1);
            }}
          >
            Continue
          </Button>
        </>
      ) : (
        <>
          <Title>GuardPRO alerts you as soon as a data leak happens.</Title>
          <SubTitle>
            With GuardPRO you get immediate data leak allerts so you can act
            fast to protect your identity and $1M identity theft insurance
            coverage
          </SubTitle>
          <Image2>
            <Step6_1 />
          </Image2>
          <Button
            onClick={() => {
              setFormStep((p) => p + 1);
            }}
          >
            Continue
          </Button>
        </>
      )}
    </Container>
  );
};

export default Step6;

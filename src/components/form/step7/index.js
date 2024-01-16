import { useEffect, useState } from "react";
import styled from "styled-components";
import Image from "../../../assets/img.png";

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
  padding: 12px;
  margin-bottom: 24px;
`;

const Title = styled.div`
  margin-bottom: 8px;
  font-size: 1.25rem;
  font-weight: bold;
  text-align: center;
`;

const SubTitle = styled.div`
  color: #7a7a7a;
  font-weight: 600;
  margin-bottom: 24px;
  text-align: left;
  width: 100%;
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

const PreBtn = styled.p`
  font-size: 0.8rem;
  font-weight: 300;
  opacity: 0.8;

  & span {
    font-weight: 600;
  }
`;

const Content = styled.div`
  margin-top: 10%;
  margin-bottom: auto;
`;

const Item = styled.div`
  display: flex;
  gap: 12px;
  align-items: stretch;
`;

const ItemContent = styled.div`
  padding-bottom: 2rem;
  & h2 {
    font-size: 1rem;
    line-height: 1.5rem;
  }
  & p {
    font-size: 1rem;
    opacity: 0.8;
  }
`;

const ItemLeft = styled.div`
  position: relative;
  width: 10px;
`;

const Circle = styled.div`
  position: absolute;
  background: #457cff;
  width: 8px;
  height: 8px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 50%;
  top: 0.5rem;
`;

const Line = styled.div`
  position: absolute;
  height: calc(100% - 0.5rem);
  top: calc(0.5rem + 8px);
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  background: ${({ i }) =>
    i === 2
      ? "linear-gradient(to bottom, #457cff, rgba(0, 0, 0, 0));"
      : "#457cff"};
`;

const RotateContainer = styled.div`
  position: relative;
  width: 20px;
  height: 20px;

  & svg {
    animation: rotate 1s linear 0s infinite;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    transform: translate(-50%, -50%);
  }
  @keyframes rotate {
    0% {
      transform: translate(-50%, -50%) rotate(0);
    }
    100% {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }
`;

const monthes = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const handleWeek = () => {
  const now = Date.now();
  const end = now + 604800000;
  const date = `${new Date(end).getDate()} ${
    monthes[new Date(end).getMonth()]
  }`;

  return date;
};

const data = [
  {
    title: "Today",
    text: "We start protection you identity and let you know if your data is leaked",
  },
  {
    title: "Day 5",
    text: "You get a reminder your free trial ends in 2 days.",
  },
  {
    title: "Day 7",
    text: `Your subscription will start on ${handleWeek()}. You can cancel anytime.`,
  },
];
const Step7 = ({ initPayment, isPaymentLoading, setFormStep }) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setFormStep((p) => p + 1);
      }, 600);
    }
  }, [isLoading]);
  return (
    <Container>
      <Logo>
        <img src={Image} alt="" />
      </Logo>

      <Title>How you free trial works</Title>

      <Content>
        {data.map((e, i) => (
          <Item key={i}>
            <ItemLeft>
              <Circle />
              <Line i={i} />
            </ItemLeft>
            <ItemContent>
              <h2>{e.title}</h2>
              <p>{e.text}</p>
            </ItemContent>
          </Item>
        ))}
      </Content>
      <PreBtn>
        7-Day free trial then <span>$9.99/month</span>
      </PreBtn>
      <Button
        onClick={() => {
          if (!isLoading) {
            setIsLoading(true);
          }
        }}
      >
        {isLoading ? (
          <>
            <Rotate />
          </>
        ) : (
          <>Next</>
        )}
      </Button>
    </Container>
  );
};

const Rotate = () => (
  <RotateContainer>
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
      >
        <path
          d="M20 10C20 11.9778 19.4135 13.9112 18.3147 15.5557C17.2159 17.2002 15.6541 18.4819 13.8268 19.2388C11.9996 19.9957 9.98891 20.1937 8.0491 19.8079C6.10929 19.422 4.32746 18.4696 2.92893 17.0711C1.53041 15.6725 0.577999 13.8907 0.192147 11.9509C-0.193705 10.0111 0.00432836 8.00043 0.761205 6.17317C1.51808 4.3459 2.79981 2.78412 4.4443 1.6853C6.08879 0.58649 8.02219 -2.35852e-08 10 0L10 1.34444C8.28809 1.34444 6.61463 1.85208 5.19123 2.80317C3.76783 3.75425 2.65843 5.10606 2.00331 6.68766C1.34819 8.26926 1.17678 10.0096 1.51076 11.6886C1.84473 13.3676 2.66909 14.9099 3.8796 16.1204C5.0901 17.3309 6.63237 18.1553 8.31138 18.4892C9.9904 18.8232 11.7307 18.6518 13.3123 17.9967C14.8939 17.3416 16.2457 16.2322 17.1968 14.8088C18.1479 13.3854 18.6556 11.7119 18.6556 10H20Z"
          fill="white"
        />
      </svg>
    </div>
  </RotateContainer>
);
export default Step7;

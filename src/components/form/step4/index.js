import styled from "styled-components";

import { useEffect, useRef, useState } from "react";
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
  font-weight: 600;
  margin-bottom: 24px;
  text-align: left;
  width: 100%;
`;

const ProgressBar = styled.div`
  padding: 2px;
  border: 1px solid #cbc9c9;
  border-radius: 2px;
  width: 100%;
  margin: 8px 0;
  position: relative;
`;

const Indicator = styled.div`
  height: 4px;
  background: #345be7;
  border-radius: 1px;
  width: ${({ w }) => (w ? `${w}%` : 0)};
  transition: width 0.5s;
  position: relative;
  z-index: 2;
`;

const Bg = styled.div`
  height: calc(100% - 4px);
  background: #345be7;
  opacity: 0.4;
  position: absolute;
  top: 2px;
  left: 2px;
  z-index: 1;
  width: calc(100% - 4px);
`;

const Step4 = ({ formData, setLeaksData, setFormStep }) => {
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(0);
  const interval = useRef();
  const [error, setError] = useState({
    isError: false,
    errorText: "",
  });

  useEffect(() => {
    const getDataFormApi = async () => {
      const url = `https://haveibeenpwned.com/api/v3/breachedaccount/${
        formData.email ? formData.email : ""
      }?truncateResponse=false`;
      // const url = `https://haveibeenpwned.com/api/v3/breachedaccount/drony0610@yandex.ru?truncateResponse=false`;

      try {
        setError({
          isError: false,
          errorText: "",
        });
        console.log(url);
        const response = await fetch(
          `https://driver-updater.herokuapp.com/api/v1/front/proxyquery/?service_for_my_benefits=haveibeenpwned.com&url=${btoa(
            url
          )}`
          // {
          //   headers: {
          //     // "X-Proxy-Query": url,
          //     // "X-hibp-api-key": "add",
          //     // "Access-Control-Request-Headers": "*",
          //   },
          // }
        );
        if (response.ok) {
          const data = await response.json();
          localStorage.setItem("__lks_data", JSON.stringify(data));
          setLeaksData(data);
        } else {
          localStorage.setItem("__lks_data", JSON.stringify(null));
          setLeaksData(null);
        }
      } catch (error) {
        console.log(error);
        setProgress(100);
        setTimeout(() => {
          setFormStep((p) => p + 1);
        }, 500);
        setLeaksData(null);
        clearInterval(interval.current);
        setError({
          isError: true,
          errorText: error,
        });
      }
    };
    getDataFormApi();
    // const getMockData = () =>
    //   setTimeout(() => {
    //     setLeaksData(mock);
    //   }, 1000);
    // getMockData();
    interval.current = setInterval(() => {
      if (progressRef.current >= 100) {
        setProgress(100);
        clearInterval(interval.current);
        return setTimeout(() => {
          setFormStep((p) => p + 1);
        }, 500);
      }
      progressRef.current = progressRef.current + 20;
      setProgress(progressRef.current);
    }, 1000);

    return () => {
      clearInterval(interval.current);
    };
  }, []);

  return (
    <Container>
      <Logo>
        <Radar />
      </Logo>
      <Title>
        {progress >= 100 ? "Scan Complete" : "Scanning for Data Leaks..."}
      </Title>
      <ProgressBar>
        <Indicator w={progress} />
        <Bg />
      </ProgressBar>
      <SubTitle>Scan status for {formData.email}</SubTitle>
      {/* <Button>Scan Now</Button> */}
    </Container>
  );
};

export default Step4;

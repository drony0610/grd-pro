import ErrorIcon from "@mui/icons-material/Error";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { codes } from "./codes";

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
  font-weight: 300;
  margin-bottom: 24px;
  text-align: center;
`;

const PhoneInput = styled.div`
  display: flex;
  gap: 12px;
  width: 100%;
  position: relative;
`;

const CodeSelector = styled.div`
  height: 40px;
  max-width: 120px;
  width: 100%;
  padding: 8.5px 14px;
  display: flex;
  gap: 4px;
  align-items: center;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
`;

const CodesList = styled.div`
  height: 200px;
  width: 80%;
  position: absolute;
  bottom: -12px;
  transform: translateY(100%)
    ${({ isOpen }) => (isOpen ? "scale(1)" : "scale(0.3)")};
  opacity: ${({ isOpen }) => (isOpen ? "1" : "0")};
  transform-origin: left top;
  border-radius: 12px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  background: #fff;
  padding: 12px;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s, opacity 0.3s;
`;

const CodeListItem = styled.div`
  display: flex;
  gap: 6px;
  padding: 6px;
  cursor: pointer;
  &:hover {
    background: #f8f8f8;
  }
`;

const Arrow = styled.div`
  width: 8px;
  heigh: 8px;
  position: relative;
  margin-left: auto;

  & svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%)
      ${({ isOpen }) => (isOpen ? "rotate(180deg)" : "rotate(0deg)")};
    transition: transform 0.3s;
  }
`;

const ButtonForward = styled.div`
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
  margin-top: auto;
`;

const ButtonSkip = styled.div`
  padding: 8px 22px;
  font-size: 1rem;
  min-width: 240px;
  color: #457cff;
  text-align: center;

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

const Step2 = ({ formData, setFormData, country, setFormStep }) => {
  const [value, setValue] = useState("");
  console.log(country);
  const countryData =
    country &&
    codes.find((e) => e.code.toLowerCase() === country.code.toLowerCase());
  console.log(countryData);
  const code = countryData ? countryData.dial_code : codes[0].dial_code;
  const flag = countryData ? countryData.flag : codes[0].flag;
  const [codeValue, setCodeValue] = useState({
    flag: null,
    code: null,
  });

  const [isOpen, setIsOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const ref = useRef(null);
  console.log(isOpen);

  useEffect(() => {
    setCodeValue({ code, flag });
  }, [country]);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      e.stopPropagation();
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    window.addEventListener("click", handleOutsideClick);
    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <Container>
      <Logo>
        <Phone />
      </Logo>
      <Title>Add phone number</Title>
      <SubTitle>
        Adding a phone number increases the chances of finding a data leak by
        30%
      </SubTitle>
      <PhoneInput>
        <CodeSelector
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen((p) => !p);
          }}
        >
          {codeValue.flag}
          <span>{codeValue.code}</span>

          <Arrow isOpen={isOpen}>
            <Triangle />
          </Arrow>
        </CodeSelector>

        <CodesList isOpen={isOpen} ref={ref}>
          {codes.map((e, i) => (
            <CodeListItem
              onClick={() => {
                if (isOpen) {
                  setCodeValue({ code: e.dial_code, flag: e.flag });
                  setIsOpen(false);
                }
              }}
              key={i}
              style={{
                display: "flex",
                gap: "8px",
                alignItems: "center",
              }}
            >
              <span>{e.flag}</span>
              <span>{e.dial_code}</span>
              <span>{e.name}</span>
            </CodeListItem>
          ))}
        </CodesList>
        <TextField
          placeholder="35812425"
          variant="outlined"
          size="small"
          type="tel"
          fullWidth
          error={isError}
          helperText={isError && "fill in phone number"}
          value={value}
          InputProps={{
            endAdornment: isError && (
              <InputAdornment position="start">
                <ErrorIcon style={{ color: "#E57373" }} />
              </InputAdornment>
            ),
          }}
          onChange={(e) => {
            setValue(e.target.value);
            setFormData((p) => ({
              ...p,
              phone: e.target.value,
            }));
          }}
        />
      </PhoneInput>
      <ButtonForward
        onClick={() => {
          if (value.length > 0) {
            setFormStep((p) => p + 1);
            setIsError(false);
          } else {
            setIsError(true);
          }
        }}
      >
        Continue
      </ButtonForward>
      <ButtonSkip
        onClick={() => {
          setFormStep((p) => p + 1);
        }}
      >
        Skip
      </ButtonSkip>
    </Container>
  );
};

export default Step2;

// By choosing to provide your phone number, you consent that Guardio scans it for data leaks and may inform you of security threats. Guardio may send marketing communication, promotions etc, via text messages. Opt-out anytime by replying STOP. Standard text/data rates may apply. For details, see our Privacy Policy or our TOU.

const Phone = () => (
  <div
    style={{
      background: "#ebf4ff",
      borderRadius: "50%",
      width: "50px",
      height: "50px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="21"
      height="30"
      viewBox="0 0 21 30"
      fill="none"
    >
      <rect width="21" height="30" rx="5" fill="#256CEA" />
      <rect x="2" y="2" width="17" height="21" rx="5" fill="white" />
      <circle cx="11" cy="26" r="2" fill="white" />
    </svg>
  </div>
);

const Triangle = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="15"
    height="7"
    viewBox="0 0 15 7"
    fill="none"
  >
    <path
      d="M8 0H1.33024C0.868554 0 0.654021 0.572268 1.00147 0.876288L7.64796 6.69197C7.84607 6.86531 8.14464 6.85537 8.33077 6.66923L14.1464 0.853552C14.4614 0.53857 14.2383 0 13.7929 0H8Z"
      fill="#646464"
    />
  </svg>
);

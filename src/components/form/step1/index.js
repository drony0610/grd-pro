import ErrorIcon from "@mui/icons-material/Error";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Alert, Snackbar } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { styled } from "styled-components";
import { Radar } from "../../../assets/radar";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 500px;
  width: 100%;
  padding: 30px;
  min-height: 600px;

  & .snackbar {
    width: 90%;
    color: #fff;
    display: flex;
    padding: 6px 16px;
    flex-grow: 1;
    flex-wrap: wrap;
    font-size: 0.875rem;
    align-items: center;
    font-family: "sofia-pro", "Roboto", "Helvetica", "Arial", sans-serif;
    font-weight: normal;
    line-height: 1.8;
    border-radius: 4px;
    letter-spacing: normal;
    background-color: rgb(49, 49, 49);
    flex-direction: column;
    align-items: flex-start;
    font-weight: 600;
    font-size: 1rem;
    .MuiAlert-icon {
      color: #fff;
    }
    .MuiAlert-message {
      padding-right: 16px;
    }
    .MuiAlert-action {
      margin-right: 0;
    }
  }
  .MuiFormHelperText-root {
    color: red !important;
  }
`;

const Logo = styled.div`
  border-radius: 12px;
  background: #ebf4ff;
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
  font-weight: 300;
  margin-bottom: 24px;
  text-align: center;
`;

const EmailInput = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const ExtraInputs = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const PasswordInput = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 12px;
  & p {
    color: #7a7a7a;
    font-size: 0.75rem;
    margin-top: 12px;
  }
  & h3 {
    font-size: 1rem;
    font-weight: 300;
    margin-bottom: 12px;
  }
`;

const UserName = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 24px;
`;

const FirstNameInput = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  font-weight: 300;
  gap: 8px;
`;

const LastNameinput = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  font-weight: 300;
  gap: 8px;
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

const Loader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  padding: 24px;
  z-index: 5;
`;

const SnackBtn = styled.div`
  maring-right: 12px;
`;
const RotateContainer = styled.div`
  position: relative;
  width: 40px;
  height: 40px;

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

const Law = styled.div`
  color: #7a7a7a;
  font-size: 0.75rem;
  margin-top: auto;
  & a {
    color: #7a7a7a;
  }
`;

const emailReg =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const Step1 = ({ formData, setFormData, setFormStep }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isEmailEntered, setIsEmailEntered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailErr, setIsEmailErr] = useState(false);
  const [isPasswordErr, setIsPasswordErr] = useState(false);
  const [isOpenSnack, setIsOpenSnack] = useState(false);
  const [isFNameErr, setIsFNameErr] = useState(false);
  const [isSNameErr, setIsSNameErr] = useState(false);

  console.log(formData);

  const handleValue = (field, e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };
  return (
    <>
      {isLoading && <LoaderContainer />}

      <Container>
        <Snackbar
          open={isOpenSnack}
          style={{
            top: 8,
            right: 24,
            bottom: "auto",
          }}
        >
          <Alert
            onClose={() => {
              setIsOpenSnack(false);
            }}
            severity="error"
            className="snackbar"
            icon={<ErrorIcon />}
            action={
              <SnackBtn
                onClick={() => {
                  setIsOpenSnack(false);
                }}
              >
                Dismiss
              </SnackBtn>
            }
          >
            Email address is invalid. Please correct and try again.
          </Alert>
        </Snackbar>

        <Logo>
          <Radar />
        </Logo>
        <Title>
          What email addres do you <br /> want to scan?
        </Title>
        <SubTitle>
          Run a free scan and check for personal data leaks. Type in your email
          to register and start your scan.
        </SubTitle>
        <EmailInput>
          <TextField
            placeholder="example@gmail.com"
            variant="outlined"
            size="small"
            value={formData.email}
            onChange={(e) => handleValue("email", e)}
            error={isEmailErr}
            helperText={isEmailErr && "incorrect email"}
            InputProps={{
              endAdornment: isEmailErr && (
                <InputAdornment position="start">
                  <ErrorIcon style={{ color: "#E57373" }} />
                </InputAdornment>
              ),
            }}
          />
        </EmailInput>
        {isEmailEntered && (
          <ExtraInputs>
            <PasswordInput>
              <h3>Choose your password</h3>
              <FormControl variant="outlined">
                <OutlinedInput
                  id="outlined-adornment-password"
                  size="small"
                  value={formData.password}
                  onChange={(e) => handleValue("password", e)}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  error={isPasswordErr}
                  helperText={isPasswordErr && "password to short"}
                  endAdornment={
                    <>
                      {isPasswordErr && (
                        <InputAdornment position="start">
                          <ErrorIcon style={{ color: "#E57373" }} />
                        </InputAdornment>
                      )}
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => {
                            setShowPassword((p) => !p);
                          }}
                          onMouseDown={(e) => e.preventDefault()}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    </>
                  }
                />
              </FormControl>
              <p>Password should contain at least 6 characters</p>
            </PasswordInput>
            <UserName>
              <FirstNameInput>
                <p>First Name</p>
                <TextField
                  placeholder=""
                  variant="outlined"
                  size="small"
                  value={formData.fName}
                  onChange={(e) => handleValue("fName", e)}
                  error={isFNameErr}
                  helperText={isFNameErr && "required"}
                  InputProps={{
                    endAdornment: isFNameErr && (
                      <InputAdornment position="start">
                        <ErrorIcon style={{ color: "#E57373" }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </FirstNameInput>
              <LastNameinput>
                <p>Last Name</p>
                <TextField
                  placeholder=""
                  variant="outlined"
                  size="small"
                  value={formData.sName}
                  onChange={(e) => handleValue("sName", e)}
                  error={isSNameErr}
                  helperText={isSNameErr && "required"}
                  InputProps={{
                    endAdornment: isSNameErr && (
                      <InputAdornment position="start">
                        <ErrorIcon style={{ color: "#E57373" }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </LastNameinput>
            </UserName>
          </ExtraInputs>
        )}

        <Button
          onClick={() => {
            if (!isEmailEntered) {
              const email = formData.email;
              if (email && email.length > 0 && emailReg.test(email)) {
                setIsLoading(true);
                setTimeout(() => {
                  setIsEmailEntered(true);
                  setIsEmailErr(false);
                  setIsLoading(false);
                }, 500);

                return;
              } else {
                setIsEmailErr(true);
                setIsOpenSnack(true);
                return;
              }
            }
            if (isEmailEntered) {
              setIsPasswordErr(false);
              setIsFNameErr(false);
              setIsSNameErr(false);
              if (!formData.password || formData.password.length < 5) {
                return setIsPasswordErr(true);
              }
              if (!formData.fName || formData.fName.length <= 0) {
                return setIsFNameErr(true);
              }
              if (!formData.sName || formData.sName.length <= 0) {
                return setIsSNameErr(true);
              }

              setFormStep((p) => p + 1);
            }
          }}
        >
          Start Free Scan
        </Button>
        <Law>
          By signing up, you agree to our{" "}
          <a href="inupdrivers.com/guardpro/terms/index.html">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="inupdrivers.com/guardpro/privacy/index.html">
            Privacy Policy
          </a>
          . You also agree to receive product-related marketing emails from
          Guardio, which you can unsubscribe from at any time.
        </Law>
      </Container>
    </>
  );
};

export default Step1;

const LoaderContainer = () => {
  return (
    <Loader>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <Rotate />
        <p style={{ color: "#fff" }}>Processing...</p>
      </div>
    </Loader>
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

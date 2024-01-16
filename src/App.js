import { useEffect, useState } from "react";
import "./App.css";
import LogoIc from "./assets/logo.svg";
import Form from "./components/form";

export const backgrounds = [
  "#fff",
  "#fff",
  "#fff",
  "#fff",
  "#f3f0f3",
  "#2498ff",
  "#F9F9F9",
];

function App() {
  const [formData, setFormData] = useState({
    email: null,
    fName: null,
    sName: null,
    password: null,
    phone: null,
    country: null,
  });
  const [formStep, setFormStep] = useState(0);
  const [country, setCountry] = useState();
  const [leaksData, setLeaksData] = useState(null);

  useEffect(() => {
    const getCountry = async () => {
      try {
        const response = await fetch(
          "https://driver-updater.com/api/v1/front/javascript/?get_country_by_ip=*"
        );
        const data = await response.json();
        setCountry({
          code: data.user_country,
        });
        setFormData((prev) => ({
          ...prev,
          country: data.user_country.toLowerCase(),
        }));
      } catch (error) {
        setCountry({
          code: null,
        });
      }
    };

    getCountry();
  }, []);

  return (
    <div className="App">
      <div
        style={{
          position: "fixed",
          bottom: 10,
          left: 10,
          zIndex: 1000000,
        }}
      >
        <button onClick={() => setFormStep((p) => p - 1)}>-1</button>
        <button onClick={() => setFormStep((p) => p + 1)}>+1</button>
      </div>
      <div
        className="header"
        style={{
          background: backgrounds[formStep],
        }}
      >
        <div className="header-content">
          <div
            style={{
              display: "flex",
              gap: "8px",
              alignItems: "center",
              color: formStep === 5 ? "#fff" : "#465F93",
            }}
          >
            <img src={LogoIc} alt="logo" />
            <p>GuardPRO</p>
          </div>
          <div>
            {formData.fName && formStep !== 0 && (
              <>
                <span>Hello, </span>
                <span>{formData.fName}</span>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="header-desktop">
        <div className="header-content">
          <div
            style={{
              display: "flex",
              gap: "8px",
              alignItems: "center",
              color: "#465F93",
            }}
          >
            <img src={LogoIc} alt="logo" />
            <p>GuardPRO</p>
          </div>
          <div>
            {formData.fName && formStep !== 0 && (
              <>
                <span>Hello, </span>
                <span>{formData.fName}</span>
              </>
            )}
          </div>
        </div>
      </div>
      <Form
        formData={formData}
        setFormData={setFormData}
        formStep={formStep}
        setFormStep={setFormStep}
        country={country}
        leaksData={leaksData}
        setLeaksData={setLeaksData}
      />
    </div>
  );
}

export default App;

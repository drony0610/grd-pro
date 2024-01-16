import { useState } from "react";
import { backgrounds } from "../../App";
import "./index.css";
import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";
import Step4 from "./step4";
import Step5 from "./step5";
import Step6 from "./step6";
import Step7 from "./step7";
import Step8 from "./step8";

const rating = Array.from(Array(5).keys());

export const makeId = function (length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter++ < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const Form = ({
  leaksData,
  setLeaksData,
  formData,
  setFormData,
  formStep,
  setFormStep,
  country,
}) => {
  //TODO хранить почту в локалке и проверять,
  //если почта уже указана то сразу пропускать шаги ввода
  //и вести на скан

  const [isPaymentLoading, setIsPaymentLoading] = useState(false);

  const initPayment = async () => {
    setIsPaymentLoading(true);
    try {
      const sdkData = await fetch(
        "https://driver-updater.com/api/v1/front/javascript/?get_client_transaction_id=true&format=json"
      );
      const { CLIENT_TRANSACTION, advertisementId, systemId } =
        await sdkData.json();

      console.log(systemId);
      const response = await fetch(
        `https://driver-updater.herokuapp.com/api/v1/pay/buy/`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            service: "stripe",
            hook: "sale",
            ad_id: advertisementId,
            // email: formData.email,
            email: "andrey-test@gmail.com",
            // licensetype: handlePlanForPayment(billData),
            licensetype: "1-month-1-device",
            system_id: systemId,
            language_code: "en",
            redirect_success_url: "https://driver-updater.com/success.html",
            clientTransaction: CLIENT_TRANSACTION,
            random: makeId(16),
          }),
        }
      );
      const data = await response.json();
      console.log(data);
      if (data.is_success && data.url) {
        setIsPaymentLoading(false);
        window.location.href = data.url;
      }
    } catch (error) {
      setIsPaymentLoading(false);
      console.log(error);
    }
  };
  // const postPayment = async () => {
  //   try {
  //     const sdkData = await fetch(
  //       "https://driver-updater.com/api/v1/front/javascript/?get_client_transaction_id=true&format=json"
  //     );
  //     const { CLIENT_TRANSACTION, advertisementId, systemId } =
  //       await sdkData.json();
  //     console.log(systemId);
  //     const response = await fetch(
  //       `https://driver-updater.herokuapp.com/api/v1/pay/buy/`,
  //       {
  //         method: "POST",
  //         headers: {
  //           Accept: "application/json",
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           service: "stripe",
  //           hook: "sale",
  //           ad_id: advertisementId,
  //           email: formData.email,
  //           // licensetype: handlePlanForPayment(billData),
  //           licensetype: "1-month-1-device",
  //           system_id: systemId,
  //           language_code: "en",
  //           redirect_success_url: "https://driver-updater.com/success.html",
  //           //   redirect_fail_url: "https://driver-updater.com/reject.html",
  //           clientTransaction: CLIENT_TRANSACTION,
  //           random: makeId(16),
  //         }),
  //       }
  //     );
  //     const data = await response.json();
  //     console.log(data);
  //     if (data.is_success && data.url) {
  //       setLoading(false);
  //       window.location.href = data.url;
  //       window.magicEvent(
  //         {
  //           apiSrc: "stripe",
  //         },
  //         "main-website_payment-form_init-ok"
  //       );
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     setLoading(false);
  //     window.magicEvent(
  //       {
  //         apiSrc: "stripe",
  //       },
  //       "main-website_payment-form_init-err"
  //     );
  //   }
  // };

  return (
    <div
      className="form"
      style={{
        background: backgrounds[formStep],
      }}
    >
      <div className="form-content">
        {formStep === 0 && (
          <Step1
            setFormData={setFormData}
            formData={formData}
            setFormStep={setFormStep}
          />
        )}
        {formStep === 1 && (
          <Step2
            setFormData={setFormData}
            formData={formData}
            country={country}
            setFormStep={setFormStep}
          />
        )}
        {formStep === 2 && <Step3 setFormStep={setFormStep} />}
        {formStep === 3 && (
          <Step4
            setFormStep={setFormStep}
            formData={formData}
            setLeaksData={setLeaksData}
          />
        )}
        {formStep === 4 && (
          <Step5 leaksData={leaksData} setFormStep={setFormStep} />
        )}
        {formStep === 5 && (
          <Step6 leaksData={leaksData} setFormStep={setFormStep} />
        )}
        {formStep === 6 && (
          <Step7
            initPayment={initPayment}
            isPaymentLoading={isPaymentLoading}
            setFormStep={setFormStep}
          />
        )}
        {formStep === 7 && <Step8 />}
      </div>
      <div className="form-right">
        <div className="form-right-logo"></div>
        <div className="form-right-review">
          <div className="stars">
            {rating.map((star, i) => (
              <StarIc key={i} />
            ))}
          </div>
          <div className="form-rating-text">
            I feel really safe with GuardPRO. Thanks for protecting my browser.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;

const StarIc = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="46"
    height="44"
    viewBox="0 0 46 44"
    fill="none"
  >
    <path
      d="M22.1093 0.745359C22.4804 0.018108 23.5196 0.0181086 23.8907 0.74536L30.263 13.2319C30.4083 13.5166 30.681 13.7147 30.9967 13.7649L44.8412 15.9668C45.6476 16.095 45.9687 17.0833 45.3917 17.661L35.4855 27.58C35.2596 27.8062 35.1554 28.1267 35.2052 28.4425L37.3893 42.2899C37.5165 43.0964 36.6759 43.7072 35.9481 43.3369L23.4534 36.9807C23.1685 36.8357 22.8315 36.8357 22.5466 36.9807L10.0519 43.3369C9.32414 43.7072 8.48345 43.0964 8.61066 42.2899L10.7948 28.4425C10.8446 28.1267 10.7404 27.8062 10.5145 27.58L0.608277 17.661C0.0313086 17.0833 0.352424 16.095 1.15877 15.9668L15.0033 13.7649C15.319 13.7147 15.5917 13.5166 15.737 13.2319L22.1093 0.745359Z"
      fill="white"
    />
  </svg>
);

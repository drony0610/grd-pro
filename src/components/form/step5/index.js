import { useRef, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 500px;
  width: 100%;
  padding: 30px;
  position: relative;
  min-height: 600px;
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
  text-align: left;
  width: 100%;
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

  color: #fff;
  text-align: center;
  background: linear-gradient(256deg, #457cff, #5977fe);
  border-radius: 4px;

  margin-top: 16px;
  display: flex;
  align-items: center;
  height: 48px;
  justify-content: center;
  cursor: pointer;
  position: fixed;
  bottom: 30px;
  left: 30px;
  right: 30px;
  z-index: 5;

  @media (min-width: 900px) {
    & {
      position: relative;
      width: 100%;
      bottom: 0;
      left: 0;
      right: 0;
    }
  }
`;

const LeaksContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 15%;
  overflow-y: scroll;
  max-height: 500px;
  padding: 16px;
`;

const LeaksItems = styled.div`
  width: 100%;
  padding: 13px 23px 13px 13px;
  background: #fff;
  display: flex;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);

  gap: 12px;
  min-height: 96px;

  & img {
    width: 24px;
    height: 24px;
    object-fit: contain;
    object-position: center;
  }

  & div:first-of-type {
    & h3 {
      margin-bottom: 8px;
    }
    & h4 {
      font-size: 12px;
      color: rgba(0, 0, 0, 0.5);
      margin-bottom: 8px;
    }
    & p {
      font-size: 1rem;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      max-width: 250px;
    }
    @media (max-width: 440px) {
      & p {
        max-width: 200px;
      }
    }
    @media (max-width: 376px) {
      & p {
        max-width: 180px;
      }
    }
  }

  & div:last-of-type {
    margin-left: auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  padding: 30px;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
  z-index: 100000000;
`;

const OverlayContent = styled.div`
  width: 100%;
  max-width: 600px;
  gap: 26px;
  border-radius: 12px;
  background: #fff;
  padding: 16px;
  display: flex;
  flex-direction: column;
`;

const OverlayHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  & img {
    width: 30px;
    height: 30px;
    object-fit: contain;
    object-position: center;
  }
  & p {
    font-weight: 600;
    font-size: 1rem;
  }
`;

const OverlaySubHeader = styled.div`
  & h3 {
    font-size: 1rem;
    color: #7e7e7e;
    font-weight: 600;
    margin-bottom: 12px;
  }
  & p {
    font-weight: 400;
  }
`;

const OverlayText = styled.div`
  & h3 {
    font-size: 1rem;
    color: #7e7e7e;
    font-weight: 600;
    margin-bottom: 12px;
  }
  & p {
    font-weight: 400;
  }
`;

const OverlayClose = styled.div`
  font-weight: 600;
  color: #7e7e7e;
  cursor: pointer;
  margin-left: auto;
`;

const noLeaksData = [
  {
    Name: "Facebook",
    Title: "Facebook",
    Domain: "facebook.com",
    BreachDate: "2019-08-01",
    AddedDate: "2021-04-04T03:20:45Z",
    ModifiedDate: "2021-04-06T09:09:21Z",
    PwnCount: 509458528,
    Description:
      "In April 2021, a large data set of over 500 million Facebook users was made freely available for download. Encompassing approximately 20% of Facebook's subscribers, the data was allegedly obtained by exploiting a vulnerability Facebook advises they rectified in August 2019. The primary value of the data is the association of phone numbers to identities; whilst each record included phone, only 2.5 million contained an email address. Most records contained names and genders with many also including dates of birth, location, relationship status and employer.",
    LogoPath:
      "https://haveibeenpwned.com/Content/Images/PwnedLogos/Facebook.png",
    DataClasses: [
      "Dates of birth",
      "Email addresses",
      "Employers",
      "Genders",
      "Geographic locations",
      "Names",
      "Phone numbers",
      "Relationship statuses",
    ],
    IsVerified: true,
    IsFabricated: false,
    IsSensitive: false,
    IsRetired: false,
    IsSpamList: false,
    IsMalware: false,
    IsSubscriptionFree: false,
  },
  {
    Name: "Yahoo",
    Title: "Yahoo",
    Domain: "yahoo.com",
    BreachDate: "2012-07-11",
    AddedDate: "2013-12-04T00:00:00Z",
    ModifiedDate: "2013-12-04T00:00:00Z",
    PwnCount: 453427,
    Description:
      "In July 2012, Yahoo! had their online publishing service &quot;Voices&quot; compromised via a SQL injection attack. The breach resulted in the disclosure of nearly half a million usernames and passwords stored in plain text. The breach showed that of the compromised accounts, a staggering 59% of people who also had accounts in the Sony breach reused their passwords across both services.",
    LogoPath: "https://haveibeenpwned.com/Content/Images/PwnedLogos/Yahoo.png",
    DataClasses: ["Email addresses", "Passwords"],
    IsVerified: true,
    IsFabricated: false,
    IsSensitive: false,
    IsRetired: false,
    IsSpamList: false,
    IsMalware: false,
    IsSubscriptionFree: false,
  },
  {
    Name: "LinkedInScrape",
    Title: "LinkedIn Scraped Data (2021)",
    Domain: "linkedin.com",
    BreachDate: "2021-04-08",
    AddedDate: "2021-10-02T21:39:21Z",
    ModifiedDate: "2023-11-07T06:51:33Z",
    PwnCount: 125698496,
    Description:
      "During the first half of 2021, LinkedIn was targeted by attackers who scraped data from hundreds of millions of public profiles and later sold them online. Whilst the scraping did not constitute a data breach nor did it access any personal data not intended to be publicly accessible, the data was still monetised and later broadly circulated in hacking circles. The scraped data contains approximately 400M records with 125M unique email addresses, as well as names, geographic locations, genders and job titles. LinkedIn specifically addresses the incident in their post on An update on report of scraped data.",
    LogoPath:
      "https://haveibeenpwned.com/Content/Images/PwnedLogos/LinkedIn.png",
    DataClasses: [
      "Education levels",
      "Email addresses",
      "Genders",
      "Geographic locations",
      "Job titles",
      "Names",
      "Social media profiles",
    ],
    IsVerified: true,
    IsFabricated: false,
    IsSensitive: false,
    IsRetired: false,
    IsSpamList: false,
    IsMalware: false,
    IsSubscriptionFree: false,
  },
];

const Step5 = ({ leaksData, setFormStep }) => {
  // const Step5 = () => {
  console.log("ld");
  console.log(leaksData);
  // const leaksData = null;
  const [isDetails, setIsDetails] = useState(false);
  const [currentId, setCurrentId] = useState(0);
  const ref = useRef();

  const overlayData = leaksData ? leaksData[currentId] : noLeaksData[currentId];

  return (
    <Container>
      {isDetails && (
        <Overlay
          onClick={() => {
            setIsDetails(false);
          }}
        >
          <OverlayContent
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <OverlayHeader>
              <img src={overlayData.LogoPath} alt="logo" />
              <p>{overlayData.Title}</p>
            </OverlayHeader>
            <OverlaySubHeader>
              <h3>Affected Users</h3>
              <p>{overlayData.PwnCount}</p>
            </OverlaySubHeader>
            <OverlayText>
              <h3>Compromised Data</h3>
              <p
                dangerouslySetInnerHTML={{ __html: overlayData.Description }}
              ></p>
            </OverlayText>
            <OverlayClose
              onClick={() => {
                setIsDetails(false);
              }}
            >
              Close
            </OverlayClose>
          </OverlayContent>
        </Overlay>
      )}
      {leaksData ? (
        <>
          <Title>
            You personal details were found in
            <span
              style={{
                color: "#E57373",
              }}
            >
              {" "}
              {leaksData.length}{" "}
            </span>{" "}
            data leak
          </Title>
          <SubTitle>
            We searched for your personal info in <span> 32,284 </span>
            data branches
          </SubTitle>

          <LeaksContainer
            style={{
              marginTop: "16px",
            }}
          >
            {leaksData.map((e, i) => (
              <LeaksItems
                key={i}
                onClick={() => {
                  setCurrentId(i);
                  setIsDetails(true);
                }}
              >
                <img src={e.LogoPath} alt="logo" />
                <div>
                  <h3>{e.Title}</h3>
                  <h4>Compromised Data</h4>
                  <p>
                    {e.DataClasses.map((el, i) =>
                      i < e.DataClasses.length - 1 ? `${el}, ` : `${el} `
                    )}
                  </p>
                </div>
                <div>
                  <Arrow />
                </div>
              </LeaksItems>
            ))}
          </LeaksContainer>
          <Button
            onClick={() => {
              setFormStep((p) => p + 1);
            }}
          >
            Next
          </Button>
        </>
      ) : (
        <>
          <Title
            style={{
              marginBottom: "24px",
            }}
          >
            No Data Leaks Were Found
          </Title>
          <SubTitle
            style={{
              fontWeight: "500",
              color: "#000",
              fontSize: "1.25rem",
              lineHeight: "1.5rem",
            }}
          >
            We searched for your personal info in{" "}
            <span
              style={{
                color: "#F44336",
              }}
            >
              {" "}
              32,284{" "}
            </span>
            data branches
          </SubTitle>

          <LeaksContainer>
            <p
              style={{
                fontWeight: "500",
              }}
            >
              Leaks we've found tor others like you:
            </p>
            {noLeaksData.map((e, i) => (
              <LeaksItems
                key={i}
                onClick={() => {
                  setCurrentId(i);
                  setIsDetails(true);
                }}
              >
                <img src={e.LogoPath} alt="logo" />
                <div>
                  <h3>{e.Title}</h3>
                  <h4>Compromised Data</h4>
                  <p>{e.Description}</p>
                </div>
                <div>
                  <Arrow />
                </div>
              </LeaksItems>
            ))}
          </LeaksContainer>
          <Button
            onClick={() => {
              setFormStep((p) => p + 1);
            }}
          >
            Next
          </Button>
        </>
      )}
    </Container>
  );
};

export default Step5;

const Arrow = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="10"
    height="18"
    viewBox="0 0 10 18"
    fill="none"
  >
    <path d="M1 1L8.5 9L1 17" stroke="#457CFF" stroke-width="2" />
  </svg>
);

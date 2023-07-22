import { useState } from "react";
import { Button, Container, Input, Row, Col, Spinner, Alert } from "reactstrap";
import "./Kontakt.css";
import emailjs from "emailjs-com";

const validateEmail = (email) => {
  // Regulární výraz pro kontrolu platnosti e-mailové adresy
  const Regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return Regex.test(email);
};

const Kontakt = () => {
  // obsah formularu
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [subject, setSubject] = useState("");
  const [mail, setMail] = useState("");
  const [message, setMessage] = useState("");

  // Promenne validity vyplneni formularu
  const [isValidName, setIsValidName] = useState(null);
  const [isValidLName, setIsValidLName] = useState(null);
  const [isValidMail, setIsValidMail] = useState(null);
  const [isValidMessage, setIsValidMessage] = useState(null);

  const [alertMessage, setAlertMessage] = useState("");
  const [visibility, setVisibility] = useState(false);
  const [visibilitySuccess, setVisibilitySuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  //                                                        EMAIL INIT API KEY
  emailjs.init("bPKVxQYxj_lrpdzxC");
  //                                                        EMAIL INIT API KEY
  const refreshPage = () => {
    // Obnovit stránku
    window.location.reload();
  };
  const handleAlertSuccess = () => {
    setVisibilitySuccess(true);

    setTimeout(() => {
      setVisibilitySuccess(false);
      refreshPage();
    }, 5000);
  };

  const handleAlert = () => {
    setAlertMessage("neni vse vyplenno");
    setVisibility(true);

    setTimeout(() => {
      setVisibility(false);
    }, 5000);
  };
  // validace emailu
  const handleEmailChange = (event) => {
    const emailValue = event.target.value;
    setMail(emailValue);
    setIsValidMail(validateEmail(emailValue));

    if (validateEmail(emailValue)) {
      setIsValidMail(true);
    } else {
      setIsValidMail(false);
    }
  };
  // Podminky zda je formular vyplnen spravne
  const formSubmit = (event) => {
    event.preventDefault();
    // JMENO
    if (firstName.trim() === "") {
      setIsValidName(false);
    } else {
      setIsValidName(true);
    }
    // PRIJMENI
    if (lastName.trim() === "") {
      setIsValidLName(false);
    } else {
      setIsValidLName(true);
    }
    // ZPRAVA
    if (message.trim() === "") {
      setIsValidMessage(false);
    } else {
      setIsValidMessage(true);
    }

    if (!firstName || !lastName || !isValidMail || !message) {
      // pokud je jedna z promennych false
      //   console.log("Alespoň jedna z proměnných je `false`.");
      setVisibility(true);
      handleAlert(true);
    } else {
      //pokud jsou vsechny true
      //   console.log("vsechny jsou true");
      setIsLoading(true); // Spustit spinner
      sendEmail();
    }
  };

  // ODESLAT EMAIL
  const sendEmail = () => {
    const emailParams = {
      from_name: firstName + " " + lastName,
      to_name: "ARAPRO",
      subject: subject,
      email: mail,
      message: message,
    };

    emailjs
      //.send( service_id, template_ID)
      .send("service_igb5wsr", "template_qpoe784", emailParams)
      .then((response) => {
        console.log("E-mail byl úspěšně odeslán!", response);
        handleAlertSuccess();
      })
      .catch((error) => {
        console.error("Chyba při odesílání e-mailu:", error);
        handleAlert();
        setAlertMessage(
          "Vase zprava nebyla odeslana, chyba kontaktniho formulare"
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <h1 id="kontakt">Kontakty</h1>
      <Container>
        <Row>
          <Col sm={0} md={2}></Col>
          <Col md={6}>
            <Row>
              <Col>
                <form className="margin10" onSubmit={formSubmit}>
                  <Input
                    type="text"
                    placeholder="Jméno"
                    value={firstName}
                    valid={isValidName === true}
                    invalid={isValidName === false}
                    onChange={(event) => setFirstName(event.target.value)}
                  ></Input>
                </form>
              </Col>
              <Col>
                <form className="margin10" onSubmit={formSubmit}>
                  <Input
                    type="text"
                    placeholder="Příjmení"
                    value={lastName}
                    valid={isValidLName === true}
                    invalid={isValidLName === false}
                    onChange={(event) => setLastName(event.target.value)}
                  ></Input>
                </form>
              </Col>
            </Row>
            <Input
              className="margin10"
              type="text"
              placeholder="Předmět (nepovinné)"
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
            ></Input>
            <Input
              className="margin10"
              type="email"
              placeholder="E-mail"
              value={mail}
              valid={isValidMail === true}
              invalid={isValidMail === false}
              onChange={handleEmailChange}
            ></Input>
            <Input
              className="margin10"
              type="textarea"
              placeholder="Zpráva"
              value={message}
              valid={isValidMessage === true}
              invalid={isValidMessage === false}
              onChange={(event) => setMessage(event.target.value)}
            ></Input>
            <Button
              className="margin10"
              type="submit"
              onClick={formSubmit}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Spinner size="sm" /> Odesílání...
                </>
              ) : (
                "Odeslat"
              )}
            </Button>
            <Alert color="danger" isOpen={visibility}>
              {alertMessage}
            </Alert>
            <Alert color="success" isOpen={visibilitySuccess}>
              Vas dotaz byl uspesne odeslan
            </Alert>
          </Col>
          <Col md={1}></Col>
          <Col>
            <Row>
              <a
                target={"_blank"}
                href="https://www.google.cz/maps/place/49%C2%B030'14.5%22N+14%C2%B037'10.4%22E/@49.5040409,14.6189163,19z/data=!3m1!4b1!4m4!3m3!8m2!3d49.50404!4d14.61956?entry=ttu"
              >
                {" "}
                <img className="kontaktIcon" src="./images/gps.png" />
              </a>
              <p>gps</p>
            </Row>
            <Row>
              <img className="kontaktIcon" src="./images/phone.jpeg" />
              <p>+ 420 723 450 723</p>
            </Row>
            <Row>
              <img className="kontaktIcon" src="./images/mail.png" />
              <p>prochazka@arapro.cz</p>
            </Row>
          </Col>
          <Col md={3}></Col>
        </Row>
      </Container>
    </>
  );
};
export default Kontakt;
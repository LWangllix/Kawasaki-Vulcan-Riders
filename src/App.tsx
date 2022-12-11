import emailjs from "@emailjs/browser";
import { Button, Grid, TextField, Typography } from "@mui/material";
import "animate.css/animate.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRef, useState } from "react";
import { AnimationOnScroll } from "react-animation-on-scroll";
import { fadeInUp } from "react-animations";
import { MdFacebook } from "react-icons/md";
import { Parallax } from "react-parallax";
import styled, { keyframes } from "styled-components";

const initValues = {
  vardas: "",
  pavarde: "",
  email: "",
  komentaras: ""
};

function App() {
  const [values, setValues] = useState<any>(initValues);
  const form = useRef();
  const [errors, setErrors] = useState<any>(initValues);

  const handleUpdateForm = (key: string, e: any) => {
    setValues({ ...values, [key]: e.target.value });
    setErrors({ ...errors, [key]: "" });
  };

  const validateForm = () => {
    let errors = {};
    Object.keys(values).map((key) => {
      if (!values[key] || (key === "email" && !values[key].includes("@"))) {
        //@ts-ignore
        errors[key] = "Privalomas laukelis";
      }

      return values[key];
    });

    const isEmpty = Object.keys(errors).length == 0;

    if (!isEmpty) {
      setErrors(errors);
    }

    return isEmpty;
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (!form) return;

    emailjs
      .sendForm(
        "service_pwmnaqd",
        "template_f38d0dr",
        //@ts-ignore
        form?.current,
        "hmIgEISTvHkMSfaxB"
      )
      .then(
        () => {
          alert("Elektroninis laiškas nusiųstas");
          setValues(initValues);
          setErrors(initValues);
        },
        () => {
          alert("Įvyko klaida, pabandykite vėliau");
        }
      );
  };

  return (
    <Container>
      <Nav>
        <a href="https://www.glix.tech/Kawasaki-Vulcan-Riders/">
          <Logo src={"./logo.png"} alt="logo" />
        </a>
        <a href="https://www.facebook.com/groups/539707704632052">
          <StyledIcon />
        </a>
      </Nav>

      <BackgroundImage
        blur={3}
        bgImage="bg.jpg"
        bgImageAlt="motorbike"
        strength={200}
      >
        <Column>
          <Title>Kawasaki Vulcan Riders LT</Title>
          <Description>
            Kawasaki Vulcan Riders LT yra oficiali VRA Lietuvos skyriaus
            Kawasaki Vulcan vairuotojų ir savininkų klubo (Kawasaki Vulcan
            Riders & Owners Club Lietuva) grupė. Šiame puslapyje kviečiu jungtis
            visus Kawasaki Vulcan savininkus ir motociklų mylėtojus. Puslapis
            skirtas informuoti apie klubo renginius, susitikimus, dalintis
            informacija apie klubo veiklą techninę informaciją ir visa kas
            susiję su Kawasaki Vulcan motociklais.
          </Description>
        </Column>
      </BackgroundImage>
      <Line />
      <AnimationOnScroll animateIn="animate__fadeIn">
        <InnerContainer>
          <SidePicture src={"./formPicture.jpg"} />
          <Form ref={form as any} onSubmit={handleSubmit}>
            <StyledTypography variant="h5" gutterBottom>
              Susisiekite
            </StyledTypography>
            <Grid marginBottom={1} container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="vardas"
                  name="vardas"
                  value={values?.vardas}
                  error={errors?.vardas}
                  onChange={(e) => handleUpdateForm("vardas", e)}
                  label="Vardas"
                  fullWidth
                  autoComplete="given-name"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="pavarde"
                  name="pavarde"
                  value={values?.pavarde}
                  error={errors?.pavarde}
                  onChange={(e) => handleUpdateForm("pavarde", e)}
                  label="Pavardė"
                  fullWidth
                  autoComplete="family-name"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="email"
                  name="email"
                  value={values?.email}
                  error={errors?.email}
                  onChange={(e) => handleUpdateForm("email", e)}
                  label="El-paštas"
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="komentaras"
                  value={values?.komentaras}
                  error={errors?.komentaras}
                  name="komentaras"
                  onChange={(e) => handleUpdateForm("komentaras", e)}
                  label="Komentaras"
                  placeholder="Ką norėtumėt sužinoti?"
                  multiline
                  rows={4}
                  variant="outlined"
                />
              </Grid>
            </Grid>
            <Button type="submit" variant="outlined">
              Pateikti
            </Button>
          </Form>
        </InnerContainer>
      </AnimationOnScroll>
      <Footer>
        &copy; Kawasaki Vulcan Riders LT {new Date().getFullYear()}
      </Footer>
    </Container>
  );
}

const fadeInAnimation = keyframes`${fadeInUp}`;

const InnerContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  gap: 32px;
  margin: 16px auto;
  animation: 1s ${fadeInAnimation};
  @media (max-width: 800px) {
    flex-direction: column;
    align-items: center;
    margin: 16px;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  animation: 1s ${fadeInAnimation};
  gap: 12px;
`;

const SidePicture = styled.img`
  flex: 1;
  max-width: 600px;
  height: auto;
  object-fit: cover;
`;

const Form = styled.form`
  max-width: 600px;
  flex: 1;
`;

const StyledTypography = styled(Typography)`
  color: rgba(0, 0, 0, 0.87);
`;

const Container = styled.div`
  margin: 0;
  padding: 0;
  color: white;
  height: 100%;
  background-color: #e7e7e7;
`;

const StyledIcon = styled(MdFacebook)`
  color: white;
  font-size: 2.5rem;
`;

const Nav = styled.div`
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  background-color: #1b1b1b;
  position: sticky;
  z-index: 20;
  top: 0;
`;

const Footer = styled.div`
  height: 80px;
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  color: #d4d4d4;
`;

const Line = styled.div`
  height: 150px;
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  color: #d4d4d4;
`;

const BackgroundImage = styled(Parallax)`
  min-height: 90vh;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  padding: 16px;
  display: flex;
  align-items: center;
  object-fit: cover;
`;

const Title = styled.div`
  font-size: 2.2rem;
  text-align: start;
`;

const Logo = styled.img`
  top: 16px;
  bottom: 16px;
  width: 80px;
  height: 80px;
`;

const Description = styled.div`
  font-size: 1.3rem;
  max-width: 800px;
  text-align: justify;
  line-height: 2rem;
`;

export default App;

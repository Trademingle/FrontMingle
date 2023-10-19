import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import HomeBanner from "./Components/HomeBanner";
// import About from "./Components/About";
import { CSSTransition, TransitionGroup } from "react-transition-group";
// import Values from "./Components/Values";
// import Timeline from "./Components/Timeline";
// import Projects from "./Components/Projects";
// import Programs from "./Components/Programs";
// import Collaborate from "./Components/Collaborate";
// import Statistics from "./Components/Statistics";
// import Partners from "./Components/Partners";
// import JoinUs from "./Components/JoinUs";
// import Updates from "./Components/Updates";
import ScrollToTopBtn from "./Components/ScrollToTopBtn/ScrollToTopBtn.js";

// // import "./index.scss";
// import 'bootstrap/dist/css/bootstrap.min.css';

const AboutUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <React.Fragment>
      <TransitionGroup>
          <CSSTransition
            timeout={450}
            classNames="fade"
            // key={location.pathname}
          >
              <Container fluid>
                <Container style={{width: '100%',
                                  marginTop:'100px',
                                  paddingRight: '15px',
                                  paddingReft: '15px',
                                  marginRight: 'auto',
                                  marginLeft: 'auto',
                                  maxWidth: '1140px'}}>
                  <HomeBanner />
                  
                  {/* <About /> */}
                  {/* <Values /> */}
                  {/* <Timeline /> */}
                  {/* <Projects /> */}
                  {/* <Programs /> */}
                  {/* <Collaborate /> */}
                  {/* <Statistics /> */}
                  {/* <JoinUs /> */}
                  {/* <Partners /> */}
                  {/* <Updates />  */}
                </Container>
                <ScrollToTopBtn />
              </Container>
          </CSSTransition>
      </TransitionGroup>
    </React.Fragment>
  );
};

export default AboutUs;

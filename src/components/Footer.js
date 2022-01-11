import React from 'react';
import { Container, Row, Col } from "reactstrap";
import styles from './components.module.css';

const Footer = () => {
  return (
    <div className={styles.copyright}>
      <Container>
        <Row>
          <Col lg="12">
            <p className='text-center'>© 2021 GUNWAR ALL RIGHTS RESERVED.</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Footer;
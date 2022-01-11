import React, { useState } from "react";
import { Card, CardBody, Container, Row, Col } from "reactstrap";
import "@google/model-viewer/dist/model-viewer";
import NFT from '../components/Nft';
import nfts from '../utils/nfts';
import play from '../assets/play.png';
import preview from '../assets/preview.png';
import styles from './pages.module.css';
import modelPath from '../assets/scene.glb';


var values = Array(nfts.length+1), priceArray = [];

const Weapons = (props) => {

  const [totalPrice, setTotalPrice] = useState(0);
  const reducer = (previousValue, currentValue) => previousValue + currentValue;

  const getPrice = (tokenId, price, count) => {
    var nft = [tokenId, price, count];
    values[tokenId] = nft;
    values.forEach((element, key) => {
      priceArray[key] = element[1] * element[2];
    });
    setTotalPrice(Number(priceArray.reduce(reducer)).toFixed(1));
  }

  const purchaseBtn = () => {
    props.onClick(totalPrice);
  }

  return (
    <>
      <Container fluid className="mb-4">
      
        <Row>
          <Col lg="6" className={styles.p30}>
            <p className="mt-3 mb-0 text-muted text-sm">
              <span className={`text-nowrap ${styles.pColor}`}>Weapons Preview</span>
            </p>
            <Card className={`card-stats mb-4 mb-xl-0 ${styles.preview}`}>
              <CardBody>
                <Row>
                  <div className="col">
                    <img src={preview} className={styles.nft}/>
                    <a href="https://www.youtube.com/watch?v=XrNidz1ikAU" alt="video" className={styles.youtube}>
                      <img src={play}/>
                    </a>
                  </div>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col lg="6" className={styles.p30}>
            <p className="mt-3 mb-0 text-muted text-sm">
              <span className={`text-nowrap ${styles.pColor}`}>3D NFT Example</span>
            </p>
            <Card className={`card-stats mb-4 mb-xl-0 ${styles.preview}`}>
              <CardBody>
                <Row style={{height: '100%'}}>
                  <div className="col">
                    <model-viewer
                      src={modelPath}
                      ios-src=""
                      alt="A 3D model of an astronaut"
                      shadow-intensity="1"
                      camera-controls
                      auto-rotate
                      ar
                    >
                    </model-viewer>
                  </div>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      <Container fluid>
        <p className="mt-3 mb-0 text-muted text-sm">
          <span className={`text-nowrap ${styles.pColor}`}>NFT Details</span>
        </p>
        <Row>
        { nfts.map((items, idx) => {
          return <NFT
            key={idx}
            tokenId={items.tokenId}
            src={items.src}
            name={items.name}
            rank={items.rank}
            description={items.description}
            price={items.price}
            onChange={getPrice}
          />
        })}
        </Row>
      </Container>
      <Container>
        <Row>
          <div className={styles.purchase}>
            <div>
              <label>Total BNB: </label><span>{totalPrice}</span>
              <a className={`${styles.btnColor} ${styles.purchaseBtn}`} onClick={purchaseBtn}>Purchase</a>
            </div>              
          </div>
        </Row>
      </Container>
    </>
  );
}

export default Weapons;
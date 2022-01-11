import React from "react";
import { Card, CardBody, Row, Col } from 'reactstrap';
import NumericInput from 'react-numeric-input';
import styles from './components.module.css';

const NFT = (props) =>{
    
  const onChangePrice = (cnt) => {
    props.onChange(props.tokenId, props.price, cnt);
  }
  
  return (
    <>
      <Col lg="6" xl="3" md="6" sm="12" className="mb-4 d-flex">
        <Card className={`card-stats mb-4 mb-xl-0 ${styles.card}`}>
          <CardBody className="d-flex flex-column justify-content-between">            
            <div className="d-flex flex-column">
              <img src={props.src} alt="nft" className={styles.nft} />
              <p className="mt-3 mb-0 text-muted text-sm">
                <span className={`text-nowrap ${styles.pColor}`}>Name: {props.name}</span>
              </p>
              <p className="mt-0 mb-0 text-muted text-sm">
                <span className={`text-nowrap ${styles.pColor}`}>Rarity rank: {props.rank}</span>
              </p>
              <p className={`mt-0 mb-0 text-muted text-sm ${styles.desc}`}>
                <span className={styles.pColor}>Descrption: {props.description}</span>
              </p>
            </div>
            <div className="d-flex flex-column">
              <p className={`mt-0 mb-0 text-muted text-sm ${styles.priceB}`}>
                <span className={`text-nowrap ${styles.pColor}`}>Price: {props.price} BNB</span>
              </p>
              <p className={`mt-0 mb-0 text-muted text-sm ${styles.bottom}`}>
                <span className={`text-nowrap ${styles.pColor}`}>Quantity: </span>
                <NumericInput mobile min={0} defaultValue={0} className={styles.number} onChange={onChangePrice} />
              </p>
            </div>
          </CardBody>
        </Card>
      </Col>
    </>
  );
}

export default NFT;
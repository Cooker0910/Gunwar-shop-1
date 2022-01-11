import React from "react";
import style from './Contact.module.css';
import {AiFillMediumCircle, AiOutlineMail} from 'react-icons/ai';
import {FaTwitterSquare, FaTelegram} from 'react-icons/fa';

const Contact = () => {
    return (
        <div className={style.top}>
            <div className="container-fluid">
                <div className="row align-items-center">
                    <div className="col-lg-6 d-none d-lg-block"></div>
                    <div className="col-lg-6">
                        <div className={style.right}>
                            <div className={style.social}>
                                <ul>
                                    <li>
                                        <a href="https://twitter.com/GunWar_Space">
                                            <FaTwitterSquare />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://t.me/gunwar_en">
                                            <FaTelegram />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://t.me/gunwarnews">
                                            <FaTelegram />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://medium.com/@gunwar">
                                            <AiFillMediumCircle />
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className={style.action}>
                                <ul>
                                    <li>
                                        <div className={style.mail}>
                                            <p>
                                                <span>|</span>
                                                <AiOutlineMail />
                                                <a href="info@gunwar.space">info@gunwar.space</a>
                                            </p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact;
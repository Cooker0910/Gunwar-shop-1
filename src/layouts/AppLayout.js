import React, { Suspense, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import './Sidebar.scss';

import styles from './layouts.module.css';
import { GiHamburgerMenu } from 'react-icons/gi';

const AppLayout = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const [toggle, setToggle] = useState(true);
  const { pathname } = useLocation();
  const path = useLocation().pathname;

  const handleHamburger = () => {
    if (toggle) {
      // toggle collapsed if screen size is more than `md`
      setCollapsed(!collapsed);
    } else {
      // open sidebar as expanded (not collapsed)
      setToggle(true);
      setCollapsed(false);
    }
  }

  // close sidebar when
  const handleContentClick = () => {
    // close sidebar if sidebar is open and screen size is less than `md`
    if (toggle) {
      setToggle(false);
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <div className="d-flex">
        <ProSidebar
          breakPoint="md"
          collapsed={collapsed}
          toggled={toggle}
          onToggle={setToggle}
        >
          <Menu>
            <MenuItem
              active={path === "/"}
            // icon={<AiOutlineCar className="fs-1p5" />}
            >
              <Link to="/" >
                Weapons NFT
              </Link>
            </MenuItem>
            <MenuItem
              active={path === "/boxes"}
            // icon={<AiOutlineHeart className="fs-1p5" />}
            >
              <Link to="/boxes">
              Boxes NFT
              </Link>
            </MenuItem>
            <MenuItem
              active={path === "/stakeNft"}
            // icon={<AiOutlineHeart className="fs-1p5" />}
            >
              <Link to="/stakeNft">
              Stake NFT
              </Link>
            </MenuItem>
            <MenuItem
              active={path === "/stakeGunwar"}
            // icon={<AiOutlineHeart className="fs-1p5" />}
            >
              <Link to="/stakeGunwar">
              Stake $GUNW
              </Link>
            </MenuItem>
            <MenuItem
              active={path === "/farm"}
            // icon={<AiOutlineHeart className="fs-1p5" />}
            >
              <Link to="/farm" >
                Farm
              </Link>
            </MenuItem>
          </Menu>
        </ProSidebar>

        <div className={`w-100 ${styles.content}`} onClick={handleContentClick}>
          <div className={styles.nav}>
            <button
              type="button"
              className="btn btn-default"
              onClick={handleHamburger}>
              <GiHamburgerMenu />
            </button>
          </div>
          <div className="container-fluid">
            <Suspense fallback={<span>Loading</span>}>
              {props.children}
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppLayout;
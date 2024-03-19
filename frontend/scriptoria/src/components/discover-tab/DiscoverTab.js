import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import './DiscoverTab.css';

const TabItem = ({ isActive, children }) => {
  const activeClass = isActive ? 'active' : '';
  return (
    <li className="nav-item">
      <Link className={`tab-item nav-link ${activeClass}`} to="#">{children}</Link>
    </li>
  );
};

const Tab = () => {
  const [showTabs, setShowTabs] = useState(true);


  const toggleTabs = () => {
    setShowTabs(!showTabs);
  };

  return (
    <section className="tab-home">
      <ul className={`nav nav-tabs ${showTabs ? '' : 'hidden'}`}>
        <div className="first-tab title-tabs">
          <TabItem  onClick={toggleTabs} isActive={false}>Genre</TabItem>
        </div>
        <div className="tabs">
          <TabItem isActive={true}>All Genre</TabItem>
          <TabItem>Action</TabItem>
          <TabItem>Horror</TabItem>
          <TabItem>Romance</TabItem>
        </div>
      </ul>
    </section>
  ); 
};

export default Tab;
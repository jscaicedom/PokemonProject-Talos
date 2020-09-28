import React from 'react';
import general from '../style/general.module.css';
import welcome from '../style/welcome.module.css';

const Home = () => {
  return (
    <div className={general}>
      <div className={welcome.general}></div>
    </div>
  );
};

export default Home;

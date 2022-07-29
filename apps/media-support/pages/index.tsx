import type { NextPage } from 'next';
import React from 'react';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        flex: 1,
        display: 'flex',
      }}
    >
      <div
        style={{
          height: '100%',
          flex: 1,
        }}
      >
        <h1
          style={{
            textAlign: 'center',
          }}
        >
          Welcome
        </h1>
        <h1
          style={{
            textAlign: 'center',
          }}
        >
          Mediashare
        </h1>
      </div>
    </div>
  );
};

export default Home;

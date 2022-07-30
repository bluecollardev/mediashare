import type { NextPage } from 'next';
import React from 'react';
import Image from 'next/image';
import logo from '../image/152_logo.png';

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
          width: '100%',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '300px',
            justifyContent: 'center',
            margin: '0 auto',
          }}
        >
          <div
            style={{
              textAlign: 'center',
            }}
          >
            <Image src={logo.src} alt="Picture of the author" width={100} height={100} />
          </div>
          <h1
            style={{
              textAlign: 'center',
              margin: 0,
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
    </div>
  );
};

export default Home;

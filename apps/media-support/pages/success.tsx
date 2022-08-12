import type { NextPage } from 'next';
import Image from 'next/image'
import React from 'react';
import logo from '../image/152_logo.png';

const Success: NextPage = () => {
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
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <div
            style={{
              textAlign: 'center',
            }}
          >
            <Image src={logo.src} alt="Picture of the author" width={100} height={100} />
          </div>
        <h1 style={{ textAlign: 'center' }}>Welcome to Mediashare</h1>
        <p style={{ textAlign: 'center' }}>
          Your account has been created. Please install the Mediashare app<br /> using the TestFlight app on your iOS phone or tablet.
        </p>
      </div>
    </div>
  );
};

export default Success;

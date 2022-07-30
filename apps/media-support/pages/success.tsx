import type { NextPage } from 'next';
import Image from 'next/image'
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
        <h1
          style={{
            textAlign: 'center',
          }}
        >
          {' '}
          download app ios and android
        </h1>
      </div>
    </div>
  );
};

export default Success;

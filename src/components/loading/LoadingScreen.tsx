// import FadeIn from "react-fade-in";
import Lottie from 'react-lottie';

import loadingData from './loading.json';

export default function LoadingScreen() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    // <FadeIn>
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <Lottie options={defaultOptions} height={180} width={180} />
    </div>
    // </FadeIn>
  );
}

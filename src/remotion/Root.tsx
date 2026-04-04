import { Composition } from 'remotion';
import { BrainifyIntro } from './BrainifyIntro';

export const RemotionRoot = () => {
  return (
    <Composition
      id="BrainifyIntro"
      component={BrainifyIntro}
      durationInFrames={210}
      fps={60}
      width={1920}
      height={1080}
    />
  );
};

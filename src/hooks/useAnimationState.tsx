
import { create } from 'zustand';

interface AnimationState {
  isPlaying: boolean;
  play: () => void;
  stop: () => void;
}

const useAnimationState = create<AnimationState>((set) => ({
  isPlaying: false,
  play: () => {
    console.log('Animation play triggered');
    set({ isPlaying: true });
  },
  stop: () => {
    console.log('Animation stop triggered');
    set({ isPlaying: false });
  },
}));

export default useAnimationState;

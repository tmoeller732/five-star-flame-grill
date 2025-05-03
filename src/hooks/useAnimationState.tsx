
import { create } from 'zustand';

interface AnimationState {
  isPlaying: boolean;
  play: () => void;
  stop: () => void;
}

const useAnimationState = create<AnimationState>((set) => ({
  isPlaying: false,
  play: () => set({ isPlaying: true }),
  stop: () => set({ isPlaying: false }),
}));

export default useAnimationState;

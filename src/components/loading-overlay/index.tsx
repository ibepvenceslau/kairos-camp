import { SpinIcon } from '@/components/icons/spin.icon';

export const LoadingOverlay = () => {
  return (
    <div className="fixed top-0 left-0 flex items-center justify-center backdrop-blur-sm bg-black/50 w-screen h-screen z-20">
      <SpinIcon />
    </div>
  );
};

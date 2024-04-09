import { Spinner } from '@nextui-org/react';

const loading = () => {
  return (
    <div className="h-full">
      <Spinner
        color="success"
        size="lg"
        className="flex h-[calc(100vh-4rem)] align-middle justify-center justify-items-center content-center overflow-hidde"
      />
    </div>
  );
};

export default loading;

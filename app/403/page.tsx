'use client';

import Lottie from 'lottie-react';
import accessDenied from '@/public/animations/access-denied.json';
import { motion } from 'framer-motion';

const AccessDenied = () => {
  return (
    <motion.div
      className="items-center sm:h-[80vh] h-[80vh] max-h-[80vh] m-6 flex justify-center flex-col"
      animate={{ opacity: 1, scale: 1 }}
      initial={{ opacity: 0, scale: 0 }}
      transition={{ delay: 0.1 }}
    >
      <Lottie className="h-80" preload="true" animationData={accessDenied} />
      <h1 className="text-2xl tracking-widest uppercase">Access Denied</h1>
    </motion.div>
  );
};

export default AccessDenied;

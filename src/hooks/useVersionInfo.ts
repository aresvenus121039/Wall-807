// useVersinInfo.ts
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const useVersinInfo = (): boolean => {
  const router = useRouter();
  const checkIfV4 = router.asPath.startsWith('/v4');

  return checkIfV4;
};

export default useVersinInfo;

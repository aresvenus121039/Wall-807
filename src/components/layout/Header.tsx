import React from 'react';
import { Box } from '@mui/material';
import NewNavBar from './NewNavBar';
import NavBar from './NavBar';
import useVersinInfo from '@/hooks/useVersionInfo';

interface HeaderProps {
  hideNewNavBar?: boolean;
  isMarketplaceScreen?: boolean;
}

const Header: React.FC<HeaderProps> = (props) => {
  const isV4 = useVersinInfo();

  return (
    <Box>
      <NavBar {...props} />
    </Box>
  );

  // if (isV4) {
  //   return (
  //     <Box>
  //       <NavBar {...props} />
  //     </Box>
  //   );
  // }

  // if (props.hideNewNavBar) {
  //   return null;
  // }

  // return (
  //   <Box>
  //     <NewNavBar {...props} />
  //   </Box>
  // );
};

export default Header;

import { Box } from '@mui/material';
import { ReactNode } from 'react';

const AppLayout = (props: { children: ReactNode }) => {
  return (
    <Box height="100vh" display="grid" gridTemplateRows="auto 1fr">
      <Box
        sx={{
          boxShadow: 2,
          padding: 2,
          background: (t) => t.palette.primary.main,
          color: (t) => t.palette.primary.contrastText,
        }}
      >
        Redux-Test
      </Box>
      <Box gridRow={2} margin={2}>
        {props.children}
      </Box>
    </Box>
  );
};
export default AppLayout;

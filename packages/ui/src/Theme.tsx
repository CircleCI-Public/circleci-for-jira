import { createTheme } from '@mui/material/styles';

const AtlassianTheme = createTheme({
  palette: {
    primary: {
      main: '#0052CC',
      dark: '#0065FF',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#6554C0',
    },
    grey: {
      100: '#FFFFFF',
      200: '#FAFBFC',
      300: '#F4F5F7',
      400: '#EBECF0',
      500: '#DFE1E6',
      600: '#C1C7D0',
    },
  },
});

export { AtlassianTheme };

import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});


const baseTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: grey[900]
    },
    secondary: {
      main: '#F40909'
    }
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          colorDefault: '#fff',
          backgroundColor: '#fff',
        }
      }
    },
    MuiCardActions: {
      variants: [
        {
          props: { variant: 'right'},
          style: {
            justifyContent: 'flex-end',
          }
        },
        {
          props: { variant: 'center'},
          style: {
            justifyContent: 'center',
          }
        },
        {
          props: { variant: 'left'},
          style: { 
            justifyContent: 'flex-start',
          }
        }
      ]
    }
  }
});

const theme = createTheme(baseTheme, {
  components: {
    MuiCardHeader: {
      variants: [
        {
          props: { variant: 'currentShow' },
          style: {
            '& .MuiCardHeader-title': {
              fontWeight: 'bold',
              color: baseTheme.palette.secondary.main,
            }
          },
        },
        {
          props: { variant: 'pastShow' },
          style: {
            '& .MuiCardHeader-title': {
              fontWeight: 'bold',
              color: baseTheme.palette.secondary.main,
            }
          },
        }
      ]
    }
  },
});

export default theme;
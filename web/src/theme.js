import { createTheme } from '@mui/material/styles';
import { green, grey, blueGrey, red } from '@mui/material/colors';
import { esES } from '@mui/material/locale';

const theme = createTheme({
    palette: {
        primary: {
            main: green[500],
        },
        secondary: {
            main: grey[100]
        },
        text: {
            primary: blueGrey[900]
        },
        error: {
            main: red[500]
        }
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    fontWeight: 600,
                    borderRadius: '12px',
                    textTransform: 'unset'
                }
            }
        },
    }
}, esES);

export default theme;

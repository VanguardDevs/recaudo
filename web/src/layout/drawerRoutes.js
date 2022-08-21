import HomeIcon from '@mui/icons-material/Home';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import StorefrontIcon from '@mui/icons-material/Storefront';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import LiquorIcon from '@mui/icons-material/Liquor';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import AssessmentIcon from '@mui/icons-material/Assessment';

const AdminIcon = () => (
    <FiberManualRecordIcon sx={{
        color: theme => theme.palette.primary.main,
        marginLeft: '1rem',
        paddingRight: '-1rem',
        fontSize: '0.7rem'
    }} />
)

export const routes = [
    {
        name: 'Inicio',
        route: '/',
        icon: <HomeIcon />
    },
    {
        name: 'Contribuyentes',
        route: '/taxpayers',
        icon: <BusinessCenterIcon />
    },
    {
        name: 'Expendios',
        route: '/liqueurs',
        icon: <LiquorIcon />
    },
    {
        name: 'Pagos',
        route: '/payments',
        icon: <AssessmentIcon />
    }
]

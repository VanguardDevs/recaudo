import Dashboard from './pages/dashboard'
import TaxpayerList from './pages/taxpayers/TaxpayerList'
import TaxpayerShow from './pages/taxpayers/TaxpayerShow'
import PaymentList from './pages/payments/PaymentList'

const routes = [
    {
        path: '/',
        component: <Dashboard />,
        roles: 'Administrador 4,liquidator'
    },
    {
        path: '/taxpayers',
        component: <TaxpayerList />,
        roles: 'Administrador 4'
    },
    {
        path: '/taxpayers/:id',
        component: <TaxpayerShow />,
        roles: 'Administrador 4'
    },
    {
        path: '/payments',
        component: <PaymentList />,
        roles: 'Administrador 4'
    },
];

export default routes

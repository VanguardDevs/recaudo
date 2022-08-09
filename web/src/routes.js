import UserList from './pages/users/UserList'
import UserCreate from './pages/users/UserCreate'
import UserEdit from './pages/users/UserEdit'
import Dashboard from './pages/dashboard'
import TaxpayerList from './pages/taxpayers/TaxpayerList'
import TaxpayerShow from './pages/taxpayers/TaxpayerShow'
import RoleList from './pages/roles/RoleList'
import RoleCreate from './pages/roles/RoleCreate'
import RoleEdit from './pages/roles/RoleEdit'
import Security from './pages/account/Security';

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
        path: '/roles',
        component: <RoleList />,
        roles: 'Administrador 4'
    },
    {
        path: '/roles/:id/edit',
        component: <RoleEdit />,
        roles: 'Administrador 4'
    },
    {
        path: '/roles/create',
        component: <RoleCreate />,
        roles: 'Administrador 4'
    },
    {
        path: '/users',
        component: <UserList />,
        roles: 'Administrador 4'
    },
    {
        path: '/users/:id',
        component: <UserEdit />,
        roles: 'Administrador 4'
    },
    {
        path: '/users/create',
        component: <UserCreate />,
        roles: 'Administrador 4'
    },
    {
        path: '/security',
        component: <Security />,
        roles: 'Administrador 4'
    },
];

export default routes

import { ROLES } from "AppConstants";

const Menu = [
    {
        heading: 'Menü'
    },
    {
        name: 'Ana Sayfa',
        path: '/',
        icon : 'fas fa-home',
        roles: Object.values(ROLES)
    },
    {
        name: 'Fakülteler',
        path: '/faculties',
        icon : 'fas fa-suitcase',
        roles: Object.values(ROLES)
    },
    {
        name: 'Kullanıcılar',
        path: '/users',
        icon : 'fas fa-users',
        roles: Object.values(ROLES)
    }
];

export default Menu;

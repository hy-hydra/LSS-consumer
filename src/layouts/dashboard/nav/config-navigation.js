// routes
import { PATH_PAGE } from '../../../routes/paths';

// components
import SvgColor from '../../../components/svg-color';
import CustomLabel from '../../../components/custom-label/CustomLabel';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  home_active: icon('ic_home_active'),
  home_hover: icon('ic_home_hover'),
  home_deactive: icon('ic_home_deactive'),
  search_active: icon('ic_search_active'),
  search_hover: icon('ic_search_hover'),
  search_deactive: icon('ic_search_deactive'),
  bag_active: icon('ic_bag_active'),
  bag_hover: icon('ic_bag_hover'),
  bag_deactive: icon('ic_bag_deactive'),
  notification_active: icon('ic_notification_active'),
  notification_hover: icon('ic_notification_hover'),
  notification_deactive: icon('ic_notification_deactive'),
  order_active: icon('ic_order_active'),
  order_hover: icon('ic_order_hover'),
  order_deactive: icon('ic_order_deactive'),
  setting_active: icon('ic_setting_active'),
  setting_hover: icon('ic_setting_hover'),
  setting_deactive: icon('ic_setting_deactive'),
  logout_active: icon('ic_logout_active'),
  logout_hover: icon('ic_logout_hover'),
  logout_deactive: icon('ic_logout_deactive'),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    items: [
      {
        title: 'Home',
        path: PATH_PAGE.home.root,
        icon_active: ICONS.home_active,
        icon_hover: ICONS.home_hover,
        icon_deactive: ICONS.home_deactive,
      },
      {
        title: 'Search',
        path: PATH_PAGE.search,
        icon_active: ICONS.search_active,
        icon_hover: ICONS.search_hover,
        icon_deactive: ICONS.search_deactive,
      },
      {
        title: 'My Bag',
        path: PATH_PAGE.myBag,
        icon_active: ICONS.bag_active,
        icon_hover: ICONS.bag_hover,
        icon_deactive: ICONS.bag_deactive,
        info: <CustomLabel color="error" type="myBag" />,
      },
      {
        title: 'Notifications',
        path: PATH_PAGE.notifications,
        icon_active: ICONS.notification_active,
        icon_hover: ICONS.notification_hover,
        icon_deactive: ICONS.notification_deactive,
        info: <CustomLabel color="success" type="notification" />,
      },
      {
        title: 'Orders',
        path: PATH_PAGE.orders.root,
        icon_active: ICONS.order_active,
        icon_hover: ICONS.order_hover,
        icon_deactive: ICONS.order_deactive,
      },
      {
        title: 'Settings',
        path: PATH_PAGE.settings.root,
        icon_active: ICONS.setting_active,
        icon_hover: ICONS.setting_hover,
        icon_deactive: ICONS.setting_deactive,
      },
      {
        title: 'Log Out',
        path: PATH_PAGE.users.root,
        icon_active: ICONS.logout_active,
        icon_hover: ICONS.logout_hover,
        icon_deactive: ICONS.logout_deactive,
      },
    ],
  },
];

export const orderSubNavConfig = [
  // ORDERS
  // ----------------------------------------------------------------------
  {
    items: [
      {
        title: 'All Orders',
        path: PATH_PAGE.orders.all,
      },
      {
        title: 'Pending',
        path: PATH_PAGE.orders.pending,
      },
      {
        title: 'Confirmed',
        path: PATH_PAGE.orders.confirmed,
      },
      {
        title: 'On It’s way',
        path: PATH_PAGE.orders.onway,
      },
      {
        title: 'Delivered',
        path: PATH_PAGE.orders.delivered,
      },
      {
        title: 'Cancelled',
        path: PATH_PAGE.orders.cancelled,
      },
    ],
  },
];

export const settingSubNavConfig = [
  // SETTINGS
  // ----------------------------------------------------------------------
  {
    items: [
      {
        title: 'Profile Settings',
        path: PATH_PAGE.settings.profile,
      },
      {
        title: 'Billing & Shipping Info',
        path: PATH_PAGE.settings.billing,
      },
      {
        title: 'Liked Items',
        path: PATH_PAGE.settings.liked,
      },
      {
        title: 'Blocked Users',
        path: PATH_PAGE.settings.blocked,
      },
      {
        title: 'Sponsorship',
        path: PATH_PAGE.settings.sponsorship,
      },
    ],
  },
];

export default navConfig;

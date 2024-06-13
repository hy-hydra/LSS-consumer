import _mock from '../_mock';
import { randomInArray } from '../utils';

// ----------------------------------------------------------------------

export const _carouselsMembers = [...Array(6)].map((_, index) => ({
  id: _mock.id(index),
  name: _mock.name.fullName(index),
  role: _mock.role(index),
  avatar: `/assets/images/portraits/portrait_${index + 1}.jpg`,
}));

// ----------------------------------------------------------------------

export const _faqs = [...Array(8)].map((_, index) => ({
  id: _mock.id(index),
  value: `panel${index + 1}`,
  heading: `Questions ${index + 1}`,
  detail: _mock.text.description(index),
}));

// ----------------------------------------------------------------------

export const _addressBooks = [...Array(3)].map((_, index) => ({
  id: _mock.id(index),
  receiver: _mock.name.fullName(index),
  fullAddress: _mock.address.fullAddress(index),
  phoneNumber: _mock.phoneNumber(index),
  addressType: index === 0 ? 'Home' : 'Office',
  isDefault: index === 0,
}));

// ----------------------------------------------------------------------

export const _skills = [...Array(3)].map((_, index) => ({
  label: ['Development', 'Design', 'Marketing'][index],
  value: _mock.number.percent(index),
}));

// ----------------------------------------------------------------------

export const _contacts = [...Array(20)].map((_, index) => ({
  id: _mock.id(index),
  name: _mock.name.fullName(index),
  username: _mock.name.fullName(index),
  avatar: _mock.image.avatar(index),
  address: _mock.address.fullAddress(index),
  phone: _mock.phoneNumber(index),
  email: _mock.email(index),
  lastActivity: _mock.time(index),
  status: randomInArray(['online', 'offline', 'away', 'busy']),
  role: _mock.role(index),
}));

// ----------------------------------------------------------------------

export const _notifications = [...Array(5)].map((_, index) => ({
  id: _mock.id(index),
  title: ['David Kent ', 'Hi David', 'Your order is placed', 'Dennis Nedry', 'Dennis Nedry'][index],
  description: [
    'requested to follow your product Running Sport Shoes',
    'your order (1234567890) is successful & will be delivered within 2 working days',
    'waiting for shipping',
    'accepted your private request to follow her account',
    'accepted your private request to follow her account',
  ][index],
  avatar: [
    '/assets/images/avatars/humans/human_1.png',
    '/assets/images/avatars/humans/human_2.png',
    '/assets/images/avatars/humans/human_3.png',
    '/assets/images/avatars/humans/human_4.png',
    '/assets/images/avatars/humans/human_5.png',
  ][index],
  type: ['order_placed', 'friend_interactive', 'chat_message', 'mail', 'order_shipped'][index],
  createdAt: _mock.time(index),
  isUnRead: [true, true, false, false, false][index],
}));

// ----------------------------------------------------------------------

export const _mapContact = [
  {
    latlng: [33, 65],
    address: _mock.address.fullAddress(1),
    phoneNumber: _mock.phoneNumber(1),
  },
  {
    latlng: [-12.5, 18.5],
    address: _mock.address.fullAddress(2),
    phoneNumber: _mock.phoneNumber(2),
  },
];

// ----------------------------------------------------------------------

export const _socials = [
  {
    value: 'facebook',
    name: 'FaceBook',
    icon: 'eva:facebook-fill',
    color: '#1877F2',
    path: 'https://www.facebook.com/caitlyn.kerluke',
  },
  {
    value: 'instagram',
    name: 'Instagram',
    icon: 'ant-design:instagram-filled',
    color: '#E02D69',
    path: 'https://www.instagram.com/caitlyn.kerluke',
  },
  {
    value: 'linkedin',
    name: 'Linkedin',
    icon: 'eva:linkedin-fill',
    color: '#007EBB',
    path: 'https://www.linkedin.com/caitlyn.kerluke',
  },
  {
    value: 'twitter',
    name: 'Twitter',
    icon: 'eva:twitter-fill',
    color: '#00AAEC',
    path: 'https://www.twitter.com/caitlyn.kerluke',
  },
];

export const _metadata = [
  {
    id: 25558,
    variant_id: 5067,
    field: 'Measurements',
    value: '15.35 inches',
    index: 2,
    is_active: true,
    created_at: '2023-10-30T03:13:05.887031Z',
    modified_at: '2023-10-29T21:41:15.454696Z',
  },
  {
    id: 25559,
    variant_id: 5067,
    field: 'Signed and dated',
    value: 'Edition Artifort',
    index: 3,
    is_active: true,
    created_at: '2023-10-30T03:13:05.915029Z',
    modified_at: '2023-10-29T21:41:15.456863Z',
  },
  {
    id: 25560,
    variant_id: 5067,
    field: 'Designer',
    value: 'Pierre Paulin',
    index: 4,
    is_active: true,
    created_at: '2023-10-30T03:13:05.939219Z',
    modified_at: '2023-10-29T21:41:15.459546Z',
  },
  {
    id: 25561,
    variant_id: 5067,
    field: 'Year',
    value: '1963',
    index: 5,
    is_active: true,
    created_at: '2023-10-30T03:13:05.959233Z',
    modified_at: '2023-10-29T21:41:15.461559Z',
  },
  {
    id: 25557,
    variant_id: 5067,
    field: 'Material',
    value: 'Metal, foam, fabric',
    index: 1,
    is_active: true,
    created_at: '2023-10-30T03:13:05.858996Z',
    modified_at: '2023-10-29T21:41:15.444228Z',
  },
];

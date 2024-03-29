const Categories = [
  {
    id: '1',
    name: 'Food & Drinks',
    color: '#f44336',
    icon: 'food',
    slug: 'food',
    children: [
      {
        id: '1_1',
        color: '#f44336',
        name: 'Food & Drinks',
        icon: 'food',
        slug: 'food',
      },
      {
        id: '1_2',
        color: '#f44336',
        name: 'Cafe',
        icon: 'coffee',
        slug: 'cafe',
      },
      {
        id: '1_3',
        color: '#f44336',
        name: 'Groceries',
        icon: 'carrot',
        slug: 'groceries',
      },
      {
        id: '1_4',
        color: '#f44336',
        name: 'Restaurant',
        icon: 'hamburger',
        slug: 'restaurant',
      },
    ],
  },
  {
    id: '2',
    name: 'Shopping',
    color: '#4fC3F7',
    icon: 'shopping',
    slug: 'shopping',
    children: [
      {
        id: '2_1',
        color: '#4fC3F7',
        name: 'Shopping',
        icon: 'shopping',
        slug: 'shopping',
      },
      {
        id: '2_2',
        color: '#4fC3F7',
        name: 'Clothes & shoes',
        icon: 'hanger',
        slug: 'clothes',
      },
      {
        id: '2_3',
        color: '#4fC3F7',
        name: 'Drug-store, chemist',
        icon: 'pill',
        slug: 'drug_store',
      },
      {
        name: 'Electronics, accessories',
        color: '#4fC3F7',
        icon: 'devices',
        slug: 'electronics',
        id: '2_4',
      },
      {
        id: '2_5',
        color: '#4fC3F7',
        name: 'Free time',
        icon: 'emoticon-happy',
        slug: 'free_time',
      },
      {
        id: '2_6',
        color: '#4fC3F7',
        name: 'Gifts, joy',
        icon: 'gift',
        slug: 'gift',
      },
      {
        id: '2_7',
        color: '#4fC3F7',
        name: 'Health and beauty',
        slug: 'health_and_beauty',
        icon: 'lipstick',
      },
      {
        id: '2_8',
        color: '#4fC3F7',
        name: 'Home, garden',
        icon: 'home-variant',
        slug: 'home_garden',
      },
      {
        name: 'Jewels, accessories',
        color: '#4fC3F7',
        icon: 'diamond',
        slug: 'jewels_accessories',
        id: '2_9',
      },
      {
        id: '2_10',
        color: '#4fC3F7',
        name: 'Kids',
        slug: 'kids',
        icon: 'baby-carriage',
      },
      {
        name: 'Pets, animals',
        color: '#4fC3F7',
        slug: 'pets_animals',
        icon: 'cat',
        id: '2_11',
      },
      {
        name: 'Stationery, tools',
        color: '#4fC3F7',
        icon: 'tools',
        slug: 'stationery_tools',
        id: '2_12',
      },
    ],
  },
  {
    id: '3',
    name: 'Housing',
    color: '#FFA726',
    icon: 'home',
    slug: 'housing',
    children: [
      {
        id: '3_1',
        color: '#FFA726',
        name: 'Housing',
        icon: 'home',
        slug: 'housing',
      },
      {
        id: '3_2',
        color: '#FFA726',
        name: 'Energy, utilities',
        icon: 'home-lightning-bolt',
        slug: 'energy_utilities',
      },
      {
        id: '3_3',
        color: '#FFA726',
        name: 'Maintenance, repairs',
        icon: 'tools',
        slug: 'maintenance_repairs',
      },
      {
        name: 'Mortgage',
        color: '#FFA726',
        icon: 'home-city',
        slug: 'mortgage',
        id: '3_4',
      },
      {
        name: 'Rent',
        color: '#FFA726',
        icon: 'cash',
        slug: 'rent',
        id: '3_5',
      },
      {
        id: '3_6',
        color: '#FFA726',
        name: 'Services',
        icon: 'account-wrench',
        slug: 'services',
      },
    ],
  },
  {
    id: '4',
    name: 'Transportation',
    color: '#78909C',
    icon: 'bus',
    slug: 'bus',
    children: [
      {
        id: '4_1',
        color: '#78909C',
        name: 'Transportation',
        icon: 'bus',
        slug: 'transportation',
      },
      {
        name: 'Business trips',
        color: '#78909C',
        icon: 'airplane',
        slug: 'business_trips',
        id: '4_2',
      },
      {
        color: '#78909C',
        id: '4_3',
        name: 'Long distance',
        icon: 'airplane-marker',
        slug: 'long_distance',
      },
      {
        id: '4_4',
        color: '#78909C',
        name: 'Public transport',
        icon: 'bus-multiple',
        slug: 'public_transport',
      },
      {
        id: '4_5',
        color: '#78909C',
        name: 'Taxi',
        icon: 'taxi',
        slug: 'taxi',
      },
    ],
  },
  {
    id: '5',
    name: 'Vehicle',
    color: '#AA00FF',
    icon: 'car',
    slug: 'vehicle',
    children: [
      {
        id: '5_1',
        color: '#AA00FF',
        name: 'Vehicle',
        icon: 'car',
        slug: 'vehicle',
      },
      {
        id: '5_2',
        color: '#AA00FF',
        name: 'Fuel',
        icon: 'gas-station',
        slug: 'fuel',
      },
      {
        name: 'Leasing',
        color: '#AA00FF',
        icon: 'cash-multiple',
        slug: 'leasing',
        id: '5_3',
      },
      {
        name: 'Parking',
        color: '#AA00FF',
        icon: 'parking',
        slug: 'parking',
        id: '5_4',
      },
      {
        name: 'Rentals',
        color: '#AA00FF',
        icon: 'car-key',
        slug: 'rentals',
        id: '5_5',
      },
      {
        id: '5_6',
        color: '#AA00FF',
        name: 'Vehicle maintenance',
        icon: 'wrench-clock',
        slug: 'vehicle_maintenance',
      },
    ],
  },
  {
    id: '6',
    name: 'Life & Entertainment',
    color: '#64DD17',
    icon: 'human-male-female-child',
    slug: 'life_and_entertainment',
    children: [
      {
        id: '6_1',
        color: '#64DD17',
        name: 'Life & Entertainment',
        icon: 'human-male-female-child',
        slug: 'life_and_entertainment',
      },
      {
        id: '6_2',
        color: '#64DD17',
        name: 'Active sport, fitness',
        icon: 'football',
        slug: 'active_sport_fitness',
      },
      {
        name: 'Books, audio, subscriptions',
        color: '#64DD17',
        icon: 'bookmark',
        slug: 'books_audio_subscriptions',
        id: '6_4',
      },
      {
        id: '6_5',
        color: '#64DD17',
        name: 'Charity, gifts',
        icon: 'gift',
        slug: 'gift',
      },
      {
        id: '6_6',
        color: '#64DD17',
        name: 'Culture, sport events',
        icon: 'hand-clap',
        slug: 'culture_sport_events',
      },
      {
        id: '6_7',
        color: '#64DD17',
        name: 'Education, development',
        icon: 'school',
        slug: 'education_development',
      },
      {
        id: '6_8',
        color: '#64DD17',
        name: 'Health care, doctor',
        icon: 'doctor',
        slug: 'health_care_doctor',
      },
      {
        name: 'Hobbies',
        color: '#64DD17',
        icon: 'thumb-up',
        slug: 'hobbies',
        id: '6_9',
      },
      {
        id: '6_10',
        color: '#64DD17',
        name: 'Holiday, trips, hotels',
        icon: 'beach',
        slug: 'holiday_trips_hotels',
      },
      {
        name: 'Life events',
        color: '#64DD17',
        icon: 'cake-variant',
        slug: 'life_events',
        id: '6_11',
      },
      {
        name: 'TV, Streaming',
        color: '#64DD17',
        icon: 'television',
        slug: 'tv_streaming',
        id: '6_13',
      },
      {
        id: '6_14',
        color: '#64DD17',
        name: 'Wellness, beauty',
        icon: 'flower',
        slug: 'wellness_beauty',
      },
    ],
  },
  /// STOPPED HERE
  {
    id: '7',
    name: 'Communication, PC',
    color: '#536DFE',
    icon: 'laptop',
    slug: 'communication_pc',
    children: [
      {
        name: 'Communication, PC',
        color: '#536DFE',
        icon: 'laptop',
        slug: 'communication_pc',
        id: '7_1',
      },
      {
        name: 'Internet',
        color: '#536DFE',
        icon: 'wifi',
        slug: 'internet',
        id: '7_2',
      },
      {
        name: 'Phone, mobile phone',
        color: '#536DFE',
        icon: 'phone',
        slug: 'phone_mobile_phone',
        id: '7_3',
      },
      {
        name: 'Postal services',
        color: '#536DFE',
        icon: 'email',
        slug: 'postal_services',
        id: '7_4',
      },
      {
        id: '7_5',
        color: '#536DFE',
        name: 'Software, apps, games',
        icon: 'gamepad',
        slug: 'software_apps_games',
      },
    ],
  },
  {
    id: '8',
    name: 'Financial expenses',
    color: '#00BFA5',
    icon: 'credit-card',
    slug: 'financial_expenses',
    children: [
      {
        color: '#00BFA5',
        id: '8_1',
        name: 'Financial expenses',
        icon: 'credit-card',
        slug: 'financial_expenses',
      },
      {
        name: 'Advisory',
        color: '#00BFA5',
        icon: 'account-tie-voice',
        slug: 'advisory',
        id: '8_2',
      },
      {
        id: '8_3',
        color: '#00BFA5',
        name: 'Charges, Fees',
        icon: 'cash',
        slug: 'charges_fees',
      },
      {
        name: 'Child Support',
        color: '#00BFA5',
        icon: 'account-child-circle',
        slug: 'child_support',
        id: '8_4',
      },
      {
        name: 'Fines',
        color: '#00BFA5',
        icon: 'office-building',
        slug: 'fines',
        id: '8_5',
      },
      {
        id: '8_6',
        color: '#00BFA5',
        name: 'Loan',
        icon: 'cash-multiple',
        slug: 'loan',
      },
      {
        name: 'Taxes',
        color: '#00BFA5',
        icon: 'currency-usd',
        slug: 'taxes',
        id: '8_7',
      },
    ],
  },
  {
    id: '9',
    name: 'Investments',
    color: '#FF4081',
    icon: 'crowd',
    slug: 'investments',
    children: [
      {
        id: '9_1',
        color: '#FF4081',
        name: 'Investments',
        icon: 'crowd',
        slug: 'investments',
      },
      {
        name: 'Collections',
        color: '#FF4081',
        icon: 'rhombus-split',
        slug: 'collections',
        id: '9_2',
      },
      {
        name: 'Financial investments',
        color: '#FF4081',
        icon: 'cash-multiple',
        slug: 'financial_investments',
        id: '9_3',
      },
      {
        name: 'Realty',
        color: '#FF4081',
        icon: 'home-heart',
        slug: 'realty',
        id: '9_4',
      },
      {
        name: 'Savings',
        color: '#FF4081',
        icon: 'cash',
        slug: 'savings',
        id: '9_5',
      },
      {
        name: 'Vehicles, chattels',
        color: '#FF4081',
        icon: 'car-estate',
        slug: 'vehicles_chattels',
        id: '9_6',
      },
    ],
  },
  {
    id: '10',
    name: 'Income',
    color: '#FBC02D',
    icon: 'hand-coin',
    slug: 'income',
    children: [
      {
        id: '10_1',
        color: '#FBC02D',
        name: 'Income',
        icon: 'hand-coin',
        slug: 'income',
      },
      {
        name: 'Checks, coupons',
        color: '#FBC02D',
        icon: 'ticket-percent',
        slug: 'checks_coupons',
        id: '10_2',
      },
      {
        name: 'Child Support',
        color: '#FBC02D',
        icon: 'car-child-seat',
        slug: 'child_support',
        id: '10_3',
      },
      {
        id: '10_4',
        color: '#FBC02D',
        name: 'Dues & grants',
        icon: 'clock-alert',
        slug: 'dues_grants',
      },
      {
        id: '10_5',
        color: '#FBC02D',
        name: 'Gifts',
        icon: 'cash-fast',
        slug: 'gifts',
      },
      {
        name: 'Dividends',
        color: '#FBC02D',
        icon: 'account-cash',
        slug: 'dividends',
        id: '10_6',
      },
      {
        id: '10_7',
        color: '#FBC02D',
        name: 'Lending, renting',
        icon: 'checkbook',
        slug: 'lending_renting',
      },
      {
        id: '10_9',
        color: '#FBC02D',
        name: 'Refunds (tax, purchase)',
        icon: 'cash-refund',
        slug: 'refunds_tax_purchase',
      },
      {
        color: '#FBC02D',
        id: '10_10',
        name: 'Rental income',
        icon: 'domain',
        slug: 'rental_income',
      },
      {
        color: '#FBC02D',
        id: '10_11',
        name: 'Sale',
        icon: 'sale',
        slug: 'sale',
      },
      {
        color: '#FBC02D',
        id: '10_12',
        name: 'Wage, invoices',
        icon: 'receipt',
        slug: 'wage_invoices',
      },
    ],
  },
  {
    id: '11',
    name: 'Others',
    color: '#9E9E9E',
    icon: 'menu',
    slug: 'others',
    children: [
      {
        id: '11_1',
        color: '#9E9E9E',
        name: 'Others',
        icon: 'menu',
        slug: 'others',
      },
      {
        id: '11_2',
        color: '#9E9E9E',
        name: 'Missing',
        icon: 'menu',
        slug: 'missing',
      },
    ],
  },
  {
    id: '12',
    name: 'Unknown',
    icon: 'help',
    slug: 'question-mark',
    children: [
      {
        id: '12_1',
        color: '#D0D0D0',
        name: 'Unknown expense',
        icon: 'help',
        slug: 'question-mark',
      },
      {
        id: '12_2',
        color: '#D0D0D0',
        name: 'Unknown income',
        icon: 'help',
        slug: 'question-mark',
      },
    ],
  },
];
export default Categories;

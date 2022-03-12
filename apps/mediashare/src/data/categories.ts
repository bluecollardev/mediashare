export const customVideoSubcategories = [
  {
    name: 'Mobility',
    id: 8001,
  },
  {
    name: 'Strength',
    id: 8002,
  },
  {
    name: 'Stability',
    id: 8003,
  },
  {
    name: 'Power',
    id: 8004,
  },
  {
    name: 'Pain Relief',
    id: 8005,
  },
  {
    name: 'Neurodynamics',
    id: 8006,
  },
  {
    name: 'Self-Assessments',
    id: 8007,
  },
  {
    name: 'Activity & Postural Modifications',
    id: 8008,
  },
  {
    name: 'Weightlifting Technique',
    id: 8009,
  },
  {
    name: 'Talking Videos',
    id: 8010,
  },
];

export const customPlaylistSubcategories = [
  {
    name: 'Rehab Programs',
    id: 9001,
  },
  {
    name: 'Prehab Programs',
    id: 9002,
  },
  {
    name: 'Mobility Progressions',
    id: 9003,
  },
  {
    name: 'Strength Progressions',
    id: 9004,
  },
  {
    name: 'Stability Progressions',
    id: 9005,
  },
  {
    name: 'Power Progressions',
    id: 9006,
  },
  {
    name: 'Pain Relief',
    id: 9007,
  },
  {
    name: 'Misc Routines',
    id: 9008,
  },
  {
    name: 'Warm Ups',
    id: 9009,
  },
];

export const customVideoCategories = [
  // this is the parent or 'item'
  {
    name: 'Shoulder',
    id: 4001,
    // these are the children or 'sub items'
    children: [...customVideoSubcategories],
  },
  {
    name: 'Neck',
    id: 4002,
    // these are the children or 'sub items'
    children: [...customVideoSubcategories],
  },
  {
    name: 'Upper Back',
    id: 4003,
    // these are the children or 'sub items'
    children: [...customVideoSubcategories],
  },
  {
    name: 'Lower Back',
    id: 4004,
    // these are the children or 'sub items'
    children: [...customVideoSubcategories],
  },
  {
    name: 'Elbow',
    id: 4005,
    // these are the children or 'sub items'
    children: [...customVideoSubcategories],
  },
  {
    name: 'Wrist',
    id: 4006,
    // these are the children or 'sub items'
    children: [...customVideoSubcategories],
  },
  {
    name: 'Hand',
    id: 4007,
    // these are the children or 'sub items'
    children: [...customVideoSubcategories],
  },
  {
    name: 'Hip',
    id: 4008,
    // these are the children or 'sub items'
    children: [...customVideoSubcategories],
  },
  {
    name: 'Knee',
    id: 4009,
    // these are the children or 'sub items'
    children: [...customVideoSubcategories],
  },
  {
    name: 'Foot & Ankle',
    id: 4010,
    // these are the children or 'sub items'
    children: [...customVideoSubcategories],
  },
  {
    name: 'Pricing',
    id: 1000,
    // these are the children or 'sub items'
    children: [
      {
        name: 'Free Content',
        id: 1001,
      },
      {
        name: 'Premium Content',
        id: 1002,
      },
    ],
  },
];

export const customPlaylistCategories = [
  // this is the parent or 'item'
  {
    name: 'Shoulder',
    id: 5001,
    // these are the children or 'sub items'
    children: [...customPlaylistSubcategories],
  },
  {
    name: 'Neck',
    id: 5002,
    // these are the children or 'sub items'
    children: [...customPlaylistSubcategories],
  },
  {
    name: 'Upper Back',
    id: 5003,
    // these are the children or 'sub items'
    children: [...customPlaylistSubcategories],
  },
  {
    name: 'Lower Back',
    id: 5004,
    // these are the children or 'sub items'
    children: [...customPlaylistSubcategories],
  },
  {
    name: 'Elbow',
    id: 5005,
    // these are the children or 'sub items'
    children: [...customPlaylistSubcategories],
  },
  {
    name: 'Wrist',
    id: 5006,
    // these are the children or 'sub items'
    children: [...customPlaylistSubcategories],
  },
  {
    name: 'Hand',
    id: 5007,
    // these are the children or 'sub items'
    children: [...customPlaylistSubcategories],
  },
  {
    name: 'Hip',
    id: 5008,
    // these are the children or 'sub items'
    children: [...customPlaylistSubcategories],
  },
  {
    name: 'Knee',
    id: 5009,
    // these are the children or 'sub items'
    children: [...customPlaylistSubcategories],
  },
  {
    name: 'Foot & Ankle',
    id: 5010,
    // these are the children or 'sub items'
    children: [...customPlaylistSubcategories],
  },
  {
    name: 'Pricing',
    id: 1000,
    // these are the children or 'sub items'
    children: [
      {
        name: 'Free Content',
        id: 1001,
      },
      {
        name: 'Premium Content',
        id: 1002,
      },
    ],
  },
];

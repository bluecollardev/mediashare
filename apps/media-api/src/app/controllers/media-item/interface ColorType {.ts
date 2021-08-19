interface ColorType {
  name: string;
  // description: string;
  // error: string;
}

const colorTypes = ['rgb', 'cyan'] as const;

const ColorTypeMap = colorTypes.reduce<Record<typeof colorTypes[number], ColorType>>((prev, curr) => ({ ...prev, [curr]: curr }), Object.create(null));

type ColorTypeVirtualMap = {
  [P in typeof colorTypes[number]]: P;
};

type PluckColorType<K extends typeof colorTypes[number]> = K;

const colors = {
  getFuncName(id: typeof colorTypes[number]) {
    return ColorTypeMap[id];
  },

  rgb(): ColorType {
    return ColorTypeMap['rgb'];
  },

  getColors() {
    return colorTypes.map((type) => ColorTypeMap[type]);
  },
};

const colorsArr = [colors, colors, colors];

const vals = colorsArr.map((color) => color.getFuncName('rgb'));

const colorsRgb = colors.rgb();

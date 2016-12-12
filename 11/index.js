const combinations = require('combinations');
const lodash = require('lodash');

const initialLayout = {
  '1': {
    'elevator': true,
    'generator': [
      'th',
      'pl',
      'st',
      'el',
      'di'
    ],
    'microchip': [
      'th',
      'el',
      'di'
    ]
  },
  '2': {
    'elevator': false,
    'generator': [],
    'microchip': [
      'pl',
      'st',
    ]
  },
  '3': {
    'elevator': false,
    'generator': [
      'pr',
      'ru'
    ],
    'microchip': [
      'pr',
      'ru'
    ]
  },
  '4': {
    'elevator': false,
    'generator': [],
    'microchip': []
  }
};

const testLayout = layout => {
  let isSafe = true;
  for (let level in layout) {
    if (!layout[level].generator.length || !layout[level].microchip.length) {
      continue;
    }
    for (let microchip of layout[level].microchip) {
      if (layout[level].generator.indexOf(microchip) < 0) {
        isSafe = false;
        break;
      }
    }
    if (!isSafe) {
      break;
    }
  }
  return isSafe;
};

let step = 0;
let layoutOptions = [initialLayout];
let nextLayout = [];
while (true) {
  step++;
  for (let layout of layoutOptions) {
    const floor = +lodash.findKey(layout, layoutFloor => layoutFloor.elevator);

    const generatorCombinations = combinations(layout['' + floor].generator);
    generatorCombinations.push([]);
    const microchipCombinations = combinations(layout['' + floor].microchip);
    microchipCombinations.push([]);

    for (let generatorOption of generatorCombinations) {
      for (let microchipOption of microchipCombinations) {
        const moveOption = {
          'generator': generatorOption,
          'microchip': microchipOption
        };
        const moveOptionLength = generatorOption.length + microchipOption.length;
        if (moveOptionLength < 1 || moveOptionLength > 2) {
          continue;
        }

        if (floor < 4) {
          let tempLayout = lodash.cloneDeep(layout);
          lodash.pullAll(tempLayout['' + floor].generator, moveOption.generator);
          lodash.pullAll(tempLayout['' + floor].microchip, moveOption.microchip);
          tempLayout['' + (floor + 1)].generator.push(...moveOption.generator);
          tempLayout['' + (floor + 1)].microchip.push(...moveOption.microchip);
          if (testLayout(tempLayout)) {
            tempLayout['' + floor].elevator = false;
            tempLayout['' + (floor + 1)].elevator = true;
            nextLayout.push(tempLayout);
          }
        }

        if (floor > 1) {
          if (floor == 2 && layout['1'].generator.length == 0 && layout['1'].microchip.length == 0) {
            continue;
          }
          if (floor == 3 && layout['1'].generator.length == 0 && layout['1'].microchip.length == 0 &&
                            layout['2'].generator.length == 0 && layout['2'].microchip.length == 0) {
            continue;
          }
          let tempLayout = lodash.cloneDeep(layout);
          lodash.pullAll(tempLayout['' + floor].generator, moveOption.generator);
          lodash.pullAll(tempLayout['' + floor].microchip, moveOption.microchip);
          tempLayout['' + (floor - 1)].generator.push(...moveOption.generator);
          tempLayout['' + (floor - 1)].microchip.push(...moveOption.microchip);
          if (testLayout(tempLayout)) {
            tempLayout['' + floor].elevator = false;
            tempLayout['' + (floor - 1)].elevator = true;
            nextLayout.push(tempLayout);
          }
        }

      }
    }
  }

  const solution = nextLayout.filter(layout => {
    return (layout['4'].generator.length === 5 && layout['4'].microchip.length === 5);
  });
  if (solution.length) {
    console.log(step);
    break;
  }
  nextLayout = lodash.uniqBy(nextLayout, testLayout => {
    const layout = lodash.cloneDeep(testLayout);
    for (let floor in layout) {
      let pairs = lodash.intersection(layout[floor].generator, layout[floor].microchip);
      for (let pair of pairs) {
        layout[floor].generator[layout[floor].generator.indexOf(pair)] = 'pair';
        layout[floor].microchip[layout[floor].microchip.indexOf(pair)] = 'pair';
      }
      layout[floor].generator.sort();
      layout[floor].microchip.sort();
    }
    return JSON.stringify(layout);
  });
  layoutOptions = lodash.cloneDeep(nextLayout);
  nextLayout = [];
}

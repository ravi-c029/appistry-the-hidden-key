const sharp = require('sharp');
sharp('public/reference-card.png')
  .raw()
  .toBuffer({ resolveWithObject: true })
  .then(({ data, info }) => {
    console.log('Size:', info.width, info.height);
    // sample top-left, top-right, center, bottom-left
    const sample = (x, y) => {
      const idx = (y * info.width + x) * 3;
      return 'RGB(' + data[idx] + ',' + data[idx+1] + ',' + data[idx+2] + ')';
    };
    console.log('Top-left (100, 100):', sample(100, 100));
    console.log('Top-center (1490, 100):', sample(1490, 100));
    console.log('Center (1490, 865):', sample(1490, 865));
    console.log('Right (2500, 865):', sample(2500, 865));
  });


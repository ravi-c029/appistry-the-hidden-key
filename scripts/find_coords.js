const sharp = require('sharp');
sharp('public/reference-design.jpeg')
  .raw()
  .toBuffer({ resolveWithObject: true })
  .then(({ data, info }) => {
    console.log('Size:', info.width, info.height);
    for (let x = 1800; x <= 2200; x += 100) {
      for (let y = 300; y <= 600; y += 100) {
        const idx = (y * info.width + x) * 3;
        console.log('x=' + x + ', y=' + y + ' -> RGB(' + data[idx] + ',' + data[idx+1] + ',' + data[idx+2] + ')');
      }
    }
  });

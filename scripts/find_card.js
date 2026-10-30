const sharp = require('sharp');
sharp('public/reference-design.jpeg')
  .raw()
  .toBuffer({ resolveWithObject: true })
  .then(({ data, info }) => {
    // Find the border of the main card
    // Across y = 1125 (middle)
    const y = 1125;
    for (let x = 400; x < 1200; x += 10) {
      const idx = (y * info.width + x) * 3;
      // print where transition from background to card happens
      if (x % 50 === 0) console.log('x=' + x + ' -> RGB(' + data[idx] + ',' + data[idx+1] + ',' + data[idx+2] + ')');
    }
  });

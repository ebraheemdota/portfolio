const sharp = require('sharp');

sharp('public/profile/me.JPG')
  .extract({ left: 400, top: 580, width: 580, height: 780 })
  .resize(480, 640)
  .toFile('public/me-cropped.jpg', (err, info) => {
    if (err) console.error(err);
    else console.log('Done', info);
  });

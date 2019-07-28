export default {
  floyd_steinberg: function(imageData, w) {
    var imageDataLength = imageData.length;
    var lumR = [],
      lumG = [],
      lumB = [];
    var newPixel, err;
    var i;
    for (i = 0; i < 256; i++) {
      lumR[i] = i * 0.299;
      lumG[i] = i * 0.587;
      lumB[i] = i * 0.110;
    }
    // Greyscale luminance (sets r pixels to luminance of rgb)
    for (i = 0; i <= imageDataLength; i += 4) {
      imageData[i] = Math.floor(lumR[imageData[i]] + lumG[imageData[i + 1]] +
        lumB[imageData[i + 2]]);
    }
    for (let currentPixel = 0; currentPixel <=
    imageDataLength; currentPixel += 4) {
      // threshold for determining current pixel's conversion to a black or white pixel
      newPixel = imageData[currentPixel] < 150
        ? 0
        : 255;
      err = Math.floor((imageData[currentPixel] - newPixel) / 23);
      imageData[currentPixel + 0 * 1 - 0] = newPixel;
      imageData[currentPixel + 4 * 1 - 0] += err * 7;
      imageData[currentPixel + 4 * w - 4] += err * 3;
      imageData[currentPixel + 4 * w - 0] += err * 5;
      imageData[currentPixel + 4 * w + 4] += err * 1;
      // Set g and b values equal to r (effectively greyscales the image fully)
      imageData[currentPixel + 1] = imageData[currentPixel +
      2] = imageData[currentPixel];
    }
    return imageData;
  },
  hexToRgbA: function(hex) {
    var c;
    console.log(`hexToRgbA called with ${hex}`);
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
      c = hex.substring(1).split("");
      if (c.length == 3) {
        c = [c[0], c[0], c[1], c[1], c[2], c[2]];
      }
      c = "0x" + c.join("");
      return [(c >> 16) & 255, (c >> 8) & 255, c & 255];
    } else {
      console.error(`${hex} is invalid.`);
    }
  }
};

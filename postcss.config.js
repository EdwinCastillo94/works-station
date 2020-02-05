const fontMagician = require('postcss-font-magician');
const mergeLongHand = require('postcss-merge-longhand');
const autoprefixer = require('autoprefixer');

module.exports = {
  plugins: [
    fontMagician(),
    mergeLongHand(),
    autoprefixer()
  ]
};

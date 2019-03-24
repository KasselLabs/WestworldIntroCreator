sed -i -e "s/export const TIME_FACTOR = .*;/export const TIME_FACTOR = $1;/g" src/js/api/config.js
sed -i -e "s/\$timeFactor = .*;/\$timeFactor = $1;/g" src/styles/animations.styl
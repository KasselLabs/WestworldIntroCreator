sed -i -e "s/export const TIME_FACTOR = .*;/export const TIME_FACTOR = $1;/g" src/js/api/config.js
sed -i -e "s/\$TIME_FACTOR = .*;/\$TIME_FACTOR = $1;/g" src/styles/animations.styl
sed -i -e "s/88.322s/88.305s/g" src/styles/animations.styl
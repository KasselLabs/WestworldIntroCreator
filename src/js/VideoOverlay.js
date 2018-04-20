import React from 'react';
import PropTypes from 'prop-types';

import original from '../json/season1.json';

const VideoOverlay = ({ configurations, play }) => {
  const classnames = `video-overlay ${play ? 'animate' : ''}`;

  return (
    <div
      className={classnames}
      style={configurations.overlay}
    >
      <div
        className="video-overlay__content"
        style={configurations.overlay_content}
      >
        <div id="text0" style={configurations.texts[0]}>{ original.text[0] }</div>
        <div id="text1" style={configurations.texts[1]}>{ original.text[1] }</div>
        <div id="text2" style={configurations.texts[2]}>{ original.text[2] }</div>
        <div id="text3" style={configurations.texts[3]}>{ original.text[3] }</div>
        <div id="text4" style={configurations.texts[4]}>{ original.text[4] }</div>
        <div id="text5" style={configurations.texts[5]}>{ original.text[5] }</div>
        <div id="text6" style={configurations.texts[6]}>{ original.text[6] }</div>
        <div id="text7" style={configurations.texts[7]}>{ original.text[7] }</div>
        <div id="text8" style={configurations.texts[8]}>{ original.text[8] }</div>
        <div id="text9" style={configurations.texts[9]}>{ original.text[9] }</div>
        <div id="text10" style={configurations.texts[10]}>{ original.text[10] }</div>
        <div id="text11" style={configurations.texts[11]}>{ original.text[11] }</div>
        <div id="text12" style={configurations.texts[12]}>{ original.text[12] }</div>
        <div id="text13" style={configurations.texts[13]}>{ original.text[13] }</div>
        <div id="text14" style={configurations.texts[14]}>{ original.text[14] }</div>
        <div id="text15" style={configurations.texts[15]}>{ original.text[15] }</div>
        <div id="text16" style={configurations.texts[16]}>{ original.text[16] }</div>
        <div id="text17" style={configurations.texts[17]}>{ original.text[17] }</div>
        <div id="text18" style={configurations.texts[18]}>{ original.text[18] }</div>
        <div id="text19" style={configurations.texts[19]}>{ original.text[19] }</div>
        <div id="text20" style={configurations.texts[20]}>{ original.text[20] }</div>
        <div id="text21" style={configurations.texts[21]}>{ original.text[21] }</div>
        <div id="text22" style={configurations.texts[22]}>{ original.text[22] }</div>
        <div id="text23" style={configurations.texts[23]}>{ original.text[23] }</div>
        <div id="text24" style={configurations.texts[24]}>{ original.text[24] }</div>
        <div id="text25" style={configurations.texts[25]}>{ original.text[25] }</div>
        <div id="text26" style={configurations.texts[26]}>{ original.text[26] }</div>
        <div id="text27" style={configurations.texts[27]}>{ original.text[27] }</div>
        <div id="text28" style={configurations.texts[28]}>{ original.text[28] }</div>
        <div id="text29" style={configurations.texts[29]}>{ original.text[29] }</div>
        <div id="text30" style={configurations.texts[30]}>{ original.text[30] }</div>
        <div id="text31" style={configurations.texts[31]}>{ original.text[31] }</div>
        <div id="text32" style={configurations.texts[32]}>{ original.text[32] }</div>
        <div id="text33" style={configurations.texts[33]}>{ original.text[33] }</div>
      </div>
    </div>
  );
};

VideoOverlay.propTypes = {
  configurations: PropTypes.object,
  play: PropTypes.bool,
};

export default VideoOverlay;

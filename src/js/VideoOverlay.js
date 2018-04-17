import React from 'react';
import PropTypes from 'prop-types';

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
        <div id="text0" style={configurations.texts[0]}>EVAN RACHEL WOOD</div>
        <div id="text1" style={configurations.texts[1]}>THANDIE NEWTOW</div>
        <div id="text2" style={configurations.texts[2]}>JEFFREY WRIGHT</div>
        <div id="text3" style={configurations.texts[3]}>JAMES MARSDEN</div>
        <div id="text4" style={configurations.texts[4]}>INGRID BOLSO BERDAL</div>
        <div id="text5" style={configurations.texts[5]}>LUKE HEMSWORTH</div>
        <div id="text6" style={configurations.texts[6]}>SIDSE BABETT KNUDSEN</div>
        <div id="text7" style={configurations.texts[7]}>SIMON QUARTERMAN</div>
        <div id="text8" style={configurations.texts[8]}>RODRIGO SANTORO</div>
        <div id="text9" style={configurations.texts[9]}>ANGELA SARAFYAN</div>
        <div id="text10" style={configurations.texts[10]}>SHANNON WOODWARD</div>
        <div id="text11" style={configurations.texts[11]}>WITH ED HARRIS</div>
        <div id="text12" style={configurations.texts[12]}>ANTHONY HOPKINS</div>
        <div id="text13" style={configurations.texts[13]}>MUSIC BY RAMIN DJAWADI</div>
        <div id="text14" style={configurations.texts[14]}>EDITED BY STEPHEN SMEL, ACE MARC JOZEFOMICZ</div>
        <div id="text15" style={configurations.texts[15]}>PRODUCTION DESIGNER NATHAN CROWLEY</div>
        <div id="text16" style={configurations.texts[16]}>DIRECTOR OF PHOTOGRAPHY PAUL CAMERON, ASC</div>
        <div id="text17" style={configurations.texts[17]}>CO-PRODUCER BRUCE DUNN</div>
        <div id="text18" style={configurations.texts[18]}>CO-PRODUCER SUSAN EKINS</div>
        <div id="text19" style={configurations.texts[19]}>CO-PRODUCER STEPHEN SEMEL</div>
        <div id="text20" style={configurations.texts[20]}>CO-EXECUTIVE PRODUCER DAVID COATSWORTH</div>
        <div id="text21" style={configurations.texts[21]}>CO-EXECUTIVE PRODUCER KATHY LINGG</div>
        <div id="text22" style={configurations.texts[22]}>CO-EXECUTIVE PRODUCER ATHENA WICKHAM</div>
        <div id="text23" style={configurations.texts[23]}>EXECUTIVE PRODUCER BRYAN BURK</div>
        <div id="text24" style={configurations.texts[24]}>EXECUTIVE PRODUCER JERRY WEINTRAUB</div>
        <div id="text25" style={configurations.texts[25]}>EXECUTIVE PRODUCER LISA JOY</div>
        <div id="text26" style={configurations.texts[26]}>EXECUTIVE PRODUCER JONATHAN NOLAN</div>
        <div id="text27" style={configurations.texts[27]}>EXECUTIVE PRODUCER J.J. ABRAMS</div>
        <div id="text28" style={configurations.texts[28]}>WESTWORLD</div>
        <div id="text29" style={configurations.texts[29]}>CREATED FOR TELEVISION BY JONATHAN NOLAN & LISA JOY</div>
        <div id="text30" style={configurations.texts[30]}>BASED ON THE FILM WRITTEN BY MICHAEL CRICHTON</div>
        <div id="text31" style={configurations.texts[31]}>TELEPLAY BY JONATHAN NOLAN & LISA JOY</div>
        <div id="text32" style={configurations.texts[32]}>STORY BY JONATHAN NOLAN & LISA JOY AND MICHAEL CRICHTON</div>
        <div id="text33" style={configurations.texts[33]}>DIRECTED BY JONATHAN NOLAN</div>
      </div>
    </div>
  );
};

VideoOverlay.propTypes = {
  configurations: PropTypes.object,
  play: PropTypes.bool,
};

export default VideoOverlay;

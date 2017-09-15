/*
Default UI Settings to be instatiated (and possibly changed) elsewhere.
Values have been manually set based on a 800x600 screenview.
*/

var ui_settings = {
    pad: 10,  // space between things
    fontSize: 16,
    statusPanelHeight: 70,  // status display on travelScreen & shop
    statusSupplyWidth: 230,
    statusTrajWidth: 230,
    statusHealthWidth: 230,
    buttonH: 80,  // suggested button size
    buttonW: 140,
    panelAlpha: 0.4,  // suggested panel opacity
    leftPanelW: 400-10,
    middlePanelH: 300
}

ui_settings.middlePanelTop = ui_settings.statusPanelHeight+ui_settings.pad
// middle panel height should fill space in between status panel and
//   bottom panel / buttons row.
ui_settings.middlePanelH = globalData.h -
    ( ui_settings.middlePanelTop + ui_settings.buttonH + ui_settings.pad*2)

module.exports = ui_settings

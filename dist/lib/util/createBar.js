"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBar = void 0;
const emojis_1 = require("./emojis");
function createBar(currentValue, maxValue) {
  const barLength = 14;
  const unitValue = maxValue / barLength;
  // 埋まっているセクションと埋まっていないセクションを計算
  const filledSections = Math.floor(currentValue / unitValue);
  const emptySections = Math.max(barLength - filledSections, 0);
  // 左端、中央、右端のマーカー
  const leftMarker =
    currentValue >= unitValue ? emojis_1.Full_LeftG : emojis_1.Empty_LeftG;
  const middleMarker = emojis_1.Full_InnerG;
  const rightMarker =
    filledSections === barLength ? emojis_1.Full_RightG : emojis_1.Empty_RightG;
  // プログレスバーを生成
  return `${leftMarker}${middleMarker.repeat(filledSections)}${emojis_1.Empty_InnerG.repeat(emptySections)}${rightMarker}`;
}
exports.createBar = createBar;

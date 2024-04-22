"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.symbolToStr = void 0;
var PlayerSymbol;
(function (PlayerSymbol) {
    PlayerSymbol[PlayerSymbol["Empty"] = 0] = "Empty";
    PlayerSymbol[PlayerSymbol["Black"] = 1] = "Black";
    PlayerSymbol[PlayerSymbol["White"] = 2] = "White";
})(PlayerSymbol || (PlayerSymbol = {}));
exports.symbolToStr = {
    [PlayerSymbol.Empty]: ".",
    [PlayerSymbol.Black]: "B",
    [PlayerSymbol.White]: "W",
};
exports.default = PlayerSymbol;

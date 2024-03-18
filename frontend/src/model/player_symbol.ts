enum PlayerSymbol {
  Empty = 0,
  Black = 1,
  White = 2,
}

export const symbolToStr: Record<PlayerSymbol, string> = {
  [PlayerSymbol.Empty]: '.',
  [PlayerSymbol.Black]: 'B',
  [PlayerSymbol.White]: 'W',
}

export default PlayerSymbol

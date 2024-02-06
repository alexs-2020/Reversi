enum PlayerSymbol {
  Empty = 0,
  X = 1,
  O = 2
}

export const symbolToStr: Record<PlayerSymbol, string> = {
  [PlayerSymbol.Empty]: '.',
  [PlayerSymbol.X]: 'X',
  [PlayerSymbol.O]: 'O'
};

export default PlayerSymbol;

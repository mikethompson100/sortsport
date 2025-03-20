
export default function getStatClass(rank, ascend) {
  if (!ascend) {
    switch (true) {
      case rank === 1:
        return 'topRank1';
      case (rank >= 2 && rank <= 5):
        return 'topRank2to5';
      case (rank >= 6 && rank <= 10):
        return 'topRank6to10';
      case (rank >= 20 && rank <= 24):
        return 'botRank6to10';
      case (rank >= 25 && rank <= 29):
        return 'botRank2to5';
      case (rank === 30):
        return 'botRank1';
      default: return
    }
  }
  else if (ascend) {
    switch (true) {
      case rank === 1:
        return 'botRank1';
      case (rank >= 2 && rank <= 5):
        return 'botRank2to5';
      case (rank >= 6 && rank <= 10):
        return 'botRank6to10';
      case (rank >= 20 && rank <= 24):
        return 'topRank6to10';
      case (rank >= 25 && rank <= 29):
        return 'topRank2to5';
      case (rank === 30):
        return 'topRank1';
      default: return
    }
  }
  else throw new Error("The order is invalid");
};

export default function getStatClass(greaterCount, lesserCount, ascend) {
  if (!ascend) {
    switch (true) {
      case greaterCount === 0:
        return 'topRank1';
      case greaterCount <= 4:
        return 'topRank2to5';
      case greaterCount <= 9:
        return 'topRank6to10';
      case lesserCount === 0:
        return 'botRank1';
      case lesserCount <= 4:
        return 'botRank2to5';
      case lesserCount <= 9:
        return 'botRank6to10';
      default: return
    }
  }
  switch (true) {
    case lesserCount === 0:
      return 'topRank1';
    case lesserCount <= 4:
      return 'topRank2to5';
    case lesserCount <= 9:
      return 'topRank6to10';
    case greaterCount === 0:
      return 'botRank1';
    case greaterCount <= 4:
      return 'botRank2to5';
    case greaterCount <= 9:
      return 'botRank6to10';
    default: return
  }
  
};
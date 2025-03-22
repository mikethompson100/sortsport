export const MLB_STATS_HITTING = 'https://statsapi.mlb.com/api/v1/teams/stats?sportIds=1&stats=season&group=hitting';
export const MLB_STATS_PITCHING = 'https://statsapi.mlb.com/api/v1/teams/stats?sportIds=1&stats=season&group=pitching';
//export const MLB_STATS = 'https://statsapi.mlb.com/api/v1/teams/stats?season=2024&group=hitting&stats=season&sportIds=1';
//export const NFL = '';
//export const NBA = '';
//export const NHL = '';

export const allHittingColumns = [
  { name: "runs", ascend: false, title: "Runs" },
  { name: "hits", ascend: false, title: "Hit" },
  { name: "doubles", ascend: false, title: "2b" },
  { name: "triples", ascend: false, title: "3b" },
  { name: "homeRuns", ascend: false, title: "Hr" },
  { name: "rbi", ascend: false, title: "Rbi" },
  { name: "atBatsPerHomeRun", ascend: true, title: "Abph" },
  { name: "baseOnBalls", ascend: false, title: "Bb" },
  { name: "stolenBases", ascend: false, title: "Sb" },
  { name: "avg", ascend: false, title: "Avg" },
  { name: "strikeOuts", ascend: true, title: "So" },
  { name: "groundOuts", ascend: true, title: "Go" },
  { name: "airOuts", ascend: true, title: "Ao" },
  { name: "groundIntoDoublePlay", ascend: true, title: "Gidp" }
];

export const allPitchingColumns = [
  { name: "era", ascend: true, title: "Era" },
  { name: "runs", ascend: true, title: "Runs" },
  { name: "homeRuns", ascend: true, title: "Hr"},
  { name: "strikeOuts", ascend: false, title: "So" },
  { name: "baseOnBalls", ascend: true, title: "Bb"},
  { name: "strikeoutWalkRatio", ascend: false, title: "SoWr" },
  { name: "groundOuts", ascend: false, title: "Go" },
  { name: "airOuts", ascend: false, title: "Ao" },
  { name: "groundOutsToAirouts", ascend: false, title: "GoAo" },
  { name: "avg", ascend: true, title: "Avg" },
  { name: "stolenBases", ascend: true, title: "Sb"},
  { name: "caughtStealing", ascend: false, title: "Cs" },
  { name: "stolenBasePercentage", ascend: true, title: "SbP"},
  { name: "groundIntoDoublePlay", ascend: false, title: "GiDP" }
];
export default MLB_STATS_HITTING;
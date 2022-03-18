var dict = {}
const ss = SpreadsheetApp.getActiveSpreadsheet();

class Player{
  constructor(name){
    this.name = name; // プレイヤー名
    this.point = 0; // ポイント
    this.gameCount = 1; // 試合数（ここで初期化）
    this.sectionCount = 0; // 局数
    this.rank = [0,0,0,0]; // 着順（1位の回数、2位の回数、3位の回数、4位の回数）
    this.maxScore = 0; // 最高スコア
    this.winCount = 0; // 和了回数
    this.datenSum = [0,0]; // 平均打点を出すための合計打点（合計打点、回数）
    this.ryukyokuTenpai = [0,0] // 流局時聴牌率（テンパイ回数、流局回数）
    this.riichiCount = 0 // リーチ回数
    this.fuloCount = 0 // 副露回数
  }
}

// ヘッダ行ならtrue
function isRoundHeader(cellStr){
  //console.log(typeof cellStr);
  if(cellStr.toString().match(/試合目/) == null){
    return false;
  }else{
    return true;
  }
}
// 試合数をカウント
function addGameCount(name){
  if(dict[name] == null){
    dict[name] = new Player(name);
  }else{
    dict[name].gameCount++;
  }
}
// 局数をカウント
function addSectionCount(name,count){
  dict[name].sectionCount += count;
}

// その試合の対局数
function getSectionCount(sheet, row){
  var sectionCount = 0;
  for(var rowCounter = row; rowCounter < sheet.getLastRow(); rowCounter++){
    var temp = Number(sheet.getRange(rowCounter,1).getValue());
    if(!isNaN(temp) && temp > sectionCount){
      sectionCount = temp;
    }

    // 次の行が次の試合の行だったらbreak
    if(sheet.getRange(rowCounter+1,1).getValue().toString().match(/試合目/) != null){
      break;
    }
  }
  return sectionCount;
}

// 順位算出（数値配列を渡すと順位の配列を返す）
function ranking(score){
  var sorted = score.slice().sort(function(a, b){return b - a});
  var ranks = score.slice().map(function(x){return sorted.indexOf(x) + 1});
  return ranks;
}

// 順位をカウント
function addRankCount(name,rank){
  if(rank == 1) dict[name].rank[0]++;
  else if(rank == 2) dict[name].rank[1]++;
  else if(rank == 3) dict[name].rank[2]++;
  else if(rank == 4) dict[name].rank[3]++;
}

// 最高得点を記録（渡したスコアが現状を超えていれば記録）
function setMaxScore(name,score){
  if(dict[name].maxScore < score) dict[name].maxScore = score;
}

// その試合の和了回数を取得
function getWinCount(winRows){
  winCount = 0;
  for(var temp of winRows){
    if(temp[0] != ""){
      winCount++;
    }
  }
  return winCount;
}
// 和了回数を記録
function setWinCount(name, count){
  dict[name].winCount += count;
}

// その試合の打点の合計を取得
function getDaten(datenRows){
  var daten = [0,0];
  for(var temp of datenRows){
    if(temp[0] != "" && Number(temp[0]) >= 0){
      daten = [daten[0]+Number(temp[0]), daten[1]+1];
    }
  }
  return daten;
}

// 打点の合計を記録
function setDatenSum(name, daten){
  dict[name].datenSum = [dict[name].datenSum[0]+daten[0], dict[name].datenSum[1]+daten[1]];
}

// 流局時テンパイだったらカウント
function addRyukyokuTenpai(name, result){
  if(result == "聴牌"){
    dict[name].ryukyokuTenpai = [dict[name].ryukyokuTenpai[0]+1, dict[name].ryukyokuTenpai[1]+1];
  }else{
    dict[name].ryukyokuTenpai = [dict[name].ryukyokuTenpai[0], dict[name].ryukyokuTenpai[1]+1];
  }
}

// リーチ回数を記録
function addRiichiCount(name, resultRows){
  var count = 0;
  for(var row of resultRows){
    if(row[0] == "立直") count++;
  }
  dict[name].riichiCount = dict[name].riichiCount + count;
}

// 鳴き回数を記録
function addFuloCount(name, resultRows){
  var count = 0;
  for(var row of resultRows){
    if(row[0].match(/副露/) != null){
      //count += Number(row[0].split('副')[0]); // 「鳴いた回数」を出す場合
      count++; // 「鳴いた局数」を出す場合
    }
  }
  dict[name].fuloCount = dict[name].fuloCount + count;
}

function calcGame(sheetName) {
  //const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(sheetName);
  //console.log(sheet.getName());

  // 試合ごとにループ
  for(var rowCounter = 1; rowCounter < sheet.getLastRow(); rowCounter++){
    // 試合のヘッダ行でなければcontinue
    if(!isRoundHeader(sheet.getRange(rowCounter,1).getValue())) continue;

    // その試合のプレイヤー名を取得
    var playerName1 = sheet.getRange(rowCounter,6).getValue();
    var playerName2 = sheet.getRange(rowCounter,11).getValue();
    var playerName3 = sheet.getRange(rowCounter,16).getValue();
    var playerName4 = sheet.getRange(rowCounter,21).getValue();

    // ユーザと参加回数設定
    addGameCount(playerName1);
    addGameCount(playerName2);
    addGameCount(playerName3);
    addGameCount(playerName4);

    // 局数カウント
    var sectionCount = getSectionCount(sheet, rowCounter);
    //console.log(sectionCount);
    addSectionCount(playerName1, sectionCount);
    addSectionCount(playerName2, sectionCount);
    addSectionCount(playerName3, sectionCount);
    addSectionCount(playerName4, sectionCount);

    // その試合の最終点数を取得
    var score = [
      Number(sheet.getRange(rowCounter+sectionCount+3,9).getValue()),
      Number(sheet.getRange(rowCounter+sectionCount+3,14).getValue()),
      Number(sheet.getRange(rowCounter+sectionCount+3,19).getValue()),
      Number(sheet.getRange(rowCounter+sectionCount+3,24).getValue())
    ];

    // 順位カウント
    var rank = ranking(score);
    addRankCount(playerName1,rank[0]);
    addRankCount(playerName2,rank[1]);
    addRankCount(playerName3,rank[2]);
    addRankCount(playerName4,rank[3]);

    // 最高スコア
    setMaxScore(playerName1, score[0]);
    setMaxScore(playerName2, score[1]);
    setMaxScore(playerName3, score[2]);
    setMaxScore(playerName4, score[3]);

    // 和了回数
    // その試合の和了回数を取得
    var winCount = [
      getWinCount(sheet.getRange(rowCounter+3,7,sectionCount,1).getValues()),
      getWinCount(sheet.getRange(rowCounter+3,12,sectionCount,1).getValues()),
      getWinCount(sheet.getRange(rowCounter+3,17,sectionCount,1).getValues()),
      getWinCount(sheet.getRange(rowCounter+3,22,sectionCount,1).getValues())
    ];
    setWinCount(playerName1, winCount[0]);
    setWinCount(playerName2, winCount[1]);
    setWinCount(playerName3, winCount[2]);
    setWinCount(playerName4, winCount[3]);

    // 打点（その試合あたりの合計）
    var daten = [
      getDaten(sheet.getRange(rowCounter+3,8,sectionCount,1).getValues()),
      getDaten(sheet.getRange(rowCounter+3,13,sectionCount,1).getValues()),
      getDaten(sheet.getRange(rowCounter+3,18,sectionCount,1).getValues()),
      getDaten(sheet.getRange(rowCounter+3,23,sectionCount,1).getValues())
    ];
    setDatenSum(playerName1, daten[0]);
    setDatenSum(playerName2, daten[1]);
    setDatenSum(playerName3, daten[2]);
    setDatenSum(playerName4, daten[3]);
    
    // 流局時聴牌率
    for(var row = 0; row < sectionCount; row++){
      var tempRow = sheet.getRange(rowCounter+3 + row, 1, 1, 24).getValues();
      if(tempRow[0][3] == "流局"){
        addRyukyokuTenpai(playerName1, tempRow[0][5]);
        addRyukyokuTenpai(playerName2, tempRow[0][10]);
        addRyukyokuTenpai(playerName3, tempRow[0][15]);
        addRyukyokuTenpai(playerName4, tempRow[0][20]);
      }
    }

    // リーチ回数
    addRiichiCount(playerName1, sheet.getRange(rowCounter+3,10,sectionCount,1).getValues());
    addRiichiCount(playerName2, sheet.getRange(rowCounter+3,15,sectionCount,1).getValues());
    addRiichiCount(playerName3, sheet.getRange(rowCounter+3,20,sectionCount,1).getValues());
    addRiichiCount(playerName4, sheet.getRange(rowCounter+3,25,sectionCount,1).getValues());

    // 副露回数
    addFuloCount(playerName1, sheet.getRange(rowCounter+3,10,sectionCount,1).getValues());
    addFuloCount(playerName2, sheet.getRange(rowCounter+3,15,sectionCount,1).getValues());
    addFuloCount(playerName3, sheet.getRange(rowCounter+3,20,sectionCount,1).getValues());
    addFuloCount(playerName4, sheet.getRange(rowCounter+3,25,sectionCount,1).getValues());
  }
  console.log(dict);
}

// 除算を行うけどゼロ除算が行われるようなら「0」を返す
function zeroDivide(a, b){
  if(a == 0 || b == 0) return 0;
  else{
    return Math.floor(a / b * 1000) / 1000;
  } 
}

function setRow(sheet, rowCount, player){
  sheet.getRange(rowCount, 1, 1, 15).setValues([[
    player.name,
    player.point,
    player.gameCount,
    player.sectionCount,
    zeroDivide((player.rank[0]*1 + player.rank[1]*2 + player.rank[2]*3 + player.rank[3]*4), player.gameCount), // 平均着順
    (player.rank[0]),
    (player.rank[1]),
    (player.rank[2]),
    (player.rank[3]),
    player.maxScore,
    player.winCount,
    zeroDivide(Number(player.datenSum[0]), Number(player.datenSum[1])),
    zeroDivide(Number(player.ryukyokuTenpai[0]), Number(player.ryukyokuTenpai[1])),
    zeroDivide(Number(player.riichiCount),Number(player.sectionCount)),
    zeroDivide(Number(player.fuloCount), Number(player.sectionCount))
    ]]);
}

function myFunction(){

  const sheet = ss.getSheetByName("集計結果");
  calcGame(sheet.getRange(1,2).getValue());
  
  rowCount = 6;
  Object.keys(dict).forEach( function(player) {
    setRow(sheet, rowCount, this[player]);
    rowCount++;
  }, dict)
}
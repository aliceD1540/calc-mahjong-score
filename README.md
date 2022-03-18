# 身内でやってる麻雀スコア計算機

script.js をスプレッドシートのGASにコピペして使う。  
頻繁に更新するようならもうちょっとスマートな方法考える。  

1. スプレッドシートに試合結果を記録
2. 本スクリプトのmyFunctionを実行

想定する試合結果の表

<table class="waffle" cellspacing="0" cellpadding="0"><thead><tr><th class="row-header freezebar-origin-ltr"></th><th id="845849110C0" style="width:100px;" class="column-headers-background">A</th><th id="845849110C1" style="width:100px;" class="column-headers-background">B</th><th id="845849110C2" style="width:100px;" class="column-headers-background">C</th><th id="845849110C3" style="width:100px;" class="column-headers-background">D</th><th id="845849110C4" style="width:100px;" class="column-headers-background">E</th><th id="845849110C5" style="width:100px;" class="column-headers-background">F</th><th id="845849110C6" style="width:100px;" class="column-headers-background">G</th><th id="845849110C7" style="width:100px;" class="column-headers-background">H</th><th id="845849110C8" style="width:100px;" class="column-headers-background">I</th><th id="845849110C9" style="width:100px;" class="column-headers-background">J</th><th id="845849110C10" style="width:100px;" class="column-headers-background">K</th><th id="845849110C11" style="width:100px;" class="column-headers-background">L</th><th id="845849110C12" style="width:100px;" class="column-headers-background">M</th><th id="845849110C13" style="width:100px;" class="column-headers-background">N</th><th id="845849110C14" style="width:100px;" class="column-headers-background">O</th><th id="845849110C15" style="width:100px;" class="column-headers-background">P</th><th id="845849110C16" style="width:100px;" class="column-headers-background">Q</th><th id="845849110C17" style="width:100px;" class="column-headers-background">R</th><th id="845849110C18" style="width:100px;" class="column-headers-background">S</th><th id="845849110C19" style="width:100px;" class="column-headers-background">T</th><th id="845849110C20" style="width:100px;" class="column-headers-background">U</th><th id="845849110C21" style="width:100px;" class="column-headers-background">V</th><th id="845849110C22" style="width:100px;" class="column-headers-background">W</th><th id="845849110C23" style="width:100px;" class="column-headers-background">X</th><th id="845849110C24" style="width:100px;" class="column-headers-background">Y</th><th id="845849110C25" style="width:100px;" class="column-headers-background">Z</th><th id="845849110C26" style="width:100px;" class="column-headers-background">AA</th><th id="845849110C27" style="width:100px;" class="column-headers-background">AB</th><th id="845849110C28" style="width:100px;" class="column-headers-background">AC</th><th id="845849110C29" style="width:100px;" class="column-headers-background">AD</th><th id="845849110C30" style="width:100px;" class="column-headers-background">AE</th><th id="845849110C31" style="width:100px;" class="column-headers-background">AF</th><th id="845849110C32" style="width:100px;" class="column-headers-background">AG</th></tr></thead><tbody><tr style="height: 20px"><th id="845849110R0" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">1</div></th><td class="s0" dir="ltr" colspan="5">1/1 1試合目</td><td class="s1" dir="ltr" colspan="7"> プレイヤー1</td><td class="s2" dir="ltr" colspan="7"> プレイヤー2</td><td class="s3" dir="ltr" colspan="7"> プレイヤー3</td><td class="s4" dir="ltr" colspan="7"> プレイヤー4</td></tr><tr style="height: 20px"><th id="845849110R1" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">2</div></th><td class="s5" dir="ltr"></td><td class="s6" dir="ltr" colspan="2">局</td><td class="s6" dir="ltr">流局</td><td class="s6" dir="ltr">親</td><td class="s7" dir="ltr">結果</td><td class="s7" dir="ltr">和了</td><td class="s7" dir="ltr">失点</td><td class="s7" dir="ltr">和了点</td><td class="s7" dir="ltr">積み棒<br>供託</td><td class="s7" dir="ltr">持ち点</td><td class="s6" dir="ltr">状態</td><td class="s7" dir="ltr">結果</td><td class="s7" dir="ltr">和了</td><td class="s7" dir="ltr">失点</td><td class="s7" dir="ltr">和了点</td><td class="s7" dir="ltr">積み棒<br>供託</td><td class="s7" dir="ltr">持ち点</td><td class="s6" dir="ltr">状態</td><td class="s7" dir="ltr">結果</td><td class="s7" dir="ltr">和了</td><td class="s7" dir="ltr">失点</td><td class="s7" dir="ltr">和了点</td><td class="s7" dir="ltr">積み棒<br>供託</td><td class="s7" dir="ltr">持ち点</td><td class="s6" dir="ltr">状態</td><td class="s7" dir="ltr">結果</td><td class="s7" dir="ltr">和了</td><td class="s7" dir="ltr">失点</td><td class="s7" dir="ltr">和了点</td><td class="s7" dir="ltr">積み棒<br>供託</td><td class="s7" dir="ltr">持ち点</td><td class="s6" dir="ltr">状態</td></tr><tr style="height: 20px"><th id="845849110R2" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">3</div></th><td class="s8" dir="ltr"></td><td class="s9" dir="ltr" colspan="2"></td><td class="s9" dir="ltr"></td><td class="s9" dir="ltr"></td><td class="s10" dir="ltr"></td><td class="s10" dir="ltr"></td><td class="s8" dir="ltr"></td><td class="s10" dir="ltr"></td><td class="s10" dir="ltr"></td><td class="s8" dir="ltr">25000</td><td class="s9" dir="ltr"></td><td class="s10" dir="ltr"></td><td class="s10" dir="ltr"></td><td class="s8" dir="ltr"></td><td class="s10" dir="ltr"></td><td class="s10" dir="ltr"></td><td class="s8" dir="ltr">25000</td><td class="s9" dir="ltr"></td><td class="s10" dir="ltr"></td><td class="s10" dir="ltr"></td><td class="s8" dir="ltr"></td><td class="s10" dir="ltr"></td><td class="s10" dir="ltr"></td><td class="s8" dir="ltr">25000</td><td class="s9" dir="ltr"></td><td class="s10" dir="ltr"></td><td class="s10" dir="ltr"></td><td class="s8" dir="ltr"></td><td class="s10" dir="ltr"></td><td class="s10" dir="ltr"></td><td class="s8" dir="ltr">25000</td><td class="s9" dir="ltr"></td></tr><tr style="height: 20px"><th id="845849110R3" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">4</div></th><td class="s11" dir="ltr">1</td><td class="s12" dir="ltr">東1局</td><td class="s13"></td><td class="s13" dir="ltr"></td><td class="s13" dir="ltr"> プレイヤー1</td><td class="s14" dir="ltr"></td><td class="s14"></td><td class="s11"></td><td class="s15" dir="ltr"></td><td class="s15" dir="ltr"></td><td class="s11" dir="ltr">25000</td><td class="s13" dir="ltr"></td><td class="s14" dir="ltr">放銃</td><td class="s14"></td><td class="s11" dir="ltr">-2600</td><td class="s15" dir="ltr"></td><td class="s15" dir="ltr"></td><td class="s11" dir="ltr">22400</td><td class="s13" dir="ltr"></td><td class="s14" dir="ltr"></td><td class="s14" dir="ltr"></td><td class="s11" dir="ltr"></td><td class="s15" dir="ltr"></td><td class="s15" dir="ltr"></td><td class="s11" dir="ltr">25000</td><td class="s13" dir="ltr">1副露</td><td class="s14" dir="ltr">ロン</td><td class="s14" dir="ltr">副露</td><td class="s11" dir="ltr"></td><td class="s11" dir="ltr">2600</td><td class="s15" dir="ltr"></td><td class="s11" dir="ltr">27600</td><td class="s13" dir="ltr">4副露</td></tr><tr style="height: 20px"><th id="845849110R4" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">5</div></th><td class="s11" dir="ltr">2</td><td class="s12" dir="ltr">東2局</td><td class="s13" dir="ltr"></td><td class="s13" dir="ltr"></td><td class="s13" dir="ltr"> プレイヤー2</td><td class="s14"></td><td class="s14"></td><td class="s11"></td><td class="s15" dir="ltr"></td><td class="s15" dir="ltr"></td><td class="s11" dir="ltr">25000</td><td class="s13"></td><td class="s14" dir="ltr"></td><td class="s14" dir="ltr"></td><td class="s11" dir="ltr"></td><td class="s15" dir="ltr"></td><td class="s15" dir="ltr"></td><td class="s11" dir="ltr">22400</td><td class="s13" dir="ltr"></td><td class="s14" dir="ltr">ロン</td><td class="s14" dir="ltr">副露</td><td class="s11" dir="ltr"></td><td class="s11" dir="ltr">3900</td><td class="s11" dir="ltr">1000</td><td class="s11" dir="ltr">29900</td><td class="s13" dir="ltr">1副露</td><td class="s14" dir="ltr">放銃</td><td class="s14"></td><td class="s11" dir="ltr">-3900</td><td class="s15" dir="ltr"></td><td class="s11" dir="ltr">-1000</td><td class="s11" dir="ltr">22700</td><td class="s13" dir="ltr">立直</td></tr><tr style="height: 20px"><th id="845849110R5" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">6</div></th><td class="s11" dir="ltr">3</td><td class="s12" dir="ltr">東3局</td><td class="s13" dir="ltr"></td><td class="s13" dir="ltr"></td><td class="s13" dir="ltr"> プレイヤー3</td><td class="s14" dir="ltr">ロン</td><td class="s14" dir="ltr">立直</td><td class="s11"></td><td class="s11" dir="ltr">8000</td><td class="s15" dir="ltr"></td><td class="s11" dir="ltr">33000</td><td class="s13" dir="ltr">立直</td><td class="s14" dir="ltr"></td><td class="s14" dir="ltr"></td><td class="s11" dir="ltr"></td><td class="s15" dir="ltr"></td><td class="s15" dir="ltr"></td><td class="s11" dir="ltr">22400</td><td class="s13" dir="ltr"></td><td class="s14" dir="ltr"></td><td class="s14" dir="ltr"></td><td class="s11" dir="ltr"></td><td class="s15" dir="ltr"></td><td class="s15" dir="ltr"></td><td class="s11" dir="ltr">29900</td><td class="s13" dir="ltr">2副露</td><td class="s14" dir="ltr">放銃</td><td class="s14"></td><td class="s11" dir="ltr">-8000</td><td class="s15" dir="ltr"></td><td class="s15" dir="ltr"></td><td class="s11" dir="ltr">14700</td><td class="s13" dir="ltr">1副露</td></tr><tr style="height: 20px"><th id="845849110R6" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">7</div></th><td class="s11" dir="ltr">4</td><td class="s12" dir="ltr">東4局</td><td class="s13" dir="ltr"></td><td class="s13" dir="ltr"></td><td class="s13" dir="ltr"> プレイヤー4</td><td class="s14" dir="ltr"></td><td class="s14"></td><td class="s11"></td><td class="s15" dir="ltr"></td><td class="s11" dir="ltr">-1000</td><td class="s11" dir="ltr">32000</td><td class="s13" dir="ltr"></td><td class="s14" dir="ltr">ロン</td><td class="s14" dir="ltr">立直</td><td class="s11"></td><td class="s11" dir="ltr">3900</td><td class="s11" dir="ltr">1000</td><td class="s11" dir="ltr">27300</td><td class="s13" dir="ltr">立直</td><td class="s14" dir="ltr"></td><td class="s14" dir="ltr"></td><td class="s11" dir="ltr"></td><td class="s15" dir="ltr"></td><td class="s15" dir="ltr"></td><td class="s11" dir="ltr">29900</td><td class="s13" dir="ltr"></td><td class="s14" dir="ltr">放銃</td><td class="s14"></td><td class="s11" dir="ltr">-3900</td><td class="s15" dir="ltr"></td><td class="s15" dir="ltr"></td><td class="s11" dir="ltr">10800</td><td class="s13" dir="ltr"></td></tr><tr style="height: 20px"><th id="845849110R7" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">8</div></th><td class="s11" dir="ltr">5</td><td class="s12" dir="ltr">南1局</td><td class="s13" dir="ltr"></td><td class="s13" dir="ltr"></td><td class="s13" dir="ltr"> プレイヤー1</td><td class="s14" dir="ltr">放銃</td><td class="s14" dir="ltr"></td><td class="s11" dir="ltr">-1300</td><td class="s15" dir="ltr"></td><td class="s15" dir="ltr"></td><td class="s11" dir="ltr">30700</td><td class="s13" dir="ltr"></td><td class="s14" dir="ltr">ロン</td><td class="s14" dir="ltr">立直</td><td class="s11"></td><td class="s11" dir="ltr">1300</td><td class="s15" dir="ltr"></td><td class="s11" dir="ltr">28600</td><td class="s13" dir="ltr">立直</td><td class="s14"></td><td class="s14"></td><td class="s11"></td><td class="s15" dir="ltr"></td><td class="s15" dir="ltr"></td><td class="s11" dir="ltr">29900</td><td class="s13" dir="ltr"></td><td class="s14" dir="ltr"></td><td class="s14" dir="ltr"></td><td class="s11" dir="ltr"></td><td class="s15" dir="ltr"></td><td class="s15" dir="ltr"></td><td class="s11" dir="ltr">10800</td><td class="s13" dir="ltr">2副露</td></tr><tr style="height: 20px"><th id="845849110R8" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">9</div></th><td class="s11" dir="ltr">6</td><td class="s12" dir="ltr">南2局</td><td class="s13" dir="ltr"></td><td class="s13" dir="ltr"></td><td class="s13" dir="ltr"> プレイヤー2</td><td class="s14" dir="ltr"></td><td class="s14" dir="ltr"></td><td class="s11" dir="ltr"></td><td class="s11" dir="ltr">-1600</td><td class="s11" dir="ltr">-1000</td><td class="s11" dir="ltr">28100</td><td class="s13" dir="ltr">立直</td><td class="s14" dir="ltr"></td><td class="s14"></td><td class="s11" dir="ltr">-3200</td><td class="s15" dir="ltr"></td><td class="s15" dir="ltr"></td><td class="s11" dir="ltr">25400</td><td class="s13" dir="ltr">3副露</td><td class="s14" dir="ltr"></td><td class="s14"></td><td class="s11" dir="ltr">-1600</td><td class="s15" dir="ltr"></td><td class="s15" dir="ltr"></td><td class="s11" dir="ltr">28300</td><td class="s13" dir="ltr"></td><td class="s14" dir="ltr">ツモ</td><td class="s14" dir="ltr">副露</td><td class="s11"></td><td class="s11" dir="ltr">6400</td><td class="s11" dir="ltr">1000</td><td class="s11" dir="ltr">18200</td><td class="s13" dir="ltr">3副露</td></tr><tr style="height: 20px"><th id="845849110R9" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">10</div></th><td class="s11" dir="ltr">7</td><td class="s12" dir="ltr">南3局</td><td class="s13" dir="ltr"></td><td class="s13" dir="ltr"></td><td class="s13" dir="ltr"> プレイヤー3</td><td class="s14"></td><td class="s14"></td><td class="s11"></td><td class="s15" dir="ltr"></td><td class="s15" dir="ltr"></td><td class="s11" dir="ltr">28100</td><td class="s13"></td><td class="s14" dir="ltr">放銃</td><td class="s14"></td><td class="s11" dir="ltr">-2000</td><td class="s15" dir="ltr"></td><td class="s15" dir="ltr"></td><td class="s11" dir="ltr">23400</td><td class="s13" dir="ltr"></td><td class="s14" dir="ltr">ロン</td><td class="s14" dir="ltr">黙聴</td><td class="s11"></td><td class="s11" dir="ltr">2000</td><td class="s15" dir="ltr"></td><td class="s11" dir="ltr">30300</td><td class="s13" dir="ltr"></td><td class="s14" dir="ltr"></td><td class="s14" dir="ltr"></td><td class="s11" dir="ltr"></td><td class="s15" dir="ltr"></td><td class="s15" dir="ltr"></td><td class="s11" dir="ltr">18200</td><td class="s13" dir="ltr">1副露</td></tr><tr style="height: 20px"><th id="845849110R10" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">11</div></th><td class="s11" dir="ltr">8</td><td class="s12" dir="ltr">南3局</td><td class="s13" dir="ltr">1本場</td><td class="s13" dir="ltr"></td><td class="s13" dir="ltr"> プレイヤー3</td><td class="s14" dir="ltr">放銃</td><td class="s14" dir="ltr"></td><td class="s11" dir="ltr">-1000</td><td class="s15" dir="ltr"></td><td class="s11" dir="ltr">-300</td><td class="s11" dir="ltr">26800</td><td class="s13" dir="ltr"></td><td class="s14" dir="ltr">ロン</td><td class="s14" dir="ltr">副露</td><td class="s11"></td><td class="s11" dir="ltr">1000</td><td class="s11" dir="ltr">300</td><td class="s11" dir="ltr">24700</td><td class="s13" dir="ltr">1副露</td><td class="s14" dir="ltr"></td><td class="s14"></td><td class="s11"></td><td class="s15" dir="ltr"></td><td class="s15" dir="ltr"></td><td class="s11" dir="ltr">30300</td><td class="s13" dir="ltr"></td><td class="s14" dir="ltr"></td><td class="s14"></td><td class="s11"></td><td class="s15" dir="ltr"></td><td class="s15" dir="ltr"></td><td class="s11" dir="ltr">18200</td><td class="s13" dir="ltr"></td></tr><tr style="height: 20px"><th id="845849110R11" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">12</div></th><td class="s11" dir="ltr">9</td><td class="s12" dir="ltr">南4局</td><td class="s13" dir="ltr"></td><td class="s13" dir="ltr"></td><td class="s13" dir="ltr"> プレイヤー4</td><td class="s14" dir="ltr">ツモ</td><td class="s14" dir="ltr">副露</td><td class="s11" dir="ltr"></td><td class="s11" dir="ltr">2000</td><td class="s15" dir="ltr"></td><td class="s11" dir="ltr">28800</td><td class="s13" dir="ltr">1副露</td><td class="s14" dir="ltr"></td><td class="s14" dir="ltr"></td><td class="s11" dir="ltr">-500</td><td class="s15" dir="ltr"></td><td class="s15" dir="ltr"></td><td class="s11" dir="ltr">24200</td><td class="s13" dir="ltr"></td><td class="s14" dir="ltr"></td><td class="s14"></td><td class="s11" dir="ltr">-500</td><td class="s15" dir="ltr"></td><td class="s15" dir="ltr"></td><td class="s11" dir="ltr">29800</td><td class="s13"></td><td class="s14" dir="ltr"></td><td class="s14"></td><td class="s11" dir="ltr">-1000</td><td class="s15" dir="ltr"></td><td class="s15" dir="ltr"></td><td class="s11" dir="ltr">17200</td><td class="s13" dir="ltr"></td></tr><tr style="height: 20px"><th id="845849110R12" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">13</div></th><td class="s16" dir="ltr">10</td><td class="s17" dir="ltr">西1局</td><td class="s18" dir="ltr"></td><td class="s18"></td><td class="s18" dir="ltr"> プレイヤー1</td><td class="s19" dir="ltr">放銃</td><td class="s19"></td><td class="s16" dir="ltr">-8000</td><td class="s20" dir="ltr"></td><td class="s20" dir="ltr"></td><td class="s16" dir="ltr">20800</td><td class="s18" dir="ltr"></td><td class="s19" dir="ltr">ロン</td><td class="s19" dir="ltr">立直</td><td class="s16"></td><td class="s16" dir="ltr">8000</td><td class="s20" dir="ltr"></td><td class="s16" dir="ltr">32200</td><td class="s18" dir="ltr">立直</td><td class="s19" dir="ltr"></td><td class="s19"></td><td class="s16"></td><td class="s20" dir="ltr"></td><td class="s20" dir="ltr"></td><td class="s16" dir="ltr">29800</td><td class="s18" dir="ltr">1副露</td><td class="s19" dir="ltr"></td><td class="s19" dir="ltr"></td><td class="s16" dir="ltr"></td><td class="s20" dir="ltr"></td><td class="s20" dir="ltr"></td><td class="s16" dir="ltr">17200</td><td class="s18" dir="ltr">2副露</td></tr><tr style="height: 20px"><th id="845849110R13" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">14</div></th><td class="s16"></td><td class="s17" dir="ltr">終局</td><td class="s18"></td><td class="s18"></td><td class="s18"></td><td class="s19"></td><td class="s19"></td><td class="s16"></td><td class="s20"></td><td class="s20"></td><td class="s16" dir="ltr">20800</td><td class="s18"></td><td class="s19"></td><td class="s19"></td><td class="s16"></td><td class="s20"></td><td class="s20"></td><td class="s16" dir="ltr">32200</td><td class="s18"></td><td class="s19"></td><td class="s19"></td><td class="s16"></td><td class="s20"></td><td class="s20"></td><td class="s16" dir="ltr">29800</td><td class="s18"></td><td class="s19"></td><td class="s19"></td><td class="s16"></td><td class="s20"></td><td class="s20"></td><td class="s16" dir="ltr">17200</td><td class="s18"></td></tr></tbody></table>

- A列に「試合目」の文字列が含まれる行をその試合の開始行とする
- B列に「終局」の文字列が含まれる行をその試合の終了行とする
- 同じシートに続けて試合結果の表を追記していける


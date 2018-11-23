<template>
  <div class="bracket" style="height: 520px;">
    <div class="round" style="width: 100px; margin-right: 40px">
      <div class="match" style="height: 65px;">
        <div class="teamContainer" style="top: 10px;">
          <div class="team lose" style="width: 100px;" data-teamid="0">
            <div class="label" style="width: 70px;">Team 1</div>
            <div class="score" style="width: 30px;" data-resultid="result-1">3</div>
          </div>
          <div class="team win" style="width: 100px;" data-teamid="1">
            <div class="label" style="width: 70px;">Team 2</div>
            <div class="score" style="width: 30px;" data-resultid="result-2">5</div>
          </div>
          <div class="connector" style="height: 10px; width: 20px; right: -22px; top: 32.75px; border-bottom: none;">
            <div class="connector" style="width: 20px; right: -20px; bottom: 0px;"></div>
          </div>
        </div>
      </div>
      <div class="match" style="height: 65px;"><div class="teamContainer" style="top: 10px;">
        <div class="team lose" style="width: 100px;" data-teamid="2">
          <div class="label" style="width: 70px;">Team 3</div>
          <div class="score" style="width: 30px;" data-resultid="result-3">2</div>
        </div>
        <div class="team win" style="width: 100px;" data-teamid="3">
          <div class="label" style="width: 70px;">Team 4</div>
          <div class="score" style="width: 30px;" data-resultid="result-4">4</div>
        </div>
        <div class="connector" style="height: 32.5px; width: 20px; right: -22px; bottom: 10.25px; border-top: none;">
          <div class="connector" style="width: 20px; right: -20px; top: 0px;"></div>
        </div></div></div><div class="match" style="height: 65px;">
      <div class="teamContainer" style="top: 10px;">
        <div class="team win" style="width: 100px;" data-teamid="4">
          <div class="label" style="width: 70px;">Team 5</div>
          <div class="score" style="width: 30px;" data-resultid="result-5">6</div>
        </div><div class="team lose" style="width: 100px;" data-teamid="5">
        <div class="label" style="width: 70px;">Team 6</div>
        <div class="score" style="width: 30px;" data-resultid="result-6">3</div></div>
        <div class="connector" style="height: 32.5px; width: 20px; right: -22px; top: 10.25px; border-bottom: none;"><div class="connector" style="width: 20px; right: -20px; bottom: 0px;"></div></div></div></div><div class="match" style="height: 65px;"><div class="teamContainer" style="top: 10px;"><div class="team lose" style="width: 100px;" data-teamid="6"><div class="label" style="width: 70px;">Team 7</div><div class="score" style="width: 30px;" data-resultid="result-7">2</div></div><div class="team win" style="width: 100px;" data-teamid="7"><div class="label" style="width: 70px;">Team 8</div><div class="score" style="width: 30px;" data-resultid="result-8">3</div></div><div class="connector" style="height: 32.5px; width: 20px; right: -22px; bottom: 10.25px; border-top: none;"><div class="connector" style="width: 20px; right: -20px; top: 0px;"></div></div></div></div><div class="match" style="height: 65px;"><div class="teamContainer" style="top: 10px;"><div class="team lose" style="width: 100px;" data-teamid="8"><div class="label" style="width: 70px;">Team 9</div><div class="score" style="width: 30px;" data-resultid="result-9">1</div></div><div class="team win highlightLoser" style="width: 100px;" data-teamid="9"><div class="label" style="width: 70px;">Team 10</div><div class="score" style="width: 30px;" data-resultid="result-10">5</div></div><div class="connector highlightLoser" style="height: 10px; width: 20px; right: -22px; top: 32.75px; border-bottom: none;"><div class="connector highlightLoser" style="width: 20px; right: -20px; bottom: 0px;"></div></div></div></div><div class="match" style="height: 65px;"><div class="teamContainer" style="top: 10px;"><div class="team win highlightWinner" style="width: 100px;" data-teamid="10"><div class="label" style="width: 70px;">Team 11</div><div class="score" style="width: 30px;" data-resultid="result-11">5</div></div><div class="team lose" style="width: 100px;" data-teamid="11"><div class="label" style="width: 70px;">Team 12</div><div class="score" style="width: 30px;" data-resultid="result-12">3</div></div><div class="connector highlightWinner" style="height: 10px; width: 20px; right: -22px; bottom: 32.75px; border-top: none;"><div class="connector highlightWinner" style="width: 20px; right: -20px; top: 0px;"></div></div></div></div><div class="match" style="height: 65px;"><div class="teamContainer" style="top: 10px;"><div class="team win" style="width: 100px;" data-teamid="12"><div class="label" style="width: 70px;">Team 13</div><div class="score" style="width: 30px;" data-resultid="result-13">7</div></div><div class="team lose" style="width: 100px;" data-teamid="13"><div class="label" style="width: 70px;">Team 14</div><div class="score" style="width: 30px;" data-resultid="result-14">2</div></div><div class="connector" style="height: 32.5px; width: 20px; right: -22px; top: 10.25px; border-bottom: none;"><div class="connector" style="width: 20px; right: -20px; bottom: 0px;"></div></div></div></div><div class="match" style="height: 65px;"><div class="teamContainer" style="top: 10px;"><div class="team lose" style="width: 100px;" data-teamid="14"><div class="label" style="width: 70px;">Team 15</div><div class="score" style="width: 30px;" data-resultid="result-15">1</div></div><div class="team win" style="width: 100px;" data-teamid="15"><div class="label" style="width: 70px;">Team 16</div><div class="score" style="width: 30px;" data-resultid="result-16">2</div></div><div class="connector" style="height: 32.5px; width: 20px; right: -22px; bottom: 10.25px; border-top: none;"><div class="connector" style="width: 20px; right: -20px; top: 0px;"></div></div></div></div></div><div class="round" style="width: 100px; margin-right: 40px"><div class="match" style="height: 130px;"><div class="teamContainer" style="top: 42.5px;"><div class="team lose" style="width: 100px;" data-teamid="1"><div class="label" style="width: 70px;">Team 2</div><div class="score" style="width: 30px;" data-resultid="result-17">1</div></div><div class="team win" style="width: 100px;" data-teamid="3"><div class="label" style="width: 70px;">Team 4</div><div class="score" style="width: 30px;" data-resultid="result-18">2</div></div><div class="connector" style="height: 42.5px; width: 20px; right: -22px; top: 32.75px; border-bottom: none;"><div class="connector" style="width: 20px; right: -20px; bottom: 0px;"></div></div></div></div><div class="match" style="height: 130px;"><div class="teamContainer" style="top: 42.5px;"><div class="team lose" style="width: 100px;" data-teamid="4"><div class="label" style="width: 70px;">Team 5</div><div class="score" style="width: 30px;" data-resultid="result-19">3</div></div><div class="team win" style="width: 100px;" data-teamid="7"><div class="label" style="width: 70px;">Team 8</div><div class="score" style="width: 30px;" data-resultid="result-20">4</div></div><div class="connector" style="height: 65px; width: 20px; right: -22px; bottom: 10.25px; border-top: none;"><div class="connector" style="width: 20px; right: -20px; top: 0px;"></div></div></div></div><div class="match" style="height: 130px;"><div class="teamContainer" style="top: 42.5px;"><div class="team lose highlightLoser" style="width: 100px;" data-teamid="9"><div class="label" style="width: 70px;">Team 10</div><div class="score" style="width: 30px;" data-resultid="result-21">5</div></div><div class="team win highlightWinner" style="width: 100px;" data-teamid="10"><div class="label" style="width: 70px;">Team 11</div><div class="score" style="width: 30px;" data-resultid="result-22">6</div></div><div class="connector highlightWinner" style="height: 42.5px; width: 20px; right: -22px; top: 32.75px; border-bottom: none;"><div class="connector highlightWinner" style="width: 20px; right: -20px; bottom: 0px;"></div></div></div></div><div class="match" style="height: 130px;"><div class="teamContainer" style="top: 42.5px;"><div class="team lose" style="width: 100px;" data-teamid="12"><div class="label" style="width: 70px;">Team 13</div><div class="score" style="width: 30px;" data-resultid="result-23">7</div></div><div class="team win" style="width: 100px;" data-teamid="15"><div class="label" style="width: 70px;">Team 16</div><div class="score" style="width: 30px;" data-resultid="result-24">8</div></div><div class="connector" style="height: 65px; width: 20px; right: -22px; bottom: 10.25px; border-top: none;"><div class="connector" style="width: 20px; right: -20px; top: 0px;"></div></div></div></div></div><div class="round" style="width: 100px; margin-right: 40px"><div class="match" style="height: 260px;"><div class="teamContainer" style="top: 107.5px;"><div class="team win" style="width: 100px;" data-teamid="3"><div class="label" style="width: 70px;">Team 4</div><div class="score" style="width: 30px;" data-resultid="result-25">9</div></div><div class="team lose" style="width: 100px;" data-teamid="7"><div class="label" style="width: 70px;">Team 8</div><div class="score" style="width: 30px;" data-resultid="result-26">1</div></div><div class="connector" style="height: 130px; width: 20px; right: -22px; top: 10.25px; border-bottom: none;"><div class="connector" style="width: 20px; right: -20px; bottom: 0px;"></div></div></div></div><div class="match" style="height: 260px;"><div class="teamContainer" style="top: 107.5px;"><div class="team win highlightWinner" style="width: 100px;" data-teamid="10"><div class="label" style="width: 70px;">Team 11</div><div class="score" style="width: 30px;" data-resultid="result-27">8</div></div><div class="team lose" style="width: 100px;" data-teamid="15"><div class="label" style="width: 70px;">Team 16</div><div class="score" style="width: 30px;" data-resultid="result-28">2</div></div><div class="connector highlightWinner" style="height: 107.5px; width: 20px; right: -22px; bottom: 32.75px; border-top: none;"><div class="connector highlightWinner" style="width: 20px; right: -20px; top: 0px;"></div></div></div></div></div><div class="round" style="width: 100px; margin-right: 40px"><div class="match" style="height: 520px;"><div class="teamContainer" style="top: 237.5px;"><div class="team lose" style="width: 100px;" data-teamid="3"><div class="label" style="width: 70px;">Team 4</div><div class="score" style="width: 30px;" data-resultid="result-29">1</div></div><div class="team win highlightWinner" style="width: 100px;" data-teamid="10"><div class="label" style="width: 70px;">Team 11</div><div class="score" style="width: 30px;" data-resultid="result-30">3</div></div><div class="connector highlightWinner" style="height: 150px; width: 20px; right: -22px; top: 32.75px; border-bottom: none;"><div class="connector highlightWinner" style="width: 20px; right: -20px; bottom: 0px;"></div></div></div></div></div></div>
</template>

<script>
  export default {
    name: "Tournament"    //http://www.aropupu.fi/bracket/ 를 참고했음.
  }
</script>

<style scoped>
  .connector {
    border: 2px solid #666;
    border-left-style: none;
    position: absolute;
    z-index: 1;
  }
  .bracket {
    float: right;
    clear: left;
  }
  .connector div.connector {
    border: 0;
    border-bottom: 2px solid #666;
    height: 0;
    position: absolute;
  }
  .round {
    position: relative;
    float: left;
  }
  .match {
    position: relative;
  }
  .teamContainer {
    z-index: 1;
    position: relative;
    float: left;
  }
  .team.lose {
    background-color: #ddd;
    color: #999;
  }
  .team:first-child {
    border-bottom: 1px solid #999;
  }
  .team {
    position: relative;
    z-index: 1;
    float: left;
    background-color: #eee;
    cursor: default;
  }
  .team.win {
    color: #333;
  }
  .team {
    position: relative;
    z-index: 1;
    float: left;
    background-color: #eee;
    cursor: default;
  }
</style>

(function(){
  'use strict';

  function getQuery(){
    var qs = document.location.search;
    qs = qs.replace(/\?/g,'');
    var qsArr = qs.split('&');
    var query = {};
    qsArr.forEach(function(item){
      var itemArr = item.split('=');
      query[itemArr[0]] = itemArr[1];
    });
    return query;
  }

  function getMoonSprites(query){
    var fera = query.fImageId ? {
      imgId : query.fImageId,
      hash: query.fHash,
      imgQuery: query.fImgQuery
    } : defaultData.fera;
    var orin = query.oImageId ? {
      imgId : query.oImageId,
      hash: query.oHash,
      imgQuery: query.oImgQuery
    } : defaultData.orin;
    return {fera: fera, orin: orin};
  }

  var defaultData = {
    fera : {
      imgId: 23005350,
      hash: 'Lvb2MQxor672dSF-RGTdtg',
      imgQuery: 1473712050
    },
    orin: {
      imgId: 23005347,
      hash: 'McSQH16q5Allr4kFCcA_cA',
      imgQuery: 1473712040
    },
    year: 84,
    month: 0,
    day: 19,
    age: 'Age of Chains'
  };

  document.addEventListener("DOMContentLoaded", function() {
    var cal = window.CalendarUtil;
    var query = getQuery();
    var moonSprites = getMoonSprites(query);
    var year = Number(query.year) || defaultData.year;
    var month = Number(query.month) || defaultData.month;
    var day = Number(query.day) || defaultData.day;
    var age = query.age || defaultData.age;
    var dateOffset = Number(query.dateOffset) || cal.getDateOffset(year, month, day);


    cal.setMoonSprite(moonSprites.fera, moonSprites.orin);
    cal.setDateOffset(dateOffset);
    cal.setAge(age);
    document.getElementById('content').innerHTML = cal.getYearDisplay();
  });
})();

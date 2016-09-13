window.CalendarUtil = window.CalendarUtil || {};
(function(){
  'use strict';
  /* Random weather, taken from Dragon Magazine 137 */
  var yearLength = 0; // Do not touch. Calculated based on month lengths
  var yearZeroStartedOnDay = 0;
  var dateOffset= 0;
  var today = {year: 0, month: 0, day: 0};
  var age = '';

  var cal = window.CalendarUtil;
  cal.getDateOffset = getDateOffset;
  cal.getDayDisplay = getDayDisplay;
  cal.getMonthDisplay = getMonthDisplay;
  cal.getYearDisplay = getYearDisplay;
  cal.setMoonSprite = setMoonSprite;
  cal.setDateOffset = setDateOffset;
  cal.setAge = setAge;

  var months = [
    {name: 'First Glidda',   season: 0, precipChance: 60, days: 20},
    {name: 'Second Glidda',  season: 0, precipChance: 50, days: 20},
    {name: 'First Boro',     season: 0, precipChance: 50, days: 20},
    {name: 'Second Boro',    season: 0, precipChance: 40, days: 20},

    {name: 'First Caena',    season: 1, precipChance: 40, days: 20},
    {name: 'Second Caena',   season: 1, precipChance: 40, days: 20},
    {name: 'First Orannil',  season: 1, precipChance: 40, days: 20},
    {name: 'First Dagnis',   season: 1, precipChance: 40, days: 20},

    {name: 'Second Dagnis',  season: 2, precipChance: 40, days: 20},
    {name: 'First Uldin',    season: 2, precipChance: 40, days: 20},
    {name: 'Second Uldin',   season: 2, precipChance: 40, days: 20},
    {name: 'Second Orannil', season: 2, precipChance: 40, days: 20},

    {name: 'First Azren',    season: 3, precipChance: 40, days: 20},
    {name: 'Second Azren',   season: 3, precipChance: 50, days: 20},
    {name: 'First Otan',     season: 3, precipChance: 50, days: 20},
    {name: 'Second Otan',    season: 3, precipChance: 60, days: 20}
  ];

  var days=[
    'Kethil',
    'Ysren',
    'Mel',
    'Illd',
    'Fiddan'
  ];

  var seasons = [
    { key: 'springFall', color: '#7fcf83'} ,
    { key: 'summer', color: '#b6dc8b'},
    { key: 'springFall', color: '#e0a173'},
    { key: 'winter', color: '#8fe6e7'}
  ];

  for(var i = 0; i < months.length; i += 1){
    yearLength += months[i].days;
  }

  function getSeason(monthIndex){
    var seasonIndex = Math.ceil((monthIndex+1) / 4) -1;
    return seasons[seasonIndex];
  }

  function getDayDisplay(index, year, month){
  var moonSpritePos = getMoonPhases(year, month, index);
    var background = '';
    if(year === today.year && month === today.month && Number(index) === today.day){
      background = 'background-color:#aaf;';
    }
    var dayString = '<td style="min-width:30px; vertical-align:top; font-weight:bold;padding:10px;'+
                      'font-size:30px; border: 1px solid;'+background+'">'+
    '<h5>'+(Number(index) + 1) +'</h5>'+
    '<div style="display:inline-block;width:32px; height:32px; margin:10px auto; padding: 0px; background-image:url('+ feraSpriteUrl +'); background-position:'+ moonSpritePos.fera + 'px 0px;"></div>'+
          '<div style="display:inline-block;width:32px; height:32px; margin:10px auto; padding: 0px; background-image:url('+ orinSpriteUrl +'); background-position:'+ moonSpritePos.orin + 'px 0px;"></div>'+

          '</td>';

    return dayString;
}

  function getMonthDisplay(year, monthIn){
    var month = months[monthIn];
    var monthStr =
        '<table style="width: 24%; height: 300px; float: left; border-collapse:collapse;margin:0.5%">'+
          '<thead>'+
          '<tr style="background-color:'+seasons[month.season].color+';border:1px solid #555">'+
            '<td colspan="' + days.length + '" style="padding:5px;text-align:center; font-size:30px; font-weight:bold;">'+
              month.name +
            '</td>'+
          '</tr>' +
          '<tr style="background-color:#ddd">';

    var percent = 1/days.length * 100;
    for(var i = 0; i < days.length; i += 1){
      monthStr += '<td style="text-align:center;width:'+percent+'%;border:1px solid #555; font-size:16px;">' + days[i] + '</td>';
    }
    monthStr += '</tr>' +
      '</thead>'+
      '<tbody>';

    for(i = 0; i < Math.floor(month.days / days.length); i += 1){
      var weekOffset = i * days.length;
      monthStr += '<tr>';
      for(var j = 0; j < days.length; j += 1){
        var day = weekOffset + j;
        monthStr += getDayDisplay(day, year, monthIn);
      }
      monthStr += '</tr>';
    }

    monthStr += '</tbody></table>';
    return monthStr;
  }

  function getYearDisplay(){
    var year = today.year;
    var yearStr = '<div><h1 style="text-align:center;">' + age + ' year ' + (year + 1) + '<h1>';
    for(var i = 0; i < months.length; i += 1){
      yearStr += getMonthDisplay(year, i);
    }
    return yearStr + '</div>';
  }

  function getDateOffset(year, month, day){
    var offset = year * yearLength;
    for(var i = 0; i < month; i += 1){
      offset += months[i].days;
    }
    offset += day;
    return offset;
  }

  // Moon stuff
  var orinOffset = 0;
  var feraOffset = 14;

  var orinSpritePos = [
      -32 * 0, -32 * 1, -32 * 3, -32 * 4, -32 * 5, -32 * 6, -32 * 8,
      -32 * 9, -32 * 10, -32 * 11, -32 * 12, -32 * 13, -32 * 14, -32 * 15,
      -32 * 16, -32 * 17, -32 * 18, -32 * 19, -32 * 20, -32 * 21, -32 * 22,
      -32 * 24, -32 * 25, -32 * 26, -32 * 27, -32 * 28, -32 * 29, -32 * 30
  ];

  var feraSpritePos = [
      -32 * 0, -32 * 1, -32 * 3, -32 * 4, -32 * 6, -32 * 8, -32 * 9, -32 * 11,
      -32 * 12, -32 * 13, -32 * 14, -32 * 15, -32 * 16, -32 * 17, -32 * 18, -32 * 19,
      -32 * 20, -32 * 22, -32 * 24, -32 * 25, -32 * 27, -32 * 28, -32 * 29, -32 * 30
  ];

  var feraSpriteUrl, orinSpriteUrl;
  function setMoonSprite(fera, orin){
    feraSpriteUrl = 'https://s3.amazonaws.com/files.d20.io/images/';
    feraSpriteUrl += fera.imgId + '/' + fera.hash + '/max.png?'+ fera.imgQuery;
    orinSpriteUrl = 'https://s3.amazonaws.com/files.d20.io/images/';
    orinSpriteUrl += orin.imgId + '/' + orin.hash + '/max.png?'+ orin.imgQuery;

    console.log(feraSpriteUrl, orinSpriteUrl);
  }

  function getDateFromOffset(offset){
    var working = offset;
    var year = Math.floor(working / yearLength);
    working = working % yearLength ;
    var month = 0;
    var monthWorking = working;
    var day = 0;
    for(var i = 0; i < months.length; i += 1){
      if(monthWorking < months[i].days){
        month = i;
        day = monthWorking;
        break;
      } else {
        monthWorking -= months[i].days;
      }
    }
    return {year: year, month: month, day: day};
  }

  function setDateOffset(offset){
    dateOffset = offset;
    today = getDateFromOffset(dateOffset);
  }

  function setAge(ageIn){
    age = ageIn;
  }

  function getMoonPhases(year, month, day){
    var offset = getDateOffset(year, month, day);
    return {
      fera: feraSpritePos[(offset + feraOffset) % 24],
      orin: orinSpritePos[(offset + orinOffset) % 28]
    };
  }


})();

//pay gap in 10 industry
var ascendingGap=[];
var descendingGap=[];
var malePayInTopTen=[];
var femalePayInTopTen=[];
var jobs=[]; 
var weklyPayMale=[]; 
var weklypayFemale=[]; 

//earning ratio
var year=[];
var ratio=[];
var ascendingYear=[];
var descendingYear=[];
var recYear=[];
var recRatio=[];
var revRatio=[];

//pay gap by ratio
var race=[];
var womenMedWeklyEarn=[];
var menMedWeklyEarn=[];
var ascendRaceGap=[];
var descendRaceGap=[];
var menNegAry=[];

//gap by state

$(document).ready(function() {
    console.log("ready!");
    loadData1("data/comjobgap.json");
    loadData2("data/earning-ratio.json");
    loadData3("data/gapbyrace.json");
    chart4();
     
});

console.log('#table_id');


function loadData1(pathtodata){ //load json file and store it
    $.getJSON( pathtodata, function( genderpay ) { //the object will be 
    parseData1(genderpay);
    });
}

function loadData2(pathtodata){ //load json file and store it
    $.getJSON( pathtodata, function( earningratio ) { //the object will be 
    parseData2(earningratio);
    });
}

function loadData3(pathtodata){ //load json file and store it
    $.getJSON( pathtodata, function( gapbyrace ) { //the object will be 
    parseData3(gapbyrace);
    });
}


function parseData1(genderpay){
  ascendingGap = genderpay;
  ascendingGap.sort(function(a,b) {
      return a["Gap"]-b["Gap"];
  });
  descendingGap = ascendingGap.reverse();
    
    
  for(var i=0, len=descendingGap.length; i<len; i++){
    jobs.push(descendingGap[i]["Jobtitle"]);
    weklypayFemale.push(descendingGap[i]["Weklypay F"]);
    weklyPayMale.push(descendingGap[i]["Weklypay M"]);
  }
    console.log(weklypayFemale[1]);


  for (var i = 0; i < 10; i++) {
    femalePayInTopTen.push(parseInt(weklypayFemale[i]));
  }
    
 
  for (var i = 0; i < 10; i++) {
    malePayInTopTen.push(parseInt(weklyPayMale[i]));
  }

    var dic = {};
    dic['name']='NC';
    dic['region']='south';
    console.log(dic);
    
  chart1();
}

function chart1(){
    //first chart--the pay descrepancy between top 10 jobs
    Highcharts.chart('larIndus', {
    chart: {
        type: 'bar',
        style: {
            font: '16px "Roboto Condensed", sans-serif',
            
        },
    },
    title: {
        text: '10 Largest Gender Pay Gap Industries in the US'
    },
   
    subtitle: {
        text: 'By median weekly earnings'
    },
    xAxis: {
        labels: {
            style: {
                font: '14px "Roboto Condensed", sans-serif'
            }
        },
        categories: jobs.slice(0),
        title: {
            text: null
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Median Weekly Earnings($)',
            align: 'high'
        },
        labels: {
            overflow: 'justify',
            style: {
                font: '13px "Roboto Condensed", sans-serif'
            }
        }
    },
    tooltip: {
        valueSuffix: ' people',
//        style:{
//            fontSize:'14px',
//        }
    },
    plotOptions: {
        bar: {
            dataLabels: {
                enabled: true
            }
        }
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        x: -40,
        y: 270,
        floating: true,
        borderWidth: 1,
        backgroundColor:
            Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
        shadow: true,
        itemStyle: {
                 fontSize: '13px'
              }
    },
    credits: {
        enabled: false
    },
        series: [{
        name: 'Female',
        data: femalePayInTopTen,
        color: '#93d0d3'
    }, {
        name: 'Male',
        data: malePayInTopTen,
        color: '#334251'
    }, ]

});
    console.log(jobs.slice(9));
    
}

///earning ratio
function parseData2(earningratio){
  ascendingYear = earningratio;
  ascendingYear.sort(function(a,b) {
      return a["Year"]-b["Year"];
  });
    console.log(ascendingYear);
  descendingYear = ascendingYear.reverse();
    console.log(ascendingYear);
    
  for(var i=0, len=descendingYear.length; i<len; i++){
    ratio.push(descendingYear[i]["Femal to Male Earing Ratio"]);
    year.push(descendingYear[i]["Year"]);
  }
    console.log(year[1]);


  for (var i = 0; i < 20; i++) {
    recYear.push(parseInt(year[i]));
  }
    
 
  for (var i = 0; i < 20; i++) {
    recRatio.push(parseFloat(ratio[i]));
  }
    revRatio = recRatio.reverse();
    

  console.log(revRatio)
    
  chart2();
}

function chart2(){
    Highcharts.chart('earningratio', {
     chart: {
        style: {
            font: '16px "Roboto Condensed", sans-serif',
        }
    },
    title: {
        text: 'Female to male earnings ratio of workers in the US'
    },

    subtitle: {
        text: 'From 2000 to 2019'
    },

        
    yAxis: {
        title: {
            text: 'Female earns % of male'
        },
        labels: {
            style: {
                font: '13px "Roboto Condensed", sans-serif'
            }
        }
    },

    xAxis: {
        accessibility: {
            rangeDescription: 'Range: 2000 to 2019'
        },
        labels: {
            style: {
                font: '14px "Roboto Condensed", sans-serif'
            }
        }
    },

    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
    },

    plotOptions: {
        series: {
            label: {
                connectorAllowed: false
            },
            pointStart: 2000
        }
    },

    series: [{
        name: 'Percentage',
        data: revRatio,
        color: '#93d0d3'
    }, ],

    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom'
                }
            }
        }]
    }

});
              
}

//pay gap by race
function parseData3(gapbyrace){
  ascendRaceGap = gapbyrace;
  ascendRaceGap.sort(function(a,b) {
      return a["gap"]-b["gap"];
  });
    console.log(ascendRaceGap);
  descendRaceGap = ascendRaceGap.reverse();
    console.log(descendRaceGap);
    
  for(var i=0, len=descendRaceGap.length; i<len; i++){
    race.push(descendRaceGap[i]["race"]);
    womenMedWeklyEarn.push(parseInt(descendRaceGap[i]["women_median_weekly_earning"]));
    menMedWeklyEarn.push(parseInt(descendRaceGap[i]["men_median_weekly_earning"]));
  }
    console.log(menMedWeklyEarn);

    menNegAry=menMedWeklyEarn.map(x => -x);
    console.log(menNegAry)
  
    
  chart3();
}

function chart3(){
    var categories = race;

    
    Highcharts.chart('gapbyrace', {
        chart: {
            type: 'bar',
            style: {
            font: '16px "Roboto Condensed", sans-serif'
        }
            
        },
        title: {
            text: 'Median weekly earnings of full-time wage workers in the US in 2019'
        },
        subtitle: {
            text: 'by gender and ethnicity'
        },
        accessibility: {
            point: {
                valueDescriptionFormat: ''
            }
        },
       
        xAxis: [{
            categories: categories,
            reversed: false,
            labels: {
                step: 1,
                style: {
                font: '13px "Roboto Condensed", sans-serif'
            }
            },
            accessibility: {
                description: 'Wage (male)'
            }
        }, { // mirror axis on right side
            opposite: true,
            reversed: false,
            categories: categories,
            linkedTo: 0,
            labels: {
                step: 1,
                style: {
                font: '13px "Roboto Condensed", sans-serif'
            }
            },
            accessibility: {
                description: 'Wage (female)'
            }
        }],
        yAxis: {
            title: {
                text: 'Wage in U.S dollars'
            },
            labels: {
                formatter: function () {
                    return Math.abs(this.value);
                },
                style: {
                font: '14px "Roboto Condensed", sans-serif'
            }
            },
            accessibility: {
                description: 'Wages',
                rangeDescription: ''
            }
        },

        plotOptions: {
            series: {
                stacking: 'normal'
            }
        },

        tooltip: {
            formatter: function () {
                return '<b>' + this.series.name + ', ' + this.point.category + '</b><br/>' +
                    'Wage: $' + Highcharts.numberFormat(Math.abs(this.point.y), 1) ;
            }
        },

        series: [{
            name: 'Male',
            data: menNegAry,
            color: '#334251'
            
        }, {
            name: 'Female',
            data: womenMedWeklyEarn,
            color: '#93d0d3'
        }]
    });
}

function chart4(){
    Highcharts.getJSON('data/gapbystate.json', function (data) {

    // Make codes uppercase to match the map data
    data.forEach(function (p) {
        p.code = p.code.toUpperCase();
    });

    // Instantiate the map
    Highcharts.mapChart('gapbystate', {

        chart: {
            map: 'countries/us/us-all', 
            style: {
            font: '16px "Roboto Condensed", sans-serif'
        }
        },
        
        title: {
            text: 'Female to male earnings ratio of workers in the US by state'
        },
        subtitle: {
            text: 'In 2019'
        },

        exporting: {
            sourceWidth: 600,
            sourceHeight: 500
        },

        legend: {
            layout: 'vertical',
            borderWidth: 0,
            backgroundColor: 'rgba(255,255,255,0.85)',
            floating: true,
            x: -300,
            y: 15
        },

        mapNavigation: {
            enabled: true
        },

        colorAxis: {
            min: 50,
            type: 'logarithmic',
            minColor: '#93d0d3',
            maxColor: '#334251',
            stops: [
                [0, '#93d0d3'],
                [0.5, '#6ec0bf'],
                [1, '#334251']
            ]
        },

        series: [{
            animation: {
                duration: 1000
            },
            data: data,
            joinBy: ['postal-code', 'code'],
            dataLabels: {
                enabled: true,
                color: '#ffffff',
                format: '{point.code}'
            },
            name: 'Female to male earning ratio',
            tooltip: {
                pointFormat: '{point.code}: {point.value}%'
            }
        }]
    });
});

}

  $('#bigTable').DataTable( {
        "scrollX": true,
        ajax: {
            url: 'data/bigDataNew.json',
            dataSrc: ''
        },
        columns: [
            { data: 'Occupation' },
            { data: 'Number of workers' },
            { data: 'Median weekly earnings' },
            { data: 'Number of male workers' },
            { data: 'Male median weekly earnings' },
            { data: 'Number of female workers' },
            { data: 'Female median weekly earnings' }
        ]
} );
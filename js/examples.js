/*$.fn.isInViewport = function() {
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();
    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();
    return elementBottom > viewportTop && elementTop < viewportBottom;
};*/

$.fn.tmpl = function(obj) {
	var _this = this,
	  	el = $(this);
	return (function() {
		  var original = el.html();
		  el.html(el.html().replace(/{{([^}}]+)}}/g, function(wholeMatch, key) {
			var substitution = obj[$.trim(key)];
	    return typeof substitution == 'undefined' ? wholeMatch : substitution;
	  }));
	  return el.html() == original ? _this : $(el).tmpl(obj);
	})();
};

$.fn.translate = function (jsdata){	
	$("[tkey]").each (function (index){
		var strTr = jsdata [$(this).attr ('tkey')];
	    $(this).html (strTr);
	});
};


var it={
	lang:'It',
	end:"Fine",
	fnCont:"Funzione di Continuità",
	den:"Densità",
	vel:"Velocità",
	evoPulse:"Evoluzione dell'impulso",
	pulseShow:"Rappresentazione dell'impulso",
	array:"Array monodimensionale",
	diffMethod: "Metodo delle differenze finite",
	serTime: "Tempi del programma seriale (ser_cont_sx)",
	highComp: "Calcolo intensivo!",
	compStart: "// Qui inizia il calcolo intensivo",
	everyTime: "// Ad ogni passo temporale",
	doOp: "// Effettuo tante azioni quanti sono i punti",
	isPossible: "E' possibile <u>parallelizzarlo</u>?",
	solution: "Soluzione:",
	domain: "Partizionamento del dominio",
	edgeCom: "Condizione ai bordi e Comunicazioni",
	comSx: "Comunicazioni da sinistra a destra",
	comDx: "Comunicazioni da destra a sinistra",
	comSim: "Comunicazioni simmetrica",
	exeTime: "Tempo di esecuzione",
	exeCmp: "Confronto tra applicativi",
	more: "Nel dettaglio",
	avg: "Medie",
	eff: "Efficienza",
	overhead: "Tempo di overhead",
	comTime: "Tempo di comunicazione",
	comTxt: "Quantità di tempo necessario a coordinare la parallelizzazione. <br />( Comunicazioni + Sincronizzazione )",
	comNum: "Numero di comunicazioni",
	eachTask: "Per singolo task",
	pointsNum: "Numero di Punti",
	perApp: "Per applicativo",
	app: "Applicativo",
	singleCom: "Singola comunicazione",
	singleComTxt: "Stimata in base ai rilevamenti",
	timeSec: "Tempo in secondi",
	time: "Tempo (sec)",
	seq: "Sequenziale",
	numP:"NumeroPunti",
	p: "punti",
	nT: "numTasks",
	ohAct: "Attività",
	ohPerc: "Percentuale",
	ohSinc: "Sincronizzazione",
	ohCom: "Comunicazioni",
	ohSys: "Sistema operativo",
	ohSched: "Schedulazione\n(per numTasks>4)",
	ohLib: "Linguaggio e librerie usate",
	ohTerm: "Tempo di terminazione del task",
	ohInit: "Tempo di start-up del task",
	about: "circa"
};

var en={
	lang:'En',
	end:"The End",
	fnCont:"Continuity Function",
	den:"Density",
	vel:"Velocity",
	evoPulse:"Pulse evolution",
	pulseShow:"Pulse representation",
	array:"Unidimensional array",
	diffMethod: "Finite-Difference Method",
	serTime: "Sequential time (ser_cont_sx)",
	highComp: "A lot of calculation!",
	compStart: "// Here starts the computing",
	everyTime: "// Every temporal step",
	doOp: "// computation for each point",
	isPossible: "Is it possible to <u>parallelize</u> it?",
	solution: "The solution:",
	domain: "Domain partitioning",
	edgeCom: "Boundary conditions and Communications",
	comSx: "Left to Right Communications",
	comDx: "Right to Left Communications",
	comSim: "Symmetric Communications",
	exeTime: "Execution time",
	exeCmp: "Comparison of processes",
	more: "In detail",
	avg: "Average",
	eff: "Efficiency",
	overhead: "Overhead time",
	comTime: "Communication time",
	comTxt: "The amount of time required to coordinate parallel tasks. <br />( Communications + Synchronization )",
	comNum: "Amount of communications",
	eachTask: "for each task",
	pointsNum: "Amount of points",
	perApp: "Per process",
	app: "Process",
	singleCom: "Single communication",
	singleComTxt: "Estimated based on measurements",
	timeSec: "Time in seconds",
	time: "Time (sec)",
	seq: "Sequential",
	numP:"Points",
	p: "points",
	nT: "numTasks",
	ohAct: "Activity",
	ohPerc: "Rate",
	ohSinc: "Synchronization",
	ohCom: "Comumnication",
	ohSys: "Operative System",
	ohSched: "Scheduler\n(numTasks>4)",
	ohLib: "Language, libraries, compiler",
	ohTerm: "Task termination time",
	ohInit: "Task start-up time",
	about: "about"
};

var lang_now = $(location).attr('hash')=='#En'?en:it;
$().translate(lang_now);
$('a.dropdown-toggle').html(lang_now.lang+' <img style="max-width:18px;" src="./img/'+lang_now.lang.toLowerCase()+'.png"><i class="icon-caret"></i>');

//console.log($('a.dropdown-toggle')[0].innerText);

$.fn.isOnScreen = function(){
    var win = $(window);
    var viewport = {
        top : win.scrollTop()+5,
        left : win.scrollLeft()
    };
    viewport.right = viewport.left + win.width()-10;
    viewport.bottom = viewport.top + win.height()-10;

    var bounds = this.offset();
    bounds.right = bounds.left + this.outerWidth()-10;
    bounds.bottom = bounds.top + this.outerHeight()-10;
    return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
};

// INIT
google.load("visualization", "1", {packages: ["corechart"]});

/*        *********GLOBAL CHARTS DATA**********        */

/* GRAFICO TEMPI SERIALE */
var barDataSer = [
    [lang_now.numP, lang_now.time],
    ['20k '+lang_now.p,  8.9],
    ['40k '+lang_now.p,  35.4],
    ['80k '+lang_now.p,  143]
  ];
var barDataSer2 = [
    ['20.000 '+lang_now.p,  8.9, '8.9'],
    ['40.000 '+lang_now.p,  35.4, '35.4'],
    ['80.000 '+lang_now.p,  143, '143']
  ];
var barOptionsSer = {
	annotations: {
          alwaysOutside: true,
          textStyle: {
            fontSize: 22,
            color: '#fff',
            auraColor: 'cornflowerblue'
          }
        },
    focusTarget: 'category',
    backgroundColor: 'transparent',
    colors: ['cornflowerblue'],
    chartArea: {
      left: 50,
      top: 10,
      width: '100%',
      height: '80%'
    },
    bar: {
      groupWidth: '80%'
    },
    hAxis: {
      textStyle: {
        fontSize: 16
      }
    },
    vAxis: {
      minValue: 0,
      baselineColor: '#DDD',
      format: '#\'s\'',
      gridlines: {
        color: '#DDD',
        count: 4
      },
      textStyle: {
        fontSize: 14
      }
    }
  };

/* GRAFICO TEMPI SERIALE-MPI */  
var barSerMpi0 = 
  	[[lang_now.numP,lang_now.seq, 'MPI (2 task)' ], 
  	['20.000 '+lang_now.p, 8.9, 4.8], 
  	['40.000 '+lang_now.p, 35.4, 19.1], 
  	['80.000 '+lang_now.p, 143, 75]];
var barSerMpi1 = 
  	[[lang_now.numP, lang_now.seq, 'MPI (2 task)', 'MPI (4 task)', 'MPI (8 task)', 'MPI (16 task)'], 
  	['20.000 '+lang_now.p, 8.9, 4.8, 2.6, 2.2, 2.8], 
  	['40.000 '+lang_now.p, 35.4, 19.1, 10.1, 8.5, 9.7], 
  	['80.000 '+lang_now.p, 143, 75, 40.4, 33.6, 36.1]];
var optionsSerMpi = {
	annotations: {
          alwaysOutside: true,
          textStyle: {
            fontSize: 16,
            //color: '#fff',
            //auraColor: 'cornflowerblue'
          }
        },
  	focusTarget: 'category',
    //title: 'Tempo di esecuzione',
    colors: ['#48c','#5a5'],
    legend: { position: 'bottom', maxLines: 2 },
    vAxis: {
      minValue: 0,
      maxValue:150,
      format: '#\'s\'',
      baselineColor: '#DDD',
      gridlines: {
        color: '#DDD',
        count: 4
      },
      textStyle: {
        fontSize: 14
      }
    },animation: {
      duration: 500,
      easing: 'out',
			startup: true
    }
  };
/* GRAFICO TEMPI MPI */
var barTimeExe2Task = 
  	[[lang_now.numP, 'MpiContSx', 'MpiContDx', 'MpiContSim'], 
  	['20.000 '+lang_now.p, 4.8, 4.6, 5.6], 
  	['40.000 '+lang_now.p, 19.1, 18.4, 22.5], 
  	['80.000 '+lang_now.p, 75, 73.5, 89]];
var barTimeExe4Task = 
  	[[lang_now.numP, 'MpiContSx', 'MpiContDx', 'MpiContSim'], 
  	['20.000 '+lang_now.p, 2.6, 2.6, 3.2], 
  	['40.000 '+lang_now.p, 10.1, 9.5, 13.1], 
  	['80.000 '+lang_now.p, 40.4, 39.3, 49.8]];
var barTimeExe8Task = 
  	[[lang_now.numP, 'MpiContSx', 'MpiContDx', 'MpiContSim'], 
  	['20.000 '+lang_now.p, 2.2, 2.2, 2.7], 
  	['40.000 '+lang_now.p, 8.5, 8.5, 10.3], 
  	['80.000 '+lang_now.p, 33.6, 33.8, 40.7]];
var barTimeExe16Task = 
  	[[lang_now.numP, 'MpiContSx', 'MpiContDx', 'MpiContSim'], 
  	['20.000 '+lang_now.p, 2.8, 2.7, 0], 
  	['40.000 '+lang_now.p, 9.7, 9.8, 0], 
  	['80.000 '+lang_now.p, 36.1, 36.9, 0]];
var barTimeExeMedie = 
  	[[lang_now.numP, '2 Task', '4 Task', '8 Task', '16 Task'], 
  	['20.000 '+lang_now.p, 0.33, 0.47, 1.2, 2.194], 
  	['40.000 '+lang_now.p, 1.23, 1.52, 4.4, 7.534], 
  	['80.000 '+lang_now.p, 3.66, 5.41, 17.16, 27.563]];
    var optionsTimeExe = {
    annotations: {
	    textStyle: {
	      fontName: 'Times-Roman',
	      fontSize: 18,
	      bold: true,
	      italic: true,
	      // The color of the text.
	      color: '#871b47',
	      // The color of the text outline.
	      auraColor: '#d799ae',
	      // The transparency of the text.
	      opacity: 0.8
	    }
    },
    series: {
	  0: {
	    annotations: {
	      textStyle: {fontSize: 12, color: 'red' }
	    }
	  }
	},
	curveType: 'function',
	pointSize: 5,
  	focusTarget: 'category',
    //title: 'Comunicazioni per Task',
    colors: ['#5a5', '#48c', '#c66','#ff6038'],
    legend: { position: 'bottom', maxLines: 2 },
    vAxis: {
      /*minValue: 0,*/
      /*maxValue:150,*/
      format: '#\'s\'',
      baselineColor: '#DDD',
      gridlines: {
        color: '#DDD',
        count: 5
      },
      textStyle: {
        fontSize: 14
      }
    },animation: {
      duration: 500,
      easing: 'out',
	  startup: true
    }
  };
/* GRAFICO SPEEDUP MPI */
var barSpeedUpMpiContSx = 
  	[[lang_now.nT,'20.000 '+lang_now.p, '40.000 '+lang_now.p, '80.000 '+lang_now.p], 
  	['2 Task', (8.9/4.8),(35.4/19.1), (143/75) ], 
  	['4 Task', (8.9/2.6), (35.4/10.10), (143/40.4)], 
  	['8 Task',  (8.9/2.2), (35.4/8.5), (143/33.6)],
  	['16 Task',  (8.9/2.8), (35.4/9.7), (143/36.1)]];
var barSpeedUpMpiContDx = 
  	[[lang_now.nT,'20.000 '+lang_now.p, '40.000 '+lang_now.p, '80.000 '+lang_now.p], 
  	['2 Task', (8.9/4.6),(35.5/18), (144/73) ], 
  	['4 Task', (8.9/2.6), (35.5/9.5), (144/39.3)], 
  	['8 Task',  (8.9/2.2), (35.5/8.5), (144/33.8)],
  	['16 Task',  (8.9/2.7), (35.5/9.8), (144/36.9)]];
var barSpeedUpMpiContSim = 
  	[[lang_now.nT,'20.000 '+lang_now.p, '40.000 '+lang_now.p, '80.000 '+lang_now.p], 
  	['2 Task', (10.2/5.6),(41.7/22.3), (167/89) ], 
  	['4 Task', (10.2/3.2), (41.7/11.7), (167/49.8)], 
  	['8 Task',  (10.2/2.7), (41.7/10.3), (167/40.7)]
  	//,['16 Task',  (10.2/1000), (41.7/1000), (167/1000)]
  	];
    var optionsSpeedUp = {
    curveType: 'function',
    pointSize: 5,
    backgroundColor: 'transparent',
    colors: ['#5a5', '#48c', '#c66'],
    legend: { position: 'bottom', maxLines: 2 },
    focusTarget: 'category',
    hAxis: {
      textStyle: {
        fontSize: 11
      },
      baselineColor: 'transparent',
      gridlines: {
        color: 'transparent'
      }
    },
    vAxis: {
      minValue: 0,
      baselineColor: '#DDD',
      gridlines: {
        color: '#DDD',
        count: 6
      },
      textStyle: {
        fontSize: 11
      }
    },
    animation: {
      duration: 500,
      easing: 'out',
			startup: true
    }
  };
/* GRAFICO Efficienza con numero di punti */
var barEffMpiContSx = 
  	[[lang_now.nT,'20.000 '+lang_now.p, '40.000 '+lang_now.p, '80.000 '+lang_now.p], 
  	[lang_now.seq, 100*1, 100*1, 100*1],
  	['2 task', 100*1.854/2, 100*1.853/2, 100*1.907/2], 
  	['4 task', 100*3.423/4, 100*3.505/4, 100*3.54/4], 
  	['8 task', 100*4.045/8, 100*4.165/8, 100*4.256/8],
  	['16 task', 100*3.179/16, 100*3.649/16, 100*3.961/16]];
var barEffMpiContDx = 
  	[[lang_now.nT,'20.000 '+lang_now.p, '40.000 '+lang_now.p, '80.000 '+lang_now.p], 
  	[lang_now.seq, 100*1, 100*1, 100*1],
  	['2 task', 100*1.935/2, 100*1.972/2, 100*1.973/2], 
  	['4 task', 100*3.423/4, 100*3.737/4, 100*3.664/4], 
  	['8 task', 100*4.045/8, 100*4.176/8, 100*4.26/8],
  	['16 task', 100*3.296/16, 100*3.622/16, 100*3.902/16]];
var barEffMpiContSim = 
  	[[lang_now.nT,'20.000 '+lang_now.p, '40.000 '+lang_now.p, '80.000 '+lang_now.p], 
  	[lang_now.seq, 100*1, 100*1, 100*1],
  	['2 task', 100*1.821/2, 100*1.87/2, 100*1.876/2], 
  	['4 task', 100*3.187/4, 100*3.564/4, 100*3.353/4], 
  	['8 task', 100*3.778/8, 100*4.049/8, 100*4.103/8]];
var optionsEff = {
	curveType: 'linear',
	pointSize: 5,
  	focusTarget: 'category',
    //title: 'Efficienza',
    colors: ['#5a5', '#48c', '#c66'],
    legend: { position: 'bottom', maxLines: 2 },
    vAxis: {
    	maxValue:100,
      format: '#\'%\'',
      baselineColor: '#DDD',
      gridlines: {
        color: '#DDD',
        //count: 4
      },
      textStyle: {
        fontSize: 14
      }
    },animation: {
      duration: 500,
      easing: 'out',
	  startup: true
    }
  };
/* GRAFICO TEMPI DI COMUNICAZIONE */
var barTimeCom40p = 
  	[['NumeroPunti', 'MPI (16core)', 'MPI (8core)', 'MPI (4core)', 'MPI (2core)', lang_now.seq], 
  	['20k punti', 2.8, 2.2, 2.6, 4.8, 8.9], 
  	['40k punti', 9.7, 8.5, 10.1, 19.1, 35.4], 
  	['80k punti', 36.1, 33.6, 40.4, 75, 143]];
var barTimeComTask = 
  	[[lang_now.nT, 'MpiContSx', 'MpiContDx', 'MpiContSim'], 
  	['2', 19.1-(35.8/2), 18-(35.5/2), 22.5-(41.7/2)], 
  	['4', 10.1-(35.8/4), 9.5-(35.5/4), 13.1-(41.7/4)], 
  	['8', 8.5-(35.8/8), 8.5-(35.5/8), 10.3-(41.7/8)],
  	['16', 9.7-(35.8/16), 9.8-(35.5/16),'N/D']];
var barTimeCom2Task = 
  	[[lang_now.numP, 'MpiContSx', 'MpiContDx', 'MpiContSim'], 
  	['20.000 '+lang_now.p, 4.8-(8.9/2), 4.6-(8.9/2), 5.6-(10.2/2)], 
  	['40.000 '+lang_now.p, 19.1-(35.4/2), 18.4-(35.5/2), 22.5-(41.7/2)], 
  	['80.000 '+lang_now.p, 75-(143/2), 73.5-(143/2), 89-(167/2)]];
var barTimeCom4Task = 
  	[[lang_now.numP, 'MpiContSx', 'MpiContDx', 'MpiContSim'], 
  	['20.000 '+lang_now.p, 2.6-(8.9/4), 2.6-(8.9/4), 3.2-(10.2/4)], 
  	['40.000 '+lang_now.p, 10.1-(35.4/4), 9.5-(35.5/4), 13.1-(41.7/4)], 
  	['80.000 '+lang_now.p, 40.4-(143/4), 39.3-(143/4), 49.8-(167/4)]];
var barTimeCom8Task = 
  	[[lang_now.numP, 'MpiContSx', 'MpiContDx', 'MpiContSim'], 
  	['20.000 '+lang_now.p, 2.2-(8.9/8), 2.2-(8.9/8), 2.7-(10.2/8)], 
  	['40.000 '+lang_now.p, 8.5-(35.4/8), 8.5-(35.5/8), 10.3-(41.7/8)], 
  	['80.000 '+lang_now.p, 33.6-(143/8), 33.8-(143/8), 40.7-(167/8)]];
var barTimeCom16Task = 
  	[[lang_now.numP, 'MpiContSx', 'MpiContDx', 'MpiContSim'], 
  	['20.000 '+lang_now.p, 2.8-(8.9/16), 2.7-(8.9/16), 0], 
  	['40.000 '+lang_now.p, 9.7-(35.4/16), 9.8-(35.5/16), 0], 
  	['80.000 '+lang_now.p, 36.1-(143/16), 36.9-(143/16), 0]];
var barTimeComMedie = 
  	[[lang_now.numP, '2 Task', '4 Task', '8 Task', '16 Task'], 
  	['20.000 '+lang_now.p, 0.33, 0.47, 1.2, 2.194], 
  	['40.000 '+lang_now.p, 1.23, 1.52, 4.4, 7.534], 
  	['80.000 '+lang_now.p, 3.66, 5.41, 17.16, 27.563]];
var optionsTimeCom = {
	curveType: 'function',
	pointSize: 5,
  	focusTarget: 'category',
    //title: 'Comunicazioni per Task',
    colors: ['#5a5', '#48c', '#c66','#ff6038'],
    legend: { position: 'bottom', maxLines: 2 },
    vAxis: {
      /*minValue: 0,*/
      /*maxValue:150,*/
      format: '#\'s\'',
      baselineColor: '#DDD',
      gridlines: {
        color: '#DDD',
        count: 5
      },
      textStyle: {
        fontSize: 14
      }
    },
    animation: {
      duration: 500,
      easing: 'out',
	  startup: true
    }
  };
/* GRAFICO OVERHEAD */
var barOverhead = 
  	[[lang_now.ohAct, lang_now.ohPerc], 
  	[lang_now.ohCom, 11], 
  	[lang_now.ohSinc, 3], 
  	[lang_now.ohInit, 0.5], 
  	[lang_now.ohTerm, 0.5], 
  	[lang_now.ohSys, .5], 
  	[lang_now.ohLib, 1],
  	[lang_now.ohSched, 3], ];
var optionsOverhead = {
	//is3D: true,
	pieStartAngle: 100,
	slices: {  //2: {offset: 0.2},
               //3: {offset: 0.2},
               4: {offset: 0.1},
               6: {offset: 0.1},
          },
   	legend:{position:'labeled'},
    colors:['#02507c','#086da8','#0089d8','#37a5e5','#66b5e2','#7ebfe5','#9acdea']
  };

/* CHARTS SETUP */


google.setOnLoadCallback(drawCharts);

function drawCharts() {
  /******************** TEMPI ESECUZIONE SERIALE ********************/
	var data = new google.visualization.DataTable();
    data.addColumn('string', 'Totale punti');
    data.addColumn('number', lang_now.timeSec);
    data.addColumn({type: 'string', role: 'annotation'});
	data.addRows(barDataSer2);
	var chart = new google.visualization.ColumnChart(document.getElementById('bar-chartser'));
    chart.draw(data, barOptionsSer);
   
  //var DataSer = google.visualization.arrayToDataTable(barDataSer);
  //var barChart = new google.visualization.ColumnChart(document.getElementById('bar-chartser'));
  //barChart.draw(DataSer, barOptionsSer);

  /******************** CONFRONTO SERIALE - MPI ********************/
  var barSerMpi= google.visualization.arrayToDataTable(barSerMpi0);
  
  var view = new google.visualization.DataView(barSerMpi);
      view.setColumns([0, 1,
                       { calc: "stringify",
                         sourceColumn: 1,
                         type: "string",
                         role: "annotation" },
                       2,
                       { calc: "stringify",
                         sourceColumn: 2,
                         type: "string",
                         role: "annotation" }]);

  var chart = new google.visualization.ColumnChart(document.getElementById('bar-sermpi'));
  //chart.draw(barSerMpi, optionsSerMpi);
  chart.draw(view, optionsSerMpi);

  /******************** TEMPI ESECUZIONE MPI ********************/
  var barTimeExe = google.visualization.arrayToDataTable(barTimeExe2Task);
  var chart = new google.visualization.ColumnChart(document.getElementById('bar-timeexe'));
  chart.draw(barTimeExe, optionsTimeExe);

  /******************** SPEED-UP ********************/
  var barSpeedUp = google.visualization.arrayToDataTable(barSpeedUpMpiContSx);
  var chart = new google.visualization.LineChart(document.getElementById('bar-speedup'));
  chart.draw(barSpeedUp, optionsSpeedUp);

  /******************** EFFICIENZA ********************/
  var barEff = google.visualization.arrayToDataTable(barEffMpiContSx);
  var chart = new google.visualization.LineChart(document.getElementById('bar-eff'));
  chart.draw(barEff, optionsEff);

  /******************** TEMPO DI Overhead ********************/
  var barOH = google.visualization.arrayToDataTable(barOverhead);
  var chart = new google.visualization.PieChart(document.getElementById('bar-overhead'));
  chart.draw(barOH, optionsOverhead);

  /******************** TEMPO DI COMUNICAZIONE ********************/
  var barTimeCom = google.visualization.arrayToDataTable(barTimeCom2Task);
  var chart = new google.visualization.ColumnChart(document.getElementById('bar-timecom'));
  chart.draw(barTimeCom, optionsTimeCom);
}
$(document).ready(function(){
	/*$("#demosMenu").change(function(){
	  window.location.href = $(this).find("option:selected").attr("id") + '.html';
	});*/

	//var mysvg = '<svg id="morph-example" xmlns="http://www.w3.org/2000/svg" viewBox="50 0 2000 550"><path id="smooth" style="visibility:hidden" class="bg-lime" d="m 147.77674,46.026926 c 0,0 66.67009,-13.637059 74.24622,151.017794 3.57513,77.69954 58.58884,90.40865 58.58884,90.40865 0,0 -28.73461,22.0209 -66.68852,24.46171 -41.19265,2.64909 -89.8982,5.60186 -141.90619,-0.51616 C 5.66322,303.59332 6.35539,287.95845 6.35539,287.95845 48.87453,279.76334 63.03866,237.45082 74.05852,173.68495 85.07838,109.91907 97.77419,46.026926 147.77674,46.026926 Z"/>    <path id="pulse"  d="m 49.80997,277.55718 0,-272.2000611 188.86249,0 0,272.2000611 z"/></svg>';
	var mysvg = '<svg id="morph-example" xmlns="http://www.w3.org/2000/svg" viewBox="50 0 2000 550"><path id="smooth" style="visibility:hidden" class="bg-lime" d="M 143.22535,49.388672 C 49.893759,49.736837 66.069822,94.261955 60.609375,168.64258 55.337936,240.44859 51.252029,276.7921 6.3554688,287.95898 c 0,0 -0.6917604,15.63386 65.6621092,23.43946 52.007992,6.11802 100.713602,3.16667 141.906252,0.51758 37.95391,-2.44081 66.6875,-24.4629 66.6875,-24.4629 C 240.37722,276.97995 229.89592,238.89875 227.06641,166.58035 224.2369,94.261955 237.15442,49.038278 143.22535,49.388672 Z "/>    <path id="pulse"  d="m 49.80997,277.55718 0,-272.2000611 188.86249,0 0,272.2000611 z"/></svg>';
	$('.graph').html(mysvg);
	var tween = KUTE.to('#pulse', { path: '#smooth',svgTransform: {translate: [700,-45], scale: 1 } },{
			    morphIndex: 100,
			    duration: 6000, morphPrecision:20, morphIndex:29, easing: 'easingCubicInOut'
			}) 
	$('.btn.start, .graph').on('click',function(){
		if(!tween.playing){
			$('.graph').html(mysvg);
			var x = $('.graph').width();
			x+=x*0.4;
			tween = KUTE.to('#pulse', { path: '#smooth',svgTransform: {translate: [x,-45], scale: 1 } },{
			    morphIndex: 100,
			    //duration: 6000, morphPrecision:8, morphIndex:67, easing: 'easingCubicInOut'
			    duration: 6000, reverseSecondPath:true,morphPrecision:15, morphIndex:37, easing: 'easingCubicInOut'
			}) 
			tween.start();
		}
	});

	$('.hpc_array').on('click',function(){
		$(".hpc_array img").fadeTo(500,0.50, function() {
		      $(".hpc_array img").attr("src",($(".hpc_array img").attr("src")=='./img/hpc_mpi.png')?"./img/hpc_array.png":"./img/hpc_mpi.png");
		  }).fadeTo(500,1);
	});
	$('.hpc_mpi').on('click',function(){
		$(".hpc_mpi img").fadeTo(500,0.50, function() {
		      $(".hpc_mpi img").attr("src",($(".hpc_mpi img").attr("src")=='./img/hpc_mpi.png')?"./img/hpc_mpisx.png":"./img/hpc_mpi.png");
		  }).fadeTo(500,1);
	});



	$('#barSerMpiCheck>input').on('change',function(){
		$('#bar-sermpi').html("");
		var chart = new google.visualization.ColumnChart(document.getElementById('bar-sermpi'));
  		if($(this)[0].checked){
  			optionsSerMpi.colors = ['#48c','#5a5','77ff0f','#ffeb33','f93'];
  			view = new google.visualization.DataView(google.visualization.arrayToDataTable(barSerMpi1));
  			view.setColumns([0, 1,
                       { calc: "stringify",
                         sourceColumn: 1,
                         type: "string",
                         role: "annotation" },
                       2,
                       { calc: "stringify",
                         sourceColumn: 2,
                         type: "string",
                         role: "annotation" },
                       3,
                       { calc: "stringify",
                         sourceColumn: 3,
                         type: "string",
                         role: "annotation" },
                       4,
                       { calc: "stringify",
                         sourceColumn: 4,
                         type: "string",
                         role: "annotation" },
                       5,
                       { calc: "stringify",
                         sourceColumn: 5,
                         type: "string",
                         role: "annotation" }]);

  			chart.draw(view, optionsSerMpi);
  			//chart.draw(google.visualization.arrayToDataTable(barSerMpi1), optionsSerMpi);
  		}else{
  			optionsSerMpi.colors = ['#48c','#5a5'];
  			view = new google.visualization.DataView(google.visualization.arrayToDataTable(barSerMpi0));
  			view.setColumns([0, 1,
                       { calc: "stringify",
                         sourceColumn: 1,
                         type: "string",
                         role: "annotation" },
                       2,
                       { calc: "stringify",
                         sourceColumn: 2,
                         type: "string",
                         role: "annotation" }]);
  			chart.draw(view, optionsSerMpi);
  			//chart.draw(google.visualization.arrayToDataTable(barSerMpi0), optionsSerMpi);
  		}
	});


	$('.tab-item').on('click',function(e){
		e.preventDefault();
		var id = $(this).parent().attr("id").substr(3);
		//console.log(id);
		var chartId = 'bar-'+id.toLowerCase();
		$('#'+chartId).html("");
		$('#tab'+id+'>.active').removeClass('active');
		$(this).addClass('active');
		var tab=$(this)[0].innerText.trim();
		if(tab=='Average') {
			tab='Medie';
			//chartId='bar-timeexeaverage';
		}
		if(tab=='Medie' || id.trim()=='TimeExe' || id.trim()=='TimeCom')
			var chart = new google.visualization.ColumnChart(document.getElementById(chartId));
  		else
			var chart = new google.visualization.LineChart(document.getElementById(chartId));
  		chart.draw(google.visualization.arrayToDataTable(eval('bar'+id+tab)), eval('options'+id));
	});

	$('.last').on('click',function(e){
		location.hash = "#Intro";
		$('.modal').addClass('active');
	});

	$('.modal').on('click',function(e){
		$('.modal').removeClass('active');
	});
	$('.menu').on('click',function() {
		$('.menu').addClass('active');
	});
	$('.menu-item').on('click',function(e){
		/*var lang = $(this)[0].innerText.substr(0, 2);
		$().translate(eval(lang.toLowerCase()));
		lang_now=eval(lang.toLowerCase());
		$('a.dropdown-toggle').html(lang+' <img style="max-width:18px;" src="./img/'+lang.toLowerCase()+'.png"><i class="icon-caret"></i>');
		*/
		//window.location.href = window.location+'#'+$(this)[0].innerText.substr(0, 2);
		location.reload();
	});


	/***************************/


	$("body").on("keydown", function(event) {
		
	    var elements=[".modal",".btn.start, .graph","#barSerMpiCheck",".hpc_array",".hpc_mpi",".tab-item",".last"];
	    if(event.keyCode==13){
	    	event.preventDefault();
	    	$.each(elements, function( index, value ) {
	    		var elView = $(value+":in-viewport");
				if(elView.length==1 && $(elView).isOnScreen()){
					//console.log(elView);
					$(elView).click();
			    	$(value+">input").blur();
			  	}else{
					if(elView.length>1){
						var tabId = "#"+elView.parent().attr("id");
						var next = $(tabId).find('.active').next('.tab-item');
						if ($(tabId).find('.active')[0].innerText==$(tabId).find('.tab-item').last()[0].innerText)
							next=$(tabId).find('.tab-item')[0];
						next.click();
					}
				}
			});
	    }
	});



});

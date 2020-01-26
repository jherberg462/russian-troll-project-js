// function getPlot(dates) {

  d3.json("data/test.json").then((data)=> {
    console.log(data)

    // var test = data.test.filter(t => t.dates.toString() === dates)[0];
    
    // console.log(test);


  var trace1 = {
    x: [],
    y: [],
    // text: lables,
    marker: {
        color: 'blue'
    },
    type: "bar",
    orientation: "h",
};

  var data = [trace1];

  var layout = {
      title: "Tweets",
      yaxis: {
          tickmode: "linear",
      },
      margin: {
          l: 100,
          r: 100,
          t: 100,
          b: 30
      },
      // paper_bgcolor: 'rgba(0,0,0,0)',
      // plot_bgcolor: 'rgba(0,0,0,0)'
  };

  Plotly.newPlot("bar", data, layout);



  var trace2 = {
      x: [],
      y: [],
      mode: 'markers',
      marker: {
        color: 'rgb(219, 64, 82)',
        size: 12
      }
    };
    
  var trace3 = {
      x: [],
      y: [],
      mode: 'lines',
      line: {
        color: 'rgb(55, 128, 191)',
        width: 3
      }
    };
    
  var trace4 = {
      x: [],
      y: [],
      mode: 'lines+markers',
      marker: {
        color: 'rgb(128, 0, 128)',
        size: 8
      },
      line: {
        color: 'rgb(128, 0, 128)',
        width: 1
      }
    };
    
    var data2 = [trace2, trace3, trace4];
    
    var layout = {
      title: 'Tweets'
    };
    
    Plotly.newPlot('line', data2, layout);



  var trace5 = {
    x: [],
    y: [],
    text: ['A<br>size: 40', 'B<br>size: 60', 'C<br>size: 80', 'D<br>size: 100'],
    mode: 'markers',
    marker: {
      color: ['rgb(93, 164, 214)', 'rgb(255, 144, 14)',  'rgb(44, 160, 101)', 'rgb(255, 65, 54)'],
      size: [40, 60, 80, 100]
    }
  };
  
  var data3 = [trace5];
    
  var layout = {
      title: 'Tweets',
      showlegend: false,
      height: 600,
      width: 600
    };
  
  Plotly.newPlot('bubble', data3, layout);
  });

// create the function to get the necessary data
// function getInfo(dates) {
//   // read the json file to get data
//   d3.json("data/test.json").then((data)=> {
      
//       // get the tweetdata info for the Tweet Details panel
//       var tweetdata = data.tweetdata;

//       console.log(tweetdata)

//       // filter tweet data info by date
//       var result = tweetdata.filter(tweet => tweet.dates.toString() === dates)[0];

//       // select Tweet Details panel to put data
//       var tweetInfo = d3.select("#sample-tweetdata");
      
//       // empty the tweet Details panel each time before getting new date info
//       tweetInfo.html("");

//       // grab the necessary Tweet Details data for the date and append the info to the panel
//       Object.entries(result).forEach((key) => {   
//               tweetInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
//       });
//   });
// }

// // create the function for the change event
// function optionChanged(dates) {
//   getPlot(dates);
//   getInfo(dates);
// }

// function init() {

//     var dropdown = d3.select("#selDataset");
    
//     d3.json("data/test.json").then((data)=> {
//       console.log(data)

//       data.dates.forEach(function(date) {
//         dropdown.append("option").text(date).property("value");
//       });

//       // call the functions to display the data and the plots to the page
//       getPlot(data.dates[0]);
//       getInfo(data.dates[0]);
//   });

// }

// init();

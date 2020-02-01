function unpack(rows, index) {
    return rows.map(function(row) {
      return row[index];
    });
  }

function getFollowing() {
    var start = '2013-01-01'
    var end = '2017-11-29'
    var url3 = `http://localhost:5000/api/data/following/${start}/${end}`
    
    d3.json(url3).then(function(data4) {
        console.log(data4[0]);

        var following = data4
        var avg_following = following.map(average_num_following => average_num_following.dates);
        console.log(avg_following);

        var trace3 = {
            x: following,
            y: avg_following,
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
    
        var plotdata3 = [trace3];
        
        
    Plotly.newPlot('line2', plotdata3, {responsive: true});

        
    });
}

getFollowing();


function getFollowers() {
    var start = '2013-01-01'
    var end = '2017-11-29'
    var url4 = `http://localhost:5000/api/data/followers/${start}/${end}`
    
    d3.json(url4).then(function(data3) {
        console.log(data3[0]);

        var followers = data3

        var avg_followers = followers.map(average_num_of_followers => average_num_of_followers.dates);
        console.log(avg_followers);

         var trace2 = {
            x: followers,
            y: avg_followers,
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
    
        var plotdata2 = [trace2];
        
        
    Plotly.newPlot('line', plotdata2, {responsive: true});

        
    });
}

getFollowers();


function getDates() {
    var start = '2013-01-01'
    var end = '2017-11-29'
    var url5 = `http://localhost:5000/api/data/tweet_len/${start}/${end}`
    
    d3.json(url5).then(function(data2) {
        console.log(data2[0]);

        var tweetdates = data2

        var tweetdate = tweetdates.map(date => date.dates);
        var tweetLen = tweetdates.map(date => date.tweet_length);
        console.log(tweetdate);
        console.log(tweetLen);
 

        var trace1 = {
            x: tweetdate,
            y: tweetLen,
            mode: 'markers',
            type: 'scatter'
          };
  
        // create data variable
        var plotdata = [trace1];
  
        // create the bar plot
        Plotly.newPlot("scatter", plotdata, {responsive: true});
         
    var startdate = $("#datepickerstart").datepicker( "option", "dateFormat", "yy-mm-dd" );
    var enddate = $("#datepickerend").datepicker( "option", "dateFormat", "yy-mm-dd" );


 
    function handleSubmit() {
        d3.event.preventDefault();
        var submitdate = d3.select("#datepickerend").node().value;
        console.log(submitdate);
   
    }

    // // Add event listener for submit button
    d3.select("#submit").on("click", handleSubmit);
    });
}

getDates();


function getInfo() {
    
    var url2 = `http://localhost:5000/api/data/account_dashbord/CHEYENNE_ENG`;

    d3.json(url2).then(function(data1) {
        console.log(data1[0]);

        var tweetdata = data1
     
        var accountCategory = tweetdata.map(info => info.account_category);
        var earliestTweet = tweetdata.map(info => info.earliest_tweet);
        var latestTweet = tweetdata.map(info => info.latest_tweet);
        var numInteractionpertweet = tweetdata.map(info => info.num_interactions_per_tweet);
        var numTweets = tweetdata.map(info => info.number_of_tweets);
        var twitterHandle = tweetdata.map(info => info.twitter_handle);
        buildTable(accountCategory, earliestTweet, latestTweet, numInteractionpertweet, numTweets, twitterHandle);
    });
}
  

function buildTable(accountCategory, earliestTweet, latestTweet, numInteractionpertweet, numTweets, twitterHandle) {
    var tweetInfo = d3.select('#sample-tweetdata');
    tweetInfo.html('')
    tweetInfo.append("p").text("Account Category: " + accountCategory)
    tweetInfo.append("p").text("Earliest Tweet: " + earliestTweet)
    tweetInfo.append("p").text('Latest Tweet: ' + latestTweet)
    tweetInfo.append('p').text('# of Interaction per Tweet: ' + numInteractionpertweet)
    tweetInfo.append('p').text("# of Tweets: " + numTweets)
    tweetInfo.append('p').text('Twitter Handle: ' + twitterHandle)
    
}

getInfo();

function getPlot() {

    var dropdown = d3.select("#selDataset");

    var url = `http://localhost:5000/api/data/accounts`

     d3.json(url).then(function(data) {
        console.log(data[0]);


        data[0].twitter_handle.forEach(function(name) {
            dropdown.append("option").text(name).property("value");

    }); 

    });
}

getPlot();


// function updateData(){
//     var selector = d3.select("#selDataset");
//     d3.json(url).then(twitterName) => {
//         twitterName.forEach((data[0].twitter_handle) => {
//             selector
//             dropdown.append("option")
//             .text(data[0].twitter_handle)
//             .property("value", data[0].twitter_handle);
//         });
//     });
// }
// function optionChanged() {
//     getInfo();
//     getPlot();
//     getDates();
//     getfollowers();
//     getfollowing();
// }


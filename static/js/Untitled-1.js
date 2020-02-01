function unpack(rows, index) {
    return rows.map(function(row) {
      return row[index];
    });
  }

function getFollowing() {
    var start = 2013-01-01
    var end = 2017-11-29
    var url3 = `http://localhost:5000/api/data/following/${start}/${end}`
    
    d3.json(url3).then(function(data4) {
        console.log(data4[0]);

        var following = data4
        var avg_following = following.map(average_num_following => average_num_following.dates);
        console.log(avg_following);

        
    });
}

getFollowing();


function getFollowers() {
    var start = 2013-01-01
    var end = 2017-11-29
    var url4 = `http://localhost:5000/api/data/followers/${start}/${end}`
    
    d3.json(url4).then(function(data3) {
        console.log(data3[0]);

        var followers = data3

        var avg_followers = followers.map(average_num_of_followers => average_num_of_followers.dates);
        

        
    });
}

getFollowers();


function getDates() {
    var start = 2013-01-01
    var end = 2017-11-29
    var url5 = `http://localhost:5000/api/data/tweet_len/${start}/${end}`
    
    d3.json(url5).then(function(data2) {
        console.log(data2[0]);

        var tweetdates = data2

        var dates = tweetdates.map(date => date.dates);
        var tweetLen = tweetdates.map(date => date.tweet_length);
        console.log(dates);
        console.log(tweetLen); 
    });
}

getDates();


function getInfo() {
    var url = `http://localhost:5000/api/data/accounts`
    var tweetInfo = d3.json(url).then(function(data) {
        console.log(data[0]);
    });

    var url2 = `http://localhost:5000/api/data/account_dashbord/${tweetInfo}`;

    d3.json(url2).then(function(data1) {

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
    tweetInfo.append("p").text("Account Category:" + accountCategory)
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


function optionChanged() {
    getInfo();
    getPlot();
    getDates();
    getfollowers();
    getfollowing();
}
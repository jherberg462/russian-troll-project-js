
var accounts_url = 'http://localhost:5000/api/data/accounts'
//url to grab a list of all accounts
d3.json(accounts_url).then((accountsJson) =>{
    accounts_data = accountsJson[0]
    // console.log(accounts_data)
    // console.log(accounts_data[0])

    d3.select("select")
    .selectAll("option")
    .data(accounts_data.twitter_handle)
    .enter()
    .append('option')
    .text(function(d){return d})
    .attr("value", function(d){return d});


    //set default values for time based charts
    var start_default = '2016-05-08'
    var end_default = '2016-08-11'
    //the twitter account dashbord will display the first twitter account in the accounts list by default
updateAccount1(accounts_data.twitter_handle[0])

//display the averge tweet length chart with default dates
avgTweetLength(start_default, end_default)
//display the average number of followers chart with default dates
followers(start_default, end_default)
//display the average number following chart with default dates
following(start_default, end_default)
})

//the updateAccount function will be called when the seldataset div is changed
d3.selectAll("#SelDataset").on("change", updateAccount)

function updateAccount(){
    var selectedAccount = d3.select("#selDataset");
    var selectedAccount1 = selectedAccount.property('value');
    updateAccount1(selectedAccount1)
}



function updateAccount1(account){
    var account_dashbord_url = `http://localhost:5000/api/data/account_dashbord/${account}`
    d3.json(account_dashbord_url).then(function(account_d_data){
        account_data = account_d_data[0]
        // console.log(account_data)

        var accountInfoDiv = d3.select("#account_dashbord")
        accountInfoDiv.html('')
        accountInfoDiv.append("P").text("Twitter Handle Name: " + account_data.twitter_handle)
        accountInfoDiv.append("P").text("Number of Tweets: " + account_data.number_of_tweets)
        accountInfoDiv.append("p").text("Interactions per tweet: " + account_data.num_interactions_per_tweet)
        accountInfoDiv.append("P").text("Earliest Tweet: " + account_data.earliest_tweet)
        accountInfoDiv.append("p").text("Latest Tweet: " + account_data.latest_tweet)
        accountInfoDiv.append("p").text("Category: " + account_data.account_category)
    })
}//end of updateAccount1 function


function avgTweetLength(start, end){
    var tweet_len_url = `http://localhost:5000/api/data/tweet_len/${start}/${end}`
    d3.json(tweet_len_url).then(function(length_data){
       var tweet_length_data = length_data[0]
        // console.log(tweet_length_data)

        var trace = {
            type: "scatter",
            mode: "lines",
            x: tweet_length_data.dates,
            y: tweet_length_data.tweet_length
        }
        var data = [trace]
        var layout = {
            title: `Average Tweet Length - ${start} to ${end}`
        }
        Plotly.newPlot('tweet_length', data, layout)
    })

}//end of avgTweetLength function

var lenButton = d3.select("#buttonLen")
var lenStart = d3.select("#lenDateStart")
var lenStop = d3.select('#lenDateEnd')
function lenClick(){
    var clickStart = lenStart.property('value')
    var clickEnd = lenStop.property("value")
    avgTweetLength(clickStart,clickEnd)
}
//when the button to update the average tweet length is clicked, the chart will update
lenButton.on("click", lenClick)




function followers(start, end){
    var followers_url = `http://localhost:5000/api/data/followers/${start}/${end}`
    var b1 = d3.json(followers_url).then(function(followers_data){
        var followers = followers_data[0]
        
        var trace = {
            type: "scatter",
            mode: "lines",
            x: followers.dates,
            y: followers.average_num_of_followers
        }
        var data = [trace]
        var layout = {
            title: `Average No of Followers - ${start} to ${end}`
        }
        Plotly.newPlot('num_followers', data, layout)
 


    })
 
}
// end of followers function

var followerButton = d3.select("#buttonFollow")
var followStart = d3.select("#followersStart")
var followStop = d3.select('#followersEnd')
function followClick(){
    var clickStart = followStart.property('value')
    var clickEnd = followStop.property("value")
    followers(clickStart,clickEnd)
}
//when the button to update the average number of followers is clicked, the chart will update
followerButton.on("click", followClick)


function following(start, end){
    var following_url = `http://localhost:5000/api/data/following/${start}/${end}`
    var b1 = d3.json(following_url).then(function(following_data){
        var followers = following_data[0]
        
        var trace = {
            type: "scatter",
            mode: "lines",
            x: followers.dates,
            y: followers.average_num_following 
        }
        var data = [trace]
        var layout = {
            title: `Average No Following - ${start} to ${end}`
        }
        Plotly.newPlot('num_following', data, layout)
  


    })
 
}
// end of following function

var followingButton = d3.select("#buttonFollowing")
var followingStart = d3.select("#followingStart")
var followingStop = d3.select('#FollowingEnd')
function followingClick(){
    var clickStart = followingStart.property('value')
    var clickEnd = followingStop.property("value")
    followers(clickStart,clickEnd)
}
followingButton.on("click", followingClick)
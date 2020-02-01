#!/usr/bin/env python
# coding: utf-8

# In[ ]:


#dependencies
import pandas as pd
import numpy as np
import datetime as dt
from sqlalchemy import create_engine, Column, Integer, String, Float, func, desc
from sqlalchemy.orm import Session
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.ext.automap import automap_base
from flask import Flask, jsonify
import time
import warnings
warnings.filterwarnings("ignore")
from flask_cors import CORS


# In[ ]:


username = 'postgres'
password = 'jWOLC89iuVoo'
database = 'troll_tweet_project'
#connect to local SQL db
engine = create_engine(f'postgresql://{username}:{password}@localhost/{database}')

#create variable to connect to postgress db
connection = engine.connect()

#reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)


# In[ ]:


# Save reference to the table
Tweets = Base.classes.tweets


# In[ ]:


#set variable 'app' to run Flask
app = Flask(__name__)
#allow Cross Origin Resource Sharing
CORS(app)


# In[ ]:


#this route will return the average tweet length for each tweet that was tweeted per day
@app.route('/api/data/tweet_len/<start>/<end>')
def tweet_length(start, end):
    #set pattern for date formats going into and out of epoch
    time_pattern = '%Y-%m-%d'
    #connect to postgresql db
    session = Session(engine)
    #convert start input to epoch
    start_converted = int(time.mktime(time.strptime(start, time_pattern)))
    end_converted = int(time.mktime(time.strptime(end, time_pattern)))
    #select the average of the length of the tweets, and the date
    sel = [func.avg(func.length(Tweets.content)), Tweets.published_date]
    #do a query of the sel, filter by between the start and end dates, and group by the date
    result = session.query(*sel).filter(Tweets.published_date >= start_converted).filter(Tweets.published_date <= end_converted).group_by(Tweets.published_date).order_by(Tweets.published_date)
    #close connection to db
    session.close()
    #create empty list for results
    results = []
    #create empty list for dates
    dates = []
    #create empty list for averages
    averages = []
    for tweet_length, tweet_date in result:
        #convert out to epoch format
        tweet_date_converted = dt.datetime.fromtimestamp(tweet_date).strftime('%Y-%m-%d')
        #add converted date to dates list
        dates.append(tweet_date_converted)
        #first convert to float
        tweet_len = float(tweet_length)
        #add tweet length to list for averages
        averages.append(tweet_len)
    #create empty dictionary
    result_dictionary = {}
    #add dates list to dictionary
    result_dictionary['dates'] = dates
    #add tweet average length list to dictionary
    result_dictionary['tweet_length'] = averages
    #add dictionary to results list
    results.append(result_dictionary)
    #display in readable format
    return jsonify(results)
    


# In[ ]:


#this route will return the average number of followers each account has that tweeted each day
@app.route('/api/data/followers/<start>/<end>')
def num_followers(start, end):
    #set pattern for date formats going into and out of epoch
    time_pattern = '%Y-%m-%d'
    #connect to postgresql db
    session = Session(engine)
    #convert start input to epoch
    start_converted = int(time.mktime(time.strptime(start, time_pattern)))
    end_converted = int(time.mktime(time.strptime(end, time_pattern)))
    #write sql query to find the most followers each account had per day that tweeted, between the start and end dates
    query_text = f'select max(followers) as followers, author, published_date from tweets where published_date < {end_converted} and published_date > {start_converted}  group by published_date, author order by published_date;'
    #read in the results from the above query into a new df
    df_followers = pd.read_sql(query_text, engine)
    #push the above df into a new table, and drop this table if it already exists
    df_followers.to_sql('avg_followers', con=engine, index=False, if_exists='replace')
    #add a primary key to above table so sqlalchemy can perform queries on the table
    engine.execute('ALTER TABLE avg_followers ADD COLUMN internal_number  SERIAL PRIMARY KEY;')
    #get updated reflection on the tables
    Base.prepare(engine, reflect=True)
#     #assign variable for the Avg_followers table to run queries on it
    Avg_followers = Base.classes.avg_followers
#     #selection for query
    sel = [func.avg(Avg_followers.followers), Avg_followers.published_date]
#     #group by the published date
    result = session.query(*sel).group_by(Avg_followers.published_date)    
    #close connection to db
    session.close()
    #create empty list for results
    results = []
    #create empty list for dates
    dates = []
    #create empty list for number of followers
    followers = []
    for avg_followers, tweet_date in result:
        #convert out to epoch format
        tweet_date_converted = dt.datetime.fromtimestamp(tweet_date).strftime('%Y-%m-%d')
        #add converted date to dates list
        dates.append(tweet_date_converted)
        #first convert to float
        average_followers = float(avg_followers)
        #add tweet length to list for averages
        followers.append(average_followers)
    #create empty dictionary
    result_dictionary = {}
    #add dates list to dictionary
    result_dictionary['dates'] = dates
    #add tweet average length list to dictionary
    result_dictionary['average_num_of_followers'] = followers
    #add dictionary to results list
    results.append(result_dictionary)
    #display in readable format
    return jsonify(results)
#     return('success')
    


# In[ ]:


#this route will return the average number of accounts each account is that has tweeted each day
@app.route('/api/data/following/<start>/<end>')
def num_following(start, end):
    #todo - change comments to reflect following vs followers
    #set pattern for date formats going into and out of epoch
    time_pattern = '%Y-%m-%d'
    #connect to postgresql db
    session = Session(engine)
    #convert start input to epoch
    start_converted = int(time.mktime(time.strptime(start, time_pattern)))
    end_converted = int(time.mktime(time.strptime(end, time_pattern)))
    #write sql query to find the most followers each account had per day that tweeted, between the start and end dates
    query_text = f'select max(following) as follow, author, published_date from tweets where published_date < {end_converted} and published_date > {start_converted}  group by published_date, author order by published_date;'
    #read in the results from the above query into a new df
    df_followers = pd.read_sql(query_text, engine)
    #push the above df into a new table, and drop this table if it already exists
    df_followers.to_sql('avg_following', con=engine, index=False, if_exists='replace')
    #add a primary key to above table so sqlalchemy can perform queries on the table
    engine.execute('ALTER TABLE avg_following ADD COLUMN internal_number  SERIAL PRIMARY KEY;')
    #get updated reflection on the tables
    Base.prepare(engine, reflect=True)
    #assign variable for the Avg_followers table to run queries on it
    Avg_following = Base.classes.avg_following
    #selection for query
    sel = [func.avg(Avg_following.follow), Avg_following.published_date]
    #group by the published date
    result = session.query(*sel).group_by(Avg_following.published_date)    
    #close connection to db
    session.close()
    #create empty list for results
    results = []
    #create empty list for dates
    dates = []
    #create empty list for number of followers
    followingg = []
    for avg_followin, tweet_date in result:
        #convert out to epoch format
        tweet_date_converted = dt.datetime.fromtimestamp(tweet_date).strftime('%Y-%m-%d')
        #add converted date to dates list
        dates.append(tweet_date_converted)
        #first convert to float
        avg_followinn = float(avg_followin)
        #add tweet length to list for averages
        followingg.append(avg_followinn)
    #create empty dictionary
    result_dictionary = {}
    #add dates list to dictionary
    result_dictionary['dates'] = dates
    #add tweet average length list to dictionary
    result_dictionary['average_num_following'] = followingg
    #add dictionary to results list
    results.append(result_dictionary)
    #display in readable format
    return jsonify(results)


# In[ ]:


#this endpoint will return a list of unique twitter handles in our dataset
@app.route('/api/data/accounts')
def account_list():
    session = Session(engine)
    sel = [Tweets.author]
    result = session.query(*sel).distinct()
    session.close()
    accounts = []
    results = []
    for handle in result:
        accounts.append(handle[0])
    result_dictionary = {}
    result_dictionary['twitter_handle'] = accounts
    results.append(result_dictionary)
    return jsonify(results)


# In[ ]:


#this endpoint will data about a specific queried account
@app.route('/api/data/account_dashbord/<account>')
def account_dashbord(account):
    session = Session(engine)
    sel = [Tweets.author, func.max(Tweets.published_date), func.min(Tweets.published_date), func.count(Tweets.internal_tweet_number), Tweets.account_category, func.avg(Tweets.updates)]
    result = session.query(*sel).filter(Tweets.author == account).group_by(Tweets.author, Tweets.account_category).all()
    session.close()
    results = []
    result_dictionary = {}
    for author, max_tweet_date, min_tweet_date, num_tweets, category, interactions in result:
        result_dictionary['twitter_handle'] = author
        max_tweet_date1 = dt.datetime.fromtimestamp(max_tweet_date).strftime('%Y-%m-%d')
        result_dictionary['latest_tweet'] = max_tweet_date1
        min_tweet_date1 = dt.datetime.fromtimestamp(min_tweet_date).strftime('%Y-%m-%d')
        result_dictionary['earliest_tweet'] = min_tweet_date1
        result_dictionary['number_of_tweets'] = float(num_tweets)
        result_dictionary['account_category'] = category
        #the interaction are regarding the original tweet, if the subject author is not the author of the tweet
        #for example a retweet, or quote tweet
        result_dictionary['num_interactions_per_tweet'] = float(interactions)
    #consider making a second query for information only prior to the election
    results.append(result_dictionary)
    #same query as above, but filtering by only tweets prior to Nov 8, 2016 (the 2016 election date)
    result1 = session.query(*sel).filter(Tweets.author == account).filter(Tweets.published_date < 1478563200).group_by(Tweets.author, Tweets.account_category).all()
    session.close()
    result_dictionary_b4_election = {}
    for author, max_tweet_date, min_tweet_date, num_tweets, category, interactions in result1:
        result_dictionary_b4_election['twitter_handle_b4'] = author
        max_tweet_date1 = dt.datetime.fromtimestamp(max_tweet_date).strftime('%Y-%m-%d')
        result_dictionary_b4_election['latest_tweet_b4'] = max_tweet_date1
        min_tweet_date1 = dt.datetime.fromtimestamp(min_tweet_date).strftime('%Y-%m-%d')
        result_dictionary_b4_election['earliest_tweet_b4'] = min_tweet_date1
        result_dictionary_b4_election['number_of_tweets_b4'] = float(num_tweets)
        result_dictionary_b4_election['account_category_b4'] = category
        #the interaction are regarding the original tweet, if the subject author is not the author of the tweet
        #for example a retweet, or quote tweet
        result_dictionary_b4_election['num_interactions_per_tweet4_b'] = float(interactions)
    results.append(result_dictionary_b4_election)
    return jsonify(results)
        


# In[ ]:


if __name__ == '__main__':
    app.run(debug=True)


#!/usr/bin/env python
# coding: utf-8

# In[1]:


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


# In[2]:


username = 'postgres'
password = 'x'
database = 'troll_tweet_project'
#connect to local SQL db
engine = create_engine(f'postgresql://{username}:{password}@localhost/{database}')

#create variable to connect to postgress db
connection = engine.connect()

#reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)


# In[3]:


# Save reference to the table
Tweets = Base.classes.tweets


# In[ ]:


#set variable 'app' to run Flask
app = Flask(__name__)


# In[ ]:


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


if __name__ == '__main__':
    app.run(debug=True)


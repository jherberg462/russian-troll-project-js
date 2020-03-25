# Russian Troll Tweet Analysis

The purpose of this project was to create an interactive dashbord from Russian Troll Tweet data. Once the dataset was found, we used Python, SQLAlchemy, Numpy, Pandas to load the data from the CSV files into a PostgreSQL database, and a series of SQL commands to clean the data. Next, Python, Flask, SQLAlchemy, Pandas, Numpy, and Datetime was used to create a Flask app that will be used to serve data to a static HTML webpage. Finally, HTML, Javascript, D3, Plotly, and jquery was used to create a the dashbord that calls the various Flask routes to obtain data to display.

## Dataset

https://www.kaggle.com/fivethirtyeight/russian-troll-tweets

## Questions:

1. How long do Russian Troll Tweets tend to be?
2. How many followers do Russian Troll Twitter accounts tend to have?
3. How many accounts do Russian Troll Twitter accounts tend to follow?
4. How many interactions (tweets, retweets, comments, likes) does each Russian Troll Twitter account receive on average?
5. How many tweets did each Russian Troll Twitter acccount send?

## Tasks

### ETL

1. Download CSV files from datasource.
2. Create PostgreSQL database.
3. Connect to PostgreSQL database
4. Loop through each CSV file downloaded in step 1 above, load the data into a DataFrame, use the to_sql() function in Pandas to send the data in the DataFrame to a table in the PostgreSQL database. 
5. Create a primary key in the table referenced in step 4 above.
6. Create indexs in the table referenced in step 4 above to allow the table to be queried more quickly. 
7. Remove rows in the table in step 4 above that contain selected missing information.

### Flask App

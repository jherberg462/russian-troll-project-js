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

1. Create variables with the necessary information to connect to the PostgreSQl database.
2. Create routes and define functions for each dynamic information that will be displayed on the dashbord. 
3. Create route and define function for static information that will be used on the dashbord. 
4. For each route created in steps 2 and 3 above, use SQLalchemy to pull data from PostgreSQL database, loop through results to add each row in the returned query to a list of dictionaries. 
5. For each route created in steps 2 and 3 above, return the list of dictionaries referenced in step 4 above in JSON format.

### Front End 

1. Create webpage using HTML with appropiate DIV tags for each output and chart that will be displayed.
2. Create Javascript file that will be called in the HTML webpage in step 1 above that will call each of the various flask routes when appropriate, and display the results as a plotly chart or text summary using D3. 

## Using the Dashbord
1. Create PostgreSQL database
2. Run the jupyter notebook titled etl.ipynb after changing the variables in the 2nd box to allign with the database created in step 1 above.
3. Run the SQL commands listed in the 5th box in the jupyter notebook titled etl.ipynb in PGadmin or other interface that interacts with the PostgreSQL database
4. Start a python http server, and run the app.py file
5. The dashbord will run on http://localhost:8000/

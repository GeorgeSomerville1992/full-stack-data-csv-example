# Preqin code test

## Instructions

To run the app
Please run `npm install` to install modules

Please run `npm server` to run server which will setup the database
Please run `npm dev` which will run the frontend

## Overall

App is fairly bare bones, with a slight focus towards frontend and accessibility.

Areas of focus and improvement

### Frontend

Hooks

- Refactor hooks for filters - commitments hook is fairly large.
- create custom context to allow data to be available should there be any further prop drilling of components
- Unit test hooks behaviour by mocking requests.

Components/Architecture

- filter in comittments can be split into it's own component
- A lot of code duplication going on with the tables. We could make this cleaner
- Test working flow with mocked data from a users point of view ( as a User I should.. )

Styling

- The styling here is very poor (from a frontend point of view) Within the time constraint I traded this for accessibility
- Mobile first media queries. Only one is used to make the buttons expand across the full screen
- Use scss and make use of variables across the app

### Backend

- I had a couple of problems importing the data from the CSV file into a sql lite database. This was fairly easy with python using panda and dataframes. With node I opted for a file stream which reads the rows one by one and imports them in that way.
- We can certainly refactor the aggregation of data, the grouping and creation of sets could be done within the same function.

Refactor commitment and investment aggregation, I feel there is a bit of reuse going on with the sets
Also functionality is quite large

### Testing

- The numbers I have of the totals are different to the ones on the screenshots. I do think mine are right however to prove this some unit tests could have been done around this logic.
- Test all aggregated logic using functional unit tests
- Test formatting of amount
- Test basic view tests, screen shows correctly mocked data.
- Integration tests, test hoosk behave correctly and handle failure of fetching via mocked requests

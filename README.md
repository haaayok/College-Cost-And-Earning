# College-Cost-And-Earning Project Summary

Project Demo: [haoyan.info](https://haoyan.info)


### Introduction
This application lets you find the 10 universities in every state that have the highest annual cost of attendance and the 10 universities with the highest median annual earning 2 years after graduate. To view a state's school data, click on that state on the map interface.

### Data Source
This application uses data provided the U.S. Department of Education. The API endpoint is provided [here](https://collegescorecard.ed.gov/data/documentation/). Both cost of attendance and earning data is collected in 2018.

### API Key
The file containing API Key is gitignored. If you want to run this project locally, you could get a key from [U.S. Department of Education](https://collegescorecard.ed.gov/data/documentation/). Then, create file src/APIs/ApiKeys.js and edit it to include:

```javascript

export const schoolDataApiKey =   // API key here

```

### Library Usage
The map is created using [React Simple Maps](https://www.react-simple-maps.io/).

Some styling are done using [React BootStrap](https://react-bootstrap.github.io/).


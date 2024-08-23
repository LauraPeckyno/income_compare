const form = document.querySelector("#zipCodesForm");
const resultsDiv = document.querySelector(".zipOutput");
const apiKey = '322ff39417763138902d1fd67b9f59bf79067861'; // Census API key
const censusApiEndpoint = 'https://api.census.gov/data/2020/acs/acs5';  /// base census url
const ziptasticApiEndpoint = 'http://ziptasticapi.com';  // base ziptastic url
const formBtn = document.querySelector(".submitBtn");

import { validateZipCodes } from './validate.mjs'; // import the zip code validation from the module
import { displayResults } from './output.mjs';
import { getNews } from './newsResults.mjs'

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const zipCode1 = document.getElementById('zipcode1').value;
  const zipCode2 = document.getElementById('zipcode2').value;

  if (!validateZipCodes(zipCode1, zipCode2)) {
    alert('Please enter two valid 5-digit zip codes.');  // making sure the zips are valid
    return;
  }
    // Build the API request URLs
    const censusUrl1 = `${censusApiEndpoint}?get=NAME,B19013_001E&for=zip%20code%20tabulation%20area:${zipCode1}&key=${apiKey}`;  // basically just uses a string to build the URL for the api call
    const censusUrl2 = `${censusApiEndpoint}?get=NAME,B19013_001E&for=zip%20code%20tabulation%20area:${zipCode2}&key=${apiKey}`;
    const ziptasticUrl1 = `${ziptasticApiEndpoint}/${zipCode1}`;
    const ziptasticUrl2 = `${ziptasticApiEndpoint}/${zipCode2}`;

    try {
        // Send the API requests to both places
        const censusResponse1 = await fetch(censusUrl1);
        const censusResponse2 = await fetch(censusUrl2);
        const ziptasticResponse1 = await fetch(ziptasticUrl1);
        const ziptasticResponse2 = await fetch(ziptasticUrl2);

        if (!censusResponse1.ok || !censusResponse2.ok || !ziptasticResponse1.ok || !ziptasticResponse2.ok) {   // error handling
            throw new Error('Error in one or more API requests.');
        }

        const censusData1 = await censusResponse1.json();  // getting the json of the responses
        const censusData2 = await censusResponse2.json();
        const ziptasticData1 = await ziptasticResponse1.json();
        const ziptasticData2 = await ziptasticResponse2.json();

        // Pull out the median household income values (array)
        const medianHouseholdIncome1 = censusData1[1][1];
        const medianHouseholdIncome2 = censusData2[1][1];

        // Pull out the labeled city and state names
        const city1 = ziptasticData1.city;
        const state1 = ziptasticData1.state;
        const city2 = ziptasticData2.city;
        const state2 = ziptasticData2.state;

        // Add results to page

        displayResults(resultsDiv, city1, state1, zipCode1, medianHouseholdIncome1, city2, state2, zipCode2, medianHouseholdIncome2);
        getNews(resultsDiv, ziptasticData1, ziptasticData2);
    } catch (error) {
        console.error(error);
        alert('Error fetching data. Please try again.');
      }
    });
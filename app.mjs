const form = document.getElementById('zipcodesform');
const resultsDiv = document.getElementById('zipOutput');
const apiKey = '322ff39417763138902d1fd67b9f59bf79067861'; // API key from census
const basecensusURL = 'https://api.census.gov/data/2022/acs/acs5?get=NAME,B19013_001E&for=zip%20code%20tabulation%20area:'; // the base of the URL for the api requests

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const zipCode1 = document.getElementById('zipcode1').value;
    const zipCode2 = document.getElementById('zipcode2').value;

    // Validate zip codes
    if (!zipCode1 || !zipCode2 || zipCode1.length !== 5 || zipCode2.length !== 5) {
        alert('Please enter two zip codes. The zip codes should be 5 digits long. (no zip+4)');
        return;
    }

    /// note: should I send these in one request?  Maybe
 const url1 = `${apiEndpoint}?get=B19013_001E&for=zip+code+tabulation+area:${zipCode1}&key=${apiKey}`;  // zip 1 api request
 const url2 = `${apiEndpoint}?get=B19013_001E&for=zip+code+tabulation+area:${zipCode2}&key=${apiKey}`;  // zip 2 api request

 try {
     // sending the api fetch request
     const response1 = await fetch(url1);
     const response2 = await fetch(url2);
     const data1 = await response1.json();
     const data2 = await response2.json();

     // get the income values
     const medianIncome1 = data1[1][0];
     const medianIncome2 = data2[1][0];

     // Add results to page
     resultsDiv.innerHTML = `
         <h2>Results</h2>
         <p>Zip Code 1 (${zipCode1}): $${medianIncome1}</p>
         <p>Zip Code 2 (${zipCode2}): $${medianIncome2}</p>
     `;
 } catch (error) {  // error handling
     console.error(error);
     alert('Error fetching data. Please try again.');
 }
});

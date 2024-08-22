export { submitForm };

const apiKey = '322ff39417763138902d1fd67b9f59bf79067861';
const basecensusURL = 'https://api.census.gov/data/2022/acs/acs5?get=NAME,B19013_001E&for=zip%20code%20tabulation%20area:';
const resultsDiv = document.querySelector(".zipOutput");

const validateZipCode = (zipCode) => {
    if (!zipCode || zipCode.length !== 5 || !/^\d+$/.test(zipCode)) {  // making sure the zips are right. Is it falsy, does it have more than 5 characters. does it have characters other than numbers
      return false;
    }
    return true;
  };

const getMedianIncome = async (zipCode) => {   
  try {
    const url = `${basecensusURL}${zipCode}&key=${apiKey}`;  // creating the api request with the base url and the addition of the zip codes
    const response = await fetch(url);   // sending the fetch request
    const censusData = await response.json();  // receiving the response
    const medianIncome = censusData[1][1];  // getting the pertinant data from the response array
    console.log(medianIncome);  // clg to check if it's working
    return medianIncome;  // returning the result
    
  } catch (error) {   //error handling
    console.error(error);
    throw error;
  }
};

const submitForm = async (e) => {
  e.preventDefault();
  const zipCode1 = document.getElementById('zipcode1').value; 
  const zipCode2 = document.getElementById('zipcode2').value;

  if (!validateZipCode(zipCode1) || !validateZipCode(zipCode2)) {  // if the zips aren't right, alert the user
    alert('Please enter two valid 5-digit zip codes.');
    return;
  }

  try {
    const medianIncome1 = await getMedianIncome(zipCode1);  // if the zips are right, wait for the getMedianIncome function to return a value
    const medianIncome2 = await getMedianIncome(zipCode2);
    
    // TO DO  - need to jazz this up a bit
    
    resultsDiv.innerHTML = `${zipCode1}: $${medianIncome1}<br>
    ${zipCode2}: $${medianIncome2}`;

  } catch (error) {   // is there some better way to log the errors so you know why it's not working?
    console.error(error);
    alert('Error fetching data. Please try again.');
  }
};
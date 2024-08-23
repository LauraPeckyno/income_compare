const form = document.querySelector("#zipCodesForm");
const resultsDiv = document.querySelector(".zipOutput");
const apiKey = '322ff39417763138902d1fd67b9f59bf79067861'; // Replace with your Census API key
const censusApiEndpoint = 'https://api.census.gov/data/2020/acs/acs5';
const ziptasticApiEndpoint = 'http://ziptasticapi.com';
const formBtn = document.querySelector(".submitBtn");

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const zipCode1 = document.getElementById('zipcode1').value;
    const zipCode2 = document.getElementById('zipcode2').value;

    // Validate zip codes
    if (!zipCode1 || !zipCode2 || zipCode1.length !== 5 || zipCode2.length !== 5) {
        alert('Please enter two valid 5-digit zip codes.');
        return;
    }

    // Construct API request URLs
    const censusUrl1 = `${censusApiEndpoint}?get=NAME,B19013_001E&for=zip%20code%20tabulation%20area:${zipCode1}&key=${apiKey}`;
    const censusUrl2 = `${censusApiEndpoint}?get=NAME,B19013_001E&for=zip%20code%20tabulation%20area:${zipCode2}&key=${apiKey}`;
    const ziptasticUrl1 = `${ziptasticApiEndpoint}/${zipCode1}`;
    const ziptasticUrl2 = `${ziptasticApiEndpoint}/${zipCode2}`;

    try {
        // Send API requests
        const censusResponse1 = await fetch(censusUrl1);
        const censusResponse2 = await fetch(censusUrl2);
        const ziptasticResponse1 = await fetch(ziptasticUrl1);
        const ziptasticResponse2 = await fetch(ziptasticUrl2);

        if (!censusResponse1.ok || !censusResponse2.ok || !ziptasticResponse1.ok || !ziptasticResponse2.ok) {
            throw new Error('Error in one or more API requests.');
        }

        const censusData1 = await censusResponse1.json();
        const censusData2 = await censusResponse2.json();
        const ziptasticData1 = await ziptasticResponse1.json();
        const ziptasticData2 = await ziptasticResponse2.json();

        // Extract median household income values
        const medianHouseholdIncome1 = censusData1[1][1];
        const medianHouseholdIncome2 = censusData2[1][1];

        // Extract city names
        const city1 = ziptasticData1.city;
        const state1 = ziptasticData1.state;
        const city2 = ziptasticData2.city;
        const state2 = ziptasticData2.state;

        // Add results to page
        resultsDiv.style.display = "block";
        resultsDiv.innerHTML = `    
        <h2 class="playwrite-hr-resultHead">Results</h2><hr>
            <div>
                <h3 class="resultCity">${city1}, ${state1} ${zipCode1}</h3>
                <p class="resultIncome">Median Annual Household Income: $${medianHouseholdIncome1}.00</p>
            </div>
            <div>
                <h3 class="resultCity">${city2}, ${state2} ${zipCode2}</h3>
                <p class="resultIncome">Median Annual Household Income: $${medianHouseholdIncome2}.00</p>
            </div>
        `;
    } catch (error) {
        console.error(error);
        alert('Error fetching data. Please try again.');
    }
});

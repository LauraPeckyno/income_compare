export { displayResults };

const displayResults = (resultsDiv, resultsDivContainer, city1, state1, zipCode1, medianHouseholdIncome1, city2, state2, zipCode2, medianHouseholdIncome2) => {
  resultsDivContainer.style.display = "block";

  // Divs to hold the results
  const cityIncomeDiv1 = document.createElement('div');
  const cityIncomeDiv2 = document.createElement('div');
  resultsDiv.innerHTML = `
      <h2 class="playwrite-hr-resultHead">Your Comparison Results</h2>`;

  resultsDiv.appendChild(cityIncomeDiv1);
  resultsDiv.appendChild(cityIncomeDiv2);

  // Create and append the city info for the first zip
  const cityHeader1 = document.createElement('h2');
  cityHeader1.className = "resultCity";
  cityHeader1.textContent = `${city1}, ${state1}, ${zipCode1}`;
  cityIncomeDiv1.appendChild(cityHeader1);

  // Create and append the city info for the second zip 
  const cityHeader2 = document.createElement('h2');
  cityHeader2.textContent = `${city2}, ${state2}, ${zipCode2}`;
  cityHeader2.className = "resultCity";
  cityIncomeDiv2.appendChild(cityHeader2);

  // Create and append the income info for the first zip
  const cityIncome1 = document.createElement('p');
  cityIncome1.textContent = `Median Annual Household Income: $${medianHouseholdIncome1}.00`;
  cityIncome1.className = "resultCity";
  cityIncomeDiv1.appendChild(cityIncome1);

  // Create and append the income info for the second zip 
  const cityIncome2 = document.createElement('p');
  cityIncome2.textContent = `Median Annual Household Income: $${medianHouseholdIncome2}.00`;
  cityIncome2.className = "resultCity";
  cityIncomeDiv2.appendChild(cityIncome2);
}

// note: I changed this a bit. I had originally just used a template literal to output this, but decided to append the individual lines with some styling instead.


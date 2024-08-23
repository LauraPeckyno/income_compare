export { displayResults };
    
const displayResults = (resultsDiv, city1, state1, zipCode1, medianHouseholdIncome1, city2, state2, zipCode2, medianHouseholdIncome2) => {
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
  }
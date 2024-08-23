
export { getNews };
const getNews = async (resultsDiv, ziptasticData1, ziptasticData2) => {
    const city1Name = ziptasticData1.city;
    const state1Name = ziptasticData1.state;
    const city2Name = ziptasticData2.city;
    const state2Name = ziptasticData2.state;
    const newsBaseUrl = "https://api.thenewsapi.com/v1/news/all?api_token=";
    const newsToken = "dIivVvGhRIcde8xsWnaThcMKUxQ0IfQA1pg6L7UP"
  
    const newsurl1 = `${newsBaseUrl}${newsToken}&search=${city1Name}+${state1Name}`;  // basically just uses a string to build the URL for the api call
    console.log(newsurl1);
  
    const newsurl2 = `${newsBaseUrl}${newsToken}&search=${city2Name}+${state2Name}`;
    console.log(newsurl2);
  
    // Divs to hold the reseults
    const newsDiv1 = document.createElement('div');
    const newsDiv2 = document.createElement('div');
  
    try {
      // Make the API requests
      const response1 = await fetch(newsurl1);
      const data1 = await response1.json();
  
      // Create HTML elements to display the data
      const newsHeader1 = document.createElement('h2');
      newsHeader1.textContent = `News in ${city1Name}, ${state1Name}`;
  
      const newsList1 = document.createElement('ul');
      data1.data.forEach(article => {
        const newsListItem = document.createElement('li');
        newsListItem.textContent = article.title;
        newsList1.appendChild(newsListItem);
      });
  
      // Append the HTML elements to the newsDiv1
      newsDiv1.appendChild(newsHeader1);
      newsDiv1.appendChild(newsList1);
  
      const response2 = await fetch(newsurl2);
      const data2 = await response2.json();
  
      // Create HTML elements to display the data
      const newsHeader2 = document.createElement('h2');
      newsHeader2.textContent = `News in ${city2Name}, ${state2Name}`;
  
      const newsList2 = document.createElement('ul');
      data2.data.forEach(article => {
        const newsListItem = document.createElement('li');
        newsListItem.textContent = article.title;
        newsList2.appendChild(newsListItem);
      });
  
      // Append the HTML elements to the newsDiv2
      newsDiv2.appendChild(newsHeader2);
      newsDiv2.appendChild(newsList2);
  
      // Append the newsDivs to the resultsDiv
      resultsDiv.appendChild(newsDiv1);
      resultsDiv.appendChild(newsDiv2);
    } catch (error) {
      console.error(error);
    }
  };
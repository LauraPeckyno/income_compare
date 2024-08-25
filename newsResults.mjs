export { getNews };

// this was an absolute nightmare. I tried to do some styling and add an image thumb to each of the news stories and, in the process, I completely broke the entire thing. 
// It turns out that this particular news api isn't great. I did eventually find a better option, but was having trouble with it, so I've decided to go with the first one I had working.

const getNews = async (city1, state1, city2, state2, resultsDiv) => {
  const city1Name = city1;
  const state1Name = state1;
  const city2Name = city2;
  const state2Name = state2;

  const newsBaseUrl = "https://api.thenewsapi.com/v1/news/all?api_token=";
  const newsToken = "dIivVvGhRIcde8xsWnaThcMKUxQ0IfQA1pg6L7UP";

  const newsurl1 = `${newsBaseUrl}${newsToken}&search=${city1Name}+${state1Name}`;  // creating the api URLs
  const newsurl2 = `${newsBaseUrl}${newsToken}&search=${city2Name}+${state2Name}`;

  const newsDiv1 = document.createElement('div');  // creating a place for the content
  const newsDiv2 = document.createElement('div');

  try {
    const response1 = await fetch(newsurl1);  // sending the ffetch request for the first city
    const data1 = await response1.json();

    const newsHeader1 = document.createElement('h2');  // creating the header for the first city of news content
    newsHeader1.textContent = `Recent news in ${city1Name}, ${state1Name}`;
    newsHeader1.className = "playwrite-hr-newsHead";
    newsDiv1.appendChild(newsHeader1);

    data1.data.forEach(article => {
      const articleDiv = document.createElement('div');  // getting the articles from the json data, creating a div and adding the article title with a link to the article
      const articleLink = document.createElement('a');
      articleLink.href = article.url;
      articleLink.textContent = article.title;
      articleLink.target = "_blank";
      articleDiv.appendChild(articleLink);

      newsDiv1.appendChild(articleDiv);  // popping it into the div
    });

    const response2 = await fetch(newsurl2);   // sending the fetch request for the second city
    const data2 = await response2.json();

    const newsHeader2 = document.createElement('h2');   // creating the header for the second city of news content
    newsHeader2.textContent = `Recent news in ${city2Name}, ${state2Name}`;
    newsHeader2.className = "playwrite-hr-newsHead";
    newsDiv2.appendChild(newsHeader2);

    data2.data.forEach(article => {
      const articleDiv = document.createElement('div');    // getting the articles from the json data, creating a div and adding the article title with a link to the article
      const articleLink = document.createElement('a');
      articleLink.href = article.url;
      articleLink.textContent = article.title;
      articleLink.target = "_blank";
      articleDiv.appendChild(articleLink);

      newsDiv2.appendChild(articleDiv);  // popping it into the div
    });

    resultsDiv.appendChild(newsDiv1);  // appending the divs
    resultsDiv.appendChild(newsDiv2);

  } catch (error) {
    console.error(error);  // light error handling
  }
};
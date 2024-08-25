export { getNews };

const getNews = async ( city1, state1, city2, state2, resultsDiv) => {
  const city1Name = city1;
  const state1Name = state1;
  const city2Name = city2;
  const state2Name = state2;

    const newsBaseUrl = "https://api.thenewsapi.com/v1/news/all?api_token=";
    const newsToken = "dIivVvGhRIcde8xsWnaThcMKUxQ0IfQA1pg6L7UP";
  
    const newsurl1 = `${newsBaseUrl}${newsToken}&search=${city1Name}+${state1Name}`;
    const newsurl2 = `${newsBaseUrl}${newsToken}&search=${city2Name}+${state2Name}`;
  
    const newsDiv1 = document.createElement('div');
    const newsDiv2 = document.createElement('div');
  
    try {
        const response1 = await fetch(newsurl1);
        const data1 = await response1.json();

        const newsHeader1 = document.createElement('h2');
        newsHeader1.textContent = `News in ${city1Name}, ${state1Name}`;
        newsHeader1.className = "playwrite-hr-newsHead";
        newsDiv1.appendChild(newsHeader1);

        data1.data.forEach(article => {
            const articleDiv = document.createElement('div');         
            const articleLink = document.createElement('a');
            articleLink.href = article.url;
            articleLink.textContent = article.title;
            articleLink.target = "_blank";
            articleDiv.appendChild(articleLink);

            newsDiv1.appendChild(articleDiv);
        });

        const response2 = await fetch(newsurl2);
        const data2 = await response2.json();

        const newsHeader2 = document.createElement('h2');
        newsHeader2.textContent = `News in ${city2Name}, ${state2Name}`;
        newsHeader2.className = "playwrite-hr-newsHead";
        newsDiv2.appendChild(newsHeader2);

        data2.data.forEach(article => {
            const articleDiv = document.createElement('div');
            const articleLink = document.createElement('a');
            articleLink.href = article.url;
            articleLink.textContent = article.title;
            articleLink.target = "_blank";
            articleDiv.appendChild(articleLink);

            newsDiv2.appendChild(articleDiv);
        });

        resultsDiv.appendChild(newsDiv1);
        resultsDiv.appendChild(newsDiv2);

    } catch (error) {
        console.error(error);
    }
};
function UpdateNewsPreview(news) {
    const newsPreview = document.getElementsByClassName("breakingNewsPreview")[0];
    newsPreview.innerHTML = `
        <h2>${news.title}</h2>
        ${news.content}
        <p><strong>Published on:</strong> ${news.date}</p>
    `;
}

function UpdateNews() {
    const newsPreview = {
        title: "Breaking News: Nintendo Switch 2 EULA drama",
        content: `<p>Nintendo Switch 2 EULA drama has taken the gaming world by storm. <b>Players will no longer own 
        their consoles, only a license to use them.</b> The backlash to these changes has been widespread, some calling this the betrayal of Nintendo</p>`,
        date: new Date().toLocaleDateString()
    };

    UpdateNewsPreview(newsPreview);
    const newsContainer = document.getElementById("newsContainer");
    const newsItem = document.createElement("div");
    newsItem.className = "newsItem";
    

}
function UpdateMainNewsPage()
{
    const newsContainer = document.getElementsByClassName("breaking-news")[0];
    const newsItem = document.createElement("div");
    newsItem.className = "newsItem";

    fetch('articles/breakingnews.html')
        .then(response => response.text())
        .then(html => {
            // Remove any <button> elements from the loaded HTML
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = html;
            const buttons = tempDiv.querySelectorAll('button');
            buttons.forEach(btn => btn.remove());
            newsItem.innerHTML = tempDiv.innerHTML;
            newsContainer.appendChild(newsItem);
        })
        .catch(error => {
            console.error("Failed to load article:", error);
            newsItem.innerHTML = "<p>Failed to load article.</p>";
            newsContainer.appendChild(newsItem);
        });
}
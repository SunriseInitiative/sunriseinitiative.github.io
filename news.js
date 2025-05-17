function UpdateNewsPreview(news) {
    const newsPreview = document.getElementsByClassName("breakingNewsPreview")[0];
    newsPreview.innerHTML = `
        <h2>${news.title}</h2>
        <p>${news.content}</p>
        <p><strong>Published on:</strong> ${news.date}</p>
    `;
}

function UpdateNews() {
    const newsPreview = {
        title: "Breaking News: Nintendo Switch 2 EULA drama",
        content: "Nintendo Switch 2 EULA drama has taken the gaming world by storm. Players will no longer own \ntheir consoles, only a license to use them. The backlash to these changes has been \nwidespread, some calling this betrayal of Nintendo",
        date: new Date().toLocaleDateString()
    };

    UpdateNewsPreview(newsPreview);

}
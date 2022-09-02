// get categories from API 
const loadCategories = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/news/categories');
    const data = await res.json();
    displayCategories(data.data.news_category);
}
loadCategories();

// display categories
const displayCategories = categories => {
    const categoriesContainer = document.getElementById('categories-container');
    categories.forEach(category => {
        const li = document.createElement('li');
        li.innerHTML = `
        <a onclick="loadNewsByCategory('${category.category_id}')">${category.category_name}</a>
        `;
        categoriesContainer.appendChild(li);
    });
}

// load news according to category 
const loadNewsByCategory = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${id}`);
    const data = await res.json();
    displayNewsByCategory(data.data);
    console.log(data.data);
}
// displayNewsByCategory 
const displayNewsByCategory = allNews => {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = "";
    allNews.forEach(news => {
        const { thumbnail_url, title, details } = news;
        const div = document.createElement('div');
        div.classList.add('card', 'card-side', 'bg-base-100', 'shadow-xl', 'p-3', 'my-6');
        div.innerHTML = `
        <figure><img src='${thumbnail_url}' class="rounded-lg" alt=""></figure>
        <div class="card-body">
            <h2 class="card-title">${title}</h2>
             <p>${details ? details.slice(0, 200) + ' ...' : details}</p>
    <div class="flex justify-between">
        <div class="flex">
            <img src='${news.author.img}'
                class="rounded-full w-10 h-10 mr-7" alt="">
                <p>${news.author.name}</p>
        </div>
        <div><i class="fa-regular fa-eye mr-5"></i>${news.total_view}</div>
        <div class="text-3xl"><a onclick="showDetails()"> <i class="fa-solid fa-arrow-right"></i></a>
        </div>
    </div>
        </div >
    `;
        newsContainer.appendChild(div);
    })
}





const consol = () => {
    console.log('clicked');
}
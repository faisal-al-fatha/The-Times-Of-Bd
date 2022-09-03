// get categories from API 
const loadCategories = async () => {
    try {
        const res = await fetch('https://openapi.programming-hero.com/api/news/categories');
        const data = await res.json();
        displayCategories(data.data.news_category);

    } catch (error) {
        console.log(error);
    }
}
loadCategories();

// display categories
const displayCategories = categories => {
    const categoriesContainer = document.getElementById('categories-container');
    categories.forEach(category => {
        const li = document.createElement('li');
        li.innerHTML = `
        <a onclick="loadNewsByCategory('${category.category_id}', '${category.category_name}'),  runSpinner()">${category.category_name}</a>
        `;
        categoriesContainer.appendChild(li);
    });
}

// load news according to category 
const loadNewsByCategory = async (id, name) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${id}`);
    const data = await res.json();
    displayNewsByCategory(data.data, name);
}

// for loading breaking news in the initial page 
loadNewsByCategory('08');

// displayNewsByCategory 
const displayNewsByCategory = (allNews, name) => {
    // display total news count 
    const newsCount = document.getElementById('item-found-message');
    console.log(allNews);
    newsCount.innerHTML = `
    <h4 class="text-xl font-semibold">${allNews.length} Items found for ${name} category</h4>
    `
    hideSpinner();
    const newsContainer = document.getElementById('news-container');
    const sortedAllNews = allNews.sort((a, b) => b.total_view - a.total_view);
    newsContainer.innerHTML = "";
    sortedAllNews.forEach(news => {
        const { thumbnail_url, title, details } = news;
        const div = document.createElement('div');
        div.classList.add('card', 'card-side', 'bg-base-100', 'shadow-xl', 'hover:drop-shadow-2xl', 'p-3', 'my-6');
        div.innerHTML = `
        <figure><img src='${thumbnail_url}' class="rounded-lg w-44" alt=""></figure>
        <div class="card-body">
            <h2 class="card-title">${title}</h2>
             <p>${details ? details.slice(0, 200) + ' ...' : details}</p>
    <div class="flex justify-between">
        <div class="flex">
            <img src='${news.author.img}'
                class="rounded-full w-10 h-10 mr-7" alt="">
                <p>${news.author.name ? news.author.name : 'No Data Found'}</p>
        </div>
        <div><i class="fa-regular fa-eye mr-4"></i>${news.total_view ? news.total_view : 'No data found'}</div>
        <div>
        <label class="btn modal-button btn-ghost" for="my-modal-3"><a onclick="loadDetails('${news['_id']}'), runSpinner();" class="text-3xl text-black"> <i class="fa-solid fa-arrow-right"></i></a></label>
        </div>
    </div>
        </div >
        
    `;
        newsContainer.appendChild(div);
    })
}

const loadDetails = async (id) => {
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/news/${id}`);
        const data = await res.json();
        showDetails(data.data[0]);
    } catch (error) {
        console.log(error);
    }
}
const showDetails = (newsId) => {
    hideSpinner();
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
    <figure><img src="${newsId.image_url}" class="w-11/12 rounded-lg" alt="Shoes" />
    </figure>
    <div class="flex justify-around mt-4">
        <div class="flex">
            <img src='${newsId.author.img}' class="rounded-full w-12 h-12 mr-7" alt="">
            <p>${newsId.author.name ? newsId.author.name : 'No Data Found'}</p>
        </div>
        <div><i class="fa-regular fa-eye mx-4"></i>${newsId.total_view ? newsId.total_view : 'No data found'}</div>
        <div><p>Rating: ${newsId.rating.number}</p></div>
    </div>
    <h2 class="card-title my-3">${newsId.title}</h2>
    <p>${newsId.details}</p>
    `;

    console.log(newsId);
}

const spinner = document.getElementById('spinner');
const runSpinner = () => {
    spinner.classList.remove('hidden');
}

const hideSpinner = () => {
    spinner.classList.add('hidden');
}



const consol = () => {
    console.log('clicked');
}
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
    console.log(data.data);
}
// displayNewsByCategory 





const consol = () => {
    console.log('clicked');
}
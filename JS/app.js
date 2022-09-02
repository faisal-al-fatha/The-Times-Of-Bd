const loadCategories = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/news/categories');
    const data = await res.json();
    displayCategories(data.data.news_category);
}
const displayCategories = categories => {
    const categoriesContainer = document.getElementById('categories-container');
    categories.forEach(category => {
        const li = document.createElement('li');
        li.innerHTML = `
        <a>${category.category_name}</a>
        `;
        categoriesContainer.appendChild(li);
        console.log(category);
    });
}
loadCategories();
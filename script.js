const categoryBtnContainer = document.querySelector('main .buttons');
const productContainer = document.querySelector('main .product_container');


(() => {
    fetch('https://openapi.programming-hero.com/api/videos/categories')
        .then(res => res.json())
        .then(data => {
            data.data.forEach((singleData) => {
                const newBtn = document.createElement('button');
                newBtn.setAttribute('id', singleData.category_id)
                const newBtnText = document.createTextNode(singleData.category);
                newBtn.appendChild(newBtnText)
                categoryBtnContainer.appendChild(newBtn)
            })
        })
})();

const productCategoryHandler = (productTypeId = '1000') => {
    fetch(`https://openapi.programming-hero.com/api/videos/category/${productTypeId}`)
        .then(res => res.json())
        .then(data => {
            if (data.data.length > 0) {
                data.data.forEach((singleProductCategory => {
                    cardCreator(singleProductCategory)
                }))
            } else {
                emptyMessageElement();
            }
        })
};
productCategoryHandler();

document.getElementById('blog_btn').addEventListener('click', (e) => {
    location.href = './qns.html'
})

categoryBtnContainer.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        productContainer.innerHTML = '';
        productCategoryHandler(e.target.getAttribute('id'))
    }
});

function cardCreator(singleProduct) {
    const postedTime = singleProduct.others.posted_date ? `<small>${msToHumanReadableTime(singleProduct.others.posted_date)}</small>` : '';
    const verifiedSymbol = singleProduct.authors[0].verified ? "<img src='./images/tick.png' />" : '';
    console.log(postedTime, singleProduct.others.posted_date)
    productContainer.innerHTML += `
        <div>
            <div class='card_banner'>
                <img src='${singleProduct.thumbnail}'/>
                ${postedTime}
            </div>
            
            <div class='card_author'>
                <img src='${singleProduct.authors[0].profile_picture}'/>
                <p><strong>${singleProduct.title}</strong></p>
            </div>
            <p>
                <small>${singleProduct.authors[0].profile_name}</small> 
                ${verifiedSymbol}
            </p>
            <p><small>${singleProduct.others.views}</small></p>
        </div>
    `;
    gridTemplateColumnsHandler();
}

function emptyMessageElement() {
    const newH1 = document.createElement('h1');
    const textNode = document.createTextNode('Sorry, there is no data found on the specific category!!!');
    newH1.appendChild(textNode);
    newH1.style.textAlign = 'center';
    productContainer.appendChild(newH1);
    gridTemplateColumnsHandler();
}

function gridTemplateColumnsHandler() {
    if (productContainer.firstElementChild.tagName === 'H1') {
        productContainer.style.gridTemplateColumns = 'repeat(1, 1fr)';
    } else {
        productContainer.style.gridTemplateColumns = '';
    }
}

function msToHumanReadableTime(seconds) {
    let mins = Math.floor((seconds / 60) % 60);
    let hrs = Math.floor((seconds / (60 * 60)) % 24);
    let days = Math.floor(seconds / (1000 * 60 * 60 * 24));
    days >= 1 ? days = `${days} days` : days = '';
    hrs >= 1 ? hrs = `${hrs} hrs` : hrs = '';
    mins >= 1 ? mins = `${mins} mins` : mins = '';
    return `${days} ${hrs} ${mins} ago`;
}
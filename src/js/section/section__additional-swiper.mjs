const template = document.querySelector('template').content;
const starTemplate = template.querySelector('.rating__icon');
const card = template.querySelector('.section__additional-item');
const container = document.querySelector('.section__additional-list');
const baseLink = './img/products/';
export { renderCards };

async function renderCards() {
    const products = await fetch('../../db/products.json').then((r) =>
        r.json()
    );

    for (let product of products) {
        if (product.discount === false) continue;

        const { id, previews, cost, discount, name, rating } = product;

        const newCard = createCard(
            `./product.html#${id}`,
            previews[0],
            cost,
            cost * (1 - discount),
            name,
            rating
        );
        container.appendChild(newCard);
    }
}

function createCard(
    linkValue,
    imgLink,
    oldPriceValue,
    newPriceValue,
    nameValue,
    numberOfStars
) {
    const newCard = card.cloneNode(true);
    const link = newCard.querySelector('.product-card__link');
    const img = newCard.querySelector('.product-card__img');
    const oldPrice = newCard.querySelector('.product-card__old-price');
    const newPrice = newCard.querySelector('.product-card__new-price');
    const name = newCard.querySelector('.product-card__name');
    const rating = newCard.querySelector('.product-card__rating');

    link.setAttribute('href', linkValue);
    img.setAttribute('src', baseLink + imgLink + '.jpg');
    img.setAttribute('alt', nameValue);
    oldPrice.textContent = oldPriceValue;
    newPrice.textContent = newPriceValue;
    name.textContent = nameValue;

    for (let i = 1; i <= numberOfStars; i++) {
        const star = starTemplate.cloneNode(true);
        rating.append(star);
    }

    return newCard;
}

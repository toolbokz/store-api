/**
 * This file is responsible for displaying products on the webpage.
 * It's like a window dresser who arranges products in a shop window,
 * making sure everything looks good and is properly displayed.
 */

import { elements, showStatus } from './dom-utils.js';

// This function displays a list of products on the webpage
// It's like arranging items on a shelf in a store
export function renderProducts(items) {
    elements.products.innerHTML = '';
    if (!items || items.length === 0) {
        showStatus('No products found', 'empty');
        return;
    }
    showStatus('', '');
    items.forEach(renderProduct);
}

function renderProduct(p) {
    const card = document.createElement('article');
    card.className = 'card';

    card.appendChild(createProductImage(p));
    card.appendChild(createProductBody(p));
    elements.products.appendChild(card);
}

// This function handles creating the product image display
// It's like framing and hanging a picture of each product
function createProductImage(p) {
    const thumbWrap = document.createElement('div');
    thumbWrap.className = 'thumb-wrap';
    const img = document.createElement('img');
    if (p.images && p.images.length > 0 && p.images[0].url) {
        const meta = p.images[0];
        img.src = meta.url;
        img.alt = meta.alt || p.name || 'Product image';
        // set explicit size from product metadata when available
        if (meta.width) img.width = meta.width;
        if (meta.height) img.height = meta.height;
        // ensure image fills its wrapper
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'cover';
        // set wrapper size to match metadata (keeps card layout predictable)
        if (meta.width) thumbWrap.style.width = meta.width + 'px';
        if (meta.height) thumbWrap.style.height = meta.height + 'px';
    } else {
        img.src = `https://via.placeholder.com/400x260.png?text=${encodeURIComponent(p.name || 'Product')}`;
        img.alt = p.name || 'Product image';
        img.style.width = '100%';
        img.style.height = '160px';
        img.style.objectFit = 'cover';
        thumbWrap.style.height = '160px';
    }
    thumbWrap.appendChild(img);
    return thumbWrap;
}

// This function creates the text information for each product
// It's like writing price tags and description cards for items in a store
function createProductBody(p) {
    const body = document.createElement('div');
    body.className = 'card-body';

    const name = document.createElement('div');
    name.className = 'name';
    name.textContent = p.name || 'Unnamed';

    const company = document.createElement('div');
    company.className = 'meta';
    company.textContent = p.company || '';

    const price = document.createElement('div');
    price.className = 'price';
    price.textContent = p.price ? '$' + (p.price / 100).toFixed(2) : 'Free';

    const desc = document.createElement('div');
    desc.className = 'meta';
    desc.textContent = p.description ? p.description.slice(0, 120) + (p.description.length > 120 ? '…' : '') : '';

    const stock = document.createElement('div');
    stock.className = 'meta';
    stock.textContent = p.featured ? '★ Featured' : '';

    body.appendChild(name);
    body.appendChild(company);
    body.appendChild(price);
    body.appendChild(desc);
    body.appendChild(stock);

    return body;
}
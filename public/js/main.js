/**
 * This is the main control center of the application.
 * It coordinates all the other parts, like a conductor leading an orchestra.
 * This file brings together the product display, filtering, and pagination
 * to create a complete shopping experience.
 */

import { elements, showStatus } from './dom-utils.js';
import { renderProducts } from './product-renderer.js';
import { renderPagination } from './pagination.js';
import { buildQuery, populateCompanyFilter, updateCompanies } from './filters.js';

// The web address where we get our product data from
const apiBase = '/api/v1/products';
// How many products to show on each page
const limit = 4; // items per page
// Keeps track of which page the user is currently viewing
let currentPage = 1;

// This function gets products from the server and displays them
// It's like asking a warehouse for products and putting them on display
async function fetchProducts(query = '') {
    showStatus('Loading products…', 'loading');
    try {
        // always include pagination params
        const q = query || '';
        const pageQuery = `${q}${q ? '&' : '?'}page=${currentPage}&limit=${limit}`;
        const url = apiBase + pageQuery;
        const res = await fetch(url);
        if (!res.ok) throw new Error('Network response was not ok: ' + res.status);
        const data = await res.json();

        // Process response data
        let items = Array.isArray(data) ? data : (data.products || []);
        const nbHits = (data && typeof data.nbHits === 'number') ? data.nbHits : null;

        // Update UI
        updateCompanies(items);
        populateCompanyFilter();
        renderProducts(items);

        // Handle pagination
        if (nbHits !== null) {
            const totalPages = Math.max(1, Math.ceil(nbHits / limit));
            renderPagination(totalPages, currentPage, handlePageChange);
        } else {
            renderPagination(1, currentPage, handlePageChange);
        }
    } catch (err) {
        console.error(err);
        showStatus('Failed to load products. Ensure the server is running and connected to the DB.', 'error');
    }
}

// This function handles what happens when users click on page numbers
// It's like turning to a new page in a catalog
function handlePageChange(newPage) {
    currentPage = newPage;
    const q = buildQuery();
    fetchProducts(q);
}

// This function applies any filters the user has selected
// It's like using a sieve to show only the products users want to see
function handleApplyFilters() {
    currentPage = 1;
    const q = buildQuery();
    fetchProducts(q);
}

// This function clears all filters and shows all products again
// It's like clearing all the settings and starting fresh
function handleReset() {
    elements.search.value = '';
    elements.company.value = 'all';
    elements.sort.value = '-createdAt';
    elements.shipping.checked = false;
    currentPage = 1;
    fetchProducts();
}

// Event Listeners
elements.applyBtn.addEventListener('click', handleApplyFilters);
elements.resetBtn.addEventListener('click', handleReset);
elements.search.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') elements.applyBtn.click();
});

// Initial fetch
fetchProducts();
/**
 * This file handles everything related to filtering and sorting products.
 * It's like having a control panel that helps users find exactly what
 * they're looking for by filtering products by name, company, etc.
 */

import { elements } from './dom-utils.js';

// This function builds the search query based on what the user has selected
// It's like taking a customer's order: "I want products from Company X, sorted by price"
export function buildQuery() {
    const params = new URLSearchParams();
    const search = elements.search.value.trim();
    if (search) params.set('name', search);

    const company = elements.company.value;
    if (company && company !== 'all') params.set('company', company);

    const sort = elements.sort.value;
    if (sort) params.set('sort', sort);

    if (elements.shipping.checked) params.set('shipping', 'true');

    const q = params.toString();
    return q ? ('?' + q) : '';
}

// This keeps track of all unique company names we've seen
// It's like keeping a list of all brands in a store
let allCompanies = new Set();

// This function updates the company dropdown menu with all available companies
// It's like updating a store directory with all the shops
export function populateCompanyFilter() {
    const current = elements.company.value;
    const companies = Array.from(allCompanies).sort();
    elements.company.innerHTML = '<option value="all">All</option>' +
        companies.map(c => `<option value="${c}">${c}</option>`).join('');
    if (companies.includes(current)) elements.company.value = current;
}

// This function adds any new companies to our list when we get new products
// It's like updating our store directory when new shops open
export function updateCompanies(products) {
    products.forEach(p => {
        if (p.company) allCompanies.add(p.company);
    });
}
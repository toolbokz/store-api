/**
 * This file handles all the basic webpage element interactions.
 * Think of it as the file that helps us easily work with buttons,
 * text boxes, and other page elements.
 */

// This is a helper function that finds elements on the webpage
// It's like using a TV remote to select a specific channel
export const el = s => document.querySelector(s);

// This object contains all the important elements we need to work with
// It's like having a list of shortcuts to different parts of the webpage
export const elements = {
    products: el('#products'),     // The container where all products will be displayed
    status: el('#status'),        // Shows loading messages and errors
    search: el('#search'),        // The search box where users type product names
    company: el('#company'),      // The dropdown menu for selecting companies
    sort: el('#sort'),           // The dropdown menu for sorting products
    shipping: el('#shipping'),    // The checkbox for free shipping
    applyBtn: el('#apply'),      // The button to apply filters
    resetBtn: el('#reset'),      // The button to reset all filters
    pagination: el('#pagination') // The buttons for changing pages
};

export function showStatus(msg, cls = 'loading') {
    elements.status.className = cls;
    elements.status.textContent = msg;
    if (cls === 'loading') {
        elements.status.style.display = 'block';
        elements.products.style.display = 'none';
    }
    else if (cls === 'error' || cls === 'empty') {
        elements.status.style.display = 'block';
        elements.products.style.display = 'none';
    }
    else {
        elements.status.style.display = 'none';
        elements.products.style.display = 'grid';
    }
}
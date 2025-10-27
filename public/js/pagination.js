/**
 * This file handles the page navigation system.
 * It's like creating a book's table of contents or page numbers,
 * helping users move between different pages of products.
 */

import { elements } from './dom-utils.js';

// This function creates the page navigation buttons
// It's like adding page numbers to a catalog so people can flip through it
export function renderPagination(totalPages, currentPage, onPageChange) {
    elements.pagination.innerHTML = '';
    if (totalPages <= 1) return; // no pagination needed

    // Prev
    elements.pagination.appendChild(createBtn('Prev', Math.max(1, currentPage - 1), currentPage === 1));

    // Page numbers with ellipses when needed
    const maxButtons = 7;
    let start = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    let end = Math.min(totalPages, start + maxButtons - 1);
    if (end - start < maxButtons - 1) start = Math.max(1, end - maxButtons + 1);

    // If start is past the first page, add page 1 and ellipsis as needed
    if (start > 1) {
        const first = createBtn('1', 1, false);
        if (1 === currentPage) first.classList.add('active');
        elements.pagination.appendChild(first);
        if (start > 2) appendEllipsis();
    }

    for (let p = start; p <= end; p++) {
        // skip if it's the first or last we've already added
        if (p === 1 || p === totalPages) continue;
        const btn = createBtn(p.toString(), p, false);
        if (p === currentPage) btn.classList.add('active');
        elements.pagination.appendChild(btn);
    }

    // If end is before the last page, add ellipsis and last page
    if (end < totalPages) {
        if (end < totalPages - 1) appendEllipsis();
        const last = createBtn(totalPages.toString(), totalPages, false);
        if (totalPages === currentPage) last.classList.add('active');
        elements.pagination.appendChild(last);
    }

    // Next
    elements.pagination.appendChild(createBtn('Next', Math.min(totalPages, currentPage + 1), currentPage === totalPages));

    // This function creates individual page buttons
    // It's like creating each individual page number in a book
    function createBtn(label, page, disabled) {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'page-btn';
        b.textContent = label;
        if (disabled) b.disabled = true;
        b.addEventListener('click', () => {
            if (page === currentPage) return;
            onPageChange(page);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        return b;
    }

    // This function adds dots between page numbers when there are too many pages
    // It's like writing "..." in a book's table of contents to show there are more pages
    function appendEllipsis() {
        const span = document.createElement('span');
        span.className = 'ellipsis';
        span.textContent = '…';
        elements.pagination.appendChild(span);
    }
}
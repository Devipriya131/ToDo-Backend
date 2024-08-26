const apiUrl = 'http://localhost:8080/items';

document.getElementById('itemForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
        itemNumber: parseInt(document.getElementById('itemNumber').value),
        itemName: document.getElementById('itemName').value,
        itemRating: parseFloat(document.getElementById('itemRating').value)
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            const errorData = await response.text();
            throw new Error(`HTTP error! Status: ${response.status}, ${errorData}`);
        }
        alert('Item added successfully');
        document.getElementById('itemForm').reset();
        fetchItems(); // Refresh the list
    } catch (error) {
        console.error('Error adding item:', error);
        alert(`Failed to add item: ${error.message}`);
    }
});

async function fetchItems() {
    try {
        const response = await fetch(apiUrl);
        if (response.ok) {
            const items = await response.json();
            renderItems(items);
        } else {
            alert('Failed to fetch items');
        }
    } catch (error) {
        console.error('Error fetching items:', error);
    }
}

function renderItems(items) {
    const tableBody = document.getElementById('itemsTable').querySelector('tbody');
    tableBody.innerHTML = '';
    items.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.itemNumber}</td>
            <td>${item.itemName}</td>
            <td>${item.itemRating}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Initial fetch of all items
fetchItems();

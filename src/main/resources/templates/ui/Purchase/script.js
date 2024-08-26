const apiUrl = 'http://localhost:8080/purchases';

function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}


document.getElementById('purchaseForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
        supplier: { supplierNumber: parseInt(document.getElementById('supplierNumber').value) },
        item: { itemNumber: parseInt(document.getElementById('itemNumber').value) },
        quantity: parseInt(document.getElementById('quantity').value),
        amount: parseFloat(document.getElementById('amount').value),
        date: document.getElementById('date').value
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            const errorData = await response.text(); // or .json() if your API returns JSON error messages
            throw new Error(`HTTP error! Status: ${response.status}, ${errorData}`);
        }
        alert('Purchase added successfully');
        document.getElementById('purchaseForm').reset();// Refresh the list
    } catch (error) {
        console.error('Error adding purchase:', error);
        alert(`Failed to add purchase: ${error.message}`);
    }
});


document.getElementById('filterForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const year = document.getElementById('year').value;

    try {
        const response = await fetch(`${apiUrl}/year/${year}`);
        if (response.ok) {
            const purchases = await response.json();
            renderPurchases(purchases);
        } else {
            alert('Failed to fetch purchases');
        }
    } catch (error) {
        console.error('Error fetching purchases by year:', error);
    }
});

async function fetchPurchases() {
    try {
        const response = await fetch(apiUrl);
        if (response.ok) {
            const purchases = await response.json();
            renderPurchases(purchases);
        } else {
            alert('Failed to fetch purchases');
        }
    } catch (error) {
        console.error('Error fetching purchases:', error);
    }
}

function renderPurchases(purchases) {
    const tableBody = document.getElementById('purchasesTable').querySelector('tbody');
    tableBody.innerHTML = '';
    purchases.forEach(purchase => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${purchase.id}</td>
            <td>${purchase.supplier.supplierNumber}</td>
            <td>${purchase.item.itemNumber}</td>
            <td>${purchase.quantity}</td>
            <td>${purchase.amount}</td>
            <td>${formatDate(purchase.date)}</td>
        `;
        tableBody.appendChild(row);
    });
}


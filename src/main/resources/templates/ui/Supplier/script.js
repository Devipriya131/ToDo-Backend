const apiUrl = 'http://localhost:8080/suppliers';

document.getElementById('supplierForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
        supplierNumber: parseInt(document.getElementById('supplierNumber').value),
        supplierName: document.getElementById('supplierName').value,
        supplierRating: parseFloat(document.getElementById('supplierRating').value)
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
        alert('Supplier added successfully');
        document.getElementById('supplierForm').reset();
        fetchSuppliers(); // Refresh the list
    } catch (error) {
        console.error('Error adding supplier:', error);
        alert(`Failed to add supplier: ${error.message}`);
    }
});

async function fetchSuppliers() {
    try {
        const response = await fetch(apiUrl);
        if (response.ok) {
            const suppliers = await response.json();
            renderSuppliers(suppliers);
        } else {
            alert('Failed to fetch suppliers');
        }
    } catch (error) {
        console.error('Error fetching suppliers:', error);
    }
}

function renderSuppliers(suppliers) {
    const tableBody = document.getElementById('suppliersTable').querySelector('tbody');
    tableBody.innerHTML = '';
    suppliers.forEach(supplier => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${supplier.supplierNumber}</td>
            <td>${supplier.supplierName}</td>
            <td>${supplier.supplierRating}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Initial fetch of all suppliers
fetchSuppliers();

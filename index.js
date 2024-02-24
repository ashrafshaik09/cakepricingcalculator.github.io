document.getElementById('add').addEventListener('click', function() {
    let name = document.getElementById('name').value;
    let price = parseFloat(document.getElementById('price').value);
    let unit = document.querySelector('input[name="unit"]:checked');
    let quantity = parseFloat(document.getElementById('quantity').value); // Retrieve quantity

    if (!name || isNaN(price) || !unit || isNaN(quantity)) { // Check if quantity is valid
        alert("Please fill in all fields with valid data.");
        return;
    }

    unit = unit.value;

    let cost = 0;

    if (unit === 'g') {
        cost = (price / 1000) * quantity;  // Convert grams to kg
    } else if (unit === 'ml') {
        cost = (price / 1000) * quantity;  // Convert ml to L
    } else {
        cost = price * quantity;
    }

    cost = parseFloat(cost).toFixed(2);

    let table = document.getElementById('ingredientTableBody');
    let row = table.insertRow();
    row.insertCell(0).innerHTML = name;
    row.insertCell(1).innerHTML = quantity + ' ' + unit;
    row.insertCell(2).innerHTML = 'Rs. ' + cost;
    row.dataset.cost = cost;

    const deleteCell = row.insertCell(3);
    const deleteButton = document.createElement('button');
    deleteButton.className = 'noselect';
    deleteButton.innerHTML = '<span class="text">Delete</span><span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path></svg></span>';
    deleteButton.addEventListener('click', function() {
        let confirmDelete = confirm('Are you sure you want to delete this ingredient?');
        if (confirmDelete) {
            row.remove();
            updateTotal();
        }
    });
    deleteCell.appendChild(deleteButton);

    document.getElementById('name').value = '';
    document.getElementById('quantity').value = ''; // Reset quantity input field
    document.getElementById('price').value = '';

    updateTotal();
});

function updateTotal() {
    const table = document.getElementById('ingredientTableBody');
    let total = 0;
    for (const row of table.rows) {
        const cost = parseFloat(row.dataset.cost);
        total += cost;
    }
    document.getElementById('total').textContent = 'Rs. ' + total.toFixed(2);
}

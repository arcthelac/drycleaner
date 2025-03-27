// Function to fetch and parse CSV data from public Google Sheet
async function fetchPublicData() {
    try {
        const response = await fetch('https://docs.google.com/spreadsheets/d/1A_1xYjpxOC7bpneFz7mwJu9BfMTD2s16OGX7CA-3e7g/export?format=csv');
        const csvText = await response.text();
        
        // Parse CSV text into array of objects
        const rows = csvText.split('\n').map(row => row.trim()).filter(row => row);
        const headers = rows[0].split(',').map(header => header.trim());
        
        return rows.slice(1).map(row => {
            const values = row.split(',').map(value => value.trim());
            return {
                orderNumber: values[0],
                phoneLast4: values[1],
                status: values[2]
            };
        });
    } catch (error) {
        console.error('Error fetching CSV data:', error);
        throw new Error('Failed to fetch order data');
    }
}

// Function to update UI with order data
function updateOrderUI(orderData) {
    // Update the status message
    const statusMessage = `Your order ${orderData.orderNumber} is ${orderData.status}`;
    document.getElementById('statusText').textContent = statusMessage;
    
    // Update other UI elements
    document.getElementById('resultOrderNumber').textContent = orderData.orderNumber;
    
    // Update progress bar based on order status
    const progressBar = document.getElementById('progressBar');
    switch(orderData.status.toLowerCase()) {
        case 'received':
            progressBar.style.width = '25%';
            break;
        case 'processing':
            progressBar.style.width = '50%';
            break;
        case 'quality check':
            progressBar.style.width = '75%';
            break;
        case 'ready':
            progressBar.style.width = '100%';
            break;
        default:
            progressBar.style.width = '0%';
    }
}

// Function to handle order tracking
export async function trackOrder(event) {
    event.preventDefault();
    
    const orderNumber = document.getElementById('orderNumber').value;
    const phoneLast4 = document.getElementById('phoneLast4').value;
    const submitButton = event.target.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    const errorMessage = document.getElementById('errorMessage');
    const errorText = document.getElementById('errorText');

    // Validate phone last 4
    if (!/^\d{4}$/.test(phoneLast4)) {
        errorText.textContent = 'Please enter a valid 4-digit phone number';
        errorMessage.classList.remove('hidden');
        return;
    }

    // Show loading state
    submitButton.disabled = true;
    submitButton.innerHTML = '<svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>';

    try {
        // Fetch and parse CSV data
        const orders = await fetchPublicData();
        
        // Find matching order
        const orderData = orders.find(order => 
            order.orderNumber.toLowerCase() === orderNumber.toLowerCase() && 
            order.phoneLast4 === phoneLast4
        );

        if (!orderData) {
            throw new Error('Order not found');
        }

        // Update UI with order data
        updateOrderUI(orderData);
        
        // Show results
        document.getElementById('orderResult').classList.remove('hidden');
        errorMessage.classList.add('hidden');
    } catch (error) {
        console.error('Error tracking order:', error);
        errorText.textContent = error.message || 'Failed to track order. Please try again later.';
        errorMessage.classList.remove('hidden');
    } finally {
        // Reset button state
        submitButton.disabled = false;
        submitButton.textContent = originalText;
    }
} 
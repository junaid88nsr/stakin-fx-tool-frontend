document.getElementById('fx-tool-btn').addEventListener('click', async () => {
    const date = prompt("Please enter a date in DD-MM-YYYY format:");
    if (date) {
        document.getElementById('message').innerText = "Processing... Please wait for 3-4 minutes to respect API rate limits.";
        
        try {
            const response = await fetch('https://stakin-fx-tool-ewrlqh9re-junaid88nsrs-projects.vercel.app/fetch-data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ date })
            });

            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = url;
                a.download = 'historical_rates.xlsx';
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a); // Clean up the DOM
                document.getElementById('message').innerText = "Download completed.";
            } else {
                // Handling different HTTP status codes
                const errorText = await response.text();
                document.getElementById('message').innerText = `Error: ${response.status} - ${response.statusText}. ${errorText}`;
            }
        } catch (error) {
            console.error('Fetch error:', error); // Logging the error for debugging
            document.getElementById('message').innerText = "An error occurred while processing your request. Please try again.";
        }
    } else {
        document.getElementById('message').innerText = "No date entered. Please provide a valid date.";
    }
});

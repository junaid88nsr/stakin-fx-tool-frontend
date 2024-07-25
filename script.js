document.getElementById('fx-tool-btn').addEventListener('click', async () => {
    const date = prompt("Please enter a date in DD-MM-YYYY format:");
    if (date) {
        document.getElementById('message').innerText = "Processing... please wait for 3-4 minutes to respect API rate limits...";
        
        try {
            const response = await fetch('https://https:stakin-fx-tool-dns2zze2e-junaid88nsrs-projects.vercel.app/fetch-data', {
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
                document.getElementById('message').innerText = "Download completed.";
            } else {
                document.getElementById('message').innerText = "Error processing your request. Please try again.";
            }
        } catch (error) {
            document.getElementById('message').innerText = "An error occurred. Please try again.";
        }
    }
});

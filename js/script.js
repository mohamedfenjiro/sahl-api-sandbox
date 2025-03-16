document.addEventListener('DOMContentLoaded', function() {
    // Tab switching functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding tab pane
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // API request functionality
    const sendButtons = document.querySelectorAll('.send-button');
    const responseBody = document.querySelector('.response-body');
    const statusCode = document.querySelector('.status-code');
    const responseTime = document.querySelector('.response-time');

    sendButtons.forEach(button => {
        button.addEventListener('click', async function() {
            const endpoint = this.getAttribute('data-endpoint');
            const apiUrl = document.getElementById('api-url').value;
            const clientId = document.getElementById('client-id').value;
            const clientSecret = document.getElementById('client-secret').value;
            
            // Show loading state
            responseBody.textContent = 'Loading...';
            statusCode.textContent = '';
            responseTime.textContent = '';
            
            const startTime = new Date();
            
            try {
                let response;
                
                // Common headers
                const headers = {
                    'X-Client-ID': clientId,
                    'X-Client-Secret': clientSecret,
                    'Content-Type': 'application/json'
                };
                
                // Handle different endpoints
                switch(endpoint) {
                    case 'info':
                        response = await fetch(`${apiUrl}/bank/info`, {
                            method: 'GET',
                            headers: headers
                        });
                        break;
                        
                    case 'link-token':
                        const userId = document.getElementById('link-user-id').value;
                        const clientName = document.getElementById('link-client-name').value;
                        const products = document.getElementById('link-products').value.split(',').map(p => p.trim());
                        
                        response = await fetch(`${apiUrl}/bank/link/token/create`, {
                            method: 'POST',
                            headers: headers,
                            body: JSON.stringify({
                                user: {
                                    client_user_id: userId
                                },
                                client_name: clientName,
                                products: products
                            })
                        });
                        break;
                        
                    case 'exchange-token':
                        const publicToken = document.getElementById('public-token').value;
                        
                        response = await fetch(`${apiUrl}/bank/item/public_token/exchange`, {
                            method: 'POST',
                            headers: headers,
                            body: JSON.stringify({
                                public_token: publicToken
                            })
                        });
                        break;
                        
                    case 'auth':
                        const authAccessToken = document.getElementById('auth-access-token').value;
                        
                        response = await fetch(`${apiUrl}/bank/auth/get`, {
                            method: 'POST',
                            headers: headers,
                            body: JSON.stringify({
                                access_token: authAccessToken
                            })
                        });
                        break;
                        
                    case 'transactions':
                        const transactionsAccessToken = document.getElementById('transactions-access-token').value;
                        const startDate = document.getElementById('start-date').value;
                        const endDate = document.getElementById('end-date').value;
                        
                        response = await fetch(`${apiUrl}/bank/transactions/get`, {
                            method: 'POST',
                            headers: headers,
                            body: JSON.stringify({
                                access_token: transactionsAccessToken,
                                start_date: startDate,
                                end_date: endDate
                            })
                        });
                        break;
                        
                    case 'statements':
                        const statementsAccessToken = document.getElementById('statements-access-token').value;
                        
                        response = await fetch(`${apiUrl}/bank/statements/get`, {
                            method: 'POST',
                            headers: headers,
                            body: JSON.stringify({
                                access_token: statementsAccessToken
                            })
                        });
                        break;
                }
                
                const endTime = new Date();
                const timeTaken = endTime - startTime;
                
                // Display response status
                statusCode.textContent = `Status: ${response.status} ${response.statusText}`;
                statusCode.className = 'status-code';
                if (response.ok) {
                    statusCode.classList.add('success');
                } else {
                    statusCode.classList.add('error');
                }
                
                // Display response time
                responseTime.textContent = `Time: ${timeTaken}ms`;
                
                // Display response body
                const data = await response.json();
                
                // Special handling for statements to make PDF links clickable
                if (endpoint === 'statements' && data.statements && data.statements.length > 0) {
                    // Create formatted response with clickable links
                    let formattedResponse = JSON.stringify(data, null, 2);
                    
                    // Create a pre element to hold the response
                    const preElement = document.createElement('pre');
                    preElement.textContent = '';
                    
                    // Create a div to hold statement links
                    const statementsDiv = document.createElement('div');
                    statementsDiv.className = 'statement-links';
                    statementsDiv.innerHTML = '<h4>Statement PDFs:</h4>';
                    
                    // Add clickable links for each statement
                    data.statements.forEach(statement => {
                        if (statement.pdf_url) {
                            // Extract the filename from the URL
                            const urlParts = statement.pdf_url.split('/');
                            const filename = urlParts[urlParts.length - 1];
                            
                            // Extract account_id and statement_date from the URL
                            const accountId = urlParts[urlParts.length - 2];
                            const statementDate = filename.replace('.pdf', '');
                            
                            // Create a button styled as a link
                            const linkElement = document.createElement('button');
                            linkElement.textContent = `${statement.account_id} - ${statement.start_date} to ${statement.end_date} (${filename})`;
                            linkElement.className = 'statement-link';
                            linkElement.style.cursor = 'pointer';
                            linkElement.style.background = 'none';
                            linkElement.style.border = 'none';
                            linkElement.style.color = '#2e7d32';
                            linkElement.style.textDecoration = 'underline';
                            linkElement.style.padding = '5px 0';
                            linkElement.style.fontFamily = 'inherit';
                            linkElement.style.fontSize = 'inherit';
                            linkElement.style.textAlign = 'left';
                            
                            // Add click event to fetch the PDF directly using the access token
                            linkElement.addEventListener('click', async function() {
                                console.log('Statement link clicked!', accountId, statementDate);
                                try {
                                    // Show loading state
                                    this.textContent = 'Downloading...';
                                    this.disabled = true;
                                    
                                    // Use the same access token that was used to fetch the statements
                                    const accessToken = document.getElementById('statements-access-token').value;
                                    const apiUrl = document.getElementById('api-url').value;
                                    const clientId = document.getElementById('client-id').value;
                                    const clientSecret = document.getElementById('client-secret').value;
                                    
                                    console.log(`Fetching PDF directly from API using access token: ${accessToken}`);
                                    
                                    // Fetch the PDF directly from the API with the access token
                                    const response = await fetch(`${apiUrl}/bank/statements/pdf`, {
                                        method: 'POST',
                                        headers: {
                                            'X-Client-ID': clientId,
                                            'X-Client-Secret': clientSecret,
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify({
                                            access_token: accessToken,
                                            account_id: accountId,
                                            statement_date: statementDate
                                        })
                                    });
                                    
                                    if (!response.ok) {
                                        throw new Error(`HTTP error! status: ${response.status}`);
                                    }
                                    
                                    // Get the PDF data as a blob
                                    const blob = await response.blob();
                                    
                                    // Create a URL for the blob
                                    const url = window.URL.createObjectURL(blob);
                                    
                                    // Create a temporary link to download the file
                                    const tempLink = document.createElement('a');
                                    tempLink.href = url;
                                    tempLink.download = filename;
                                    document.body.appendChild(tempLink);
                                    tempLink.click();
                                    document.body.removeChild(tempLink);
                                    
                                    // Clean up the blob URL
                                    window.URL.revokeObjectURL(url);
                                    
                                    // Reset button state
                                    this.textContent = `${statement.account_id} - ${statement.start_date} to ${statement.end_date} (${filename})`;
                                    this.disabled = false;
                                    
                                } catch (error) {
                                    console.error('Error downloading PDF:', error);
                                    this.textContent = 'Error! Try again';
                                    this.disabled = false;
                                }
                            });
                            
                            // Create a container for each link
                            const linkContainer = document.createElement('div');
                            linkContainer.appendChild(linkElement);
                            statementsDiv.appendChild(linkContainer);
                        }
                    });
                    
                    // Add the statement links above the JSON response
                    responseBody.textContent = '';
                    responseBody.appendChild(statementsDiv);
                    
                    // Add the JSON response
                    preElement.textContent = formattedResponse;
                    responseBody.appendChild(preElement);
                } else {
                    // Regular JSON response for other endpoints
                    responseBody.textContent = JSON.stringify(data, null, 2);
                }
                
            } catch (error) {
                console.error('Error:', error);
                statusCode.textContent = 'Error';
                statusCode.className = 'status-code error';
                responseBody.textContent = `Error: ${error.message}`;
            }
        });
    });
});
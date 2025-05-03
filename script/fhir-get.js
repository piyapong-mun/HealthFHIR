document.getElementById('get-form').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const firstName = document.getElementById('get-first-name').value.trim();
    const lastName = document.getElementById('get-last-name').value.trim();
    const id = document.getElementById('get-patient-id').value.trim();
    const versionId = document.getElementById('get-patient-version-id').value.trim();
  
    // if (!firstName && !lastName) {
    //   alert('Please enter either First Name or Last Name to search.');
    //   return;
    // }
  
    let url = `${fhirServer}/Patient`;
    
    if (id) {
        url += `/${id}`;
        if (versionId) {
            url += `/_history/${versionId}`;
        }
    } else {
        url += `?`;
        if (firstName) {
          url += `given=${firstName}&`;
        }
        if (lastName) {
          url += `family=${lastName}&`;
        }
      }
  
    // Remove the trailing '&' if no query parameters were used
    if (url.endsWith('&')) {
      url = url.slice(0, -1);
    }
  
    try {
      const response = await fetch(url);
      const result = await response.json();
      displayResult(result);
    } catch (error) {
      displayResult({ error: error.message });
    }
  });
  
document.getElementById('add-form').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const patient = {
      resourceType: 'Patient',
      name: [{
        use: 'official',
        family: document.getElementById('add-last-name').value,
        given: [document.getElementById('add-first-name').value]
      }],
      gender: document.getElementById('add-gender').value,
      birthDate: document.getElementById('add-birth-date').value
    };
  
    try {
      const response = await fetch(`${fhirServer}/Patient`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/fhir+json' },
        body: JSON.stringify(patient)
      });
  
      const result = await response.json();
      displayResult(result);
    } catch (error) {
      displayResult({ error: error.message });
    }
  });
  
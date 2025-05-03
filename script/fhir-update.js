document.getElementById('update-form').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const id = document.getElementById('update-id').value.trim();
    if (!id) return alert('Patient ID is required for update.');
  
    const patient = {
      resourceType: 'Patient',
      id: id,
      identifier: [
        {
          system: document.getElementById('update-hospital-url').value,
          value: document.getElementById('update-HN').value
        }
      ],
      name: [{
        use: 'official',
        family: document.getElementById('update-last-name').value,
        given: [document.getElementById('update-first-name').value]
      }],
      gender: document.getElementById('update-gender').value,
      birthDate: document.getElementById('update-birth-date').value
    };
  
    try {
      console.log(JSON.stringify(patient));
      const response = await fetch(`${fhirServer}/Patient/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/fhir+json' },
        body: JSON.stringify(patient)
      });
  
      const result = await response.json();
      displayResult(result);
    } catch (error) {
      displayResult({ error: error.message });
    }
  });
  
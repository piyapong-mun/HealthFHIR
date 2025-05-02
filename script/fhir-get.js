document.getElementById('get-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const firstName = document.getElementById('get-first-name').value.trim();
    const lastName = document.getElementById('get-last-name').value.trim();
    const id = document.getElementById('get-patient-id').value.trim();
    const versionId = document.getElementById('get-patient-version-id').value.trim();

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

    if (url.endsWith('&')) {
        url = url.slice(0, -1);
    }

    try {
        const response = await fetch(url);
        const result = await response.json();

        if (result.resourceType === 'Bundle' && result.entry) {
            displayPatientList(result.entry);
        } else if (result.resourceType === 'Patient') {
            displayPatientList([{ resource: result }]);
        } else {
            displayResult({ error: 'No patients found.' });
        }
    } catch (error) {
        displayResult({ error: error.message });
    }
});

function displayPatientList(entries) {
    const patientListDiv = document.getElementById('patient-list');
    const patientListBody = document.getElementById('patient-list-body');

    // Clear previous results
    patientListBody.innerHTML = '';

    // Populate table rows
    entries.forEach((entry) => {
        const patient = entry.resource;
        const identifier = patient.identifier?.find((id) => id.system && id.value) || {};

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${patient.id || 'N/A'}</td>
            <td>${patient.name?.[0]?.given?.[0] || 'N/A'}</td>
            <td>${patient.name?.[0]?.family || 'N/A'}</td>
            <td>${patient.birthDate || 'N/A'}</td>
            <td>${patient.gender || 'N/A'}</td>
            <td>${identifier.system || 'N/A'}</td>
            <td>${identifier.value || 'N/A'}</td>
        `;
        patientListBody.appendChild(row);
    });

    // Show the patient list and hide the raw result
    patientListDiv.style.display = 'block';
    document.getElementById('result').style.display = 'none';
}

function displayResult(result) {
    const resultDiv = document.getElementById('result');
    const patientListDiv = document.getElementById('patient-list');

    // Hide the patient list
    patientListDiv.style.display = 'none';

    // Show raw JSON result
    resultDiv.style.display = 'block';
    resultDiv.textContent = JSON.stringify(result, null, 2);
}

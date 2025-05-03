const e = require("express");

function displayResult(data) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = ''; // Clear old content

    if (data.entry && Array.isArray(data.entry) && data.entry.length >= 1) {
        // Multiple patients found
        data.entry.forEach(patientEntry => {
            const patient = patientEntry.resource;
            const name = patient.name?.[0];
            const fullName = name ? `${name.given.join(' ')} ${name.family}` : 'N/A';
            const gender = patient.gender || 'N/A';
            const birthDate = patient.birthDate || 'N/A';
            const id = patient.id || 'N/A';
            const versionId = patient.meta?.versionId || 'N/A';
            const hospitalUrl = patient.identifier?.[0]?.system || 'N/A';
            const HN = patient.identifier?.[0]?.value || 'N/A';

            resultDiv.innerHTML += `
          <div><strong>Patient ID:</strong> ${id}</div>
          <div><strong>Name:</strong> ${fullName}</div>
          <div><strong>Gender:</strong> ${gender}</div>
          <div><strong>Birth Date:</strong> ${birthDate}</div>
          <div><strong>Hospital:</strong> ${hospitalUrl}</div>
          <div><strong>HN:</strong> ${HN}</div>
          <div><strong>History ID:</strong> ${versionId}</div>
          <hr />
        `;
        });
    } else if (data.resourceType === 'Patient') {
        // Single patient result
        const name = data.name?.[0];
        const fullName = name ? `${name.given.join(' ')} ${name.family}` : 'N/A';
        const gender = data.gender || 'N/A';
        const birthDate = data.birthDate || 'N/A';
        const id = data.id || 'N/A';
        const versionId = data.meta?.versionId || 'N/A';
        // console.log(data);
        const hospitalUrl = data.identifier?.[0]?.system || 'N/A';
        const HN = data.identifier?.[0]?.value || 'N/A';


        resultDiv.innerHTML = `
        <div><strong>Patient ID:</strong> ${id}</div>
        <div><strong>Name:</strong> ${fullName}</div>
        <div><strong>Gender:</strong> ${gender}</div>
        <div><strong>Birth Date:</strong> ${birthDate}</div>
        <div><strong>Hospital:</strong> ${hospitalUrl}</div>
        <div><strong>HN:</strong> ${HN}</div>
        <div><strong>History ID:</strong> ${versionId}</div>
        <hr />
      `;
    } else if (data.resourceType === 'OperationOutcome') {
        const issue = data.issue?.[0]?.diagnostics || 'Unknown error';
        resultDiv.innerHTML = `<div style="color: red;"><strong>Error:</strong> ${issue}</div>`;
    } else if (data.error) {
        resultDiv.innerHTML = `<div style="color: red;"><strong>Error:</strong> ${data.error}</div>`;
    } else {
        resultDiv.textContent = JSON.stringify(data, null, 2);
    }
}

function clearForm() {
    document.getElementById('add-form').reset();
    document.getElementById('update-form').reset();
    document.getElementById('get-form').reset();
  }

function clearResult() {
    document.getElementById('result').innerHTML = '';
  }

function showAddForm() {
    const add = document.getElementById('add-form-div').style.display = 'block';
    const update = document.getElementById('update-form-div').style.display = 'none';
    const get = document.getElementById('get-form-div').style.display = 'none';
    clearForm();
    clearResult();
  }
  
  function showUpdateForm() {
    const add = document.getElementById('add-form-div').style.display = 'none';
    const update = document.getElementById('update-form-div').style.display = 'block';
    const get = document.getElementById('get-form-div').style.display = 'none';
    clearForm();
    clearResult();
  }
  
  function showGetForm() {
    const add = document.getElementById('add-form-div').style.display = 'none';
    const update = document.getElementById('update-form-div').style.display = 'none';
    const get = document.getElementById('get-form-div').style.display = 'block';
    clearForm();
    clearResult();
  }

  function showIDForm() {
    const id_section = document.getElementById('get-id-section').style.display = 'block';
    const name_section = document.getElementById('get-name-section').style.display = 'none';
    clearForm();
    clearResult();
  }

  function showNameForm() {
    const id_section = document.getElementById('get-id-section').style.display = 'none';
    const name_section = document.getElementById('get-name-section').style.display = 'block';
    clearForm();
    clearResult();
  }
 
  function handleSelectChange() {
    const select_value = document.getElementById('get-search-type').value;
    if (select_value === 'id') {
        showIDForm();
    } else if (select_value === 'name') {
        showNameForm();
   }
  };


    

  
  
console.log('Client-side code running');

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);

  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}  

//Search for a constellation
const constellationSearch = document.getElementById('constellationSearch');
const searchButton = document.getElementById('searchButton');

//Delete Part of CRUD
const deleteListSearch = document.getElementById('deleteList');
const deleteButton = document.getElementById('deleteButton');

//Create Part of CRUD
const createList = document.getElementById('createList');
const addName1 = document.getElementById('addName1'); 
const addName2 = document.getElementById('addName2');
const addName3 = document.getElementById('addName3');
const addName4 = document.getElementById('addName4');
const addName5 = document.getElementById('addName5');

const createListButton = document.getElementById('createListButton');

//Update Part of CRUD
const updateList = document.getElementById('updateList');
const updateName1 = document.getElementById('updateName1');
const updateName2 = document.getElementById('updateName2');
const updateName3 = document.getElementById('updateName3');
const updateName4 = document.getElementById('updateName4');
const updateName5 = document.getElementById('updateName5');

const updateListButton = document.getElementById('updateListButton');

//Read Part of CRUD
const readListSearch = document.getElementById('retrieveList');
const readButton = document.getElementById('retrieveButton');

updateListButton.addEventListener('click', async () => {
  const updateListValue = updateList.value;
  const updateName1Value = updateName1.value;
  const updateName2Value = updateName2.value;
  const updateName3Value = updateName3.value;
  const updateName4Value = updateName4.value;
  const updateName5Value = updateName5.value;

  try {
    const response = await fetch(`/list/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ updateListValue, updateName1Value, updateName2Value, updateName3Value, updateName4Value, updateName5Value }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);

      const divElement = document.getElementById('updateResponse');

      divElement.innerHTML = `${updateListValue} has been updated!`;
    } else {
      console.log('Error:', response.status);
    }
  } catch (err) {
    console.log(err);
  }
});

createListButton.addEventListener('click', async () => {
  const createListValue = createList.value;
  const addName1Value = addName1.value;
  const addName2Value = addName2.value;
  const addName3Value = addName3.value;
  const addName4Value = addName4.value;
  const addName5Value = addName5.value;

  try {
    const response = await fetch(`/list/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ createListValue, addName1Value, addName2Value, addName3Value, addName4Value, addName5Value }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);

      const divElement = document.getElementById('createResponse');

      divElement.innerHTML = `${createListValue} has been updated to the database!`;
    } else {
      console.log('Error:', response.status);
    }
  } catch (err) {
    console.log(err);
  }
});

retrieveButton.addEventListener('click', async () => {
  const readListSearchValue = readListSearch.value;

  try {
    const response = await fetch(`/list/read`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ readListSearchValue }),
    });

    if (response.ok) {
      const data = await response.json();
      const dataString = JSON.stringify(data);
      const jsonData = JSON.parse(dataString);
      const divElement = document.getElementById('retrieveRectangle');

      const fullName = jsonData.fullName;
      // divElement.innerHTML = `testing`;
      console.log(jsonData);

      const name1 = jsonData.name1;
      const name2 = jsonData.name2;
      const name3 = jsonData.name3;
      const name4 = jsonData.name4;
      const name5 = jsonData.name5;

      divElement.innerHTML = `
      <button class="buttons readSearch" id="${name1}Button">${name1}</button>
      <button class="buttons readSearch" id="${name2}Button">${name2}</button>
      <button class="buttons readSearch" id="${name3}Button">${name3}</button>
      <button class="buttons readSearch" id="${name4}Button">${name4}</button>
      <button class="buttons readSearch" id="${name5}Button">${name5}</button>
      `;

    } else {
      console.log('Error:', response.status);
    }
  } catch (err) {
    console.log(err);
  }
});

deleteButton.addEventListener('click', async () => {
  const deleteListSearchValue = deleteListSearch.value;
  try {
    const response = await fetch(`/list/delete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ deleteListSearchValue }),
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      console.log(`${deleteListSearch} has been deleted from the database!`);
    } else {
      console.log('Error:', response.status);
    }
  } catch (err) {
    console.log(err);
  }
});

searchButton.addEventListener('click', async () => {
  const searchValue = constellationSearch.value;

  try {
    const response = await fetch(`/constellation/postName`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ searchValue }),
    });

    if (response.ok) {
      const data = await response.json();

      const dataString = JSON.stringify(data);
      const jsonData = JSON.parse(dataString);

      const fullName = jsonData.fullName;
      const abbreviations = jsonData.abbreviations;
      const origin = jsonData.origin;
      const meaning = jsonData.meaning;
      const brightestStar = jsonData.brightestStar;
      const url = jsonData.url;
      const visible = jsonData.visible;
      const starNum = jsonData.starNum;
      const area = jsonData.area;

      const divElement = document.getElementById('constellationInfo');

      divElement.innerHTML = `
      <h2 class="putCenter">${fullName}</h2>
      <div class="putCenter">
      <img src="${url}" alt="Description of the image" width="500" height="500">
      <div>
      <p><strong>Abbreviations:</strong> ${abbreviations}</p>
      <p><strong>Origin:</strong> ${origin}</p>
      <p><strong>Meaning:</strong> ${meaning}</p>
      <p><strong>Brightest Star:</strong> ${brightestStar}</p>
      <p><strong>Visible:</strong> ${visible}</p>
      <p><strong>Star Number:</strong> ${starNum}</p>
      <p><strong>Area:</strong> ${area}</p>
    `;
    } else {
      console.log('Error:', response.status);
    }
  } catch (err) {
    console.log(err);
  }
});

async function constellationButtons() {
  try {
    const response = await fetch(`/constellation/getAll`, {method: 'GET'});
    if (response.ok) {
      const data = await response.json();
      const dataString = JSON.stringify(data);
      const jsonData = JSON.parse(dataString);
      console.log(jsonData);

      const divElement = document.getElementById('buttonRectangle');

      const fullName = jsonData.fullName;

      jsonData.forEach((constellation) => {
        const fullName = constellation.fullName;
        const button = document.createElement('button');
        button.className = 'button';
        button.textContent = fullName;
        button.classList.add('search');
        divElement.appendChild(button);
      });
    } else {
      console.log('Error:', response.status);
    }
  } catch (err) {
    console.log(err);
  }
}

await constellationButtons();
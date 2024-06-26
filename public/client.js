console.log('Client-side code running');

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

//Feedback form
const feedbackForm = document.getElementById('feedbackForm');
const feedbackButton = document.getElementById('sendButton');

//Buttons for scrolling
const feedback = document.getElementById('feedback');
const section1Button = document.getElementById('section1Button');
const section2Button = document.getElementById('section2Button');
const section3Button = document.getElementById('section3Button');
const clearButton = document.getElementById('clearButton');
const home = document.getElementById('home');

clearButton.addEventListener('click', () => {
  localStorage.clear();
  console.log('Local storage cleared');
});

home.addEventListener('click', () => {
  console.log('home clicked');
  scrollToSection('title');
});
section1Button.addEventListener('click', () => {
  console.log('section1 clicked');
  scrollToSection('section1');
});

section2Button.addEventListener('click', () => {
  console.log('section2 clicked');
  scrollToSection('section2');
});

section3Button.addEventListener('click', () => {
  console.log('section3 clicked');
  scrollToSection('section3');
});

feedback.addEventListener('click', () => {
  console.log('feedback clicked');
  scrollToSection('feedbackSection');
});

feedbackButton.addEventListener('click', async () => {
  const feedbackFormValue = feedbackForm.value;
  
  try {
    const response = await fetch(`/feedback/post`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ feedbackFormValue }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);

      const divElement = document.getElementById('feedbackResponse');

      divElement.innerHTML = `Thank you for your feedback!`;
    } else {
      console.log('Error:', response.status);
    }

  } catch (err) {
    console.log(err);
  }
});

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
  const divElement = document.getElementById('createResponse');

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

      

      divElement.innerHTML = `${createListValue} has been updated to the database!`;
    } else {
      divElement.innerHTML = `Error: ${response.status} You did not enter a name for the list`;
      console.log(`Error: ${response.status} You did not enter a name for the list`);
    }
  } catch (err) {
    console.log(err);
  }
});

retrieveButton.addEventListener('click', async () => {
  const readListSearchValue = readListSearch.value;
  const divElement = document.getElementById('retrieveResponse');

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
      const fullName = jsonData.fullName;

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

      if (jsonData === '') {
        divElement.innerHTML = `No list found with the name ${readListSearchValue}`;
      }
    } else {
      console.log('Error:', response.status);

      if (response.status === 400) {
        divElement.innerHTML = `No list found with the name ${readListSearchValue}`;
      }
    }
  } catch (err) {
    console.log(err);
  }
});

deleteButton.addEventListener('click', async () => {
  const deleteListSearchValue = deleteListSearch.value;
  const divElement = document.getElementById('deleteResponse');
  try {
    const response = await fetch(`/list/delete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ deleteListSearchValue }),
    });
    if (response.ok) {
      divElement.innerHTML = `${deleteListSearchValue} has been deleted from the database!`;
    } else {
      divElement.innerHTML = `Error: ${response.status} You did not enter a name for the list`;
    }
  } catch (err) {
    console.log(err);
  }
});

searchButton.addEventListener('click', async () => {
  const searchValue = constellationSearch.value;
  const divElement = document.getElementById('constellationResponse');
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
      divElement.innerHTML = '';
      localStorage.setItem('constellation', JSON.stringify(data));
      renderConstellation(JSON.stringify(data));
    } else {
      divElement.innerHTML = `Error: ${response.status} You did not enter a name for the constellation`;
      console.log('Error:', response.status);
    }
  } catch (err) {
    console.log(err);
  }
});

async function constellationButtons() {
  const divElement = document.getElementById('retrieveResponse');
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
      divElement.innerHTML = `Error: ${response.status} There are no constellations in the database`;
      console.log('Error:', response.status);
    }
  } catch (err) {
    console.log(err);
  }
}

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);

  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}  

function localStorageConstellation() {
  if (window.localStorage.getItem('constellation') !== null) {
    const data = window.localStorage.getItem('constellation');
    renderConstellation(data);
    console.log(data);
  } else {
    console.log('No data in local storage');
  }
}

function renderConstellation(data) {
  const jsonData = JSON.parse(data);

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
}

await constellationButtons();
localStorageConstellation();
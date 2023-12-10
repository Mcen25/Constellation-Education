console.log('Client-side code running');

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);

  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}  

const constellationSearch = document.getElementById('constellationSearch');
const searchButton = document.getElementById('searchButton');

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

   // Handle the returned data
     
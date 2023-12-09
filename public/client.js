console.log('Client-side code running');

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);

  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}  

let search = document.getElementById('constellationSearch').value;
let button = document.getElementById('searchButton');
button.addEventListener('click', () => {
  // console.log(search);

  fetch('/constellation', {method: 'GET'})   
    .then(response => response.json())
    .then(data => {

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
      <h2>${fullName}</h2>
      <img src="${url}" alt="Description of the image" width="500" height="500">
      <p><strong>Abbreviations:</strong> ${abbreviations}</p>
      <p><strong>Origin:</strong> ${origin}</p>
      <p><strong>Meaning:</strong> ${meaning}</p>
      <p><strong>Brightest Star:</strong> ${brightestStar}</p>
      <p><strong>Visible:</strong> ${visible}</p>
      <p><strong>Star Number:</strong> ${starNum}</p>
      <p><strong>Area:</strong> ${area}</p>
    `;
    })
    .catch(error => {
      console.error('Error:', error);
    });
});
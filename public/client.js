console.log('Client-side code running');

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);

  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}  

let button = document.getElementById('searchButton');
button.addEventListener('click', function(e) {
  console.log('Button was clicked');

  fetch('/person/all', {method: 'GET'})
  .then(function(response) {
    if(response.ok) {
      console.log('click was recorded');
      return;
    }
    throw new Error('Request failed.');
  })
  .catch(function(error) {
    console.log(error);
  });
});
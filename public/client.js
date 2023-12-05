console.log('Client-side code running');

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);

  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}  

let button = document.getElementById('searchButton');
document.addEventListener('click', () => {
  console.log('Button was clicked');

  // try {
  //   const response = await fetch('/getData');
  //   const data = await response.json();
  //   console.log(data);
  // } catch (err) {
  //   console.error('Error fetching data:', error);
  // }
});
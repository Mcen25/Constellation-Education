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
});
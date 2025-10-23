document.addEventListener('DOMContentLoaded', async () => {
  // Initialize explore button functionality
  const exploreBtn = document.getElementById('explore-button');
  const nextSection = document.getElementById('home-sec-2');

  if (exploreBtn && nextSection) {
    exploreBtn.addEventListener('click', (e) => {
      e.preventDefault();
      nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  // Initialize fun facts functionality
  const funFactText = document.querySelector('.fun-fact-text');
  if (!funFactText) return;

  try {
    const response = await fetch('assets/universe-facts.json');
    const data = await response.json();
    const facts = data.fun_facts;
    let currentIndex = 0;

    // Function to update the fun fact with fade animation
    const updateFunFact = () => {
      funFactText.classList.add('fade');
      
      setTimeout(() => {
        const fact = facts[currentIndex];
        funFactText.innerHTML = `<strong>${fact.title}</strong><br>${fact.fact}`;
        funFactText.classList.remove('fade');
        
        currentIndex = (currentIndex + 1) % facts.length;
      }, 500); // Wait for fade out to complete
    };

    // Update initial fun fact
    updateFunFact();

    // Change fun fact every 8 seconds
    setInterval(updateFunFact, 12000);

  } catch (error) {
    console.error('Error loading fun facts:', error);
    funFactText.textContent = 'Sistemul Solar este plin de mistere fascinante...';
  }
});
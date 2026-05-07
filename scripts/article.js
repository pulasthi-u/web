const backToTop = document.querySelector("#back-to-top");
backToTop.addEventListener('click', () => {
    document.querySelector('a[name="top"]').scrollIntoView({ behavior: 'smooth' });
})
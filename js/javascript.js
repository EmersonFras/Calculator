const btns = document.querySelectorAll('btn');

btns.forEach(btn => btn.addEventListener('mouseover', function(e) {
    this.classList.add(`${btn.className.split(' ')[0]}-hover`);
    
}))

btns.forEach(btn => btn.addEventListener('mouseout', function(e) {
    this.classList.remove(`${btn.className.split(' ')[0]}-hover`);
}));
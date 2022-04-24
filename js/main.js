const categoryLinks = document.querySelectorAll('.category-menu > ul a');

for (let i = 0; i < categoryLinks.length; i++) {

    categoryLinks[i].addEventListener('click', () => {

        categoryLinks.forEach(link => {
            link.classList.remove('active');
        });

        categoryLinks[i].classList.add('active');
    });
}
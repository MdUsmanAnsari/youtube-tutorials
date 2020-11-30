window.onload = () => {

    const btnOk = document.querySelector('.the-blood-coders__ok-btn');

    btnOk.addEventListener('click', (e) => {
        e.target.closest('.the-blood-coders__backdrop').remove();
    });

}
document.addEventListener('DOMContentLoaded', () => {

    // const mentor1 = document.getElementById('mentor1');
    // const mentor2 = document.getElementById('mentor2');
    // const mentor3 = document.getElementById('mentor3');

    // if (mentor1) {
    //     mentor1.addEventListener('click', () => {
    //         // alert("Du hast Sarah Schmidt ausgewählt!");
    //         window.location.href = "../sites/mentors/mentorSchmidtS.html";
    //     });
    // }

    // if (mentor2) {
    //     mentor2.addEventListener('click', () => {
    //         alert("Du hast Michael Müller ausgewählt!");
    //     });
    // }

    // if (mentor3) {
    //     mentor3.addEventListener('click', () => {
    //         alert("Du hast Julia Weber ausgewählt!");
    //     });
    // }

    if (window.location.pathname.endsWith('index.html')) {
    document.addEventListener('click', (event) => {
        const mentorCard = event.target.closest('.box');
        if (mentorCard) {
            const mentorId = mentorCard.id;
            if (mentorId === 'mentor1') {
                window.location.href = "sites/mentors/mentorSchmidtS.html";
            } else if (mentorId === 'mentor2') {
                alert("Du hast Michael Müller ausgewählt!");
            } else if (mentorId === 'mentor3') {
                alert("Du hast Julia Weber ausgewählt!");
            }
        }
    });
    } else {
        document.addEventListener('click', (event) => {
        const mentorCard = event.target.closest('.box');
        if (mentorCard) {
            const mentorId = mentorCard.id;
            if (mentorId === 'mentor1') {
                window.location.href = "../sites/mentors/mentorSchmidtS.html";
            } else if (mentorId === 'mentor2') {
                alert("Du hast Michael Müller ausgewählt!");
            } else if (mentorId === 'mentor3') {
                alert("Du hast Julia Weber ausgewählt!");
            }
        }
    });
    }
});
goTo = (goToElementID) => {
    // // document.querySelector(goToElementID).scrollIntoView({
    // //     behavior: 'smooth',
    // //     block: 'start'
    // // });
    // let mainURL = 'C:/Users/tommaso/Documents/_Projects/BriUpWeb/static/index.html'
    // window.url = mainURL + goToElementID
}

prenota = () => {
    let nome = $('#prenotazioneNome').val();
    let cognome = $('#prenotazioneCognome').val();
    let email = $('#prenotazioneMail').val();
    let numero = $('#prenotazioneNumero').val();
    let giorno = $('#prenotazioneGiorno').val();
    let ora = $('#prenotazioneOra').val();

    if (campiValidi(nome, cognome, email, numero, giorno, ora)) {
        sendPost('/confermaPrenotazione', {
            'nome': nome,
            'cognome': cognome,
            'email': email,
            'numero': numero,
            'giorno': giorno,
            'ora': ora
        })
    }
}

campiValidi = (nome, cognome, email, numero, giorno, ora) => {
    if (nome == '') {
        alert('Non hai inserito il nome!')
        return false;
    }
    if (cognome == '') {
        alert('Non hai inserito il cognome!')
        return false;
    }
    if (email == '') {
        alert('Non hai inserito l\'email!')
        return false;
    }
    if (!emailValida(email)) {
        alert('L\'email inserita non è valida!')
        return false;
    }
    if (numero == '' || parseInt(numero)<1 || parseInt(numero)>10) {
        alert('Numero di posti non valido!')
        return false;
    }

    let giorniValidi = [
        'Venerdì 10 Giugno',
        'Sabato 11 Giugno',
        'Domenica 11 Giugno',
    ]
    if (giorno == '' || !giorniValidi.includes(giorno)) {
        alert('Il giorno selezionato non è valido!')
        return false;
    }

    let oreValide = [
        'Pomeriggio 16.30 - 18.30',
        'Sera 18.30 - 21.00',
        'Notte 21.00 - 24.00',
    ]
    if (ora == '' || !oreValide.includes(ora)) {
        alert('L\'ora selezionata non è valida!')
        return false;
    }

    return true;
}

emailValida = (email) => {
    return String(email)
    .toLowerCase()
    .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

sendPost = (route, payload) => {
    let baseURL = 'http://127.0.0.1:5000'
    $.ajax({
        type: "POST",
        url: baseURL+route,
        contentType: "application/json",
        data: JSON.stringify(payload),
        dataType: "json"
    }).done((success) => {
        if (success.exit == 'OK') {
            alert(success.message)
        } else {
            alert('Qualcosa è andato storto. Riprova tra poco please.')
        }
    }).fail((error) => {
        alert(error.message)
    });
}

//---------------------------------------------------------------------------//

$(() => {
    var onStartOverlay = $('<div id="onStartOverlay"></div>');
    onStartOverlay.show(); 
    onStartOverlay.appendTo(document.body); 
    $('.onStartPopup').show(); 
    $('.close').click(function() {
        $('.onStartPopup').hide();
        onStartOverlay.appendTo(document.body).remove();
        return false;
    }); 
    $('.x').click(function() {
        $('.onStartPopup').hide();
        onStartOverlay.appendTo(document.body).remove();
        return false;
    });
});

//---------------------------------------------------------------------------//

// Hamburger menù handler

ToggleModal = () => {
    if ($('#overlay').is(":visible")) {
        $('#overlay').hide();
    } else {
        $('#overlay').show();
    }
}
CloseModal = () => {
    $('#overlay').hide();
}

$('.mobileMenuItemLink').click(() => {
    CloseModal();
});

//---------------------------------------------------------------------------//
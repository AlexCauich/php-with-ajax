$(document).ready(function () {

    console.log("jQuery funciona");

    $('#comment-form').submit(function (e) {
        const postData = {
            name: $('#name').val(),
            description: $('#description').val()
        };

        const ui = new UI ();

        $.post('comment-add.php', postData, function(response) {
            console.log(response);  
            $('#comment-form').trigger('reset');
            ui.showMessage('Comment Added Successfully', 'success');
        });
        
        e.preventDefault();
    });
});

class UI {
    showMessage(message, cssClass) {
        const div = document.createElement('div');
        div.className = `alert alert-${cssClass} mt-4`;
        div.appendChild(document.createTextNode(message));

        //Show DOM
        const container = document.querySelector('.container');
        const app = document.querySelector('#App');
        container.insertBefore(div, app);
        setTimeout( function() {
            document.querySelector('.alert').remove();
        }, 2000);
    }
}
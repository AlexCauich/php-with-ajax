$(document).ready(function () {

    let edit = false;


    console.log("jQuery funciona");
    $('#comment-result').hide();
    fetchComment();

    $('#comment-form').submit(function (e) {
        const postData = {
            name: $('#name').val(),
            description: $('#description').val(),
            id: $('#commentId').val()

        };

        let url = edit === false ? 'comment-add.php' : 'comment-edit.php';

        if(edit === true){
            const ui = new UI();
            ui.showMessage('Edited successfully', 'warning');
        }else {
            const ui = new UI (); 
            ui.showMessage('Comment Added Successfully', 'primary');
        }

        $.post(url, postData, function(response) {
            console.log(response);  
            fetchComment();
            $('#comment-form').trigger('reset');
        });
        
        e.preventDefault();
    });

    function fetchComment() {
        $.ajax({ 
            url: 'comment-list.php',
            type: 'GET',
            success: function(response) {
                let comments = JSON.parse(response);
                let template = '';
                comments.forEach(comment => {
                    template +=
                    `   <tr commentId=${comment.id}>
                           <td>${comment.id}</td>
                           <td>${comment.name}</td>
                           <td>${comment.comment}</td>
                           <td>
                                <button class="comment-item btn btn-warning">Edit</button>
                                <button class="comment-delete btn btn-danger">Delete</button>
                            </td>
                           
                       </tr>
                   `
                   });
                $('#comments').html(template);
            }
        })
      }
    
    $(document).on('click', '.comment-delete', function() {
        if(confirm('Are you sure you want to delete it?')) {
            let element = $(this)[0].parentElement.parentElement;
            let id = $(element).attr('commentId');
            $.post('comment-delete.php', {id}, function(response) {
                const ui = new UI();
                ui.showMessage('Comment deleted', 'danger');
                fetchComment();
            });
        }
    });

    $(document).on('click', '.comment-item', function() {
        let element = $(this)[0].parentElement.parentElement;
        let id = $(element).attr('commentId');
        
        $.post('comment-update.php', {id}, function(response) {
            const comment = JSON.parse(response);
            $('#name').val(comment.name);
            $('#description').val(comment.description);
            $('#commentId').val(comment.id);
            edit = true;
        });
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
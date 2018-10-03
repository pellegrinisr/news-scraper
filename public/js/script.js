$(document).ready(function() {
  $('form').on('submit', function(event) {
    event.preventDefault();
    $.ajax({
      url: '/articles/' + $(this).attr('id'),
      method: 'PUT',
      data: {
        name: $(this).children('div').children('input.name').val().trim(),
        body: $(this).children('div').children('textarea.comment').val().trim()
      }
    }).then(function(result) {
      window.location.href = '/articles';
    }).catch(function(error) {
      console.log(error);
    })  
  })
}) 

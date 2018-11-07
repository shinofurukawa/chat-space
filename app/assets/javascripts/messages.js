$(function(){
 function buildHTML(message){
  var html = `<div class="chat-main__body--id" data-message-id="${message.id}">
                <div class="chat-main__body--name">
                  ${message.user_name}
                </div>
                <div class="chat-main__body--date">
                  ${message.created_at}
                </div>
                <div class="chat-main__body--message">
                <p class="lower-message__content">
                  ${message.content}
                </p>
                <img class='lower-message__image'>
                  ${insertImage}
                </img>
                </div>
                </div>`
    return html;
  }


  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
  })
})

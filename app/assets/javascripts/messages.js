$(document).on('turbolinks:load', function(){
  function buildHTML(message){
    var insertImage = message.image_url ? `<img src="${message.image_url}" class='lower-message__image'>` : "";

    var html = `<div class="message">
                  <div class="upper-message">
                    <div class="upper-message__user-name">
                      ${message.user_name}
                    </div>
                    <div class="upper-message__date">
                      ${message.created_at}
                    </div>
                  </div>
                  <div class="lower-message">
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
      var url = $(this).attr('action');
      $.ajax({
        url: url,
        type: "POST",
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
      })
    .done(function(message) {
      var html = buildHTML(message);
        $('.messages').append(html)
        $('#message_content').val('');
        $('.form__submit').prop('disabled', false);
        $('html,body').animate({ scrollTop: $('.messages')[0].scrollHeight });
        $('.hidden').remove();
        })
    .fail(function(){
        alert('メッセージを入力してください');
        })
    })


    var interval = setInterval(function() {
        if (window.location.href.match(/\/groups\/\d+\/messages/)) {
      $.ajax({
        url: window.location.href,
        type: 'GET',
        data: {id: $('.message').last().attr('data-id')},
        dataType: 'json',
      })

      .done(function(json) {
        var $messages = $('.messages');
        var insertHTML = '';
        json.forEach(function(message) {
            insertHTML += buildHTML(message);
            $messages.append(insertHTML);
            $('html,body').animate({ scrollTop: $('.messages')[0].scrollHeight });
        });
      })
      .fail(function() {
        alert('自動更新に失敗しました');
      })
    } else {
      clearInterval(interval);
     }
    }, 5 * 1000 );
})

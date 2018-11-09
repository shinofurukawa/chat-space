$(function(){


function buildHTML(message){

  var insertImage = message.image_url ? `<img src="${message.image_url}" class='lower-message__image'>` : "";
  // var insertImage = '';
  //   if (message.image_url) {
  //     insertImage = `<img src="${message.image_url}">`;
  //   }
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
      $('.message').animate({ scrollTop: $('.message')[0].scrollHeight });
      $('.hidden').remove();
      })
  .fail(function(){
      alert('メッセージを入力してください');
      })
  })
})

// // 自動更新
//   var interval = setInterval(function(){
//     var lastMessageId = $('.message').last().attr('message-id');
//     var presentHTML = window.location.href;
//     if (presentHTML.match(/\/groups\/\d+\/messages/)) {
//       $.ajax ({
//         url: presentHTML,
//         type: 'GET',
//         data: {id: lastMessageId},
//         dataType: 'json',
//       })
//       .done(function(json){
//         // ここに処理を書く、ラストメッセージをappendするやつ
//         var insertHtml = "";
//         update.messages.forEach(function(message){
//         insertHtml += buildHTML(message);
//          });
//      $(".chat__contents"). append(insertHtml);
//        })
//       .fail(function() {
//         alert('');
//       })
//     } else {
//       clearInterval(interval)
//     }
//   },5000);

// });




  // var message_id = $('.message').last().attr('message-id');
  // setInterval(function() {
  //   $.ajax({
  //     url: window.location.href,
  //     type: 'GET',
  //     data: {id: message_id},
  //     dataType: 'json'
  //   })
  //   .done (function(){
  //     console.log(message_id);

  //   // var insertHtml = "";
  //   // update.messages.forEach(function(message){
  //   //   insertHtml += buildHTML(message);
  //   // });
  //   $(".chat__contents__content"). append(insertHtml);
  //   })
  // .fail(function(data) {
  //   alert('自動更新に失敗しました');
  // });
  // }, 5000);



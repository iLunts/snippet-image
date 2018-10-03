(function () {

    console.log('Start!');
    
    var html = '\
        <div class="ita-panel">\
            <div class="ita-panel__controls">\
                <div class="ita-panel__controls-title">\
                    <a href="#" class="link">Gallery (2)</a>\
                </div>\
                <div class="ita-panel__controls-btns">\
                    <a href="#" class="link">\
                        <img class="link__icon" src="content/svg/update.svg" alt="" width="14">\
                    </a>\
                </div>\
            </div>\
            <div class="ita-panel__body">\
                <ul class="ita-panel__list">\
                    <li class="ita-panel__item">\
                        <a href="#" class="ita-panel__before">\
                            <img class="ita-panel__before-img" src="content/img/1/1-1.jpg" alt="">\
                            <p class="ita-panel__before-title">File name before</p>\
                        </a>\
                        <a href="#" class="ita-panel__after">\
                            <img class="ita-panel__after-img" src="content/img/1/1-2.jpg" alt="">\
                            <p class="ita-panel__after-title">File name after</p>\
                        </a>\
                    </li>\
                    <li class="ita-panel__item">\
                        <a href="#" class="ita-panel__before">\
                            <img class="ita-panel__before-img" src="content/img/3/3-1.jpg" alt="">\
                            <p class="ita-panel__before-title">File name before</p>\
                        </a>\
                        <a href="#" class="ita-panel__after">\
                            <img class="ita-panel__after-img" src="content/img/3/3-2.jpg" alt="">\
                            <p class="ita-panel__after-title">File name after</p>\
                        </a>\
                    </li>\
                </ul>\
            </div>\
        </div>\
    ';

    document.getElementById("ita-1234").innerHTML = html;


});




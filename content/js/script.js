(function () {

    // console.log('Start!');

    var list = [
        {urlBefore: 'https://picsum.photos/300/?random', fileNameBefore: '1-1.jpg', urlAfter: 'https://picsum.photos/200/300/?random', fileNameAfter: '1-2.jpg'},
        {urlBefore: 'https://picsum.photos/300/?random', fileNameBefore: '2-1.jpg', urlAfter: 'https://picsum.photos/200/300/?random', fileNameAfter: '2-2.jpg'},
        {urlBefore: 'https://picsum.photos/300/?random', fileNameBefore: '3-1.jpg', urlAfter: 'https://picsum.photos/200/300/?random', fileNameAfter: '3-2.jpg'},
        {urlBefore: 'https://picsum.photos/300/?random', fileNameBefore: '4-1.jpg', urlAfter: 'https://picsum.photos/200/300/?random', fileNameAfter: '4-2.jpg'}
    ];

    // Start template
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
    ';

    // List item for template
    list.forEach(function (item, i, list) {
        
        html += '\
            <li class="ita-panel__item" >\
                <a href="#" class="ita-panel__before">\
                <img class="ita-panel__before-img" src="' + item.urlBefore + '" alt="">\
                <p class="ita-panel__before-title">' + item.fileNameBefore + '</p>\
            </a>\
            <a href="#" class="ita-panel__after">\
                <img class="ita-panel__after-img" src="' + item.urlAfter + '" alt="">\
                <p class="ita-panel__after-title">' + item.fileNameAfter + '</p>\
            </a>\
        </li>\
        ';

    });

    // End template
    html+= '\
                </ul >\
            </div >\
        </div >\
    ';

    document.getElementById("ita-1234").innerHTML = html;


})(this, this.document);




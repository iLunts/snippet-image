function ItaFunc(gallery_data){

    addCSS('https://ilunts.github.io/snippet-image/content/css/ita.min.css');

    // Include CSS file
    function addCSS(filename) {
        var head = document.getElementsByTagName('head')[0];

        var style = document.createElement('link');
        style.href = filename;
        style.type = 'text/css';
        style.rel = 'stylesheet';
        head.append(style);
    }
    
    this.gallery_data = gallery_data;

    // Array list
    let list = [
        {
            id: 1,
            fileNameBefore: "Arjun",
            urlBefore: 'https://picsum.photos/300/?random',
            fileNameAfter: "Arjun",
            urlAfter: 'https://picsum.photos/300/?random',

        },
        {
            id: 2,
            fileNameBefore: "Kalyan",
            urlBefore: 'https://picsum.photos/300/?random',
            fileNameAfter: "Bers Arjun",
            urlAfter: 'https://picsum.photos/300/?random',
        },
        {
            id: 3,
            fileNameBefore: "Raj",
            urlBefore: 'https://picsum.photos/300/?random',
            fileNameAfter: "Ghfj Arjun",
            urlAfter: 'https://picsum.photos/300/?random',
        },
        {
            id: 4,
            fileNameBefore: "Naveen",
            urlBefore: 'https://picsum.photos/300/?random',
            fileNameAfter: "SDfdsfsd Arjun",
            urlAfter: 'https://picsum.photos/300/?random',
        },
        {
            id: 5,
            fileNameBefore: "Pravinh",
            urlBefore: 'https://picsum.photos/300/?random',
            fileNameAfter: "Sd Arjun",
            urlAfter: 'https://picsum.photos/300/?random',
        },
        {
            id: 6,
            fileNameBefore: "Srinivas",
            urlBefore: 'https://picsum.photos/300/?random',
            fileNameAfter: "Arjun",
            urlAfter: 'https://picsum.photos/300/?random',
        },
        {
            id: 7,
            fileNameBefore: "Mahipal",
            urlBefore: 'https://picsum.photos/300/?random',
            fileNameAfter: "Sddttert Arjun",
            urlAfter: 'https://picsum.photos/300/?random',
        },
        {
            id: 8,
            fileNameBefore: "Sathish",
            urlBefore: 'https://picsum.photos/300/?random',
            fileNameAfter: "Arjun",
            urlAfter: 'https://picsum.photos/300/?random',
        },
        {
            id: 9,
            fileNameBefore: "Aravind",
            urlBefore: 'https://picsum.photos/300/?random',
            fileNameAfter: "Arjun",
            urlAfter: 'https://picsum.photos/300/?random',
        },
        {
            id: 10,
            fileNameBefore: "Phani",
            urlBefore: 'https://picsum.photos/300/?random',
            fileNameAfter: "Arjun",
            urlAfter: 'https://picsum.photos/300/?random',
        },
        {
            id: 11,
            fileNameBefore: "Krishna",
            urlBefore: 'https://picsum.photos/300/?random',
            fileNameAfter: "Arjun",
            urlAfter: 'https://picsum.photos/300/?random',
        },
        {
            id: 12,
            fileNameBefore: "Pradeep",
            urlBefore: 'https://picsum.photos/300/?random',
            fileNameAfter: "Arjun",
            urlAfter: 'https://picsum.photos/300/?random',
        },
        {
            id: 13,
            fileNameBefore: "Last",
            urlBefore: 'https://picsum.photos/300/?random',
            fileNameAfter: "Last",
            urlAfter: 'https://picsum.photos/300/?random',
        }
    ];

    /* * * * * * * * * * * * * * * * *
    * Gallery
    * * * * * * * * * * * * * * * * */
    var Gallery = {

        // Initialization gallery
        Init: function(data){

        }
    }

    /* * * * * * * * * * * * * * * * *
    * Pagination
    * * * * * * * * * * * * * * * * */

    var Pagination = {

        code: '',

        // --------------------
        // Utility
        // --------------------

        // converting initialize data
        Extend: function (data) {
            data = data || {};
            Pagination.size = data.size || gallery_data.gallery_items_per_page || 4;
            Pagination.page = data.page || 1;
            Pagination.step = data.step || 3;
        },

        // add pages by number (from [s] to [f])
        Add: function (s, f) {
            for (var i = s; i < f; i++) {
                Pagination.code += '<a>' + i + '</a>';
            }
        },

        // add last page with separator
        Last: function () {
            Pagination.code += '<i>...</i><a>' + Pagination.size + '</a>';
        },

        // add first page with separator
        First: function () {
            Pagination.code += '<a>1</a><i>...</i>';
        },

        // --------------------
        // Handlers
        // --------------------

        // change page
        Click: function () {
            Pagination.page = +this.innerHTML;
            Pagination.Start();

            Delete();
            CreateList();
        },

        // previous page
        Prev: function () {
            Pagination.page--;
            if (Pagination.page < 1) {
                Pagination.page = 1;
            }
            Pagination.Start();

            Delete();
            CreateList();

        },

        // next page
        Next: function () {
            Pagination.page++;
            if (Pagination.page > Pagination.size) {
                Pagination.page = Pagination.size;
            }

            Pagination.Start();

            Delete();
            CreateList();

        },



        // --------------------
        // Script
        // --------------------

        // binding pages
        Bind: function () {
            var a = Pagination.e.getElementsByTagName('a');
            for (var i = 0; i < a.length; i++) {
                if (+a[i].innerHTML === Pagination.page) a[i].className = 'current';
                a[i].addEventListener('click', Pagination.Click, false);
            }
        },

        // write pagination
        Finish: function () {
            Pagination.e.innerHTML = Pagination.code;
            Pagination.code = '';
            Pagination.Bind();
        },

        // find pagination type
        Start: function () {
            if (Pagination.size < Pagination.step * 2 + 6) {
                Pagination.Add(1, Pagination.size + 1);
            } else if (Pagination.page < Pagination.step * 2 + 1) {
                Pagination.Add(1, Pagination.step * 2 + 4);
                Pagination.Last();
            } else if (Pagination.page > Pagination.size - Pagination.step * 2) {
                Pagination.First();
                Pagination.Add(Pagination.size - Pagination.step * 2 - 2, Pagination.size + 1);
            } else {
                Pagination.First();
                Pagination.Add(Pagination.page - Pagination.step, Pagination.page + Pagination.step + 1);
                Pagination.Last();
            }
            Pagination.Finish();

        },



        // --------------------
        // Initialization
        // --------------------

        // binding buttons
        Buttons: function (e) {
            var nav = e.getElementsByTagName('a');
            nav[0].addEventListener('click', Pagination.Prev, false);
            nav[1].addEventListener('click', Pagination.Next, false);
        },

        // create skeleton
        Create: function (e) {

            var html = [
                '<a>&#9668;</a>', // previous button
                '<span></span>', // pagination container
                '<a>&#9658;</a>' // next button
            ];

            e.innerHTML = html.join('');
            Pagination.e = e.getElementsByTagName('span')[0];
            Pagination.Buttons(e);
        },

        // init
        Init: function (e, data) {
            Pagination.Extend(data);
            Pagination.Create(e);
            Pagination.Start();
        }
    };


    /* * * * * * * * * * * * * * * * *
    * Initialization
    * * * * * * * * * * * * * * * * */

    var init = function () {
        Pagination.Init(document.getElementById('ita-pagination'), {
            size: Math.ceil(list.length / gallery_data.gallery_items_per_page), // pages size
            page: 1, // selected page
            step: 3 // pages before and after current
        });
    };

    document.addEventListener('DOMContentLoaded', init, false);

    /* * * * * * * * * * * * * * * * *
    * Start template
    * * * * * * * * * * * * * * * * */

    function Paginator(items, page, per_page) {

        var page = page || Pagination.page || 1,
            per_page = per_page || gallery_data.gallery_items_per_page || 5,
            offset = (page - 1) * per_page,

            paginatedItems = items.slice(offset).slice(0, per_page),
            total_pages = Math.ceil(items.length / per_page);

        return {
            page: page,
            per_page: per_page,
            pre_page: page - 1 ? page - 1 : null,
            next_page: (total_pages > page) ? page + 1 : null,
            total: items.length,
            total_pages: total_pages,
            data: paginatedItems
        };
    }

    // Clear list elements
    function DeleteElements() {
        while (listEl.firstChild) {
            listEl.removeChild(listEl.firstChild);
        }
    }


    /* * * * * * * * * * * * * * * * *
    * Start template
    * * * * * * * * * * * * * * * * */

    var html = '\
        <div class="ita-panel">\
            <div class="ita-panel__controls">\
                <div class="ita-panel__controls-title">\
                    <a href="#" class="link">Gallery (' + list.length + ')</a>\
                </div>\
            </div>\
            <div class="ita-panel__body">\
                <ul id="js-list" class="ita-panel__list">\
        ';

    // ****************************************
    // List item for template
    // ****************************************
    Paginator(list, Pagination.page, Pagination.size).data.forEach(function (item, i, list) {
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

    // ****************************************
    // Pagination
    // ****************************************
    html += '\
        </ul >\
            </div >\
            <div class="ita-panel__footer">\
                <ul id="ita-pagination" class="ita-pagination">\
                </ul>\
            </div>\
        ';

    // ****************************************
    // End template
    // ****************************************
    html += '\
            </div >\
        ';

    // ****************************************
    // Insert HTML code
    // ****************************************
    var elem_panel = document.getElementById("ita");
    elem_panel.innerHTML = html;

    var elem_list = document.getElementById('js-list');

    // Create new list
    function CreateList() {
        var new_list = '';
        
        Paginator(list, Pagination.page, gallery_data.gallery_items_per_page).data.forEach(function (item) {
            new_list += '\
                <li class="ita-panel__item" >\
                    <a href="#" class="ita-panel__elem ita-panel__before">\
                        <img class="ita-panel__elem-img ita-panel__before-img" src="' + item.urlBefore + '" alt="">\
                        <p class="ita-panel__before-title">' + item.fileNameBefore + '</p>\
                    </a>\
                    <a href="#" class="ita-panel__elem ita-panel__after">\
                        <img class="ita-panel__elem-img ita-panel__after-img" src="' + item.urlAfter + '" alt="">\
                        <p class="ita-panel__after-title">' + item.fileNameAfter + '</p>\
                    </a>\
                </li>\
            ';
        });

        elem_list.innerHTML = new_list;
        elem_list.scrollTop;
    }

    // Delete list
    function Delete() {
        while (elem_list.firstChild) {
            elem_list.removeChild(elem_list.firstChild);
        }
    }


    // Styler gallery
    function StylerGallery(){
        console.log(gallery_data);

        var elem_panel = document.getElementsByClassName('ita-panel');
        
        // Panel width
        elem_panel[0].style.width = gallery_data.gallery_width + 'px';
        elem_panel[0].style.height = gallery_data.gallery_height + 'px';
        document.getElementsByClassName('ita-panel__body')[0].style.height = (gallery_data.gallery_height - 122) + 'px';
    }

    StylerGallery();    
}
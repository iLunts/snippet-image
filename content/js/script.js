function ItaFunc(gallery_data){

    var htmlResponse;
    var htmlList;
    var htmlListArray;
    var url = 'http://test42.haza.by/upload/images/estate/example/';
    var arrList = [];
    var Pagination;

    // var list = [];

    // Create the XHR object.
    function createCORSRequest(method, url) {
        var xhr = new XMLHttpRequest();
        if ("withCredentials" in xhr) {
            // XHR for Chrome/Firefox/Opera/Safari.
            xhr.open(method, url, true);
        } else if (typeof XDomainRequest != "undefined") {
            // XDomainRequest for IE.
            xhr = new XDomainRequest();
            xhr.open(method, url);
        } else {
            // CORS not supported.
            xhr = null;
        }
        return xhr;
    }

    // Make the actual CORS request.
    function makeCorsRequest() {

        var xhr = createCORSRequest('GET', url);
        if (!xhr) {
            alert('CORS not supported');
            return;
        }

        // Response handlers.
        xhr.onload = function () {
            var text = xhr.responseText;

            var parser = new DOMParser();
            var xmlDoc = parser.parseFromString(text, "text/xml");
            htmlList = xmlDoc.getElementsByTagName("a");
            // htmlListArray = Array.from(htmlList);

            arrList = [];
            for (var i = 1; i < htmlList.length - 1; i=i+2) {
                arrList.push({
                    id: i,
                    fileNameBefore: htmlList[i].childNodes[0].nodeValue,
                    urlBefore: url + htmlList[i].childNodes[0].nodeValue,
                    fileNameAfter: htmlList[i+1].childNodes[0].nodeValue,
                    urlAfter: url + htmlList[i + 1].childNodes[0].nodeValue,
                });
            }
            
            createTemplate();
        };

        xhr.onerror = function () {
            alert('Woops, there was an error making the request.');
        };

        // console.log(getList());
        xhr.send();
        
    }

    makeCorsRequest();


    // Added CSS on page
    addCSS('http://test42.haza.by/upload/images/estate/content/css/ita.min.css');

    // Include CSS file
    function addCSS(filename) {
        var head = document.getElementsByTagName('head')[0];

        var style = document.createElement('link');
        style.href = filename;
        style.type = 'text/css';
        style.rel = 'stylesheet';
        head.append(style);
    }
    
    // Init default value for gallery object
    var gallery_data;
    this.gallery_data = {
        gallery_id: gallery_data.gallery_id || 'ita',
        gallery_width: gallery_data.gallery_width || 300,
        gallery_height: gallery_data.gallery_height || 300,
        gallery_items_per_page: gallery_data.gallery_items_per_page || 3,
        gallery_show_item_name: gallery_data.gallery_show_item_name || true,
        gallery_title: gallery_data.gallery_title || 'Gallery',
    };

    function createPagination(){
        
        /* * * * * * * * * * * * * * * * *
        * Pagination
        * * * * * * * * * * * * * * * * */
    
        Pagination = {
    
            code: '',
    
            // --------------------
            // Utility
            // --------------------
    
            // converting initialize data
            Extend: function (data) {
                data = data || {};
                Pagination.size = data.size || 4;
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
                ScrollTopList();
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
                ScrollTopList();
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
                ScrollTopList();
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
    
        function init() {
            Pagination.Init(document.getElementById('ita-pagination'), {
                size: Math.ceil(arrList.length / gallery_data.gallery_items_per_page), // pages size
                page: 1, // selected page
                step: 1 // pages before and after current
            });
        };

        init();

        document.addEventListener('DOMContentLoaded', init, false);
    }



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

    function createTemplate(){
        
        var html = '\
            <div class="ita-panel">\
                <div class="ita-panel__controls">\
                    <div class="ita-panel__controls-title">\
                        <a href="#" class="link">' + this.gallery_data.gallery_title + ' (' + arrList.length + ')</a>\
                    </div>\
                </div>\
                <div id="js-body" class="ita-panel__body">\
                    <ul id="js-list" class="ita-panel__list">\
            ';
    
        // ****************************************
        // List item for template
        // ****************************************
        Paginator(arrList, 1, 5).data.forEach(function (item, i, list) {
        // Paginator(arrList, Pagination.page, Pagination.size).data.forEach(function (item, i, list) {
    
            if(this.gallery_data.gallery_show_item_name){
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
            }
            else{
                html += '\
                    <li class="ita-panel__item" >\
                        <a href="#" class="ita-panel__before">\
                        <img class="ita-panel__before-img" src="' + item.urlBefore + '" alt="">\
                    </a>\
                    <a href="#" class="ita-panel__after">\
                        <img class="ita-panel__after-img" src="' + item.urlAfter + '" alt="">\
                    </a>\
                </li>\
                ';
            }
    
        });
    
        // ****************************************
        // Pagination
        // ****************************************
        html += '\
            </ul>\
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
        var elem_panel = document.getElementById(this.gallery_data.gallery_id);
        elem_panel.innerHTML = html;
    
        var elem_list = document.getElementById('js-list');
        
        StylerGallery();
        createPagination();
    }


    // Create new list
    function CreateList() {
        var new_list = '';
        var elem_list = document.getElementById('js-list');

        
        Paginator(arrList, Pagination.page, this.gallery_data.gallery_items_per_page).data.forEach(function (item) {
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
    }

    // Delete list
    function Delete() {
        var elem_list = document.getElementById('js-list');

        while (elem_list.firstChild) {
            elem_list.removeChild(elem_list.firstChild);
        }
    }

    // Styler gallery
    function StylerGallery(){
        var elem_panel = document.getElementsByClassName('ita-panel');
        
        // Panel width
        elem_panel[0].style.width = this.gallery_data.gallery_width + 'px';
        elem_panel[0].style.height = this.gallery_data.gallery_height + 'px';
        document.getElementsByClassName('ita-panel__body')[0].style.height = (this.gallery_data.gallery_height - 122) + 'px';
    }
    
    // Scroll to top list container
    function ScrollTopList(){
        document.getElementById('js-body').scrollTop = 0;
    }
}
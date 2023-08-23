let tokens = {
    init: "html",       //BEGIN A DOCUMENT
    final: "endhtml",   //END A DOCUMENT

    head: "head",
    head_close: "endhead",

    body: "body",
    body_close: "endbody",

    div: "div",
    div_close: "enddiv",

    nav: "nav",
    nav_close: "endnav",

    a: "link",
    a_close: "endlink",

    p: "p",     h1: "h1",
    h2: "h2",   h3: "h3",
    h4: "h4",   h5: "h5",
    text: "text",
    title: "title",

    unlist: "unlist",   endunlist: "endunlist",
    orlist: "orlist",   endorlist: "endorlist",
    item: "item", enditem: "enditem",

    input: "input", img: 'img',
    label: "label", endlabel: "endlabel",

    form: "form",   endform: "endform",
    submit: 'submit',
    break: 'break',

    center: 'center',   endcenter: 'endcenter',
    video: 'video',     audio: 'audio',

    table: 'table',     endtable: 'endtable',
    row: 'row',         endrow: 'endrow',
    header: 'header',   data: 'data',

    section: 'section', endsection: 'endsection',
    

    import: "@import",

    content_key: "content=",
    class_key: "class=",
    type_key: "type=",
    href_key: "href=",
    src_key: "src=",
    action_key: "action=",
    method_key: "method=",
    id_key: '()',    //ID FIRST AND LAST CHARACTERS

    undefined_value_input: 'undef'
}


module.exports = { tokens }
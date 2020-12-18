{{#list}}
    {{#isActive}}
    <li class="side-item active">
    {{/isActive}}
    {{^isActive}}
    <li class="side-item">
    {{/isActive}}
        <a class="link" href="{{link}}"><i class="{{icon}}"></i>{{desc}}</a>
    </li>
{{/list}}
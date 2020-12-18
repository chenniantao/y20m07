<div class="panel">
    <h2 class="panel-header">送货地址 <a class="btn shipping-add" href="javascript:;">添加新地址</a></h2> 
    <div class="pandel-body">
        {{#shippings}}
        {{#active}}
        <div class="shipping-item active" data-shipping-id="{{_id}}">
        {{/active}}
        {{^active}}
        <div class="shipping-item" data-shipping-id="{{_id}}">
        {{/active}}
            <span class="shipping-title">{{phone}}({{name}})</span>
            <span class="shipping-detail">
                {{province}} {{city}} {{county}} {{address}}
            </span>
            <span class="shipping-footer">
                <span class="link shipping-edit">编辑</span>
                <span class="link shipping-delete">删除</span>
            </span>
        </div>
        {{/shippings}}                     
    </div>
</div>
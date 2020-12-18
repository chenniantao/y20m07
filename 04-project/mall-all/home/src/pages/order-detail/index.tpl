<div class="panel">
    <h2 class="panel-header">订单信息</h2>
    <div class="pandel-body">
        <ul class="order-info">
            <li class="order-no">
                <span class="lable">订单号:</span>
                <span class="text">{{orderNo}}</span>
            </li>
            <li class="order-create-time">
                <span class="lable">创建时间:</span>
                <span class="text">{{createdTime}}</span>
            </li>
            <li class="order-shipping-name">
                <span class="lable">收件人:</span>
                <span class="text">{{shipping.name}}({{shipping.phone}})</span>
            </li>
            <li class="order-shipping-address">
                <span class="lable">收件地址:</span>
                <span class="text">{{shipping.province}}{{shipping.city}}{{shipping.county}}{{shipping.address}}(邮编:{{shipping.zip}})</span>
            </li>   
            <li class="order-status">
                <span class="lable">订单状态:</span>
                <span class="text">{{statusDesc}}</span>
            </li>                   
            <li class="order-payment">
                <span class="lable">订单金额:</span>
                <span class="text product-price">{{payment}}</span>
            </li>
            <li class="order-payment-type">
                <span class="lable">支付方式:</span>
                <span class="text">{{paymentTypeDesc}}</span>
            </li>
            <li class="order-opreation">
                {{#canPay}}
                <a href="javascript:;" data-order-no="{{orderNo}}" class="btn btn-pay">去支付</a>
                {{/canPay}}
                {{#canCancel}}
                <a href="javascript:;" data-order-no="{{orderNo}}" class="btn btn-cancel">取消</a>
                {{/canCancel}}
                {{#canDone}}
                <a href="javascript:;" data-order-no="{{orderNo}}" class="btn btn-done">确认收货</a>
                {{/canDone}}                
            </li>                                               
        </ul>
    </div>
</div>
<div class="panel">
    <h2 class="panel-header">物流信息</h2>
    <div class="pandel-body">
        <div class="expressName">
            {{#expressName}}
            <span class="expressName-title">物流公司:</span><span class="expressName-txt">{{expressName}}</span>
            <span class="expressName-title">运单号码:</span><span class="expressName-txt">{{expressNo}}</span>
            {{/expressName}}
        </div>
        <p class="expressErrMsg">{{expressErrMsg}}</p>
        <ul class="deliver-wrap">
            {{#expressData}}
                <li class="deliver-item">{{time}}-{{context}}</li>
            {{/expressData}}
        </ul>
    </div>
</div>
<div class="panel">
    <h2 class="panel-header">商品列表</h2>
    <div class="pandel-body">
        <ul class="product-title clearfix">
            <li class="product-info">
                商品
            </li>
            <li class="product-price-title">
                单价
            </li>
            <li class="product-count">
                数量
            </li>
            <li class="product-totalPrice-title">
                小计
            </li>
        </ul>
            {{#productList}}
            <ul class="product-item">
                <li class="product-info text-ellipsis">
                    <a href="./detail.html?productId={{productId}}" class="link" target="_blank">
                        <img src="{{mainImage}}" alt="{{name}}">
                        <span>{{name}}</span>
                    </a>
                </li>
                <li class="product-price-txt">
                    {{price}}
                </li>
                <li class="product-count">
                    {{count}}
                </li>
                <li class="product-totalPrice-txt">
                    {{totalPrice}}
                </li>   
            </ul>
            {{/productList}}
    </div>
</div>

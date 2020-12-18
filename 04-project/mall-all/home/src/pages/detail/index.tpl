<div class="product-intro clearfix">
    <div class="product-img-box">
        <div class="product-main-img">
            <img src="{{activeImage}}"  alt="" />
            <span class="mask"></span>
        </div>
        <ul class="product-small-img-list clearfix">
            {{#images}}
            <li class="product-small-img-item">
                <img src="{{.}}" alt="" />
            </li>
            {{/images}}
        </ul>
        <div class="product-large-box">
            <img src="{{activeImage}}" alt="">
        </div>        
    </div>
    <div class="product-info">
        <h2 class="product-name">{{name}}</h2>
        <p class="product-description">{{description}}</p>
        <div class="product-info-item">
            <span class="label">价格:</span>
            <span class="info product-price">{{price}}</span>
        </div>
        <div class="product-info-item">
            <span class="label">库存:</span>
            <span class="info">{{stock}}</span>
        </div>
        {{#attrsList}}
        <div class="product-info-item">
            <span class="label attr-key">{{key}}:</span>
            <span class="info">
                {{#values}}
                <span class="attr-val-item">{{.}}</span>
                {{/values}}
            </span>
        </div>        
        {{/attrsList}}
        <div class="product-info-item product-count">
            <span class="label">数量:</span>
            <input type="text" value="1" class="count-input" readonly />
            <span class="count-btn plus">+</span>
            <span class="count-btn minus">-</span>
        </div>
        <div class="add-cart">
            <a href="javascript:;" class="btn add-cart-btn">添加购物车</a>
        </div>                                                  
    </div>
</div>
<div class="product-detail">
    <div class="tab">
        <ul class="tab-list clearfix">
            <li class="tab-item active">商品详情</li>
        </ul>
        <div class="tab-content">
            {{{detail}}}
        </div>
    </div>
</div>
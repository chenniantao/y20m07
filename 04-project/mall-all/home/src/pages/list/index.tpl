<ul class="clearfix product-list">
    {{#list}}
    <li class="product-item col-1 col-gap">
        <a href="./detail.html?productId={{_id}}"target="_blank">
            <img class="product-img" src="{{mainImage}}" alt="{{name}}">
            <p class="product-name">{{name}}</p>
            <p class="product-price-paynums">
                <span class="product-price">{{price}}</span>
                <span class="paynums">{{payNums}}人已购买</span>
            </p>
        </a>
    </li>
    {{/list}}
</ul>
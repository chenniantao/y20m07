{{#floors}}
<div class="floor-box">
    <a href="./list.html?categoryId={{id}}" class="link"><h2 class="floor-title">F{{num}} {{title}}</h2></a>
    <ul class="floor-list product-list clearfix">
        {{#products}}
        <li class="product-item col-1 col-gap">
            <a href="./detail.html?productId={{_id}}">
                <img class="product-img" src="{{mainImage}}" alt="{{name}}" />
                <p class="product-name">{{name}}</p>
                <p class="product-price-paynums">
                    <span class="product-price">{{price}}</span>
                    <span class="paynums">{{payNums}}人已购买</span>
                </p>
            </a>
        </li>
        {{/products}}
    </ul>
</div>
{{/floors}}
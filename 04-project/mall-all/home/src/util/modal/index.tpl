<div class="modal-wrap close-modal">
    <div class="modal-container">
        <div class="modal-body">
            <p class="msg-box">
                {{#isError}}
                <i class="error-icon icon fa fa-exclamation-circle"></i>
                {{/isError}}
                {{#isSuccess}}
                <i class="success-icon icon fa fa-check-circle"></i>
                {{/isSuccess}}
                {{#isConfirm}}
                <i class="success-icon icon fa fa-question-circle"></i>
                {{/isConfirm}}                                   
                <span class="msg">{{msg}}</span>
            </p>
            {{#isConfirm}}
            <p class="btns"><a class="btn btn-cancel close-modal" href="javascript:;">取消</a><a class="btn confirm-modal" href="javascript:;">确定</a></p>
            {{/isConfirm}}
            {{^isConfirm}}
            <p class="btns"><a class="btn close-modal" href="javascript:;">我知道了</a></p>
            {{/isConfirm}}              
        </div>
    </div>
</div>
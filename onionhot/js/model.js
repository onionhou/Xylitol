//获取 图片原始尺寸
(function($){
    var
    props = ['Width', 'Height'],
    prop;

    while (prop = props.pop()) {
    (function (natural, prop) {
      $.fn[natural] = (natural in new Image()) ? 
      function () {
      return this[0][natural];
      } : 
      function () {
      var 
      node = this[0],
      img,
      value;

      if (node.tagName.toLowerCase() === 'img') {
        img = new Image();
        img.src = node.src,
        value = img[prop];
      }
      return value;
      };
    }('natural' + prop, prop.toLowerCase()));
    }
  }(jQuery));


//点赞
var giveLike = function(){

    $('.youth-item').on('click','.like i',function(e){
        var othis = $(this);
        var id = $(othis).parents('.youth-item-sign').attr('data-id');
        var data = {
            'id': id
        }
        var cls = $(othis).attr('class');
        var n = parseInt($(othis).parent('a').parent('li').text());
        switch(cls){
            case 'iconfont icon-like':
            n+=1;
            sendRequest('get',caseLike,data,function(res){
                if(res.code == 1){
                    console.log(n)
                    $(othis).parent('a').parent('li').html('<a href="javascript:;"><i class="iconfont icon-like1"></i>'+n+'</a>');
                }
            },function(x){})
            break;
            case 'iconfont icon-like1':
            n-=1;
            sendRequest('get',caseLike,data,function(res){
                if(res.code == 1){
                    $(othis).parent('a').parent('li').html('<a href="javascript:;"><i class="iconfont icon-like"></i>'+n+'</a>');
                }
            },function(x){})
            break;
        }
    })
}


var waterfall = function(options){}
 ,ELEM_MORE = 'layui-flow-more'
  ,ELEM_LOAD = '<i class="layui-anim layui-anim-rotate layui-anim-loop layui-icon ">&#xe63e;</i>';

  //主方法
  Flow.prototype.load = function(options){
    var that = this, page = 0, lock, isOver, lazyimg, timer;
    options = options || {};
    
    var elem = $(options.elem); if(!elem[0]) return;
    var scrollElem = $(options.scrollElem || document); //滚动条所在元素
    var mb = options.mb || 50; //与底部的临界距离
    var isAuto = 'isAuto' in options ? options.isAuto : true; //是否自动滚动加载
    var end = options.end || '没有更多了'; //“末页”显示文案
    
    //滚动条所在元素是否为document
    var notDocment = options.scrollElem && options.scrollElem !== document;
    
    //加载更多                                                                                                                             
    var ELEM_TEXT = '<cite>加载更多</cite>'
    ,more = $('<div class="layui-flow-more"><a href="javascript:;">'+ ELEM_TEXT +'</a></div>');
    
    if(!elem.find('.layui-flow-more')[0]){
      elem.append(more);
    }
    
    //加载下一个元素
    var next = function(html, over){ 
      html = $(html);
      more.before(html);
      over = over == 0 ? true : null;
      over ? more.html(end) : more.find('a').html(ELEM_TEXT);
      isOver = over;
      lock = null;
      lazyimg && lazyimg();
    };
    
    //触发请求
    var done = function(){
      lock = true;
      more.find('a').html(ELEM_LOAD);
      typeof options.done === 'function' && options.done(++page, next);
    };
    
    done();
    
    //不自动滚动加载
    more.find('a').on('click', function(){
      var othis = $(this);
      if(isOver) return;
      lock || done();
    });
    
    //如果允许图片懒加载
    if(options.isLazyimg){
      var lazyimg = that.lazyimg({
        elem: options.elem + ' img'
        ,scrollElem: options.scrollElem
      });
    }
    
    if(!isAuto) return that;
    
    scrollElem.on('scroll', function(){
      var othis = $(this), top = othis.scrollTop();
      
      if(timer) clearTimeout(timer);
      if(isOver) return;
      
      timer = setTimeout(function(){
        //计算滚动所在容器的可视高度
        var height = notDocment ? othis.height() : $(window).height();
        
        //计算滚动所在容器的实际高度
        var scrollHeight = notDocment
          ? othis.prop('scrollHeight')
        : document.documentElement.scrollHeight;

        //临界点
        if(scrollHeight - top - height <= mb){
          lock || done();
        }
      }, 100);
    });
    return that;
}
    
var topoUploadPage = function(){

            //风格
            var dataStyle = {
                layout: 0, //户型
                style: 0, //风格
                budget: 0, //价格
                func: 0, //空间
                page: 1
            };
            var scrollFlag = true;
            //获取风格


            //页面渲染
            var renderer = function(){
                sendRequest('get',caseTop,dataStyle,function(res){
                    if(scrollFlag){
                        console.log(res);
                        var data = res.data;
                        var pages = Math.ceil(parseInt(res.count)/16);
                        var html = '';
                        var left = 0;
                        $.each(data,function(index,value){
                            if(left >= 1200){
                                left = 0;
                            }
                            
                            if(value.thumb == ''){
                                html += '<div class="youth-item" data-id="'+value.id+'" data-url="null" style="left:'+left+'px;">';
                                html += '<a href="'+value.url+'" style="display:block;width:285px;height:200px;"><img src="'+value.thumb+'" class="youth-timg" alt="评装网-家装区"></a>';
                            }else{
                                html += '<div class="youth-item" data-id="'+value.id+'" style="left:'+left+'px;">';
                                html += '<a href="'+value.url+'"><img src="'+value.thumb+'" class="youth-timg" alt="评装网-家装区"></a>';
                            }
                            html += '<p class="youth-item-title">'+value.layout+' | '+value.style+' | '+value.budget+'</p>';
                            html += '<div class="youth-item-info">';
                            html += '<img src="'+value.face+'" alt="评装网-头像" class="info-face">';
                            html += '<div class="info-name">';
                            html += '<p>'+value.alias+'</p>';
                            html += '</div>';
                            html += '<div class="clearboth"></div>'
                            html += '</div>';
                            html += '<a href="javascript:;" class="link-like"><i class="iconfont icon-like1 lcred"></i></a>';
                            html += '</div>';

                            left += 305;

                        })

                        //执行下一页渲染，第二参数为：满足“加载更多”的条件，即后面仍有分页
                        //pages为Ajax返回的总页数，只有当前页小于总页数的情况下，才会继续出现加载更多
                        $('.youth-main').append(html);

                        //如果图片 加载失败  设置默认图片
                        //存在问题 当图片还未完成加载，获取的图片宽度皆为0;
                        var onloadImgError = function(){ 
                            function  getNaturalSize(img){
                                var naturalSize ={};
                                if(window.naturalWidth && window.naturalHeight){
                                    naturalSize.width = img.width;
                                        naturalSize.height = img.height;
                                }else{
                                    var image = new Image();
                                    image.src = img.src;
                                    naturalSize.width = image.width;
                                    naturalSize.height = image.height;
                                }
                                return naturalSize;
                            }

                            $('.youth-timg').each(function(){
                                var nWidth = $(this).naturalWidth();
                                if(nWidth == 0 || typeof nWidth == "undefined"){
                                   // $(this).attr({'src':'public/images/mdsg1.jpg'});
                                }

                                var w = getNaturalSize($(this)[0]).width;

                                if(w == 0 || typeof w == "undefined"){
                                    $(this).attr({'src':'public/images/mdsg1.jpg'});
                                }
                            });
                        }


                        setTimeout(function(){  
                            $('.youth-main .youth-item').each(function(index){
                                var top = 0;
                                var topIndex = index-4;
                                var myTop = 0;

                                if(index>=4){
                                    var topIndexItem = $('.youth-main .youth-item').eq(topIndex);
                                    myTop = topIndexItem.height()+topIndexItem.position().top+20+'px';
                                    $(this).css({"top": myTop});
                                }else{
                                    $(this).css({"top": "0px"});
                                }
                            })

                            //获取最后排 top值最大的层
                            var endDivTop = [];
                            var endDivH = [];

                            var len = $('.youth-main .youth-item').length;
                            var numb = len%4; //最后一排 层的个数
                            if(numb == 0) numb = 4;
                            
                            for(var i=0;i<numb;i++){
                                endDivTop.push($('.youth-main .youth-item').eq((len-1-i)).position().top);
                                endDivH.push($('.youth-main .youth-item').eq((len-1-i)).height());
                            } 

                            endDivTop.sort(function(a,b){return a-b});
                            endDivH.sort(function(a,b){return a-b});

                            $('.youth-main').height((endDivTop[endDivTop.length-1]+endDivH[endDivH.length-1]+100));

                            if(dataStyle.page < pages){
                                if($('.load_more').length == 0){
                                    $('.youth-main').append('<div class="load_more"><em></em></div>');
                                }
                            }else{
                                scrollFlag = false;
                            }
                        },1000)
                            
                    }
                },function(x){})
            }
            renderer();

            //滚动加载
            var rollUpload = function(){
                var page = 2;
                $(document).scroll(function(){
                    var scroH = $(document).scrollTop();  //滚动高度
                    var viewH = $(window).height();  //可见高度
                    var contentH = $(document).height();  //内容高度

                    if(contentH == (scroH + viewH) && scrollFlag){  //滚动条滑到底部啦
                        dataStyle.page = page;
                        renderer();
                        page++;
                    } 
                })
            }
            rollUpload();  

            //导航点击事件
            var navLick = function(){
                var setNavShow = function(_this,className){
                    $('.'+className+' a').removeClass('style-show');
                    $(_this).addClass('style-show');
                    $('.youth-main').html('');
                    scrollFlag = true;
                    renderer();
                }

                $('.nst-style a').click(function(e){
                    dataStyle.style = $(this).attr('data-style');
                    setNavShow($(this),'nst-style');
                })
                $('.nst-house a').click(function(e){
                    dataStyle.layout = $(this).attr('data-style');
                    setNavShow($(this),'nst-house');
                })
                $('.nst-space a').click(function(e){
                    dataStyle.func = $(this).attr('data-style');
                    setNavShow($(this),'nst-space');
                })
                $('.nst-price a').click(function(e){
                    dataStyle.budget = $(this).attr('data-style');
                    setNavShow($(this),'nst-price');
                })

            }
            navLick();

    }
    topoUploadPage();   


//url 参数
var combat = function(){
    var parmJson ={};
    var parms = [],
        url = location.search || '';
        url = url.substr(1)；
    if(url != ''){
      parms = url.split('&');
      $.each(parms,function(index,value){
          var vl = value.split('=');
          parmJson[vl[0]] = vl[1];

      })
    }

    return parmJson;
}

function help(){
    //相互转换
    var $v =$("#v") ; //jQuery对象 
    var v=$v[0]; //js对象 
}
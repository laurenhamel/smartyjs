(function($){
    
    $.hash = function(options){
        
        var defaults = {
                targets: false,
                files: [],
                tags: []
            },
            settings = $.extend(defaults,options);
        
        settings.tags.forEach(function(t,i){
            settings.tags[i] = t.replace(' ','');
        });
        
        $.hash.files = settings.files;
        $.hash.tags = settings.tags;
        $.hash.targets = settings.targets;
        
        $.hash.get = function(){
            return window.location.hash;
        };
        
        $.hash.set = function(tag){
            return window.location.hash = '#' + tag;
        };
        
        $.hash.mod = function(arr){
            
            var _hashes = '';
            
            window.location.hash = '#!';
            
            arr.forEach(function(_hash,i){
                _hashes += '#' + _hash;
            });
            
            window.location.hash = _hashes;
            
            return false;
            
        };
        
        $.hash.add = function(tag){
            
            var _hash = window.location.hash.split('#').filter(function(h){
                    return h !== undefined && h !== '' && h !== null;
                }),
                _chain = '';
            
            if(_hash.length > 2)
                _hash.forEach(function(_h,i){
                    if(i > 0) _hash.splice(i,1);
                });
            
            _hash[1] = tag;
            
            $.hash.mod(_hash);
                
            return false;
            
        };
        
        $.hash.able = function(){
            
            var $hashables = $('a[href^="#"]');

            $hashables.each(function(h){
                
                var _hash = $(this).attr('href'),
                    _tag = _hash.replace('#','');

                $(this).on('click',function(event){
                    
                    // prevent default
                    event.preventDefault();

                    $.hash.add(_tag);

                    $.hash.scroll(_hash);
                    
                    return false;

                });

            });
            
            return false;
            
        };
        
        $.hash.scroll = function(target,options){
          
            var defaults = {
                    speed: 'slow'
                }, 
                settings = $.extend(defaults,options),
                position = $(target).offset().top;
          
            $('html,body').animate({
                scrollTop: position
            },settings.speed);
            
            return false;
            
        };
        
        $.hash.nav = function(hash){
            
            var tags = hash.split('#').filter(function(h){
                    return h !== undefined && h !== '' && h !== null;
                }),
                index = $.hash.tags.indexOf(tags[0]),
                file = $.hash.files[index],
                config = {
                    exchange: $.exchange.config(),
                    include: $.include.config()
                },
                attributes = [
                    config.include.attribute,
                    'data-' + config.include.attribute
                ],
                target;
                                    
            if($.isArray($.hash.targets)){
                if($.hash.targets.length == $.hash.tags.length){
                    target = $.hash.targets[index];
                } else {
                    target = $.hash.targets[0];
                }
            } else {
                target = $.hash.targets;
            }
                                    
            var $target = $(target),
                _attr = $target[0].hasAttribute(attributes[0]) ? 0 : 1;
            
            if(index > -1){
                
                $.ajax({
                    url: file,
                    success: function(HTML){

                        if(config.exchange.transition){

                            $target.fadeOut(config.exchange.speed,function(){

                                $target.html(HTML)
                                        .fadeIn(config.exchange.speed,function(){
                                    
                                            $.hash.able();
                                    
                                            while(tags.length > 1){
                                                
                                                var _id = '#' + tags[tags.length - 1];
                                          
                                                if($(_id).length > 0){
                                                    
                                                    $.hash.scroll(_id)
                                                    
                                                    tags.length = 0;
                                                    
                                                } else {
                                                    
                                                    tags.pop();
                                                    
                                                    $.hash.mod(tags);
                                                    
                                                }
                                                
                                            } 
                                    
                                        });

                            });

                        } else {

                            $target.html(HTML);
                            
                            $.hash.able();
                            
                            while(tags.length > 1){
                                                
                                var _id = '#' + tags[tags.length - 1];

                                if($(_id).length > 0){

                                    $.hash.scroll(_id)

                                    tags.length = 0;

                                } else {

                                    tags.pop();

                                    $.hash.mod(tags);

                                }

                            }  

                        }

                        $target.attr(attributes[_attr],file);
                        

                    }
                });
                
                var _xttribute = [
                        config.exchange.with,
                        'data-' + config.exchange.with
                    ];
                
                var $nav = $('nav'),
                    $active = $nav.find('[' + _xttribute[0] + '="' + file + '"],' +
                                '[' + _xttribute[1] + '="' + file + '"]');
                
                if($active.length > 0){
                    
                    $active.addClass('active');
                    
                }
                
                
            } else {
                
                $.include({
                    hashing: false
                });
                
            }
            
        };
        
    };
    
    $.include = function(options){ 
        
        var defaults = {
                attribute: 'include-file',
                replace: false,
                transition: true,
                speed: 0.25 * 1000,
                hashing: true
            },  
            settings = $.extend(defaults,options),
            attributes = [
                settings.attribute,
                'data-' + settings.attribute
            ];
        
        $(document).ready(function(){
            
            var hash = $.hash.get();
            
            if(hash === '' || hash === null) hash = undefined;
         
            // include from preset
            if(!settings.hashing || 
               (settings.hashing && 
                (hash === undefined || $.hash.targets === false))){
        
                var $includes = $('[' + attributes[0] + '],' +
                                  '[' + attributes[1] + ']'); 

                $includes.each(function(i){

                    var $include = $(this);

                    var file =  $include.attr(attributes[0]) || 
                                $include.attr(attributes[1]);

                    $.ajax({
                        url: file,
                        success: function(HTML){

                            if(settings.replace){

                                if(settings.transition){

                                    $include.fadeOut(settings.speed,function(){

                                        $include.replaceWith(HTML)
                                                .fadeIn(settings.speed);

                                    });

                                } else {

                                    $include.replaceWith(HTML);

                                }

                            } else {

                                if(settings.transition){

                                    $include.fadeOut(settings.speed, function(){

                                        $include.html(HTML)
                                                .fadeIn(settings.speed,function(){
                                                    $.hash.able();
                                                });

                                    });

                                } else {

                                    $include.html(HTML);
                                    
                                    $.hash.able();

                                }

                            }

                        }
                    });

                    if($.hash.files.length > 0){

                        var _index = $.hash.files.indexOf(file);

                        if(_index > -1) $.hash.set($.hash.tags[_index]);

                    } 
                    
                    var _xttribute = [
                        $.exchange.config().with,
                        'data-' + $.exchange.config().with
                    ];
                
                    var $nav = $include.closest(':has(nav)').find('nav'),
                        $active = $nav.find('[' + _xttribute[0] + '="' + file + '"],' +
                                '[' + _xttribute[1] + '="' + file + '"]');
                    
                    $active.addClass('active');

                });
                
            } 
            
            // include from hash
            else {
                
                $.hash.nav(hash);
                
            }
            
        });
        
        $.include.config = function(){
            return settings;
        }
        
        return false;
        
    };
            
    $.exchange = function(options){ 

        var defaults = {
                this: 'exchange-target',
                with: 'exchange-file',
                attribute: $.include.config().attribute,
                event: 'click',
                transition: true,
                speed: 0.25 * 1000
            },  
            settings = $.extend(defaults,options),
            targets = [
                settings.this,
                'data-' + settings.this
            ],
            files = [
                settings.with,
                'data-' + settings.with
            ],
            attributes = [
                settings.attribute,
                'data-' + settings.attribute
            ];
        
        $(document).ready(function(){
            
            var $exchanges = $('[' + files[0] + '],' +
                               '[' + files[1] + ']');
           
            $exchanges.each(function(e){
            
                if(this.hasAttribute(targets[0]) || this.hasAttribute(targets[1])){
                
                    var $exchange = $(this);
                    
                    var file =  $exchange.attr(files[0]) ||
                                $exchange.attr(files[1]);
                    
                    var target = $exchange.attr(targets[0]) ||
                                 $exchange.attr(targets[1]);
                    
                    var $target = $(target);
                    
                    $exchange.on(settings.event,function(){
                        
                        var _attr = $target[0].hasAttribute(attributes[0]) ? 0 : 1;
                        
                        var _file = $target.attr(attributes[_attr]);
                       
                        if(_file !== file){
                        
                            $.ajax({
                                url: file,
                                success: function(HTML){

                                    if(settings.transition){

                                        $target.fadeOut(settings.speed,function(){

                                            $target.html(HTML)
                                                   .fadeIn(settings.speed,
                                                           function(){
                                                                $.hash.able();
                                                            });

                                        });

                                    } else {

                                        $target.html(HTML);
                                        
                                        $.hash.able();

                                    }
                                    
                                    $target.attr(attributes[_attr],file);

                                }

                            });
                            
                            $('nav').find('.active').removeClass('active');
                            
                            $(this).addClass('active');
                            
                        }
                        
                        if($.hash.files.length > 0){
                    
                            var _index = $.hash.files.indexOf(file);

                            if(_index > -1) $.hash.set($.hash.tags[_index]);

                        }
                        
                    });
                    
                }
                
            });
            
        });
        
        $.exchange.config = function(){
            return settings;
        };
        
        return false;

    };
    
}(jQuery));
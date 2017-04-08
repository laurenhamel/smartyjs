$(function(){
    
    (function(){
        
        $.isset = function(value){
            return value !== undefined && value !== null && value != '';
        };
        
        $.isTrue = function(bool){
            return bool === true || bool == 'true';
        }
        
    }(jQuery));
    
    $.docs = {
        
        init: function(){
            
            // Load includes
            this.includes();
            
        },
        
        includes: function(options){
            
            // Settings
            var settings = $.extend({
                attribute: 'data-include',
                replace: 'data-replace'
            },options);
            
            // Find all includes
            var $includes = $('[' + settings.attribute + ']');
        
            // Loop
            $includes.each(function(i){
                
                // Capture the element
                var $target = $(this);
                
                // Capture the file to include
                var url = $target.attr(settings.attribute);
    
                // Capture the replace settings
                var replace = $.isTrue(
                    ($.isset($target.attr(settings.replace)) ?
                        $target.attr(settings.replace) : false)
                );
   
                // Load the file data
                $.get(url,function(data){
                    
                    // Insert in place
                    if(replace){

                        // Read file and load it
                        $target.replaceWith(data);

                    }

                    // Insert as a child
                    else {

                        $target.html(data);

                    }
                    
                });
                
            });
            
        }
    
    };
    
    // Initialize
    $.docs.init();
    
});
$(function(){
    
    (function(){
        
        $.isset = function(value){
            return value !== undefined && value !== null && value != '';
        };
        
    }(jQuery));
    
    $.smartyjs.docs = {
        
        init: function(){
            
            // Load includes
            this.includes();
            
        },
        
        include: function(options){
            
            // Settings
            var settings = $.extend({
                attribute: 'data-include',
                replace: false
            },options);
            
            // Find all includes
            var $includes = $(settings.attribute);
            
            // Loop
            $includes.each(function(i){
                
                // Capture the file to include
                var url = $(this).attr(settings.attribute);
                
                // Load the file data
                var data = $.get(url,function(data){
                    return data;
                });
                
                // Go next if invalid files
                if(!$.isset(data)) return true;
                
                // Insert in place
                if(settings.replace){
                    
                    // Read file and load it
                    $(this).replaceWith(data);
                    
                }
                
                // Insert as a child
                else {
                    
                    $(this).append(data);
                    
                }
                
            });
            
        }
    
    };
    
});
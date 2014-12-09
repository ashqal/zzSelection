// JavaScript Document

(function ($) {
	if (typeof window.console == "undefined") {
		window.console = {log: function( param ) {
			//$('#aconsole').html( $('#aconsole').html() + '</br>' + param );	
		}};
	}
	//params{click2tick:true,OnHide:...,OnShow:.....};
    $.ZZDropdown = function ( obj , params ) {
        if( obj == "undefined" || obj == null )
		{
			alert("obj can't be null");	
		}
		
		if( params == null )
		{
			params = {click2tick:false,OnShow:defaultShow,OnHide:defaultHide};
		}
		else
		{
			if( params.click2tick == null ) 	params.click2tick = false;
			if( params.OnShow == null ) 	params.OnShow = defaultShow;
			if( params.OnHide == null ) 	params.OnHide = defaultHide;
		}
		
		var STATUS_EUMN = 
		{
			STATUS_SHOW:0,
			STATUS_HIDE:1
		};
		var currentStatus = STATUS_EUMN.STATUS_SHOW;
		var nextStatus = STATUS_EUMN.STATUS_HIDE;
		
	
		var button = $(obj);
		var id  =  "#" +  button.attr("data-target") ;
		var target = $ ( id );
		//alert( id );
		
		if( params.click2tick )
		{
			$(button).click( onTick );
		}
		else
		{
			$(button).mouseover( onTick );
		}
		
		function onTick(){
			console.log('button click');
			//$(sel_list).focus();
			//showSelection();
			nextStatus = STATUS_EUMN.STATUS_SHOW;
			commitStatus();
		}
		
		$(button).mouseover(function(){
			if( currentStatus == STATUS_EUMN.STATUS_SHOW )
			{
				nextStatus = STATUS_EUMN.STATUS_SHOW;
				delayExcuteStatus();
			}
			
		});
		$(button).mouseout(function(){
			nextStatus = STATUS_EUMN.STATUS_HIDE;
			delayExcuteStatus();
		});
		$(target).mouseout(function(){
			nextStatus = STATUS_EUMN.STATUS_HIDE;
			delayExcuteStatus();
		});
		
		$(target).mouseover(function(){
			nextStatus = STATUS_EUMN.STATUS_SHOW;
			delayExcuteStatus();
		});
		
		function delayExcuteStatus()
		{
			$( button ).stopTime();
			$( button ).oneTime('0.2s' , commitStatus);
		}
		function commitStatus()
		{
			console.log('commitStatus:' +  nextStatus);
			if( currentStatus != nextStatus )
			{
				currentStatus = nextStatus;
				switch( currentStatus )
				{
					case STATUS_EUMN.STATUS_SHOW:
						showAction();
						break;
					case STATUS_EUMN.STATUS_HIDE:
						hideAction();
						break;
				}
			}	
		}
		function showAction()
		{
			params.OnShow( $(target) );	
		}
		function hideAction( )
		{
			params.OnHide( $(target) );
		}
		function defaultShow()
		{
			$(target).show();
		}
		function defaultHide()
		{
			$(target).hide();
		}
		
		
		function cancel(){
			nextStatus = STATUS_EUMN.STATUS_HIDE;
			commitStatus();
		}
		
		cancel();
		
		return {
			cancel:cancel
		};
    };
	$.fn.extend({
		zzDropdown:function( params ){
			var instance = new $.ZZDropdown( $(this), params );
			return instance;
		}
	});
	
})(jQuery);




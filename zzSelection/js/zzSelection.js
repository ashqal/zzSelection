// JavaScript Document
// version - 1.0
$(function(){
	$.fn.zzSelection();
});
$.fn.zzSelection = function(){
	var STATUS_EUMN = 
	{
		STATUS_SHOW:0,
		STATUS_HIDE:1
	};
	var currentStatus = STATUS_EUMN.STATUS_HIDE;
	var nextStatus = STATUS_EUMN.STATUS_HIDE;
	if (typeof window.console == "undefined") {
		window.console = {log: function( param ) {
			//$('#aconsole').html( $('#aconsole').html() + '</br>' + param );	
		}};
	}
	
	
	$('select[class="zzSelection"]').each(function(){
		var sel_select = $(this);
		$(this).css("display","none");
		$(this).wrap( '<div class="select_box" style="float:left;" ></div>' );
		var sel_container = $(this).parent();
		//alert();
		$(this).after( '<div class="sel_opt_panel"></div>');
		var sel_panel = $(this).next();
		$(sel_panel).after( '<ol class="sel_opt_list" ></ol>');
		var sel_list = $(sel_panel).next();
		
		
		//console.log( sel_list );
		//alert(sel_list);
		
		$(this).find('option').each(function( index ){
			$(sel_list).append('<li><a class="sel_opt_txt" href="#"></a></li>');
			var label =  $(this).html();
			$(sel_list).find('li:last a')
				.html( label )
				.click( function( e ){
					e.preventDefault();
					onZZSelectionListClickedDelegate( index  );
				});
		});
		var selectedIndex = $(sel_select).get(0).selectedIndex;
		onZZSelectionListClickedDelegate( selectedIndex );
		
		
		
		$(sel_list).hide();

		//alert( $(sel_panel).isFocus );
		$(sel_panel).click(function(){
			console.log('sel_panel click');
			//$(sel_list).focus();
			//showSelection();
			nextStatus = STATUS_EUMN.STATUS_SHOW;
			commitStatus();
		});
		$(sel_panel).mouseover(function(){
			if( currentStatus == STATUS_EUMN.STATUS_SHOW )
			{
				nextStatus = STATUS_EUMN.STATUS_SHOW;
				delayExcuteStatus();
			}
			
		});
		$(sel_panel).mouseout(function(){
			nextStatus = STATUS_EUMN.STATUS_HIDE;
			delayExcuteStatus();
		});
		$(sel_list).mouseout(function(){
			nextStatus = STATUS_EUMN.STATUS_HIDE;
			delayExcuteStatus();
		});
		
		$(sel_list).mouseover(function(){
			nextStatus = STATUS_EUMN.STATUS_SHOW;
			delayExcuteStatus();
		});
		
		function delayExcuteStatus()
		{
			$( sel_list ).stopTime();
			$( sel_list ).oneTime('0.2s' , commitStatus);
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
						showSelection();
						break;
					case STATUS_EUMN.STATUS_HIDE:
						hideSelection();
						break;
				}
			}	
		}
		function hideSelection(){
			$(sel_list).slideUp('fast');
			//console.log('sel_container blur');
		};
		function showSelection(){
			$(sel_list).slideDown('fast');
			//console.log('sel_container focus');
		};
		
		function onZZSelectionListClickedDelegate( index  )
		{
			//console.log('onZZSelectionListClickedDelegate click');
			$(sel_select).get(0).selectedIndex = index;
			var label = $(sel_select).find("option").eq(index).html();
			//$(sel_select).find("option").eq(index).attr("selected", true);
			
			ZZSetPanelText( label );
			nextStatus = STATUS_EUMN.STATUS_HIDE;
			commitStatus();
			//hideSelection();
		}
		function ZZSetPanelText( value )
		{
			$(sel_panel).html( value );	
		}
		
	});
	
};
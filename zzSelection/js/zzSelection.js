// JavaScript Document
// version - 1.0
$(function(){
	$.fn.zzSelection();
	//$('body').popup('abc');
});

$.fn.zzSelection = function(){
	
	if (typeof window.console == "undefined") {
		window.console = {log: function( param ) {
			//$('#aconsole').html( $('#aconsole').html() + '</br>' + param );	
		}};
	}
	
	
	$('select[class="zzSelection"]').each(function( index  ){
		var sel_select = $(this);
		$(this).css("display","none");
		$(this).wrap( '<div class="select_box" style="float:left;" ></div>' );
		var sel_container = $(this).parent();
		//alert();
		$(this).after( '<div class="sel_opt_panel"></div>');
		var sel_panel = $(this).next();
		
		sel_panel.after( '<ol class="sel_opt_list" ></ol>');
		var sel_list = $(sel_panel).next();
		var identify = 'zzSelectionTmp' + index;
		sel_list.attr('id',identify);
		
		sel_panel.attr("data-target",identify);
		var dropdown = sel_panel.zzDropdown({
			click2tick:true,
			OnShow:showSelection,
			OnHide:hideSelection
			});
		
		function hideSelection(){
			$(sel_list).slideUp('fast');
	
		};
		function showSelection(){
			$(sel_list).slideDown('fast');

		};
		
		//alert( dropdown );
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
		
		
		
		function onZZSelectionListClickedDelegate( index  )
		{
			//console.log('onZZSelectionListClickedDelegate click');
			$(sel_select).get(0).selectedIndex = index;
			var label = $(sel_select).find("option").eq(index).html();
			//$(sel_select).find("option").eq(index).attr("selected", true);
			
			ZZSetPanelText( label );
			dropdown.cancel();
		}
		function ZZSetPanelText( value )
		{
			$(sel_panel).html( value );	
		}
		
	});
	
};
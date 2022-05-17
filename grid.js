/*---------------------------------------------------

    griddery by @glenthemes [tumblr]
    github.com/griddery/griddery.github.io#readme
    
---------------------------------------------------*/

/*----- griddery v2.0 (NEW) -----*/
$(document).ready(function(){
var rootGET = getComputedStyle(document.documentElement);
window.gridderyV2 = function(gridiv, gridcols){
	gridiv = $.trim(gridiv);	
	gridcols = parseInt($.trim(rootGET.getPropertyValue($.trim(gridcols))));
	
	$(gridiv).each(function(){
		// try and target FIRST instance of griddery div.
		// so filter out the one whose prev sibling
		// isn't gridiv
		if(!$(this).prev().is(gridiv)){
			$(this).before("<div griddery-cont cols='" + gridcols + "' griddery-id='" + gridiv + "'></div>");
		}
	})// end item each
	
	$("[griddery-cont]").each(function(){		
		if($(this).next(gridiv).length){
			// place all sibling gridivs into its cont
			$(this).nextUntil(":not(" + gridiv + ")").appendTo($(this));
			
			// create griddery table-row
			$(this).wrapInner("<div griddery-tr/>");
			
			for(smh=1; smh<gridcols+1; smh++){
				// assign column IDs
				$(this).children("[griddery-tr]").children(":nth-of-type(" + gridcols + "n+" + smh + ")").each(function(){
					$(this).attr("col-id",smh)
				});

				// add column IDs to move to later
				$(this).find("[griddery-tr]").append("<div griddery-col='" + smh + "'></div>");
			}//end for loop
		}//end if gridiv is next sibling
	})//end cont each
	
	// sort items into their assigned columns
	$("[griddery-col]").each(function(){
		var jgxwv = $(this).attr("griddery-col");

		$(this).parents("[griddery-cont]").find("[col-id]").filter(function(){
			return $(this).attr("col-id") == jgxwv
		}).appendTo($(this)).removeAttr("col-id").wrap("<div griddery-item/>");
	})	
}
});//end docready

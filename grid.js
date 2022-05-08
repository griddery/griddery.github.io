/*---------------------------------------------------

    griddery by @glenthemes [tumblr]
    github.com/griddery/griddery.github.io#readme
    
---------------------------------------------------*/

/*----- griddery v2.0 (NEW) -----*/
$(document).ready(function(){
var rootGET = getComputedStyle(document.documentElement);
var JQversion = jQuery.fn.jquery.replaceAll(".","");

window.gridderyV2 = function(gridiv, gridcols){
	gridiv = $.trim(gridiv);	
	gridcols = parseInt($.trim(rootGET.getPropertyValue($.trim(gridcols))));
	
	$(gridiv).each(function(){		
		$(this).not(gridiv +"+"+ gridiv).each(function(){
			// group target divs next to e/o
			// and wrap them in [griddery-cont]
			if(JQversion >= "180"){
				$(this).nextUntil(":not(" + gridiv + ")").addBack().wrapAll("<div griddery-cont cols='" + gridcols + "'>");
			} else {
				$(this).nextUntil(":not(" + gridiv + ")").andSelf().wrapAll("<div griddery-cont cols='" + gridcols + "'>");
			}
			
			$(this).parent("[griddery-cont]").each(function(){
				// create griddery table-row
				$(this).wrapInner("<div griddery-tr/>");
				
				for(smh=1; smh<gridcols+1; smh++){
					// assign column IDs
					$(this).find(gridiv+":nth-of-type(" + gridcols + "n+" + smh + ")").each(function(){
						$(this).attr("col-id",smh)
					});
					
					// add column IDs to move to later
					$(this).find("[griddery-tr]").append("<div griddery-col='" + smh + "'></div>");
				}//end for loop
				
			})//end container each
		})//end andself/addback wrap script
	})// end item each
	
	// sort items into their assigned columns
	$("[griddery-col]").each(function(){
		var jgxwv = $(this).attr("griddery-col");

		$(this).parents("[griddery-cont]").find("[col-id]").filter(function(){
			return $(this).attr("col-id") == jgxwv
		}).appendTo($(this)).removeAttr("col-id");
	})
	
	// wrap each initial item in a flex cont
	// to center stuff (horizontally)
	$(gridiv).each(function(){
		$(this).wrap("<div griddery-item>");
		
		$(this).parents("[griddery-cont]").attr("griddery-id",gridiv)
	})
}

/*----- griddery v1.0 (OLD) -----*/
window.griddery = function(TT_TT, boobahz){
	var root = getComputedStyle(document.documentElement);
	var JQversion = jQuery.fn.jquery.replaceAll(".","");
	TT_TT.addClass("col-item");
	
	var col_count = Number(root.getPropertyValue(boobahz));
	
	$(".col-item").each(function(){
		$(this).not(".col-item + .col-item").each(function(){
			if(JQversion >= "180"){
				$(this).nextUntil(":not(.col-item)").addBack().wrapAll('<div class="col-tr">');
			} else {
				$(this).nextUntil(":not(.col-item)").andSelf().wrapAll('<div class="col-tr">');
			}
		})
	})//end .col-item each
	
	for(smh=1; smh<col_count+1; smh++){
		$(".col-tr .col-item:nth-child(" + col_count + "n+" + smh + ")").each(function(){
			$(this).attr("col-id",smh)
		});
	}
	
	$(".col-tr").prepend("<div class='temp-cols'></div>");
	
	for(tytn=1; tytn<col_count+1; tytn++){
        $(".temp-cols").append("<div class='col-column' col-id='" + tytn + "'></div>");
    }
	
	$(".temp-cols").children().unwrap();
	
	$(".col-item").each(function(){
        var col_id = $(this).attr("col-id");
        $(this).appendTo($(this).parents(".col-tr").find(".col-column[col-id='" + col_id + "']"))
    })
    
    $(".col-column[col-id], .col-item[col-id]").removeAttr("col-id");
	
	$(".col-column").each(function(){
		if($.trim($(this).html()) == ""){
			$(this).remove();
		}
	}); 
}
});//end docready

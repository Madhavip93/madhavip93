
function docReady(fn) {
    // see if DOM is already available
    if (document.readyState === "complete" || document.readyState === "interactive") {
        // call on next available tick
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}


function renderRow(portfolioItem1, portfolioItem2) {
    return '<div class="row justify-content-center image-row">\n' +
            portfolioItem1 + (portfolioItem2 || '' )  +
        '</div>';
}

function renderPortfolioItem(image, text) {
    return '<div class="col-sm-4 text-center portfolio-item">\n' +
        '        <img src="static/images/samples/'+ image + '" style="width: 100%">\n' +
        '        <p class="image-subtitle italics">' + text + '</p>\n' +
        '    </div>';

}

docReady(function() {
    $.get( "portfolio-items.txt", function( data ) {
        var lines = data.split("\n");

        console.log(lines);

        var renderedPortfolioItems = [];
        for (var i = 0; i < lines.length; i+=2) {

            var renderedPortfolioItem = renderPortfolioItem(lines[i], lines[i+1]);
            renderedPortfolioItems.push(renderedPortfolioItem);
        }

        console.log(renderedPortfolioItems);

        var renderedRows = [];
        for (var j = 0; j < renderedPortfolioItems.length; j+=2) {
            var renderedRow = renderRow(renderedPortfolioItems[j], renderedPortfolioItems[j+1]);
            renderedRows.push(renderedRow);
        }

        $( ".result" ).html( renderedRows );
    });
});


const addBrushName = (brush, patternString) => {
    let searchIndex = 0;
    const commentRegex = /#([CcNOPrR]).*/gm;
    let comments = [];
    let m;
    let brushName;

    while ((m = commentRegex.exec(patternString)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === commentRegex.lastIndex) {
            commentRegex.lastIndex++;
        }
        comments.push(m[0]);
        searchIndex = commentRegex.lastIndex
    }

    brushName = comments[0].split("#N ")[1];
    brush.name = brushName;
    brush.displayName = brushName;

    // skip the newline symbol
    searchIndex++;
    return searchIndex
};

const addRowsAndCols = (brush, patternString, searchIndex) => {
    let m;
    const configRegex = /^x.+/gm;
    configRegex.lastIndex = searchIndex;
    let config = [];
    while ((m = configRegex.exec(patternString)) !== null) {
        if (m.index === configRegex.lastIndex) {
            configRegex.lastIndex++;
        }

        config.push(m[0]);
        searchIndex = configRegex.lastIndex
    }

    const [x, y] = config[0].split(", ");
    brush.cols = parseInt(x.split(" = ")[1]);
    brush.rows = parseInt(y.split(" = ")[1]);

    // skip the newline symbol
    searchIndex++;
    return searchIndex;
};

const addTemplateToBrush = (brush, patternString, searchIndex) => {
    const totalSize = brush.cols * brush.rows;
    let template = new Uint8Array(totalSize);
    let positionInTemplate = 0;

    let count = 1,
        in_number = false,
        chr;

    for (let len = patternString.length; searchIndex < len; searchIndex++) {
        chr = patternString.charCodeAt(searchIndex);

        if (chr >= 48 && chr <= 57) {
            if (in_number) {
                count *= 10;
                count += chr ^ 48;
            } else {
                count = chr ^ 48;
                in_number = true;
            }
        } else {
            // b
            if (chr === 98) {
                while (count--) {
                    template[positionInTemplate] = 0;
                    positionInTemplate++;
                }
                // A-Za-z
            } else if ((chr >= 65 && chr <= 90) || (chr >= 97 && chr < 122)) {
                while (count--) {
                    template[positionInTemplate] = 1;
                    positionInTemplate++;
                }
            }
            // $
            else if (chr === 36) {
                // we don't care about line ends because we
                // have a 1D brush template
            }// !
            else if (chr === 33) {
                while (positionInTemplate < totalSize) {
                    template[positionInTemplate] = 0;
                    positionInTemplate++;
                }
                break;
            }

            count = 1;
            in_number = false;
        }
    }
    brush.template = template;
};

const decoder = new TextDecoder("utf-8");

export function parseRle(url) {
    fetch(url)
        .then(response => {
            const reader = response.body.getReader();
            let result = '';

            reader.read()
                .then(function processText({done, value}) {
                    if (done) {
                        return result
                    }

                    result += decoder.decode(value)

                    return reader.read().then(processText)

                })
                .then((patternString) => {
                    let brush = {};
                    let searchIndex = addBrushName(brush, patternString);
                    searchIndex = addRowsAndCols(brush, patternString, searchIndex);
                    addTemplateToBrush(brush, patternString, searchIndex);
                })
        })
}

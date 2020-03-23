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
    try {
        brushName = comments[0].split("#N ")[1];
        brush.name = brushName;
        brush.displayName = brushName;

        // skip the newline symbol
        searchIndex++;
        return searchIndex
    } catch (e) {
        console.log(e);
        console.log(patternString)
    }

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
        currentX = 0,
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
                // we can skip all these positions because we have 1D Uint8Array
                // which is initialised to 0s
                positionInTemplate += count;
                currentX += count;
                // A-Za-z
            } else if ((chr >= 65 && chr <= 90) || (chr >= 97 && chr < 122)) {
                currentX += count;
                while (count--) {
                    template[positionInTemplate] = 1;
                    positionInTemplate++;
                }
            }
            // $
            else if (chr === 36) {
                // we havent reached the end of cols, must skip ahead
                if (currentX < brush.cols) {
                    positionInTemplate += brush.cols - currentX;
                }
                // if we have a count at the end of line, we must skip
                // couple of "rows"
                if (count - 1) {
                    positionInTemplate += (count - 1) * brush.cols
                }
                currentX = 0;
            }
            // !
            else if (chr === 33) {
                break;
            }

            // currentX = 0;
            count = 1;
            in_number = false;
        }
    }
    brush.template = template;
};

export async function parseRle(url) {
    let response = await fetch(url);
    const decoder = new TextDecoder("utf-8");
    const reader = response.body.getReader();
    let rleFileString = '';
    let brush = {};

    while (true) {
        const {done, value} = await reader.read();
        if (done) {
            break
        }
        rleFileString += decoder.decode(value);
    }

    let searchIndex = addBrushName(brush, rleFileString);
    searchIndex = addRowsAndCols(brush, rleFileString, searchIndex);
    addTemplateToBrush(brush, rleFileString, searchIndex);
    return brush;
}

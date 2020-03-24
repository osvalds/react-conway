import {useEffect, useState} from "react";
import {parseRle} from "../parser/rle";

const brushList = [
    "bigun.rle",
    "crab.rle",
    "glider.rle",
    "glidertrain.rle",
    "gosperglider.rle",
    "hwss.rle",
    "inlineinverter.rle",
    "jaydot.rle",
    "loafer.rle",
    "lobster.rle",
    "newgun2.rle",
    "nms.rle",
    "pixel.rle",
    "rabbits.rle",
    "simkinglider.rle",
    "spacerake.rle",
    "spider.rle",
    "twogun.rle",
    "wing.rle",
];

export function useBrushes(cols, rows) {
    const [brushes, setBrushes] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [filteredBrushes, setFilteredBrushes] = useState([]);

    useEffect(() => {
        Promise.all(brushList.map(brush => parseRle(process.env.PUBLIC_URL + "/patterns/" + brush)))
            .then(vals => {
                setLoaded(true);
                setBrushes(vals);
            });
    }, []);

    useEffect(() => {
        const smallerThanBoard = brushes.filter(brush => brush.cols <= cols && brush.rows <= rows)
        setFilteredBrushes(smallerThanBoard);
    }, [cols, rows, brushes]);

    return [filteredBrushes, loaded];
}

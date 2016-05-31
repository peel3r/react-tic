import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "body": {
        "textAlign": "center"
    },
    "board": {
        "display": "inline-block",
        "fontSize": 3
    },
    "field": {
        "textAlign": "center",
        "width": 2,
        "height": 2,
        "lineHeight": 2,
        "float": "left"
    },
    "field:nth-child(3n+1)": {
        "clear": "both"
    },
    "field:nth-child(5)": {
        "borderLeft": "3px solid black",
        "borderRight": "3px solid black",
        "borderTop": "3px solid black",
        "borderBottom": "3px solid black"
    },
    "field:nth-child(6n+2)": {
        "borderLeft": "3px solid black",
        "borderRight": "3px solid black"
    },
    "field:nth-child(4)": {
        "borderTop": "3px solid black",
        "borderBottom": "3px solid black"
    },
    "field:nth-child(6)": {
        "borderTop": "3px solid black",
        "borderBottom": "3px solid black"
    }
});
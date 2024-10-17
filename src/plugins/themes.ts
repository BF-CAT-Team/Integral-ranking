import {ThemeDefinition} from "vuetify";
import {storage} from "@/assets/js";

const light: ThemeDefinition = {
    dark: false,
    colors: {
        background: '#FFFFFF',
        surface: '#FFFFFF',
        primary: '#ecaa2f',
        secondary: '#ecaa2f',
        error: '#B00020',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FB8C00',
    },
}

const dark: ThemeDefinition = {
    dark: true,
    colors: {
        background: '#252424',
        surface: '#000',
        primary: '#000',
        secondary: '#000',
    },
}

let themeData = storage.get('theme');
let currTheme = 'light';

if (themeData.code == 0) currTheme = themeData.data.value;

export default {
    defaultTheme: currTheme,
    themes: {
        light,
        dark
    },
}

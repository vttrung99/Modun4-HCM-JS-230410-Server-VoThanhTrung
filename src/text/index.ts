import en from './en'
import vi from './vi'
import {TextType} from './en'

export default (lang: string) => {
    let text: TextType;
    switch(lang) {
        case 'en':
            text = en;
            break
        case 'vi':
            text = vi;
            break
        default:
            text = en
    }
    return text
}
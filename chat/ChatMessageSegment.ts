import ChatColor from "./ChatColor";
import ClickEvent from "./ClickEvent";
import HoverEvent from "./HoverEvent";

type ChatMessageSegment = {
    text?: string,

    bold?: boolean,
    italic?: boolean,
    underlined?: boolean,
    strikethrough?: boolean,
    obfuscated?: boolean,
    color?: ChatColor,
    insertion?: string,
    clickEvent?: ClickEvent,
    hoverEvent?: HoverEvent
};

export default ChatMessageSegment;
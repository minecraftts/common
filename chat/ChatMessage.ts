import ChatColor from "./ChatColor";
import ChatMessageSegment from "./ChatMessageSegment";
import ClickEvent from "./ClickEvent";
import HoverEvent from "./HoverEvent";

type ChatMessage = {
    text?: string,
    translate?: string,
    with?: ChatMessageSegment[],

    bold?: boolean,
    italic?: boolean,
    underlined?: boolean,
    strikethrough?: boolean,
    obfuscated?: boolean,
    color?: ChatColor,
    insertion?: string,
    clickEvent?: ClickEvent,
    hoverEvent?: HoverEvent

    extra?: ChatMessageSegment[]
};

export default ChatMessage;
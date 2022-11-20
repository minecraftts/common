type HoverEvent = {
    action: "show_text" | "show_item" | "show_entity" | "show_achievement",
    value: string
};

export default HoverEvent;
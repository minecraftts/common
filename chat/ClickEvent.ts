type ClickEvent = {
    action: "open_url" | "run_command" | "suggest_command" | "change_page" | "copy_to_clipboard",
    value: string
};

export default ClickEvent;
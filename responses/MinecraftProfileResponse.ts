type MinecraftProfileResponse = {
    id: string,
    name: string,
    properties: [
        {
            name: "textures",
            value: string,
            signature: string
        }
    ]
};

export default MinecraftProfileResponse;
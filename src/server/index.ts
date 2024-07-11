import express from "express";

export async function initServer() {
    const app = express();

    app.get("/", (_req, res) => res.send("Hello World!"));
    app.use("/twitch", (await import("./routes/twitch")).default);
    app.listen(3333);

    return app;
}


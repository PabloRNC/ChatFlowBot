import express from "express";
import localtunnel from "localtunnel";

export async function initServer(){

    const app = express();

    app.get('/', (_req, res) => {
        res.send('Hello World!');
    });

    app.use('/twitch', (await import('./routes/twitch')).default)

    app.listen(8080);

    await localtunnel({ port: 8080, subdomain: 'chatflowbot' })

    return app;
}
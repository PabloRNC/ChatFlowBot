import { createEvent } from "seyfert";

export default createEvent({
    data: {
        name: 'botReady'
    },
    run(..._args) {
        console.log('Bot is ready!');
    },
})
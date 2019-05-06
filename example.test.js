const Hamon = require("./index");
const Scrapper = new Hamon("TOKEN HERE");

setTimeout(async () => {
    await Scrapper.update();

    try {
        console.time("GET/endpoint/blur >");
        const res = await Scrapper.get("blur", {
            url: "https://cdn.discordapp.com/avatars/350710888812249101/e9564a9f9b1750e7eddf11bdbebd5176.png",
            intensity: 10
        });

        console.log(res);
        console.timeEnd("GET/endpoint/blur >");
    } catch (e) {
        console.error(e)
    }

    console.log();

    try {
        console.time("GET/endpoints >");
        const res = await Scrapper.fetchEndpoints(true);

        console.log(res);
        console.timeEnd("GET/endpoints >");
    } catch (e) {
        console.error(e)
    }
}, 0);
module.exports = (client) => {
    client.user.setPresence({
        game: {
            name: "Booster les clients"
        }
    });
};

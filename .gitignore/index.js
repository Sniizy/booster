const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const fs = require('fs');

client.login(process.env.TOKEN);

client.on('ready', () => {
  console.log('Je suis pret !');
});

client.on('guildMemberAdd', user => {
    let joinEmbed = new Discord.RichEmbed()
    .setColor("#337ab7")
    .setAuthor("Bienvenue " + user.user.username + " sur le serveur.")
    .setDescription(" \n \n Tu es sur le serveur **"+ user.guild.name + ".** \n Les explications sont dans <#675961597839278080> \n Si tu veux ouvrir un ticket <#675964861251059733> \n Si tu as des questions, n'hésite pas ! \n \n")
    .setImage(user.user.displayAvatarURL)
    .setFooter("Nous te souhaitons un bon moment sur notre serveur")
    user.guild.channels.get("675946020718379028").send(joinEmbed)

});

client.on("guildMemberRemove", user =>{
    let LeaveEmbed = new Discord.RichEmbed()
    .setColor("#980000")
    .setDescription("Sniff... **"+ user.user.username + "** à quitter le serveur ! :disappointed_relieved: :disappointed_relieved: :disappointed_relieved:")  
    user.guild.channels.get("675946020718379028").send(LeaveEmbed)

});



fs.readdir('./Commandes/', (error, f) => {
    if (error) { return console.error(error); }
        let commandes = f.filter(f => f.split('.').pop() === 'js');
        if (commandes.length <= 0) { return console.log('Aucune commande trouvée !'); }

        commandes.forEach((f) => {
            let commande = require(`./Commandes/${f}`);
            console.log(`${f} commande chargée !`);
            client.commands.set(commande.help.name, commande);
        });
});

fs.readdir('./Events/', (error, f) => {
    if (error) { return console.error(error); }
        console.log(`${f.length} events chargés`);

        f.forEach((f) => {
            let events = require(`./Events/${f}`);
            let event = f.split('.')[0];
            client.on(event, events.bind(null, client));
        });
});

const {default:makeWASocket,
AnyMessageContent,delay, 
DisconnectReason, fetchLatestBaileysVersion, getAggregateVotesInPollMessage, 
makeCacheableSignalKeyStore, makeInMemoryStore,proto, useMultiFileAuthState, 
WAMessageContent, WAMessageKey, Mimetype, MessageType, MessageOptions} = require('@whiskeysockets/baileys')
let { Boom } = require("@hapi/boom")
const c = require('ansi-colors')

const sessionFile = './session.json'
async function wajxp() {
  const { state, saveCreds } = await useMultiFileAuthState(sessionFile)
  const zyn = makeWASocket({
    printQRInTerminal: true,
    auth: state,
  })
  zyn.ev.on('creds.update', saveCreds)

  zyn.ev.on('connection.update' , async(tex) => {
    let { lastDisconnect , connection } = tex
    if(connection) {
      console.log(c.green(`Connection Status: ${connection}`))
    }
    if (connection === "close") {
      let reason = new Boom(lastDisconnect?.error)?.output?.statusCode
    if (reason === DisconnectReason.badSession) {
      console.log(c.red(`Bad Session!, Please Delete session.json and Scan Again`));
      zyn.logout();
    } else if (reason === DisconnectReason.connectionClosed) {
      console.log(c.blue("Connection closed!, reconnecting...."));
      wajxp();
    }else if (reason === DisconnectReason.connectionLost) {
      console.log(c.blue("Connection Lost from Server!, Reconnecting..."));
      wajxp();
    } else if (reason === DisconnectReason.connectionReplaced) {
      console.log(c.green("Connection Replaced!, Another Session Opened, Please Close Current Session"));
      zyn.logout();
    }else if (reason === DisconnectReason.loggedOut) {
      console.log(c.red(`Device Logged Out, Please Delete  '${sessionFile}'  and Scan Again.`));
      zyn.logout();
    } else if (reason === DisconnectReason.restartRequired) {
      console.log(c.green("Restart Required, Restarting..."));
      wajxp();
    } else if (reason === DisconnectReason.timedOut) {
      console.log(c.red("Connection TimedOut,") + c.green(" Reconnecting..."));
      wajxp();
    } else {
      zyn.end(c.red(`DisconnectReason: ${reason}|${lastDisconnect.error}`));
    }}
  })

  // const reply = (msg) => {
  //   zyn.sendMessage(id, { text: msg }, { quoted: q })
  // }
  // const message = (msg) => {
  //   zyn.sendMessage(id, {text: msg})
  // }
  // const read = ()=>{
  //   zyn.readMessages([q.key])
  // }

    

    

}wajxp()
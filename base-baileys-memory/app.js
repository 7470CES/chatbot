const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')





const flowmiorden = addKeyword(['miorden', 'MIORDEN']).addAnswer(
    [
        'Genial Por favor Escribe La dirección de envio del la orden',
       
    ],
    null,
    null,
    []
)


const flowverificar = addKeyword(['comprobante', 'COMPROBANTE']).addAnswer(
    [
        'Ya casi Realizamos tu Orden , Por favor envianos tu comprobante de Pago',
       
    ],
    null,
    null,
    []
)





const flowSecundario = addKeyword(['TRANSFERENCIA', 'transferencia','Transferencia'],{sensitive:true})
.addAnswer([
    
    
    '📄 Te informamos los pasos para realizar tu pedido',
     '',
     '1. Realiza la Transferencia Al Numero Nequi: 3008740750 con el valor correcto del plato',
     '',
     '2. Comprobar el Pago',
     '',
     '3. Suministrar Dirección de Envio',
     '',
     '👉Si ya realizaste la transferencia y deseas enviarnos tu comprobante de pago para  pedir tu orden a tu domicilio por favor escriba: *comprobante*',



    ],
    null,
    null,
    [flowmiorden,flowverificar] // respuestas


)



const flowPedir = addKeyword(['pedir', 'PEDIR']).addAnswer(
    [
        '¿Cómo quieres pagar en *efectivo* o *Transferencia*?',
       
    ],
    null,
    null,
    [flowSecundario]
)

const flowTuto = addKeyword(['tutorial', 'tuto']).addAnswer(
    [
        '🙌 Aquí encontras un ejemplo rapido',
        'https://bot-whatsapp.netlify.app/docs/example/',
        '\n*2* Para siguiente paso.',
    ],
    null,
    null,
    [flowSecundario]
)

const flowGracias = addKeyword(['gracias', 'grac']).addAnswer(
    [
        '🚀 Puedes aportar tu granito de arena a este proyecto',
        '[*opencollective*] https://opencollective.com/bot-whatsapp',
        '[*buymeacoffee*] https://www.buymeacoffee.com/leifermendez',
        '[*patreon*] https://www.patreon.com/leifermendez',
        '\n*2* Para siguiente paso.',
    ],
    null,
    null,
    [flowSecundario]
)

const flowDiscord = addKeyword(['discord']).addAnswer(
    ['🤪 Únete al discord', 'https://link.codigoencasa.com/DISCORD', '\n*2* Para siguiente paso.'],
    null,
    null,
    [flowSecundario]
)


    const flowPrincipal = addKeyword(['hola', 'Hola', 'HOLA', 'ole', 'alo'],{sensitive:true})
    .addAnswer('Bienvenido al Restaurante DOMIPLACE🙌')
    .addAnswer(
        [
            'El menu del día es el siguiente',
            '',
            '*Pabellon*: Delicioso plato venezolano con todos los hierros *Precio* : $ 10 USD',
            '',
            '*Tacos*: Delicioso plato venezolano con todos los hierros *Precio* : $ 3 USD',
            '',
            '*Cocido Madrileño*: Plato de cuchara profunda *Precio*: $ 12 USD',
            '',

            '👉Si deseas ordenar escribe *pedir*',
        ],
        null,
        null,
        [flowPedir] // respuestas
    )

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal,flowSecundario])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()


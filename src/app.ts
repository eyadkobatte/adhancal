import Fastify from 'fastify';

const fastify = Fastify({
    logger: true,
})

fastify.listen({host: '0.0.0.0', port: 3000}, (err, address) => {
    if (err) throw err;
    console.log(`Listening on ${address}`)
})

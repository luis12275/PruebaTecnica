module.exports = {
  apps : [{
    name: 'PRUEBA_TECNICA',
    port: 7778,
    //script de ejecución (normalmente sería: --- node app.js)
    script: './index.js',
    //configuración para reinicio en caso de cambio de codigo
    watch: false,
    //numero de instancias a ejecutar (relevacion automatica)
    instances  : 1,
    //modo de ejecución (cluster para mas de una instancia, fork para una sola instancia)
    exec_mode  : "cluster",
    //tiempo en milisegundos antes de enviar la señal de muerte del server
    kill_timeout : 5000,
    //tiempo en milisegundos antes de forzar una recarga si la app no responde
    listen_timeout : 5000,
    //enviar mensajes cuando se realice una parada
    shutdown_with_message : true,
    //reiniciar la instancia en caso de apagado forzado 
    autorestart : true,
    // nuevo modo de reinicio en PM2 Runtime, lo que hace que su aplicación se reinicie de una manera más inteligente. 
    exp_backoff_restart_delay: 5000
  }]
};

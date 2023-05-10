var mqtt = require('mqtt')
var client = mqtt.connect('http://test.mosquitto.org')
var mysql = require('mysql');
var connection = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : '',
	database : 'iot2'
});
//const topic = 'nodejs123/mqtt'
//const topic2 = 'nodejs123/mqtt2'
var data1;
var data2;
var data3;
var data4;
ledState();


connection.connect();

client.on('connect', function(){
	client.subscribe('nodejs123/hum',function(err){
    })
  client.subscribe('nodejs123/temp',function(err){
    })
  client.subscribe('nodejs123/ldr',function(err){
    })
  client.subscribe('nodejs123/tds',function(err){
    })
})

client.on ('message',function (topic, payload) {
      if (topic === 'nodejs123/hum') {
        data1 = payload;
      }
    
      if (topic === 'nodejs123/temp') {
        data2 = payload;
      }
      if (topic === 'nodejs123/tds') {
        data3 = payload;
      }
      if (topic === 'nodejs123/ldr') {
        data4 = payload;
      }
// message is BufferT
//INSERT INTO `data` (`no`, `data`, `data2`, `date`) VALUES (NULL, '2', '2', current_timestamp());
console.log('Received Message:', topic,payload.toString())
//connection.query('INSERT INTO tabel_iot (`id`, `waktu`, `kelembapan`, `suhu`, `tds`, `ldr`) VALUES(NULL,"' + data1 + '","' + data2 +'", current_timestamp())' , function (error, results, fields) {
connection.query('INSERT INTO tabel_iot (`id`, `waktu`, `kelembapan`, `suhu`, `tds`, `ldr`) VALUES(NULL, current_timestamp(),"' + data1 + '","' + data2 + '","' + data3 + '","' + data4 +'")' , function (error, results, fields) {
  //  if (error) throw error;
   // console,log('ok');
  });

})

function ledState(state){
  const topik = '/nodejs/mqtt'
  client.on('connect', () => {
    console.log('Connected')
    client.subscribe([topik], () => {
      console.log(`Subscribe to topic '${topik}'`)
    })
    if (state==1){
    client.publish(topik, 'nodejs mqtt test', { qos: 0, retain: false }, (error) => {
      if (error) {
        console.error(error)
      }
    })}
  })

}
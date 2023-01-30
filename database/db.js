import mongoose from 'mongoose';

export default async function connectToDb() {
  if (mongoose.connection.readyState >= 1) return;
  mongoose.connect('mongodb://localhost/sbp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  var conn = mongoose.connection;
  conn.on('connected', function () {
    console.log('database is connected successfully');
  });
  conn.on('disconnected', function () {
    console.log('database is disconnected successfully');
  });
  conn.on('error', console.error.bind(console, 'connection error:'));
}

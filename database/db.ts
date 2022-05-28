import mongoose from "mongoose";

/* 0 = disconnected
1 = connected
2 = connecting
3 = disconnecting
 */

const mongoConnection = {
  isConnected: 0,
};

export const connect = async () => {
  if (mongoConnection.isConnected) {
    return;
  }

  if (mongoose.connections.length > 0) {
    mongoConnection.isConnected = mongoose.connections[0].readyState;
    if (mongoConnection.isConnected === 1) {
      console.log("usando conexcion anterios");
      return;
    }

    await disconnect()
  }

  await mongoose.connect("process.env.MONGO_URI", {});
  mongoConnection.isConnected = 1;
  console.log("conectado a mongodb");
};

export const disconnect = async () => {

    if (mongoConnection.isConnected !== 0) return;

    await mongoose.disconnect();
    console.log('desconectado de mongodb');
}
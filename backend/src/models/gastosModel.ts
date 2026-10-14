const mongoose = require('mongoose');

const GastosSchema = new mongoose.Schema({
  imagem: {
    type: String,
    required: false,
  },
  nome: {
    type: String,
    required: true,
  },
  valor: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
});

const Gastos = mongoose.model('Gastos', GastosSchema);
export { Gastos };
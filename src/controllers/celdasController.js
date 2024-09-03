const Celda = require('../models/Celda');

exports.createCelda = async (req, res) => {
  try {
    const newCelda = new Celda(req.body);
    await newCelda.save();
    res.status(201).json(newCelda);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getCelda = async (req, res) => {
  try {
    const celda = await Celda.findById(req.params.id);
    if (!celda) return res.status(404).json({ message: 'Celda no encontrada' });
    res.json(celda);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getCeldas = async (req, res) => {
  try {
    const celdas = await Celda.find();
    res.json(celdas);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getCeldasPorEstado = async (req, res) => {
  try {
    const celdas = await Celda.find({ estado: req.params.estado });
    res.json(celdas);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateCelda = async (req, res) => {
  try {
    const updatedCelda = await Celda.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCelda) return res.status(404).json({ message: 'Celda no encontrada' });
    res.json(updatedCelda);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteCelda = async (req, res) => {
  try {
    const deletedCelda = await Celda.findByIdAndDelete(req.params.id);
    if (!deletedCelda) return res.status(404).json({ message: 'Celda no encontrada' });
    res.json(deletedCelda);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.parquearVehiculo = async (req, res) => {
  try {
    const celdaDisponible = await Celda.findOne({ estado: 'disponible' });
    if (!celdaDisponible) {
      return res.status(404).json({ message: 'No hay celdas disponibles' });
    }
    celdaDisponible.placaVehiculo = req.body.placaVehiculo;
    celdaDisponible.fechaIngreso = new Date();
    celdaDisponible.estado = 'no disponible';
    await celdaDisponible.save();
    res.json(celdaDisponible);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.calcularValorPagar = async (req, res) => {
  try {
    const celda = await Celda.findById(req.params.id);
    if (!celda || !celda.fechaIngreso) {
      return res.status(404).json({ message: 'Celda no encontrada o no tiene registro de ingreso' });
    }
    const fechaSalida = new Date();
    const horas = Math.ceil((fechaSalida - celda.fechaIngreso) / 3600000);
    const valorPagar = horas * 5000;
    res.json({ horas, valorPagar });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.salirVehiculo = async (req, res) => {
  try {
    const celda = await Celda.findById(req.params.id);
    if (!celda || celda.estado === 'disponible') {
      return res.status(404).json({ message: 'Celda no encontrada o ya está disponible' });
    }
    celda.fechaSalida = new Date();
    celda.estado = 'disponible';
    celda.placaVehiculo = null;
    celda.fechaIngreso = null;
    celda.pin = null;
    await celda.save();
    res.json(celda);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

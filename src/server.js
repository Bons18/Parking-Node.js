const app = require('./app');
const celdaRoutes = require('./routes/celdas');

app.use('/api', celdaRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

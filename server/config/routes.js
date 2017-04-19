var products = require('../controllers/products.js');
var orders = require('../controllers/orders.js');
var customers = require('../controllers/customers.js');

module.exports = function(app){
  app.get('/products', function(req, res) {
    products.index(req, res); });
  app.get('/products/:id', function(req, res) {
    products.show(req, res); });
  app.post('/products', function(req, res) {
    products.create(req, res); });
  app.put('/products/:id', function(req, res){
    products.update(req, res); });
  app.delete('/products/:id', function(req, res) {
    products.delete(req, res); });
  app.get('/orders', function(req, res) {
    orders.index(req, res); });
  app.get('/orders/:id', function(req, res) {
    orders.show(req, res); });
  app.post('/orders', function(req, res) {
    orders.create(req, res); });
  app.put('/orders/:id', function(req, res){
    orders.update(req, res); });
  app.delete('/orders/:id', function(req, res) {
    orders.delete(req, res); });
  app.get('/customers', function(req, res) {
    customers.index(req, res); });
  app.get('/customers/:id', function(req, res) {
    customers.show(req, res); });
  app.post('/customers', function(req, res) {
    customers.create(req, res); });
  app.put('/customers/:id', function(req, res){
    customers.update(req, res); });
  app.delete('/customers/:id', function(req, res) {
    customers.delete(req, res); });
}

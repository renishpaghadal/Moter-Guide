const route = require('express').Router();
const FeatureController = require('../controllers/FeaturesController');

route.get('/features', FeatureController.getAllFeatures);
route.post('/feature', FeatureController.addFeature);
route.get('/feature/:id', FeatureController.getFeatureById);
route.put('/feature/:id', FeatureController.updateFeature);
route.delete('/feature/:id', FeatureController.deleteFeature);

module.exports = route;
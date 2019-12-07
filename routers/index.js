module.exports = (app) => {
    app.use('/users/', require('./user'));
    app.use('/books/', require('./books'));
};
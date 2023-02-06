const mongoose = require('mongoose');
mongoose.set('strictQuery', false); // esta linea se la he añadido por que  la opción `strictQuery` volverá a ser `false` por defecto en Mongoose . Utilice `mongoose.set('strictQuery');` si quiere prepararse para este cambio. Utilice `mongoose.set('strictQuery', false); CE: node:493328

const dbConection = async () => {
    
    try {
        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true,
            // useFindAndModify: false
        });
        console.log('base de datos online')
    } catch (error) {
        console.log('El error es : ' , error)
        throw new Error('Eror a la hora de incialiazar la bd')
    }
}

module.exports = {
    dbConection
};
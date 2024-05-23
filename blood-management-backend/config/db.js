const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://Zeeshan:Zeeshan123@cluster0.18gyn2r.mongodb.net/Blood-Management?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Database connection successful');
})
.catch(err => {
    console.error('Database connection error:', err);
});
module.exports = mongoose;
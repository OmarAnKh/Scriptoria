import mongoose from 'mongoose'

//mongoose.connect(process.env.MONGODB_CONNECTION, {})

const connectToDatabase = async () => {
    try {
        await mongoose.connect("mongodb+srv://jaberaaa8:bG4Lr21PTbiCIYGf@wepserver.pygrx1c.mongodb.net/?retryWrites=true&w=majority&appName=wepServer", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to the database successfully");
    } catch (error) {
        console.error("Error connecting to the database:", error);
    }
}

// Connect to the database
connectToDatabase();

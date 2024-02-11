const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    name: {
        type: String,
        require: [true,"Please Add contact name"],
    },
    email: {
        type: String,
        require: [true,"Please Add contact email"],
    },
    phone: {
        type: String,
        require: [true,"Please Add contact phone"],
    },
},{
    timestamp: true,
}
);

module.exports = mongoose.model("Contact",contactSchema);
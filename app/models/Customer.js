const mongoose            =   require('mongoose'),
      path                =   require('path'),
      config              =   require(path.resolve(`./app/config/env/${process.env.NODE_ENV}`)),
      schema              =   mongoose.Schema;

var customerSchema = new schema({
    // alex
    address: String,
    call: String,
    company: String,
    connection: String,
    email: String,
    event: String,
    firstname: String,
    initialDate: String,
    lastname: String,
    latestDate: String,
    gender: String,
    notes: String,
    phone: String,
    projectname: String,
    projectscale: String,
    source: String,
    status : String,
    task: String,
    title: String,
    zone: String,
},{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'         
    }
});


/*update user data*/
customerSchema.statics.updateUser = function(_id, data){
    return new Promise((resolve, reject) => {
        this.findOneAndUpdate({
            _id : new ObjectId(_id),
        },data, {new :false}, (err, updated) => {
            if(err) reject(err);
            if(updated) {
                resolve(true);
            }
        });
    });
}

module.exports = mongoose.model('customer', customerSchema);
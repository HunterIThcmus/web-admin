const bcrypt = require('bcryptjs');
const UserModel = require('../../model/admin');
module.exports.createUser = (res, name, email, password) => {
    console.log(name + email + password);
    let errors = [];
   
    
    if (!name || !email || !password) {
        errors.push({ msg: 'Please enter all fields' });
    }

    if (password.length < 6) {
        errors.push({ msg: 'Password must be at least 6 characters' });
    }

    if (errors.length > 0) {
        res.render('register', { errors });
    } else {

        UserModel.findOne({ email: email }).then(user => {
            if (user) {
                errors.push({ msg: 'Email already exists' });
                res.render('register', { errors });

            } else {
                let hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
                const newUser = new UserModel({ name, email, password: hash,permission:false });
                console.log(newUser);
                res.redirect('/');
                return newUser.save();
            }
        });

    }
}

module.exports.CreateSuperUser = () => {
  

    console.log("creat super appear");
    UserModel.findOne({ email: "admin@gmail.com" }).then(user => {
        if (user) {
           console.log("supper user is exists")

        } else {
            let hash = bcrypt.hashSync("123123", bcrypt.genSaltSync(10));
            const newUser = new UserModel({ name: "admin", email: "admin@gmail.com", password: hash, permission: true });
            return newUser.save();
        }
        });

    }

    module.exports.editAdminInfo = async (res, id, newinfo) => {
        const result = await UserModel.updateOne({ '_id': id }, { $set: { 'name': newinfo.name, 'sex': newinfo.sex, 'address': newinfo.address, 'phone_number': newinfo.phone } }, (err, doc) => {
            if (err) {
                console.log("update document error");
            } else {
                console.log("update document success");
                console.log(doc);
            }
        });
       // return result.save();
    }
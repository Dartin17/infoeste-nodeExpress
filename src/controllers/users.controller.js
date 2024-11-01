import UserModel from "../model/user.model.js";

export default class UserController {
    async create(req, res) {
        let { name, email, age } = req.body;

        if (name && email && age) {
            let userModel = new UserModel("", name, email, age);
            let userCreate = await userModel.create();

            if (userCreate) {
                res.status(200).json({
                    sucess: true,
                    data: { name, email, age }
                })
            } else {
                res.status(400).json({
                    sucess: false,
                    message: "ERROR! Invalid User"
                });
            }
        } else {
            res.status(400).json({
                sucess: false,
                message: "Invalid Parameters"
            });
        }
    }

    async list(req, res) {
        let userModel = new UserModel("", "", "", "")
        let users = await userModel.list();

        if (users.length > 0) {
            res.status(200).json({
                sucess: true,
                data: users
            })
        } else {
            res.status(404).json({
                success: false,
                message: "Users not found"
            });
        }
    }

    async search(req, res) {
        const { id } = req.params;
        if (id) {
            const userModel = new UserModel(id, "", "", "");
            const user = await userModel.search();

            if (user.length > 0) {
                res.status(200).json({
                    success: true,
                    data: user
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: "User not found"
                });
            }
        } else {
            res.status(400).json({
                success: false,
                message: "Missing ID"
            });
        }
    }

    async delete(req, res) {
        const { id } = req.params;
        if (id) {
            const userModel = new UserModel(id, "", "", "");
            const user = await userModel.delete();
            if (user) {
                res.status(200).json({
                    success: true,
                    message: "User deleted"
                });
            } else {
                res.status(400).json({
                    success: false,
                    message: "User not found"
                })
            }
        } else {
            res.status(400).json({
                success: false,
                message: "Ivalid Request"
            })
        }
    }

    async update(req, res) {
        const { id } = req.params;
        const { name, email, age } = req.body;

        if (id && name && email && age) {
            const userModel = new UserModel(id, name, email, age);
            const user = await userModel.update();
            if (user) {
                res.status(200).json({
                    success: true,
                    message: "User updated"
                });
            } else {
                res.status(400).json({
                    success: false,
                    message: "Invalid Request"
                });
            }
        }
        else {
            res.status(404).json({
                success: false,
                message: "Invalid Parameters"
            });
        }
    }
}
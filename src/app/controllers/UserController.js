import User from '../models/User';

class UserController {
    async index(req, res) {
        const users = await User.findAll();

        return res.json(users);
    }

    async store(req, res) {
        const userExists = await User.findOne({ where: { email: req.body.email } });

        if (userExists) {
            return res.status(400).json({ error: `Já existe um usuário cadastrado com o email ${userExists.email}.` }); 
        }

        const { id, name, email, provider } = await User.create(req.body);    

        return res.json({
            id,
            name,
            email,
            provider
        });
    }

    async update(req, res) {
        const { email, oldPassword } = req.body;
        
        const user = await User.findByPk(req.userId);        

        /**
         * Se alterou o e-mail
         */
        if (email !== user.email) {
            const userExists = await User.findOne({ where: { email }});

            if (userExists) {
                return res.status(400).json({ error: `Já existe um usuário com o e-mail ${userExists.email}` });
            }
        }

        if (oldPassword && !(await user.comparePassword(oldPassword))) {
            return res.status(401).json({ error: 'A senha antiga não existe' });
        }

        const { id, name, provider } = await user.update(req.body);

        return res.json({ id, name, provider });
    }

    async delete(req, res) {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: 'O id é obrigatório' });
        }

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(400).json({ error: 'O usuário não existe' });
        }

        const deleted = await User.destroy({ where: {id} });

        return res.status(204);
    }
}

export default new UserController();
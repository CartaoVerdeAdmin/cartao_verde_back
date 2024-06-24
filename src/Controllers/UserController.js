import TreeModel from "../Models/TreeModel.js";
import UserModel from "../Models/UserModel.js";
import jwt from "jsonwebtoken";

class UserController {
  async login(req, res) {
    try {
      let userFound = await UserModel.findOne({ email: req.body.email });

      if (!userFound) {
        userFound = await UserModel.create(req.body);

        await userFound.save();
      }
      const token = jwt.sign(
        {
          userFound,
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE_IN }
      );

      return res.status(200).json({ token, user: userFound });
    } catch (error) {
      res.status(500).json({ message: "Error at login", error: error.message });
    }
  }

  async read(req, res) {
    try {
      const { id } = req.params;
      const user = await UserModel.findById(id).select("-favoritesTrees");
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "Error while fetching User", error: error.message });
    }
  }

  async readFavoritesTrees(req, res) {
    try {
      const { userId } = req.params;
      const user = await UserModel.findById(userId).select("favoritesTrees");
      if (!user) return res.status(404).json({ message: "User not found" });

      const populatedPromises = user.favoritesTrees.map(async (treeId) => {
        const populatedTree = await TreeModel.findById(treeId).populate("archive");

        return populatedTree;
      });

      const populatedTrees = await Promise.all(populatedPromises);
      res.status(200).json(populatedTrees);
    } catch (error) {
      res.status(500).json({ message: "Error while fetching User", error: error.message });
    }
  }

  async readAll(req, res) {
    try {
      const user = await UserModel.find().select("-favoritesTrees");
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "Error while fetching Users", error: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id: _id } = req.params;
      const userFound = await UserModel.findById(_id);
      if (!userFound)
        return res.status(404).json({ message: "Usuário com id " + _id + " não encontrado!" });
      const user = await userFound.set(req.body).save();
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "ERRO", error: error.message });
    }
  }

  async destroy(req, res) {
    try {
      const { id } = req.params;
      const userFound = await UserModel.findById(id);
      if (!userFound) {
        return res.status(404).json({ message: "Usuário com id " + id + " não encontrado!" });
      }
      await userFound.deleteOne();
      res.status(200).json({
        mensagem: "Usuário com id " + id + " deletado com sucesso!",
      });
    } catch (error) {
      res.status(500).json({ message: "ERRO", error: error.message });
    }
  }

  async updateFavoritesTrees(req, res) {
    try {
      const { ids } = req.body;
      const { userId } = req.params;

      const user = await UserModel.findById(userId);

      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      const currentFavorites = user.favoritesTrees.map(String);

      const newFavorites = ids.filter((id) => !currentFavorites.includes(id));
      const removedFavorites = currentFavorites.filter((id) => ids.includes(id));

      await Promise.all(
        newFavorites.map(async (id) => {
          const event = await TreeModel.findById(id);
          if (!event) {
            return res.status(400).json({ message: `Evento com ID ${id} não encontrado` });
          }
          user.favoritesTrees.push(event);
        })
      );

      user.favoritesTrees = user.favoritesTrees.filter(
        (event) => !removedFavorites.includes(event.toString())
      );
      await user.save();

      res.status(200).json({ message: "Favoritos atualizados com sucesso", user });
    } catch (error) {
      res.status(500).json({ message: "Erro ao atualizar favoritos", error: error.message });
    }
  }

  async buyTrees(req, res) {
    try{
      const { userId, treeId } = req.params;

      const user = await UserModel.findById(userId);
      const tree = await TreeModel.findById(treeId);

      if(!user){
        return res.status(400).json({ message: "Usuário não encontrado." });
      }
      if(!tree){
        return res.status(400).json({ message: "Árvore não encontrada." });
      }

      if(user.favoriteTrees.includes(treeId))
        return res.status(400).json({ message: "Árvore já está inclusa nos favoritos"});

      user.favoriteTrees.push(treeId);
      await user.save();

      res.status(200).json({ message: "Árvore comprada com sucesso! "});

    } catch(error) {
      res.status(500).json({ message: "Erro ao comprar a árvore!", error: error.mensagem});
    }
  }
}

export default new UserController();

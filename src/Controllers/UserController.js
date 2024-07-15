import UserModel from "../Models/UserModel.js";

import jwt from "jsonwebtoken";
import {
  cookieAuthName,
  createCookieOptions,
  deleteCookieOptions,
} from "../Utils/general/CookieAuth.js";

class UserController {
  async login(req, res) {
    try {
      let user = await UserModel.findOne({ email: req.body.email });

      if (!user) {
        user = await UserModel.create(req.body);

        await user.save();
      }
      const token = jwt.sign(
        {
          user,
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE_IN }
      );

      return res
        .cookie(cookieAuthName, token, createCookieOptions)
        .status(200)
        .json({ token, user: user });
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

  async refreshToken(req, res) {
    try {
      const refreshToken = req.signedCookies[cookieAuthName];
      console.log(refreshToken);
      if (!refreshToken) {
        return res.status(401).json({ message: "Token de refresh não fornecido" });
      }

      let decoded;
      try {
        decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
      } catch (error) {
        console.log(error);
        return res.status(401).json({ message: "Token de refresh inválido ou expirado" });
      }

      const user = await UserModel.findById(decoded.user._id);
      if (!user) {
        return res.status(404).json({ message: "Usuário não existe" });
      }
      const accessToken = jwt.sign(
        {
          user,
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE_IN }
      );

      const newRefreshToken = jwt.sign(
        {
          user: {
            _id: user._id,
            email: user.email,
          },
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRE }
      );

      res
        .cookie(cookieAuthName, newRefreshToken, createCookieOptions)
        .status(200)
        .json({ accessToken });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao atualizar token", error: error.message });
    }
  }
}

export default new UserController();

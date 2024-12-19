import CertificateModel from "../Models/CertificateModel.js";
import UserModel from "../Models/UserModel.js";
import TreeModel from "../Models/TreeModel.js";
import moment from "moment";
import transporter from "../Services/smtp.js";
import formatExpiresAt from "../Utils/general/formatExpiresAt.js";
import {generatePDF,  deletePDF } from "../Services/generateCertificate/generate.js";

class CertificateController {
  async create(req, res) {
    try {
      const { tree, id_user, years } = req.body;
      const user = await UserModel.findById(id_user);
    
      if (!user)     {
        return res.status(400).json({ message: "User ID do not exist" });
      }
      const promises = tree.map(async (unit) => {
        const currentTree = await TreeModel.findById(unit._id);
        currentTree.available_quantity -= unit?.quantity;
        await currentTree.save();
        
        return CertificateModel.create({
          id_tree: unit._id,
          id_user: id_user,
          description: "Default Description",
          quantity: unit?.quantity,
          years: years,
          finalDate: new Date(formatExpiresAt(24 * 3600 * 365 * years)),
        });
      });
      
      await Promise.all(promises);

      
      const treeNames = tree.map((tree) => tree.name).join(", ");
      const pathPDF = await generatePDF(user, tree).then((pdfPath) => {
        return pdfPath;
      });      
      const mailOptions = {
        from: `${process.env.EMAIL_USER}`,
        to: `${user.email}`,
        subject: `Compra de Certificado da Árvore ${treeNames}`,
        text: `Olá, ${user.name}
        \nVocê realizou a compra do certificado da árvore ${treeNames} na plataforma Cartão Verde.
        \nSegue em anexo seu certificado.
        \nAgradecemos sua compra!
        \n\nAtenciosamente, Equipe Cartão Verde`,
        attachments: [
          {
            filename: 'certificado.pdf',
            path: pathPDF, 
          },
        ],
      };

      

      try {
        await transporter.sendMail(mailOptions);
        deletePDF(pathPDF);
        return res.status(200).json({ message: "Email successfully sent" });
      } catch (error) {
        return res.status(500).json({ message: "Error sending email", error: error.message });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error while creating Certificate", error: error.message });
    }
  }

  async readAll(req, res) {
    try {
      const certificate = await CertificateModel.find(req.body)
        .populate("id_tree")
        .populate({ path: "id_user", select: "name" });

      return res.status(200).json(certificate);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error while fetching all Certificates", error: error.message });
    }
  }

  async destroy(req, res) {
    try {
      const { id } = req.params;

      const foundCertificate = await CertificateModel.findById(id);
      if (!foundCertificate) {
        return res.status(404).json({ message: "Certificate not found!" });
      }
      await foundCertificate.deleteOne();
      res.status(200).json({
        message: "Certificate successfully deleted!",
      });
    } catch (error) {
      res.status(500).json({ message: "Error while deleting Certificate", error: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const foundCertificate = await CertificateModel.findById(id);
      if (!foundCertificate) return res.status(404).json({ message: "Certificate not found!" });
      const certificate = await foundCertificate.set(req.body).save();
      res.status(200).json(certificate);
    } catch (error) {
      res.status(500).json({ message: "Error While Updating Certificate", error: error.message });
    }
  }

  async readByUser(req, res) {
    try {
      const { id } = req.params;
      let { type } = req.query;

      const certificated = await CertificateModel.find({ id_user: id })
        .populate("id_tree")
        .populate({ path: "id_user", select: "name" });
      let filteredCertificates;

      switch (type) {
        case "expirated":
          filteredCertificates = certificated.filter((certificate) => {
            return moment(certificate.expirateDate).isBefore(moment());
          });
          break;
        case "active":
          filteredCertificates = certificated.filter((certificate) => {
            return moment(certificate.expirateDate).isAfter(moment());
          });
          break;
        default:
          filteredCertificates = certificated;
      }
      return res.status(200).json(filteredCertificates);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error while filtering Certificates by User", error: error.message });
    }
  }
}

export default new CertificateController();

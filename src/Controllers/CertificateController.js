import CertificateModel from '../Models/CertificateModel.js';
import UserModel from '../Models/UserModel.js';
import TreeModel from '../Models/TreeModel.js';
import moment from 'moment';

class CertificateController {
  async create(req, res) {
    try {
      const { id_tree, id_user, ...rest } = req.body;

      const user = await UserModel.findById(id_user);
      if (!user) {
        return res.status(400).json({ message: 'User ID do not exist' });
      }

      const tree = await TreeModel.findById(id_tree);
      if (!tree) {
        return res.status(400).json({ message: 'Tree ID do not exist' });
      }

      const certificate = await CertificateModel.create({
        id_tree: id_tree,
        id_user: id_user,
        ...rest,
      });
      return res.status(200).json(certificate);
    } catch (error) {
      res
        .status(500)
        .json({
          message: 'Error while creating Certificate',
          error: error.message,
        });
    }
  }

  async readAll(req, res) {
    try {
      const certificate = await CertificateModel.find(req.body)
        .populate('id_tree')
        // More Details https://stackoverflow.com/questions/26691543/return-certain-fields-with-populate-from-mongoose
        .populate({ path: 'id_user', select: 'name' });

      return res.status(200).json(certificate);
    } catch (error) {
      res
        .status(500)
        .json({
          message: 'Error while fetching all Certificates',
          error: error.message,
        });
    }
  }

  async destroy(req, res) {
    try {
      const { id } = req.params;

      const foundCertificate = await CertificateModel.findById(id);
      if (!foundCertificate) {
        return res.status(404).json({ message: 'Certificate not found!' });
      }
      await foundCertificate.deleteOne();
      res.status(200).json({
        message: 'Certificate successfully deleted!',
      });
    } catch (error) {
      res
        .status(500)
        .json({
          message: 'Error while deleting Certificate',
          error: error.message,
        });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const foundCertificate = await CertificateModel.findById(id);
      if (!foundCertificate)
        return res.status(404).json({ message: 'Certificate not found!' });
      const certificate = await foundCertificate.set(req.body).save();
      res.status(200).json(certificate);
    } catch (error) {
      res
        .status(500)
        .json({
          message: 'Error While Updating Certificate',
          error: error.message,
        });
    }
  }

  async readByUser(req, res) {
    try {
      const { id } = req.params;
      let { type } = req.query;

      const certificated = await CertificateModel.find({ id_user: id })
        .populate('id_tree')
        // More Details https://stackoverflow.com/questions/26691543/return-certain-fields-with-populate-from-mongoose
        .populate({ path: 'id_user', select: 'name' });
      let filteredCertificates;

      switch (type) {
        case 'expirated':
          filteredCertificates = certificated.filter((certificate) => {
            return moment(certificate.expirateDate).isBefore(moment());
          });
          break;
        case 'active':
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
        .json({
          message: 'Error while filtering Certificates by User',
          error: error.message,
        });
    }
  }
}

export default new CertificateController();

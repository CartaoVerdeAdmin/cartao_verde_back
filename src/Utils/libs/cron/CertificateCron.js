import cron from "node-cron";
import TreeModel from "../../../Models/TreeModel.js";
import CertificateModel from "../../../Models/CertificateModel.js";

export const startCertificateExpirationJob = () => {
  cron.schedule("0 0 * * *", async () => {
    try {
      const currentDate = new Date();
      const expiredCertificates = await CertificateModel.find({ expiresAt: { $lt: currentDate } });
      if (expiredCertificates.length === 0) {
        return;
      }
      await Promise.all(
        expiredCertificates.map(async (cert) => {
          const tree = await TreeModel.findById(cert.id_tree);

          if (tree) {
            tree.available_quantity += cert.quantity;
            await tree.save();
          }

          await CertificateModel.findByIdAndDelete(cert._id);
        })
      );
    } catch (error) {
      console.log(error);
    }
  });
};

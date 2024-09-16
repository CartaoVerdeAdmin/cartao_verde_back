import cron from "node-cron";
import TreeModel from "../../Models/TreeModel.js";
import CertificateModel from "../../Models/CertificateModel.js";

cron.schedule("0 0 * * *", async () => {
  try {
    const expiredCertificates = await CertificateModel.find({ expiresAt: { $lt: new Date() } });

    for (const cert of expiredCertificates) {
      const tree = await TreeModel.findById(cert.id_tree);
      if (tree) {
        tree.available_quantity += cert.quantity;
        await tree.save();
      }

      await CertificateModel.findByIdAndDelete(cert._id);
    }
  } catch (error) {
    console.log(error);
  }
});

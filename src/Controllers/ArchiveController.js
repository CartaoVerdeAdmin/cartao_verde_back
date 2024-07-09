import ArchiveModel from '../Models/ArchiveModel.js';
import { deleteArchive, getArchive, sendArchive } from '../Config/Aws.js';

class ArchiveController {
  async getArchivesbyID(req, res) {
    try {
      let { archive: ids } = req.query;
      ids = ids.split(', ');
      const archivePromises = ids.map(async (id) => {
        const archive = await ArchiveModel.findById(id);

        if (!archive) {
          throw new Error(`Archive with ID ${id} not found`);
        }

        const key = archive.url.split('/').pop();
        const data = await getArchive(key);
        return data;
      });

      const base64Strings = await Promise.all(archivePromises);
      return res.status(200).json(base64Strings);
    } catch (error) {
      return res.status(500).json({
        message: 'Error while fetching archive',
        error: error.message,
      });
    }
  }

  async create(req) {
    const archives = Array.isArray(req.archive) ? req.archive : [req.archive];
    const archiveIds = [];

    for (let i = 0; i < archives.length; i++) {
      const file = archives[i].base64;
      const name = archives[i].name;
      const nameWithIteration = `${name}${i + 1} `;
      const url = await sendArchive(file, nameWithIteration);
      const archive = await ArchiveModel.create({ url, name });
      archiveIds.push(archive._id);
    }
    return archiveIds;
  }

  async deleteArchives(req) {
    const ids = Array.isArray(req) ? req : [req]; // Garante que ids seja um vetor
    for (const id of ids) {
      const archive = await ArchiveModel.findById(id);

      if (!archive) {
        throw new Error(`Archive with ID ${id} not found`);
      }

      const urlSplit = archive.url.split('/');
      const key = urlSplit.pop();
      await deleteArchive(key);

      await ArchiveModel.findByIdAndDelete(id);
    }
  }

  async update(req) {
    const files = Array.isArray(req.files) ? req.files : [req.files];

    let oldArchives = Array.isArray(req.oldArchives)
      ? req.oldArchives
      : [req.oldArchives];

    const archiveIds = [];

    const removedArchives = oldArchives
      .filter(
        (oldArchive) => !files.some((file) => file.name === oldArchive.name),
      )
      .map((removedArchive) => removedArchive.id);
    oldArchives = oldArchives.filter(
      (oldArchive) => !removedArchives.includes(oldArchive.id),
    );
    if (removedArchives.length > 0) this.deleteArchives(removedArchives);
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file?.base64) {
        const nameWithIteration = `${file.name}${i + 1} `;
        const result = await sendArchive(file.base64, nameWithIteration);
        const archive = await ArchiveModel.create({
          url: result,
          name: nameWithIteration,
        });
        archiveIds.push(archive._id);
      } else {
        const index = oldArchives.findIndex(
          (archive) => archive.name == file.name,
        );
        archiveIds.push(oldArchives[index]._id);
      }
    }

    return archiveIds;
  }
}

export default new ArchiveController();

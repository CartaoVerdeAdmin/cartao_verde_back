import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { TranslateCertificate } from "./Translations.js";

async function generatePDF(user, trees, years) {
  const dateCertificate = new Date().toLocaleDateString();
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const translations = TranslateCertificate({ globalLanguage: "PT" });
  const tree = trees[0];

  // Leia o template HTML
  const templatePath = path.resolve('./src/Services/generateCertificate', 'certificate.html');
  let htmlContent = fs.readFileSync(templatePath, 'utf8');

  // Substituir os placeholders no HTML com dados reais
  htmlContent = htmlContent
    .replace('{{card._id}}', user._id)
    .replace('{{CertificateTitle1}}', translations.CertificateTitle1)
    .replace('{{CertificateTitle2}}', translations.CertificateTitle2)
    .replace('{{Name}}', user.name)
    .replace('{{ClientName}}', translations.ClientName)
    .replace('{{CertificateNumber}}', translations.CertificateNumber)
    .replace('{{Number}}', tree._id)
    .replace('{{EmissionDate}}', translations.EmissionDate)
    .replace('{{dateCertificate}}', dateCertificate)
    .replace('{{Location}}', translations.TreeLocation)
    .replace('{{TreeLocation}}', tree.location)
    .replace('{{Text1Pt1}}', translations.Text1Pt1)
    .replace('{{Text1Pt2}}', translations.Text1Pt2)
    .replace('{{Text1Pt22}}', translations.Text1Pt22)
    .replace('{{Text1Pt3}}', translations.Text1Pt3)
    .replace('{{Years}}', years)
    .replace('{{Text1Pt4}}', translations.Text1Pt4)
    .replace('{{Name}}', user.name)
    .replace('{{TreeLocation}}', tree.location)
    .replace('{{Text2}}', translations.Text2)
    .replace('{{Concession}}', translations.Concession)
    .replace('{{ConcessionText}}', translations.ConcessionText)
    .replace('{{Signature}}', translations.Signature)
    .replace('{{Representant}}', translations.Representant)
    .replace('{{Contact}}', translations.Contact)
    .replace('{{Email}}', translations.Email)
    .replace('{{PhoneNumber}}',translations.PhoneNumber)
    .replace('{{Website}}', translations.Website);

  // Carregue o HTML modificado na página do Puppeteer
  await page.setContent(htmlContent);

  // Gere o PDF
  const pdfPath = path.resolve('./src/Services/generateCertificate', `./certificado-${tree._id}.pdf`);
  await page.pdf({
    format: 'A4',
    printBackground: true,
    path: pdfPath, 
  });

  await browser.close();
  return pdfPath;
}

function deletePDF(pdfPath) {
    try {
      if (fs.existsSync(pdfPath)) {
        fs.unlinkSync(pdfPath);
        console.log(`Arquivo ${pdfPath} foi deletado com sucesso.`);
      } else {
        console.log(`Arquivo ${pdfPath} não encontrado.`);
      }
    } catch (error) {
      console.error(`Erro ao deletar o arquivo: ${error.message}`);
    }
  }
  
export { generatePDF, deletePDF };


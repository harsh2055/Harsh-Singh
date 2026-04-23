import { jsPDF } from 'jspdf';
import { PROFILE, PROJECTS, SKILLS, EDUCATION, EXPERIENCE } from '../constants/data';

export const generatePortfolioPDF = () => {
  const doc = new jsPDF() as any;
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  const contentWidth = pageWidth - (margin * 2);

  let currentY = 25;

  const checkPageOverflow = (needed: number) => {
    if (currentY + needed > pageHeight - margin) {
      doc.addPage();
      currentY = 20;
    }
  };

  const centerText = (text: string, y: number, size: number, style: 'normal' | 'bold' = 'normal') => {
    doc.setFontSize(size);
    doc.setFont('helvetica', style);
    const textWidth = doc.getTextWidth(text);
    doc.text(text, (pageWidth - textWidth) / 2, y);
  };

  // Header
  doc.setFont('helvetica', 'bold');
  centerText(PROFILE.name, currentY, 28, 'bold');
  currentY += 10;

  const contactLine = `${PROFILE.phone} | ${PROFILE.email} | Nallasopara, Mumbai, Maharashtra | ${PROFILE.github}`;
  centerText(contactLine, currentY, 9, 'normal');
  currentY += 15;

  // Section Generator
  const addSection = (title: string) => {
    checkPageOverflow(15);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(0, 0, 0);
    doc.text(title.toUpperCase(), margin, currentY);
    doc.setDrawColor(180, 180, 180);
    doc.line(margin, currentY + 2, pageWidth - margin, currentY + 2);
    currentY += 10;
  };

  // 1. Professional Summary
  addSection('Professional Summary');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  const summaryLines = doc.splitTextToSize(PROFILE.summary, contentWidth);
  checkPageOverflow(summaryLines.length * 5);
  doc.text(summaryLines, margin, currentY);
  currentY += (summaryLines.length * 5) + 8;

  // 2. Technical Skills
  addSection('Technical Skills');
  SKILLS.forEach(skillGroup => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    const label = `${skillGroup.group}: `;
    const labelWidth = doc.getTextWidth(label);
    
    doc.setFont('helvetica', 'normal');
    const itemsText = doc.splitTextToSize(skillGroup.items, contentWidth - labelWidth);
    
    checkPageOverflow((itemsText.length * 5) + 1);
    
    doc.setFont('helvetica', 'bold');
    doc.text(label, margin, currentY);
    doc.setFont('helvetica', 'normal');
    doc.text(itemsText, margin + labelWidth, currentY);
    
    currentY += (itemsText.length * 5) + 1;
  });
  currentY += 8;

  // 3. Education
  addSection('Education');
  EDUCATION.forEach(edu => {
    checkPageOverflow(15);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text(edu.degree, margin, currentY);
    doc.text(edu.period, pageWidth - margin - doc.getTextWidth(edu.period), currentY);
    currentY += 5;
    doc.setFont('helvetica', 'normal');
    doc.text(edu.school, margin, currentY);
    doc.text(edu.location, pageWidth - margin - doc.getTextWidth(edu.location), currentY);
    currentY += 8;
  });
  currentY += 5;

  // 4. Projects
  addSection('Projects');
  PROJECTS.forEach(project => {
    checkPageOverflow(20);
    doc.setFont('helvetica', 'bold');
    const githubPart = (project as any).githubUrl ? ` | ${(project as any).githubUrl.replace('https://', '')}` : '';
    const header = `${project.name} | ${project.techStack.join(', ')} | ${project.liveUrl.replace('https://', '')}${githubPart}`;
    doc.text(header, margin, currentY);
    currentY += 6;
    
    doc.setFont('helvetica', 'normal');
    const highlights = (project as any).highlights || [project.description];
    highlights.forEach((point: string) => {
      const bulletLines = doc.splitTextToSize(`- ${point}`, contentWidth - 5);
      checkPageOverflow(bulletLines.length * 5);
      doc.text(bulletLines, margin + 2, currentY);
      currentY += (bulletLines.length * 5);
    });
    currentY += 3;
  });
  currentY += 8;

  // 5. Experience
  addSection('Experience');
  EXPERIENCE.forEach(exp => {
    checkPageOverflow(25);
    doc.setFont('helvetica', 'bold');
    doc.text(exp.title, margin, currentY);
    doc.text(exp.period, pageWidth - margin - doc.getTextWidth(exp.period), currentY);
    currentY += 5;
    doc.setFont('helvetica', 'italic');
    doc.text(exp.company, margin, currentY);
    doc.setFont('helvetica', 'normal');
    doc.text(exp.location, pageWidth - margin - doc.getTextWidth(exp.location), currentY);
    currentY += 6;
    
    exp.highlights.forEach(point => {
      const bulletLines = doc.splitTextToSize(`- ${point}`, contentWidth - 5);
      checkPageOverflow(bulletLines.length * 5);
      doc.text(bulletLines, margin + 2, currentY);
      currentY += (bulletLines.length * 5);
    });
    currentY += 5;
  });

  doc.save(`${PROFILE.name.replace(/\s+/g, '_')}_Resume.pdf`);
};

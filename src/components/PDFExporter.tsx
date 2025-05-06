import React from 'react';
import { Button } from '@mantine/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Character } from '../types/character';

interface PDFExporterProps {
  character: Character;
}

export const PDFExporter = ({ character }: PDFExporterProps) => {
  const exportToPDF = () => {
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(20);
    doc.text(`${character.name} - Level ${character.level} ${character.race} ${character.class}`, 14, 20);
    
    // Ability Scores
    doc.setFontSize(12);
    autoTable(doc, {
      head: [['Ability', 'Score', 'Modifier']],
      body: Object.entries(character.abilities).map(([ability, score]) => [
        ability.toUpperCase(),
        score,
        Math.floor((score - 10) / 2)
      ]),
      startY: 30
    });

    // Skills
    autoTable(doc, {
      head: [['Skill', 'Proficient', 'Modifier']],
      body: Object.entries(character.skills).map(([skill, isProficient]) => [
        skill,
        isProficient ? '✓' : '',
        ''
      ]),
      startY: doc.lastAutoTable.finalY + 10
    });

    // Equipment
    if (character.equipment.length > 0) {
      autoTable(doc, {
        head: [['Equipment']],
        body: character.equipment.map(item => [item]),
        startY: doc.lastAutoTable.finalY + 10
      });
    }

    // Spells
    if (character.spells.length > 0) {
      autoTable(doc, {
        head: [['Spells']],
        body: character.spells.map(spell => [spell]),
        startY: doc.lastAutoTable.finalY + 10
      });
    }

    doc.save(`${character.name.toLowerCase().replace(/\s+/g, '_')}_character_sheet.pdf`);
  };

  return (
    <Button onClick={exportToPDF} color="green">
      Export to PDF
    </Button>
  );
};
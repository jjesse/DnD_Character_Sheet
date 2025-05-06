import React from 'react';
import { TextInput, NumberInput, Button, Grid, Paper, Container, Title, Group, Text, Stack, Tabs, Progress } from '@mantine/core';
import { useState, useEffect } from 'react';
import { Character } from '../types/character';
import { ClassSelection } from './ClassSelection';
import { CharacterService } from '../services/CharacterService';
import { CharacterList } from './CharacterList';
import { SpellManager } from './SpellManager';
import { EquipmentManager } from './EquipmentManager';
import { CharacterPortrait } from './CharacterPortrait';
import { SkillProficiencies } from './SkillProficiencies';
import { DiceRoller } from './DiceRoller';
import { PDFExporter } from './PDFExporter';
import { CharacterSharing } from './CharacterSharing';
import { BackupManager } from './BackupManager';
import { ValidationService } from '../services/ValidationService';
import { notifications } from '@mantine/notifications';

const calculateProficiencyBonus = (level: number): number => Math.floor((level - 1) / 4) + 2;
const calculateModifier = (score: number): number => Math.floor((score - 10) / 2);
const experienceForLevel = (level: number): number => {
  const xpTable = [0, 300, 900, 2700, 6500, 14000, 23000, 34000, 48000, 64000, 
    85000, 100000, 120000, 140000, 165000, 195000, 225000, 265000, 305000, 355000];
  return xpTable[level - 1] || 0;
};

const CharacterSheet = () => {
  const [character, setCharacter] = useState<Character>({
    name: '',
    race: '',
    class: '',
    level: 1,
    abilities: {
      strength: 10,
      dexterity: 10,
      constitution: 10,
      intelligence: 10,
      wisdom: 10,
      charisma: 10
    },
    hitPoints: {
      current: 0,
      maximum: 0
    },
    skills: {},
    equipment: [],
    spells: [],
    portrait: '',
    experience: 0,
    proficiencyBonus: 2
  });

  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    const autoSaveTimer = setTimeout(() => {
      if (character.name) {
        try {
          CharacterService.saveCharacter(character);
          notifications.show({
            title: 'Auto-saved',
            message: 'Character sheet saved automatically',
            color: 'green'
          });
        } catch (error) {
          notifications.show({
            title: 'Error',
            message: 'Failed to auto-save character',
            color: 'red'
          });
        }
      }
    }, 30000); // Auto-save every 30 seconds

    return () => clearTimeout(autoSaveTimer);
  }, [character]);

  // Calculate ability modifiers for skills
  const abilityModifiers = Object.entries(character.abilities).reduce((acc, [ability, score]) => ({
    ...acc,
    [ability]: calculateModifier(score)
  }), {});

  // Calculate level progress
  const currentLevelXp = experienceForLevel(character.level);
  const nextLevelXp = experienceForLevel(character.level + 1);
  const xpProgress = ((character.experience - currentLevelXp) / (nextLevelXp - currentLevelXp)) * 100;

  const handleSave = () => {
    const validationErrors = ValidationService.validateCharacter(character);
    setErrors(validationErrors);

    if (validationErrors.length === 0) {
      try {
        CharacterService.saveCharacter(character);
        notifications.show({
          title: 'Success',
          message: 'Character saved successfully',
          color: 'green'
        });
      } catch (error) {
        notifications.show({
          title: 'Error',
          message: 'Failed to save character',
          color: 'red'
        });
      }
    }
  };

  const handleLoad = (name: string) => {
    const loadedCharacter = CharacterService.loadCharacter(name);
    if (loadedCharacter) {
      setCharacter(loadedCharacter);
    }
  };

  const renderAbilityScore = (name: keyof typeof character.abilities) => (
    <Grid.Col span={4}>
      <Paper withBorder p="xs">
        <Title order={6}>{name.charAt(0).toUpperCase() + name.slice(1)}</Title>
        <Group>
          <NumberInput
            value={character.abilities[name]}
            onChange={(val) => setCharacter({
              ...character,
              abilities: { ...character.abilities, [name]: val || 10 }
            })}
            min={3}
            max={20}
          />
          <Text>Modifier: {calculateModifier(character.abilities[name])}</Text>
        </Group>
      </Paper>
    </Grid.Col>
  );

  return (
    <Container size="lg">
      <Stack spacing="md">
        <Paper p="md" shadow="xs">
          <CharacterList onLoadCharacter={handleLoad} />
        </Paper>

        <Paper p="md" shadow="xs">
          <Tabs defaultValue="basic">
            <Tabs.List>
              <Tabs.Tab value="basic">Basic Info</Tabs.Tab>
              <Tabs.Tab value="skills">Skills</Tabs.Tab>
              <Tabs.Tab value="spells">Spells</Tabs.Tab>
              <Tabs.Tab value="equipment">Equipment</Tabs.Tab>
              <Tabs.Tab value="dice">Dice Roller</Tabs.Tab>
              <Tabs.Tab value="share">Share</Tabs.Tab>
              <Tabs.Tab value="backup">Backup</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="basic" pt="xs">
              <Grid>
                <Grid.Col span={12}>
                  <CharacterPortrait
                    imageUrl={character.portrait || ''}
                    onImageChange={(url) => setCharacter({ ...character, portrait: url })}
                  />
                </Grid.Col>
                <Grid.Col span={6}>
                  <TextInput
                    label="Character Name"
                    value={character.name}
                    onChange={(e) => setCharacter({ ...character, name: e.target.value })}
                  />
                </Grid.Col>
                <Grid.Col span={6}>
                  <TextInput
                    label="Race"
                    value={character.race}
                    onChange={(e) => setCharacter({ ...character, race: e.target.value })}
                  />
                </Grid.Col>
                <Grid.Col span={12}>
                  <ClassSelection 
                    value={character.class}
                    onChange={(val) => setCharacter({ ...character, class: val })}
                  />
                </Grid.Col>
                <Grid.Col span={6}>
                  <NumberInput
                    label="Level"
                    value={character.level}
                    onChange={(val) => setCharacter({ ...character, level: val || 1 })}
                    min={1}
                    max={20}
                  />
                </Grid.Col>
                <Grid.Col span={12}>
                  <NumberInput
                    label="Experience Points"
                    value={character.experience}
                    onChange={(val) => setCharacter({ ...character, experience: val || 0 })}
                    min={0}
                  />
                  <Text size="sm" mt="xs">Level Progress:</Text>
                  <Progress value={xpProgress} mt="xs" />
                  <Text size="sm" mt="xs">
                    Proficiency Bonus: +{calculateProficiencyBonus(character.level)}
                  </Text>
                </Grid.Col>
              </Grid>
              
              <Title order={3} mt="md">Ability Scores</Title>
              <Grid mt="sm">
                {Object.keys(character.abilities).map((ability) => 
                  renderAbilityScore(ability as keyof typeof character.abilities)
                )}
              </Grid>
              
              <Group mt="md">
                <Button onClick={handleSave}>Save Character</Button>
                <PDFExporter character={character} />
              </Group>
            </Tabs.Panel>

            <Tabs.Panel value="skills" pt="xs">
              <SkillProficiencies
                skills={character.skills}
                onSkillsChange={(skills) => setCharacter({ ...character, skills })}
                abilityModifiers={abilityModifiers}
              />
            </Tabs.Panel>

            <Tabs.Panel value="spells" pt="xs">
              <SpellManager
                spells={character.spells}
                onSpellsChange={(spells) => setCharacter({ ...character, spells })}
              />
            </Tabs.Panel>

            <Tabs.Panel value="equipment" pt="xs">
              <EquipmentManager
                equipment={character.equipment}
                onEquipmentChange={(equipment) => setCharacter({ ...character, equipment })}
              />
            </Tabs.Panel>

            <Tabs.Panel value="dice" pt="xs">
              <DiceRoller />
            </Tabs.Panel>

            <Tabs.Panel value="share" pt="xs">
              <CharacterSharing 
                character={character}
                onImport={(importedCharacter) => setCharacter(importedCharacter)}
              />
            </Tabs.Panel>

            <Tabs.Panel value="backup" pt="xs">
              <BackupManager onBackupRestored={() => window.location.reload()} />
            </Tabs.Panel>
          </Tabs>
        </Paper>
      </Stack>
    </Container>
  );
};

export default CharacterSheet;
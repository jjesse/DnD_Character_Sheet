import React from 'react';
import { TextInput, NumberInput, Button, Stack, Table, Group } from '@mantine/core';
import { useState } from 'react';

interface Equipment {
  name: string;
  quantity: number;
  weight: number;
  description: string;
}

interface EquipmentManagerProps {
  equipment: Equipment[];
  onEquipmentChange: (equipment: Equipment[]) => void;
}

export const EquipmentManager = ({ equipment, onEquipmentChange }: EquipmentManagerProps) => {
  const [newItem, setNewItem] = useState<Equipment>({
    name: '',
    quantity: 1,
    weight: 0,
    description: ''
  });

  const addItem = () => {
    if (newItem.name) {
      onEquipmentChange([...equipment, newItem]);
      setNewItem({ name: '', quantity: 1, weight: 0, description: '' });
    }
  };

  const removeItem = (index: number) => {
    onEquipmentChange(equipment.filter((_, i) => i !== index));
  };

  const totalWeight = equipment.reduce((sum, item) => sum + (item.weight * item.quantity), 0);

  return (
    <Stack>
      <Group>
        <TextInput
          label="Item Name"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
        />
        <NumberInput
          label="Quantity"
          value={newItem.quantity}
          onChange={(val) => setNewItem({ ...newItem, quantity: val || 1 })}
          min={1}
        />
        <NumberInput
          label="Weight (lbs)"
          value={newItem.weight}
          onChange={(val) => setNewItem({ ...newItem, weight: val || 0 })}
          min={0}
          precision={2}
        />
        <TextInput
          label="Description"
          value={newItem.description}
          onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
        />
        <Button onClick={addItem}>Add Item</Button>
      </Group>

      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Weight</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {equipment.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.weight} lbs</td>
              <td>{item.description}</td>
              <td>
                <Button color="red" onClick={() => removeItem(index)}>
                  Remove
                </Button>
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan={2}><strong>Total Weight:</strong></td>
            <td colSpan={3}>{totalWeight} lbs</td>
          </tr>
        </tbody>
      </Table>
    </Stack>
  );
};
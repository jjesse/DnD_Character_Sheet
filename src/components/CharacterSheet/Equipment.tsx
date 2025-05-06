import { Table, Title, Text, Stack, NumberInput } from '@mantine/core';
import { calculateTotalWeight } from './utils';

interface EquipmentItem {
  name: string;
  quantity: number;
  weight: number;
  description: string;
}

interface EquipmentProps {
  items: EquipmentItem[];
  onEquipmentChange: (items: EquipmentItem[]) => void;
}

export const Equipment = ({ items, onEquipmentChange }: EquipmentProps) => {
  const totalWeight = calculateTotalWeight(items);

  return (
    <Stack>
      <Title order={3}>Equipment</Title>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Weight</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.weight}</td>
              <td>{item.description}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Text>Total Weight: {totalWeight} lbs</Text>
    </Stack>
  );
};